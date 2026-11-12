/**
 * Invite-bonus database layer (Neon Postgres serverless / local pg).
 *
 * Plan 运营中心/11-病毒增长/B档裂变改造方案-v2.md §6 items 2-6, composed from
 * the pure modules (inviteBonus.ts + sybil/clusterScan.ts) with SQL:
 *
 *   - invite codes: generated for APPROVED registrations only, one per user
 *     (unique index), stored on airdrop_registrations.invite_code
 *   - airdrop_invite_relations: the invite ledger with the hard plan
 *     requirement "one invitee, at most ONE inviter" as a DB UNIQUE
 *     constraint; minimal fields only (internal registration ids, status,
 *     approval time — no nickname, no extra PII: privacy red line)
 *   - airdrop_invite_bonuses: one record per (inviter, round); statuses
 *     pending → paid | void; the revoked flag withdraws a pending record
 *     before payout; voided records are terminal (作废不复活)
 *   - approval hook: called on every transition into sybil 'approved' —
 *     approves the invitee's relation, credits the INVITER's eligible
 *     approval count and back-fills missing bonus rounds ("下游恒不加成")
 *   - batch generation: track-A re-scan as a pre-step (plan §3.1: 复扫挂
 *     加成批次生成前), auto-pause + pool circuit breaker refuse the WHOLE
 *     batch, rows carry the independent `bonus-invite` batch type marker
 *   - registration state machine and main-payout queue are NEVER touched by
 *     this layer (plan §3.1 N2: downstream main payouts unaffected)
 */

import { randomBytes } from "node:crypto"

import { getInviteBonusConfig, type InviteBonusConfig } from "./airdropConfig"
import { rowsOf, sql } from "./database"
import {
  type BatchRefusalCode,
  BONUS_BATCH_TYPE,
  type BonusRecordLike,
  buildBonusBatch,
  computeEarnedRounds,
  isApprovalBonusEligible,
  isoWeekStart,
  reconcileBonusPool,
  roundsToCreate,
} from "./inviteBonus"

import {
  type ClusterHit,
  scanClusterTrackA,
  type TransferRelationProvider,
} from "@/lib/sybil/clusterScan"

// ---------------------------------------------------------------------------
// Schema bootstrap (idempotent, mirrors database.ts conventions)
// ---------------------------------------------------------------------------

let initPromise: Promise<void> | null = null

/** Idempotent invite-bonus schema bootstrap. Safe to call per-request. */
export function initInviteTables(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      // Invite code lives on the registration row (one user = one code,
      // enforced by the partial unique index; NULL until approval).
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS invite_code VARCHAR(16)
      `
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS airdrop_registrations_invite_code_key
        ON airdrop_registrations (invite_code) WHERE invite_code IS NOT NULL
      `
      // Invite ledger. The UNIQUE constraint on invitee_registration_id IS
      // the plan's anti-double-counting guarantee: a second inviter for the
      // same invitee is rejected by the database itself.
      await sql`
        CREATE TABLE IF NOT EXISTS airdrop_invite_relations (
          id SERIAL PRIMARY KEY,
          inviter_registration_id INTEGER NOT NULL REFERENCES airdrop_registrations(id),
          invitee_registration_id INTEGER NOT NULL REFERENCES airdrop_registrations(id),
          status VARCHAR(20) NOT NULL DEFAULT 'pending',
          approved_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT airdrop_invite_relations_invitee_unique UNIQUE (invitee_registration_id),
          CONSTRAINT airdrop_invite_relations_no_self CHECK (
            inviter_registration_id <> invitee_registration_id
          )
        )
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_invite_relations_inviter
        ON airdrop_invite_relations (inviter_registration_id)
      `
      // Bonus records: one row per (inviter, round) — the unique constraint
      // blocks duplicate generation under races and keeps a revoked/voided
      // round from being regenerated into a second payout.
      await sql`
        CREATE TABLE IF NOT EXISTS airdrop_invite_bonuses (
          id SERIAL PRIMARY KEY,
          inviter_registration_id INTEGER NOT NULL REFERENCES airdrop_registrations(id),
          round INTEGER NOT NULL CHECK (round >= 1),
          amount NUMERIC(30, 0) NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'pending',
          revoked BOOLEAN NOT NULL DEFAULT FALSE,
          void_reason TEXT,
          voided_at TIMESTAMP,
          batch_ref VARCHAR(64),
          paid_tx_hash VARCHAR(128),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT airdrop_invite_bonuses_inviter_round_unique
            UNIQUE (inviter_registration_id, round)
        )
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_invite_bonuses_pending
        ON airdrop_invite_bonuses (status) WHERE status = 'pending'
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_invite_bonuses_inviter
        ON airdrop_invite_bonuses (inviter_registration_id)
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_invite_bonuses_void_trail
        ON airdrop_invite_bonuses (voided_at) WHERE status = 'void'
      `
    })()
  }
  return initPromise
}

