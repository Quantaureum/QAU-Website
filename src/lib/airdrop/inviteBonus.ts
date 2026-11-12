/**
 * Invite-bonus flow logic — pure functions only.
 *
 * Plan 运营中心/11-病毒增长/B档裂变改造方案-v2.md §3.1/§4 (anti-sybil review
 * v4, PASS): the monetary bonus layer of the B-tier viral loop.
 *
 *   - one bonus round per `roundSize` approved invitees, capped at `maxRounds`
 *     (default: 30 QAU per 3 approvals, max 2 rounds = 60 QAU per user)
 *   - "下游恒不加成" (plan design rule 4): being invited NEVER feeds the
 *     invitee's own bonus accounting — the functions below only ever credit
 *     the inviter column, and the tests lock that
 *   - bonus payout is a separate batch type (`bonus-invite`), generated in
 *     one whole piece: kill-switch / pool circuit breaker refuse the ENTIRE
 *     batch, never a partial payout (plan §4.2/§4.3)
 *   - revocation is allowed any time BEFORE payout; voided (cluster-hit)
 *     rounds are terminal — a later clean re-scan restores eligibility for
 *     FUTURE rounds only and never resurrects a voided record (review v4 §2
 *     remark 1: 作废不复活)
 *
 * The DB layer (inviteStore.ts) composes these functions with SQL; keeping
 * the rules here is what makes the 14 acceptance assertions unit-testable.
 */

import {
  type InviteBonusConfig,
  isBonusPayoutPaused,
  maxBonusPerUserQau,
} from "./airdropConfig"

export type BonusRecordStatus = "pending" | "paid" | "void"

/** Minimal bonus-record shape the flow logic operates on (DB rows project to this). */
export interface BonusRecordLike {
  id: number
  inviterRegistrationId: number
  round: number
  amountQau: number
  status: BonusRecordStatus
  revoked: boolean
  batchRef: string | null
}

export type BatchRefusalCode =
  | "invite_bonus_disabled"
  | "kill_switch_paused"
  | "bonus_channel_closed"
  | "no_pending_bonus"
  | "pool_insufficient"

export type BonusBatchResult =
  | {
      ok: true
      batchRef: string
      rows: {
        inviterRegistrationId: number
        amountQau: number
        /** CSV memo: marks the row as the bonus-invite batch type. */
        memo: string
      }[]
      totalAmountQau: number
      poolRemainingAfterQau: number
    }
  | {
      ok: false
      code: BatchRefusalCode
      poolRemainingQau?: number
      requiredQau?: number
    }

/** Bonus batch type marker, written into every generated row's memo. */
export const BONUS_BATCH_TYPE = "bonus-invite"

/**
 * Approved downstreams beyond the bonus approval cutoff never count (plan
 * §8 N5: 12-09→12-15 re-evaluation approvals earn no bonus).
 * Pure. `cutoffAt === null` means no cutoff configured.
 */
export function isApprovalBonusEligible(
  approvedAt: Date | null,
  cutoffAt: Date | null
): boolean {
  if (!approvedAt) return false
  if (!cutoffAt) return true
  return approvedAt.getTime() <= cutoffAt.getTime()
}

/**
 * How many bonus rounds an inviter has EARNED with `approvedCount` eligible
 * approved downstreams: one round per `roundSize` approvals, capped at
 * `maxRounds` (per-user cap = maxRounds × per-round amount).
 */
export function computeEarnedRounds(
  approvedCount: number,
  cfg: Pick<InviteBonusConfig, "roundSize" | "maxRounds">
): number {
  if (approvedCount <= 0) return 0
  return Math.min(Math.floor(approvedCount / cfg.roundSize), cfg.maxRounds)
}

/**
 * Which rounds still need a bonus record: rounds 1..earned minus the ones
 * that already exist. A revoked or voided round still "exists" (its record
 * is terminal), so it is NOT re-created — revocation can never be replayed
 * into a second payout of the same round.
 */
export function roundsToCreate(
  existingRounds: number[],
  earnedRounds: number
): number[] {
  const have = new Set(existingRounds)
  const out: number[] = []
  for (let r = 1; r <= earnedRounds; r++) {
    if (!have.has(r)) out.push(r)
  }
  return out
}

/** Payable = not paid, not voided, not revoked. */
export function isBonusPayable(r: BonusRecordLike): boolean {
  return r.status === "pending" && !r.revoked
}