// ---------------------------------------------------------------------------
// Invite codes
// ---------------------------------------------------------------------------

/**
 * Lower-case unambiguous alphabet (no 0/o/1/i/l) — codes are read aloud and
 * typed by hand; case-insensitive lookups make user input forgiving.
 */
const INVITE_CODE_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz"
const INVITE_CODE_LENGTH = 10

function generateInviteCode(): string {
  const bytes = randomBytes(INVITE_CODE_LENGTH)
  let out = ""
  for (let i = 0; i < INVITE_CODE_LENGTH; i++) {
    out += INVITE_CODE_ALPHABET[bytes[i] % INVITE_CODE_ALPHABET.length]
  }
  return out
}

/**
 * Generate and store the invite code for an APPROVED registration
 * (plan §3.1: 未过审不生成). Idempotent: an existing code is returned
 * unchanged, so a re-approved row keeps its code forever.
 */
export async function ensureInviteCode(
  registrationId: number
): Promise<string | null> {
  await initInviteTables()
  const existing = rowsOf<{ invite_code: string | null }>(
    await sql`
      SELECT invite_code FROM airdrop_registrations
      WHERE id = ${registrationId} AND sybil_status = 'approved' LIMIT 1
    `
  )[0]
  if (existing?.invite_code) return existing.invite_code

  // Fresh code: retry on the (astronomically unlikely) unique-index clash.
  for (let attempt = 0; attempt < 3; attempt++) {
    const code = generateInviteCode()
    try {
      const updated = rowsOf<{ invite_code: string }>(
        await sql`
          UPDATE airdrop_registrations
          SET invite_code = ${code}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${registrationId} AND sybil_status = 'approved' AND invite_code IS NULL
          RETURNING invite_code
        `
      )
      if (updated.length > 0) return updated[0].invite_code
      // No row updated: either not approved or a concurrent call won — re-read.
      const reread = rowsOf<{ invite_code: string | null }>(
        await sql`
          SELECT invite_code FROM airdrop_registrations
          WHERE id = ${registrationId} AND sybil_status = 'approved' LIMIT 1
        `
      )[0]
      return reread?.invite_code ?? null
    } catch {
      // Unique violation → next attempt picks a different code.
    }
  }
  return null
}

/**
 * Existence check for the optional registration invite-code field: a code
 * is valid only when it belongs to an APPROVED registration. Returns the
 * inviter's registration id, or null (the caller must not block the main
 * flow on null — plan §3.1: 只做存在性校验，不阻塞主流程).
 */
export async function findApprovedInviterByInviteCode(
  rawCode: string
): Promise<number | null> {
  await initInviteTables()
  const code = rawCode.trim().toLowerCase()
  if (!code) return null
  const rows = rowsOf<{ id: number }>(
    await sql`
      SELECT id FROM airdrop_registrations
      WHERE invite_code = ${code} AND sybil_status = 'approved' LIMIT 1
    `
  )
  return rows.length > 0 ? Number(rows[0].id) : null
}

// ---------------------------------------------------------------------------
// Invite relations
// ---------------------------------------------------------------------------

export interface InviteRelationRow {
  id: number
  inviter_registration_id: number
  invitee_registration_id: number
  status: "pending" | "approved"
  approved_at: Date | null
  created_at: Date
}

/**
 * Record "invitee was invited by inviter". Returns false when the invitee
 * already has an inviter — the UNIQUE constraint is the plan's duplicate
 * protection (一下游唯一邀请人); callers must treat false as "ignored, main
 * flow continues".
 */
export async function createInviteRelation(
  inviterRegistrationId: number,
  inviteeRegistrationId: number
): Promise<boolean> {
  if (inviterRegistrationId === inviteeRegistrationId) return false
  await initInviteTables()
  const rows = rowsOf<{ id: number }>(
    await sql`
      INSERT INTO airdrop_invite_relations
        (inviter_registration_id, invitee_registration_id)
      VALUES (${inviterRegistrationId}, ${inviteeRegistrationId})
      ON CONFLICT (invitee_registration_id) DO NOTHING
      RETURNING id
    `
  )
  return rows.length > 0
}

export async function findInviteRelationForInvitee(
  inviteeRegistrationId: number
): Promise<InviteRelationRow | null> {
  await initInviteTables()
  const rows = rowsOf<InviteRelationRow>(
    await sql`
      SELECT id, inviter_registration_id, invitee_registration_id, status, approved_at, created_at
      FROM airdrop_invite_relations
      WHERE invitee_registration_id = ${inviteeRegistrationId} LIMIT 1
    `
  )
  return rows[0] ?? null
}

/** Does this registration id act as an inviter in the ledger? */
export async function isKnownInviter(
  inviterRegistrationId: number
): Promise<boolean> {
  await initInviteTables()
  const rows = rowsOf<{ id: number }>(
    await sql`
      SELECT id FROM airdrop_invite_relations
      WHERE inviter_registration_id = ${inviterRegistrationId} LIMIT 1
    `
  )
  return rows.length > 0
}

// ---------------------------------------------------------------------------
// Approval hook
// ---------------------------------------------------------------------------

export interface InviteApprovalSummary {
  /** Invite code available after this approval (generated for everyone). */
  inviteCode: string | null
  /** The invitee had an inviter and the relation is now approved. */
  relationApproved: boolean
  inviterRegistrationId: number | null
  /** Approvals that count toward bonuses (within the cutoff). */
  bonusEligibleApprovals: number | null
  /** Rounds whose bonus record was created by this call. */
  bonusRoundsCreated: number[]
}

/**
 * THE approval hook — call on every transition of a registration into
 * sybil_status 'approved' (currently the register route's scoring path;
 * the future hold-rescore job must call this too).
 *
 * Order of effects (all scoped to the invite layer — the registration state
 * machine is never touched):
 *   1. ensure the invitee's own invite code (approved ⇒ one code)
 *   2. approve the invitee's pending relation, if any
 *   3. re-count the INVITER's bonus-eligible approvals and back-fill any
 *      missing bonus rounds — one record per (inviter, round), the unique
 *      constraint makes this idempotent under races
 *
 * Being invited NEVER adds to the invitee's own bonus accounting (plan
 * design rule 4): step 3 only ever writes bonus rows for the inviter.
 */
export async function recordInviteApprovalSideEffects(
  inviteeRegistrationId: number,
  cfg: InviteBonusConfig = getInviteBonusConfig()
): Promise<InviteApprovalSummary> {
  const inviteCode = await ensureInviteCode(inviteeRegistrationId)

  // The DB's CURRENT_TIMESTAMP is the authoritative approval instant: it is
  // written and returned in one statement, then re-used for the cutoff check
  // so eligibility always matches the stored value.
  const approved = rowsOf<{
    inviter_registration_id: number
    approved_at: Date | string
  }>(
    await sql`
      UPDATE airdrop_invite_relations
      SET status = 'approved', approved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE invitee_registration_id = ${inviteeRegistrationId} AND status = 'pending'
      RETURNING inviter_registration_id, approved_at
    `
  )
  if (approved.length === 0) {
    return {
      inviteCode,
      relationApproved: false,
      inviterRegistrationId: null,
      bonusEligibleApprovals: null,
      bonusRoundsCreated: [],
    }
  }
  const inviterRegistrationId = Number(approved[0].inviter_registration_id)
  const storedApprovedAt = new Date(approved[0].approved_at)

  // Approvals after the bonus cutoff do not count (plan §8 N5).
  if (!isApprovalBonusEligible(storedApprovedAt, cfg.approvalCutoffAt)) {
    return {
      inviteCode,
      relationApproved: true,
      inviterRegistrationId,
      bonusEligibleApprovals: null,
      bonusRoundsCreated: [],
    }
  }

  const eligible = await countBonusEligibleApprovals(inviterRegistrationId, cfg)
  const earned = computeEarnedRounds(eligible, cfg)
  const existingRounds = rowsOf<{ round: number }>(
    await sql`
      SELECT round FROM airdrop_invite_bonuses
      WHERE inviter_registration_id = ${inviterRegistrationId}
    `
  ).map((r) => Number(r.round))
  const toCreate = roundsToCreate(existingRounds, earned)
  const created: number[] = []
  for (const round of toCreate) {
    const rows = rowsOf<{ id: number }>(
      await sql`
        INSERT INTO airdrop_invite_bonuses (inviter_registration_id, round, amount)
        VALUES (${inviterRegistrationId}, ${round}, ${cfg.bonusPerRoundQau})
        ON CONFLICT (inviter_registration_id, round) DO NOTHING
        RETURNING id
      `
    )
    if (rows.length > 0) created.push(round)
  }

  return {
    inviteCode,
    relationApproved: true,
    inviterRegistrationId,
    bonusEligibleApprovals: eligible,
    bonusRoundsCreated: created,
  }
}

/** Distinct approved downstreams whose approval still counts toward bonuses. */
export async function countBonusEligibleApprovals(
  inviterRegistrationId: number,
  cfg: InviteBonusConfig
): Promise<number> {
  await initInviteTables()
  const rows = cfg.approvalCutoffAt
    ? rowsOf<{ n: number }>(
        await sql`
          SELECT COUNT(*)::int AS n FROM airdrop_invite_relations
          WHERE inviter_registration_id = ${inviterRegistrationId}
            AND status = 'approved'
            AND approved_at IS NOT NULL
            AND approved_at <= ${cfg.approvalCutoffAt.toISOString()}::timestamp
        `
      )
    : rowsOf<{ n: number }>(
        await sql`
          SELECT COUNT(*)::int AS n FROM airdrop_invite_relations
          WHERE inviter_registration_id = ${inviterRegistrationId}
            AND status = 'approved'
        `
      )
  return Number(rows[0]?.n ?? 0)
}