/**
 * Apply a cluster hit to ONE inviter's records (track A or confirmed track
 * B): every PENDING record is voided; paid records are never touched
 * ("发放后不追"), already-void records stay void (terminal). Downstream main
 * payouts and the registration state machine are outside this layer by
 * design — this function only sees bonus records.
 * Pure: returns the updated list plus how many rows flipped.
 */
export function applyClusterVoid(
  records: BonusRecordLike[],
  inviterRegistrationId: number
): { records: BonusRecordLike[]; voidedCount: number } {
  let voidedCount = 0
  const updated = records.map((r) => {
    if (
      r.inviterRegistrationId === inviterRegistrationId &&
      r.status === "pending"
    ) {
      voidedCount++
      return { ...r, status: "void" as BonusRecordStatus }
    }
    return r
  })
  return { records: updated, voidedCount }
}

export interface BuildBonusBatchInput {
  eligible: BonusRecordLike[]
  poolRemainingQau: number
  cfg: InviteBonusConfig
  /** Kill-switch inputs: distinct cluster-hit counts per ISO week. */
  lastWeekClusterHits: number
  currentWeekClusterHits: number
  now: Date
  /** Pre-generated opaque batch reference (store supplies uniqueness). */
  batchRef: string
}

/**
 * Build one whole bonus-invite batch from the payable records. Refuses the
 * ENTIRE batch (never a partial payout) when the kill-switch is engaged,
 * the settlement window has closed, there is nothing payable, or the bonus
 * pool cannot cover the total (plan §4.2: 池余额硬熔断整批拒付).
 * Pure.
 */
export function buildBonusBatch(input: BuildBonusBatchInput): BonusBatchResult {
  const { eligible, poolRemainingQau, cfg, batchRef, now } = input

  if (
    isBonusPayoutPaused(
      cfg,
      input.lastWeekClusterHits,
      input.currentWeekClusterHits
    )
  ) {
    return { ok: false, code: "kill_switch_paused" }
  }
  if (cfg.settleEndAt && now.getTime() > cfg.settleEndAt.getTime()) {
    return { ok: false, code: "bonus_channel_closed" }
  }
  if (eligible.length === 0) {
    return { ok: false, code: "no_pending_bonus" }
  }

  // Aggregate per inviter: one row per inviter (⇒ one row per payout address,
  // since a registration owns exactly one wallet) so the distributor's
  // per-batch duplicate-address check passes unchanged for bonus batches.
  const perInviter = new Map<number, number>()
  for (const r of eligible) {
    if (!isBonusPayable(r)) continue
    const next = (perInviter.get(r.inviterRegistrationId) ?? 0) + r.amountQau
    // Belt-and-braces cap (the round cap already bounds this at creation).
    perInviter.set(
      r.inviterRegistrationId,
      Math.min(next, maxBonusPerUserQau(cfg))
    )
  }

  let totalAmountQau = 0
  for (const amount of perInviter.values()) totalAmountQau += amount
  if (totalAmountQau <= 0) {
    return { ok: false, code: "no_pending_bonus" }
  }
  if (poolRemainingQau < totalAmountQau) {
    return {
      ok: false,
      code: "pool_insufficient",
      poolRemainingQau,
      requiredQau: totalAmountQau,
    }
  }

  const rows = [...perInviter.entries()].map(
    ([inviterRegistrationId, amountQau]) => ({
      inviterRegistrationId,
      amountQau,
      memo: `${BONUS_BATCH_TYPE}:${batchRef}`,
    })
  )

  return {
    ok: true,
    batchRef,
    rows,
    totalAmountQau,
    poolRemainingAfterQau: poolRemainingQau - totalAmountQau,
  }
}

/**
 * Reconciliation summary input for the independent bonus ledger check
 * (plan §5: 池期初 − 期末 = Σ加成批次, error < 0.01).
 */
export function reconcileBonusPool(
  poolQau: number,
  paidTotalQau: number
): { poolQau: number; paidTotalQau: number; remainingQau: number } {
  return {
    poolQau,
    paidTotalQau,
    remainingQau: poolQau - paidTotalQau,
  }
}

/**
 * Start of the ISO week (Monday 00:00 UTC) containing `date` — the week
 * boundary for the kill-switch weekly hit counting.
 * Pure.
 */
export function isoWeekStart(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )
  const day = d.getUTCDay() // 0 = Sunday
  const backToMonday = (day + 6) % 7
  return new Date(d.getTime() - backToMonday * 24 * 60 * 60 * 1000)
}