// ---------------------------------------------------------------------------
// Cluster re-scan inputs (shared by batch generation and the report endpoint)
// ---------------------------------------------------------------------------

interface RelationFact {
  inviter_registration_id: number
  invitee_registration_id: number
}

interface MemberFact {
  id: number
  ipPrefix24: string | null
  emailDomain: string
  addressPrefix: string
  walletAddress: string
  approved: boolean
}

async function loadApprovedRelationFacts(): Promise<RelationFact[]> {
  const rows = rowsOf<RelationFact>(
    await sql`
      SELECT inviter_registration_id, invitee_registration_id
      FROM airdrop_invite_relations WHERE status = 'approved'
    `
  )
  return rows.map((r) => ({
    inviter_registration_id: Number(r.inviter_registration_id),
    invitee_registration_id: Number(r.invitee_registration_id),
  }))
}

async function loadMemberFacts(
  registrationIds: number[]
): Promise<Map<number, MemberFact>> {
  const map = new Map<number, MemberFact>()
  if (registrationIds.length === 0) return map
  const ids = registrationIds.map((id) => Math.floor(id))
  const rows = rowsOf<{
    id: number
    ip_prefix24: string | null
    email: string
    wallet_address: string
    sybil_status: string
  }>(
    await sql`
      SELECT id, ip_prefix24, email, wallet_address, sybil_status
      FROM airdrop_registrations WHERE id = ANY(${ids})
    `
  )
  for (const r of rows) {
    const addr = String(r.wallet_address || "").toLowerCase()
    const email = String(r.email || "")
    const at = email.lastIndexOf("@")
    map.set(Number(r.id), {
      id: Number(r.id),
      ipPrefix24: r.ip_prefix24 ? String(r.ip_prefix24) : null,
      emailDomain: at >= 0 ? email.slice(at + 1).toLowerCase() : "",
      addressPrefix: addr.startsWith("0x") ? addr.slice(2, 6) : "",
      walletAddress: addr,
      approved: r.sybil_status === "approved",
    })
  }
  return map
}

function toClusterMember(fact: MemberFact) {
  return {
    registrationId: fact.id,
    ipPrefix24: fact.ipPrefix24,
    emailDomain: fact.emailDomain,
    addressPrefix: fact.addressPrefix,
  }
}

/**
 * Default S9 corroboration provider wiring. The website has no direct
 * transfer-graph query, so the default provider returns `false` (S9 stays
 * silent — corroboration absence never voids bonuses, fail-open by contract).
 * Ops-side re-scan tooling supplies the real provider (review v4 §5 leaves
 * this to the ops layer); tests inject mocks.
 */
const noTransferRelation: TransferRelationProvider = async () => false

// ---------------------------------------------------------------------------
// Void / revoke / mark-paid
// ---------------------------------------------------------------------------

/**
 * Void every PENDING bonus record of one inviter's cluster (track-A
 * automatic trigger or confirmed track-B). Terminal: already-void and paid
 * records are untouched, and a voided record never flips back (review v4 §2
 * remark 1). Returns how many records were voided.
 */
export async function voidPendingBonusesForInviter(
  inviterRegistrationId: number,
  reason: string
): Promise<number> {
  await initInviteTables()
  const rows = rowsOf<{ id: number }>(
    await sql`
      UPDATE airdrop_invite_bonuses
      SET status = 'void', void_reason = ${reason}, voided_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE inviter_registration_id = ${inviterRegistrationId} AND status = 'pending'
      RETURNING id
    `
  )
  return rows.length
}

export type RevokeOutcome = "revoked" | "not_found" | "not_pending"

/**
 * Operator revocation (plan §3.1: 发放前均可撤销，发放后不追). Only a
 * pending record can be revoked; paid stays paid, void stays void. The
 * (inviter, round) unique constraint blocks any re-creation afterwards.
 */
export async function revokeBonusRecord(
  bonusId: number,
  reason: string
): Promise<RevokeOutcome> {
  await initInviteTables()
  const rows = rowsOf<{ id: number }>(
    await sql`
      UPDATE airdrop_invite_bonuses
      SET revoked = TRUE, void_reason = ${"revoke: " + reason}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${bonusId} AND status = 'pending' AND revoked = FALSE
      RETURNING id
    `
  )
  if (rows.length > 0) return "revoked"
  const existing = rowsOf<{ status: string }>(
    await sql`
      SELECT status FROM airdrop_invite_bonuses WHERE id = ${bonusId} LIMIT 1
    `
  )
  return existing.length > 0 ? "not_pending" : "not_found"
}

/** Mark a whole generated batch paid after the distributor's CSV run. */
export async function markBonusBatchPaid(
  batchRef: string,
  txHash: string
): Promise<number> {
  await initInviteTables()
  const rows = rowsOf<{ id: number }>(
    await sql`
      UPDATE airdrop_invite_bonuses
      SET status = 'paid', paid_tx_hash = ${txHash}, updated_at = CURRENT_TIMESTAMP
      WHERE batch_ref = ${batchRef} AND status = 'pending' AND revoked = FALSE
      RETURNING id
    `
  )
  return rows.length
}

// ---------------------------------------------------------------------------
// Batch generation (bonus-invite independent batch type)
// ---------------------------------------------------------------------------

function newBatchRef(now: Date): string {
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, "0")
  const d = String(now.getUTCDate()).padStart(2, "0")
  const rand = randomBytes(3).toString("hex")
  return `${BONUS_BATCH_TYPE}-${y}${m}${d}-${rand}`
}

export interface WeeklyHitCounts {
  lastWeek: number
  currentWeek: number
}

/**
 * Distinct clusters with track-A / confirmed track-B void events per ISO
 * week (review v4 §2 remark 2 counting口径) — the kill-switch criterion's
 * input. Both weeks read from the same void audit trail.
 */
export async function weeklyClusterHitCounts(
  now: Date
): Promise<WeeklyHitCounts> {
  await initInviteTables()
  const thisWeekStart = isoWeekStart(now)
  const lastWeekStart = new Date(
    thisWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000
  )
  // Current week has no upper bound: the just-written voids of this very
  // scan must count even if the DB clock is a hair ahead of the app clock.
  const lastWeekRows = rowsOf<{ n: number }>(
    await sql`
      SELECT COUNT(DISTINCT inviter_registration_id)::int AS n
      FROM airdrop_invite_bonuses
      WHERE status = 'void'
        AND void_reason LIKE 'track%'
        AND voided_at >= ${lastWeekStart.toISOString()}::timestamp
        AND voided_at < ${thisWeekStart.toISOString()}::timestamp
    `
  )
  const currentWeekRows = rowsOf<{ n: number }>(
    await sql`
      SELECT COUNT(DISTINCT inviter_registration_id)::int AS n
      FROM airdrop_invite_bonuses
      WHERE status = 'void'
        AND void_reason LIKE 'track%'
        AND voided_at >= ${thisWeekStart.toISOString()}::timestamp
    `
  )
  return {
    lastWeek: Number(lastWeekRows[0]?.n ?? 0),
    currentWeek: Number(currentWeekRows[0]?.n ?? 0),
  }
}

/** Bonus pool still spendable: pool budget − Σ paid bonus amounts. */
export async function getBonusPoolRemainingQau(
  cfg: InviteBonusConfig
): Promise<number> {
  await initInviteTables()
  const rows = rowsOf<{ total: string | number | null }>(
    await sql`
      SELECT COALESCE(SUM(amount), 0) AS total FROM airdrop_invite_bonuses
      WHERE status = 'paid'
    `
  )
  const paidTotal = Number(rows[0]?.total ?? 0)
  return cfg.poolQau - paidTotal
}

async function listPayableBonusRecords(): Promise<BonusRecordLike[]> {
  await initInviteTables()
  // batch_ref IS NULL keeps already-batched (not yet paid) records out of a
  // second batch — one record joins at most one batch, ever.
  const rows = rowsOf<{
    id: number
    inviter_registration_id: number
    round: number
    amount: string | number
    status: string
    revoked: boolean
    batch_ref: string | null
  }>(
    await sql`
      SELECT id, inviter_registration_id, round, amount, status, revoked, batch_ref
      FROM airdrop_invite_bonuses
      WHERE status = 'pending' AND revoked = FALSE AND batch_ref IS NULL
      ORDER BY inviter_registration_id ASC, round ASC
    `
  )
  return rows.map((r) => ({
    id: Number(r.id),
    inviterRegistrationId: Number(r.inviter_registration_id),
    round: Number(r.round),
    amountQau: Number(r.amount),
    status: "pending" as const,
    revoked: Boolean(r.revoked),
    batchRef: r.batch_ref ?? null,
  }))
}

export interface GenerateBonusBatchOptions {
  /** Injectable S9 corroboration (ops re-scan tooling / test mocks). */
  transferRelated?: TransferRelationProvider
  /** Injection point for deterministic tests; defaults to now(). */
  now?: Date
  /** Test seam: skip the track-A re-scan (covered separately). */
  skipScan?: boolean
}

export type GenerateBonusBatchResult =
  | {
      ok: true
      batchRef: string
      rows: {
        inviterRegistrationId: number
        walletAddress: string
        amountQau: number
        memo: string
      }[]
      totalAmountQau: number
      poolRemainingAfterQau: number
      trackAHits: { inviterRegistrationId: number; hit: ClusterHit }[]
      voidedRecords: number
      weeklyHits: WeeklyHitCounts
    }
  | {
      ok: false
      code: BatchRefusalCode
      poolRemainingQau?: number
      requiredQau?: number
    }

/**
 * Generate one whole bonus-invite batch (plan §3.1: 复扫挂批次生成前).
 *
 *   1. feature gate → refuse
 *   2. track-A re-scan of every approved cluster → cluster hits void that
 *      cluster's PENDING bonus records automatically ("规则即判"); main
 *      payouts and the registration state machine are untouched
 *   3. kill-switch (manual flag + week-over-week criterion) → refuse
 *   4. build the whole batch; pool below total → refuse ENTIRE batch
 *   5. stamp batch_ref onto the payable records and hand the CSV rows back
 */
export async function generateInviteBonusBatch(
  cfg: InviteBonusConfig = getInviteBonusConfig(),
  options: GenerateBonusBatchOptions = {}
): Promise<GenerateBonusBatchResult> {
  const now = options.now ?? new Date()
  if (!cfg.enabled) {
    return { ok: false, code: "invite_bonus_disabled" }
  }

  let trackAHits: { inviterRegistrationId: number; hit: ClusterHit }[] = []
  let voidedRecords = 0
  if (!options.skipScan) {
    const scan = await rescanClustersTrackA(options.transferRelated)
    trackAHits = scan.hits
    for (const [inviterId, hits] of scan.hitsByInviter) {
      if (hits.length === 0) continue
      const reason = `trackA: ${hits.map((h) => `${h.rule}:${h.key}`).join(", ")}`
      voidedRecords += await voidPendingBonusesForInviter(inviterId, reason)
    }
  }

  const weeklyHits = await weeklyClusterHitCounts(now)
  const poolRemainingQau = await getBonusPoolRemainingQau(cfg)
  const eligible = await listPayableBonusRecords()
  const built = buildBonusBatch({
    eligible,
    poolRemainingQau,
    cfg,
    lastWeekClusterHits: weeklyHits.lastWeek,
    currentWeekClusterHits: weeklyHits.currentWeek,
    now,
    batchRef: newBatchRef(now),
  })
  if (!built.ok) {
    return {
      ok: false,
      code: built.code,
      poolRemainingQau: built.poolRemainingQau,
      requiredQau: built.requiredQau,
    }
  }

  // Stamp the batch reference onto exactly the rows included in the batch,
  // in one statement — the guards make a record join at most one batch.
  const payableIds = eligible
    .filter((r) => r.status === "pending" && !r.revoked)
    .map((r) => r.id)
  const inviterIds = built.rows.map((r) => r.inviterRegistrationId)
  const memberFacts = await loadMemberFacts(inviterIds)
  const rows = built.rows.map((r) => ({
    inviterRegistrationId: r.inviterRegistrationId,
    walletAddress:
      memberFacts.get(r.inviterRegistrationId)?.walletAddress ?? "",
    amountQau: r.amountQau,
    memo: r.memo,
  }))
  if (payableIds.length > 0) {
    await sql`
      UPDATE airdrop_invite_bonuses
      SET batch_ref = ${built.batchRef}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ANY(${payableIds}) AND status = 'pending' AND revoked = FALSE AND batch_ref IS NULL
    `
  }

  return {
    ok: true,
    batchRef: built.batchRef,
    rows,
    totalAmountQau: built.totalAmountQau,
    poolRemainingAfterQau: built.poolRemainingAfterQau,
    trackAHits,
    voidedRecords,
    weeklyHits,
  }
}

// ---------------------------------------------------------------------------
// Track A re-scan (also used by the weekly cluster report)
// ---------------------------------------------------------------------------

export interface TrackARescanResult {
  /** Flat hit list with the owning inviter, for the audit trail. */
  hits: { inviterRegistrationId: number; hit: ClusterHit }[]
  hitsByInviter: Map<number, ClusterHit[]>
  /** Per-cluster downstream facts, mirrored into the report endpoint. */
  clusters: {
    inviterRegistrationId: number
    members: {
      registrationId: number
      ipPrefix24: string | null
      emailDomain: string
      addressPrefix: string
      approved: boolean
    }[]
  }[]
}

/**
 * Re-scan every approved invitation cluster on track A (S1/S7/S9). Scans
 * ALL downstreams of an inviter regardless of approval status — 下游之间
 * 互聚 covers pending members too; only bonus counting cares about approval.
 */
export async function rescanClustersTrackA(
  transferRelated: TransferRelationProvider = noTransferRelation
): Promise<TrackARescanResult> {
  await initInviteTables()
  const relations = await loadApprovedRelationFacts()
  const inviteeIds = [
    ...new Set(relations.map((r) => r.invitee_registration_id)),
  ]
  const inviterIds = [
    ...new Set(relations.map((r) => r.inviter_registration_id)),
  ]
  const facts = await loadMemberFacts([...inviteeIds, ...inviterIds])

  const byInviter = new Map<number, number[]>()
  for (const rel of relations) {
    const inviterId = rel.inviter_registration_id
    const list = byInviter.get(inviterId) ?? []
    list.push(rel.invitee_registration_id)
    byInviter.set(inviterId, list)
  }

  const hits: { inviterRegistrationId: number; hit: ClusterHit }[] = []
  const hitsByInviter = new Map<number, ClusterHit[]>()
  const clusters: TrackARescanResult["clusters"] = []

  for (const [inviterId, memberIds] of byInviter) {
    const members = memberIds
      .map((id) => facts.get(id))
      .filter((f): f is MemberFact => Boolean(f))
    clusters.push({
      inviterRegistrationId: inviterId,
      members: members.map((f) => ({
        registrationId: f.id,
        ipPrefix24: f.ipPrefix24,
        emailDomain: f.emailDomain,
        addressPrefix: f.addressPrefix,
        approved: f.approved,
      })),
    })
    // The inviter's own address is the S9 corroboration anchor only.
    const anchor = facts.get(inviterId)?.walletAddress
    const clusterHits = await scanClusterTrackA(members.map(toClusterMember), {
      addressByRegistrationId: new Map(
        members.map((f) => [f.id, f.walletAddress] as const)
      ),
      anchorAddresses: anchor ? [anchor] : [],
      transferRelated,
    })
    hitsByInviter.set(inviterId, clusterHits)
    for (const hit of clusterHits) {
      hits.push({ inviterRegistrationId: inviterId, hit })
    }
  }

  return { hits, hitsByInviter, clusters }
}

// ---------------------------------------------------------------------------
// Track B candidates (full-network S1 recompute ∩ cluster members)
// ---------------------------------------------------------------------------

export interface TrackBCandidateRow {
  rule: "S1"
  key: string
  registrationIds: number[]
}

/**
 * Full-network S1 recompute (防护 v2 GROUP BY semantics: every subnet holding
 * ≥ 3 non-rejected registrations), intersected with invitation-cluster
 * membership (any inviter or invitee id). Pure listing — the dry-run review
 * confirms evidence before the confirm endpoint voids anything.
 */
export async function listTrackBCandidates(): Promise<{
  candidates: TrackBCandidateRow[]
  clusterMemberIds: number[]
}> {
  await initInviteTables()
  const relations = rowsOf<{
    inviter_registration_id: number
    invitee_registration_id: number
  }>(
    await sql`
      SELECT inviter_registration_id, invitee_registration_id
      FROM airdrop_invite_relations
    `
  )
  const clusterMemberIds = [
    ...new Set(
      relations.flatMap((r) => [
        Number(r.inviter_registration_id),
        Number(r.invitee_registration_id),
      ])
    ),
  ]
  const groups = rowsOf<{ key: string; ids: number[] }>(
    await sql`
      SELECT ip_prefix24 AS key, ARRAY_AGG(id) AS ids
      FROM airdrop_registrations
      WHERE ip_prefix24 IS NOT NULL AND status <> 'rejected'
      GROUP BY ip_prefix24
      HAVING COUNT(*) >= 3
    `
  )
  const memberSet = new Set(clusterMemberIds)
  const candidates: TrackBCandidateRow[] = groups
    .map((g) => ({
      rule: "S1" as const,
      key: String(g.key),
      registrationIds: (g.ids ?? []).map(Number),
    }))
    .filter((g) => g.registrationIds.some((id) => memberSet.has(id)))
  return { candidates, clusterMemberIds }
}

// ---------------------------------------------------------------------------
// Reporting / summaries
// ---------------------------------------------------------------------------

export interface ClusterReportRow {
  inviterRegistrationId: number
  downstreamTotal: number
  downstreamApproved: number
  members: {
    registrationId: number
    ipPrefix24: string | null
    emailDomain: string
    addressPrefix: string
    approved: boolean
    approvedAt: string | null
  }[]
  bonuses: {
    pendingCount: number
    paidCount: number
    voidCount: number
    revokedCount: number
    paidTotalQau: number
  }
}

/**
 * Weekly cluster report data (plan §3.1: 同邀请人下游的双轨聚合一览, consumed
 * by the ops re-scan script). Facts only — the ops tooling applies its own
 * thresholds. Email is exposed as domain ONLY (privacy red line).
 */
export async function getClusterReport(): Promise<ClusterReportRow[]> {
  await initInviteTables()
  const relations = rowsOf<{
    inviter_registration_id: number
    invitee_registration_id: number
    status: string
    approved_at: Date | null
  }>(
    await sql`
      SELECT inviter_registration_id, invitee_registration_id, status, approved_at
      FROM airdrop_invite_relations
      ORDER BY inviter_registration_id ASC, invitee_registration_id ASC
    `
  )
  if (relations.length === 0) return []

  const ids = [
    ...new Set(
      relations.flatMap((r) => [
        Number(r.inviter_registration_id),
        Number(r.invitee_registration_id),
      ])
    ),
  ]
  const facts = await loadMemberFacts(ids)

  const bonusRows = rowsOf<{
    inviter_registration_id: number
    pending_count: number
    paid_count: number
    void_count: number
    revoked_count: number
    paid_total: string | number | null
  }>(
    await sql`
      SELECT inviter_registration_id,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_count,
        COUNT(*) FILTER (WHERE status = 'paid')::int AS paid_count,
        COUNT(*) FILTER (WHERE status = 'void')::int AS void_count,
        COUNT(*) FILTER (WHERE revoked)::int AS revoked_count,
        COALESCE(SUM(amount) FILTER (WHERE status = 'paid'), 0) AS paid_total
      FROM airdrop_invite_bonuses
      GROUP BY inviter_registration_id
    `
  )
  const bonusByInviter = new Map(
    bonusRows.map((b) => [
      Number(b.inviter_registration_id),
      {
        pendingCount: Number(b.pending_count),
        paidCount: Number(b.paid_count),
        voidCount: Number(b.void_count),
        revokedCount: Number(b.revoked_count),
        paidTotalQau: Number(b.paid_total ?? 0),
      } as ClusterReportRow["bonuses"],
    ])
  )

  const report = new Map<number, ClusterReportRow>()
  for (const rel of relations) {
    const inviterId = Number(rel.inviter_registration_id)
    const inviteeId = Number(rel.invitee_registration_id)
    const fact = facts.get(inviteeId)
    let row = report.get(inviterId)
    if (!row) {
      row = {
        inviterRegistrationId: inviterId,
        downstreamTotal: 0,
        downstreamApproved: 0,
        members: [],
        bonuses: bonusByInviter.get(inviterId) ?? {
          pendingCount: 0,
          paidCount: 0,
          voidCount: 0,
          revokedCount: 0,
          paidTotalQau: 0,
        },
      }
      report.set(inviterId, row)
    }
    row.downstreamTotal++
    if (rel.status === "approved") row.downstreamApproved++
    row.members.push({
      registrationId: inviteeId,
      ipPrefix24: fact?.ipPrefix24 ?? null,
      emailDomain: fact?.emailDomain ?? "",
      addressPrefix: fact?.addressPrefix ?? "",
      approved: rel.status === "approved",
      approvedAt: rel.approved_at
        ? new Date(rel.approved_at).toISOString()
        : null,
    })
  }
  return [...report.values()]
}

/**
 * Per-user invite summary for the session endpoint: the user's own invite
 * code (exists only after approval) plus what their invitees earned them.
 * The invite_code column is read here directly — the shared registration
 * SELECT lists in database.ts stay untouched (surgical scope).
 */
export async function getInviteSummaryForRegistration(
  registrationId: number,
  sybilStatus: string
): Promise<{
  inviteCode: string | null
  approvedInviteeCount: number
  bonus: { pendingQau: number; paidQau: number; voidQau: number }
} | null> {
  await initInviteTables()
  if (sybilStatus !== "approved") return null
  const codeRows = rowsOf<{ invite_code: string | null }>(
    await sql`
      SELECT invite_code FROM airdrop_registrations WHERE id = ${registrationId} LIMIT 1
    `
  )
  let inviteCode = codeRows[0]?.invite_code ?? null
  if (!inviteCode) {
    inviteCode = await ensureInviteCode(registrationId)
  }
  const inviteeCount = rowsOf<{ n: number }>(
    await sql`
      SELECT COUNT(*)::int AS n FROM airdrop_invite_relations
      WHERE inviter_registration_id = ${registrationId} AND status = 'approved'
    `
  )
  const bonusRows = rowsOf<{
    pending_qau: string | number | null
    paid_qau: string | number | null
    void_qau: string | number | null
  }>(
    await sql`
      SELECT
        COALESCE(SUM(amount) FILTER (WHERE status = 'pending' AND NOT revoked), 0) AS pending_qau,
        COALESCE(SUM(amount) FILTER (WHERE status = 'paid'), 0) AS paid_qau,
        COALESCE(SUM(amount) FILTER (WHERE status = 'void'), 0) AS void_qau
      FROM airdrop_invite_bonuses
      WHERE inviter_registration_id = ${registrationId}
    `
  )
  return {
    inviteCode,
    approvedInviteeCount: Number(inviteeCount[0]?.n ?? 0),
    bonus: {
      pendingQau: Number(bonusRows[0]?.pending_qau ?? 0),
      paidQau: Number(bonusRows[0]?.paid_qau ?? 0),
      voidQau: Number(bonusRows[0]?.void_qau ?? 0),
    },
  }
}

/** Independent bonus ledger reconciliation (plan §5: 池期初−期末=Σ加成批次). */
export async function getBonusPoolReconciliation(cfg: InviteBonusConfig) {
  const remaining = await getBonusPoolRemainingQau(cfg)
  const paidRows = rowsOf<{ total: string | number | null; n: number }>(
    await sql`
      SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*)::int AS n
      FROM airdrop_invite_bonuses WHERE status = 'paid'
    `
  )
  const paidTotalQau = Number(paidRows[0]?.total ?? 0)
  return {
    ...reconcileBonusPool(cfg.poolQau, paidTotalQau),
    paidRecords: Number(paidRows[0]?.n ?? 0),
    computedRemainingQau: remaining,
  }
}
