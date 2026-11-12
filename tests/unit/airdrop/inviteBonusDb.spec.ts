/**
 * Invite-bonus acceptance assertions (plan §7.1) — DB integration tier.
 *
 * Runs against the LOCAL development Postgres only (host-guarded: the suite
 * skips on CI or any non-local DATABASE_URL, fail-closed). Proves what pure
 * functions cannot: the actual UNIQUE constraints, the approval hook against
 * real rows, void/revoke/mark-paid persistence, the batch pre-step wiring,
 * and that the registration state machine + main-payout queue stay untouched
 * by the bonus layer.
 *
 * Tests are SERIAL and each one cleans up the bonus rows it leaves behind,
 * so later batch-generation tests see an empty payable slate.
 */

import { Pool } from "pg"
import { expect, test } from "@playwright/test"

import {
  getInviteBonusConfig,
  type InviteBonusConfig,
} from "@/lib/airdrop/airdropConfig"
import {
  findAirdropByUserId,
  initAirdropTables,
  listApprovedRegistrations,
  rowsOf,
  sql,
} from "@/lib/airdrop/database"
import {
  createInviteRelation,
  ensureInviteCode,
  findApprovedInviterByInviteCode,
  generateInviteBonusBatch,
  getBonusPoolReconciliation,
  getClusterReport,
  initInviteTables,
  isKnownInviter,
  listTrackBCandidates,
  markBonusBatchPaid,
  recordInviteApprovalSideEffects,
  revokeBonusRecord,
  voidPendingBonusesForInviter,
  weeklyClusterHitCounts,
} from "@/lib/airdrop/inviteStore"

test.describe.configure({ mode: "serial" })

const DATABASE_URL = process.env.DATABASE_URL || ""
// Fail-closed: never run integration DDL against a hosted database. The
// host check tolerates a user-info segment (user:pass@host) in the URL.
const LOCAL_DB =
  /\/\/(?:[^/@]+@)?(localhost|127\.0\.0\.1|\[::1\]|::1)[:/]/.test(
    DATABASE_URL
  ) && DATABASE_URL.length > 0

const RUN = Date.now().toString(16)
const USER_PREFIX = `itest-inv-${RUN}-`

let pool: Pool | null = null
const registrationIds: number[] = []

async function dbUp(): Promise<boolean> {
  if (!LOCAL_DB) return false
  try {
    pool = new Pool({ connectionString: DATABASE_URL })
    await pool.query("SELECT 1")
    return true
  } catch {
    return false
  }
}

let ready = false

test.beforeAll(async () => {
  ready = await dbUp()
  if (!ready) return
  await initAirdropTables()
  await initInviteTables()
})

test.afterAll(async () => {
  if (!ready) {
    await pool?.end()
    return
  }
  // Remove this run's rows (children reference registrations → order).
  const ids = registrationIds.join(",") || "0"
  await pool?.query(
    `DELETE FROM airdrop_invite_bonuses WHERE inviter_registration_id IN (${ids})`
  )
  await pool?.query(
    `DELETE FROM airdrop_invite_relations WHERE inviter_registration_id IN (${ids}) OR invitee_registration_id IN (${ids})`
  )
  await pool?.query(
    `DELETE FROM airdrop_registrations WHERE user_id LIKE '${USER_PREFIX}%'`
  )
  await pool?.end()
})

function skipIfNoDb(): void {
  test.skip(
    !ready,
    "local Postgres unavailable (CI path) — integration proof runs in the dev dry-run"
  )
}

interface SeedOptions {
  sybilStatus?: string
  ipPrefix24?: string | null
  /**
   * Email domain defaults to a whitelisted provider so clusters stay S7-silent
   * unless a test explicitly opts into a custom (non-whitelisted) domain.
   */
  emailDomain?: string
}

let seedCounter = 0

async function seedRegistration(
  label: string,
  opts: SeedOptions = {}
): Promise<number> {
  const userId = `${USER_PREFIX}${label}`
  const email = `${userId}@${opts.emailDomain ?? "gmail.com"}`
  // Unique per row by construction (suffix counter); hex alphabet with a
  // unique leading prefix (S9 grouping keys off the first 4 hex chars).
  const suffix = String(++seedCounter).padStart(4, "0")
  const wallet = `0x${(suffix + RUN).padEnd(40, "3").slice(0, 40)}`
  const rows = rowsOf<{ id: number }>(
    await sql`
      INSERT INTO airdrop_registrations
        (user_id, email, wallet_address, ip_address, ip_prefix24, status, sybil_status)
      VALUES (${userId}, ${email}, ${wallet},
              '203.0.113.9',
              ${opts.ipPrefix24 === undefined ? `198.18.${seedCounter % 256}.0/24` : opts.ipPrefix24},
              'pending', ${opts.sybilStatus ?? "pending"})
      RETURNING id
    `
  )
  const id = Number(rows[0].id)
  registrationIds.push(id)
  return id
}

async function link(inviterId: number, inviteeId: number): Promise<boolean> {
  return createInviteRelation(inviterId, inviteeId)
}

/** Approve `count` fresh invitees of `inviter` through the hook. */
async function approveInvitees(
  inviterId: number,
  count: number,
  label: string
): Promise<number[]> {
  const invitees: number[] = []
  for (let i = 0; i < count; i++) {
    const invitee = await seedRegistration(`${label}${i}`, {
      sybilStatus: "approved",
    })
    invitees.push(invitee)
    expect(await link(inviterId, invitee)).toBe(true)
    await recordInviteApprovalSideEffects(invitee)
  }
  return invitees
}

async function bonusRowsOf(inviterId: number) {
  return rowsOf<{
    id: number
    round: number
    status: string
    revoked: boolean
    void_reason: string | null
    batch_ref: string | null
    amount: string
  }>(
    await sql`
      SELECT id, round, status, revoked, void_reason, batch_ref, amount
      FROM airdrop_invite_bonuses
      WHERE inviter_registration_id = ${inviterId} ORDER BY round
    `
  )
}

/** End-of-test hygiene: revoke any pending bonus rows this test created. */
async function sweepPending(inviterId: number): Promise<void> {
  const rows = await bonusRowsOf(inviterId)
  for (const r of rows) {
    if (r.status === "pending" && !r.revoked) {
      await revokeBonusRecord(Number(r.id), "test hygiene sweep")
    }
  }
}

function testCfg(over: Partial<InviteBonusConfig>): InviteBonusConfig {
  return {
    ...getInviteBonusConfig({ AIRDROP_INVITE_BONUS_ENABLED: "1" }),
    ...over,
  }
}

// ---------------------------------------------------------------------------
// Assertion 2 — the UNIQUE constraint is the plan's one-inviter guarantee
// ---------------------------------------------------------------------------

test.describe("assertion 2: invitee uniqueness enforced by the database", () => {
  test("a second inviter for the same invitee is rejected (23505)", async () => {
    skipIfNoDb()
    const inviterA = await seedRegistration("uniq-a", {
      sybilStatus: "approved",
    })
    const inviterB = await seedRegistration("uniq-b", {
      sybilStatus: "approved",
    })
    const invitee = await seedRegistration("uniq-e")
    expect(await link(inviterA, invitee)).toBe(true)
    // Raw INSERT without ON CONFLICT: the constraint itself must refuse.
    await expect(
      sql`
        INSERT INTO airdrop_invite_relations
          (inviter_registration_id, invitee_registration_id)
        VALUES (${inviterB}, ${invitee})
      `
    ).rejects.toThrow(/airdrop_invite_relations_invitee_unique|duplicate key/i)
  })

  test("self-invite is rejected by the CHECK constraint", async () => {
    skipIfNoDb()
    const self = await seedRegistration("uniq-self")
    await expect(
      sql`
        INSERT INTO airdrop_invite_relations
          (inviter_registration_id, invitee_registration_id)
        VALUES (${self}, ${self})
      `
    ).rejects.toThrow(/no_self|check/i)
  })
})

// ---------------------------------------------------------------------------
// Assertion 4/5 — the approval hook: 3 approvals → round 1, duplicates inert
// ---------------------------------------------------------------------------

test.describe("assertion 4/5: approval hook counts distinct approvals and back-fills rounds", () => {
  test("nine distinct approvals earn exactly two capped rounds; double-approve is inert", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("hook-inv", {
      sybilStatus: "approved",
    })

    const createdRoundByApproval: Record<number, number[]> = {
      3: [1],
      6: [2],
    }
    for (let i = 0; i < 9; i++) {
      const invitee = await seedRegistration(`hook-e${i}`, {
        sybilStatus: "approved",
      })
      expect(await link(inviter, invitee)).toBe(true)
      const summary = await recordInviteApprovalSideEffects(invitee)
      expect(summary.relationApproved).toBe(true)
      expect(summary.inviterRegistrationId).toBe(inviter)
      expect(summary.bonusEligibleApprovals).toBe(i + 1)
      expect(summary.bonusRoundsCreated).toEqual(
        createdRoundByApproval[i + 1] ?? []
      )
      expect(summary.inviteCode).not.toBeNull() // approved ⇒ own code exists
    }

    const rounds = await bonusRowsOf(inviter)
    expect(rounds).toHaveLength(2) // capped at maxRounds even with 9 approvals
    expect(Number(rounds[0].amount)).toBe(30)
    expect(rounds.every((r) => r.status === "pending")).toBe(true)

    // Double approval of the same invitee cannot re-count: the relation is
    // already approved, the hook is a no-op, no third round appears.
    const firstInvitee = rowsOf<{ invitee_registration_id: number }>(
      await sql`
        SELECT invitee_registration_id FROM airdrop_invite_relations
        WHERE inviter_registration_id = ${inviter} ORDER BY id LIMIT 1
      `
    )
    const again = await recordInviteApprovalSideEffects(
      Number(firstInvitee[0].invitee_registration_id)
    )
    expect(again.relationApproved).toBe(false)
    expect(again.bonusRoundsCreated).toEqual([])
    expect(await bonusRowsOf(inviter)).toHaveLength(2)

    // Hygiene: leave no pending rows for later batch-generation tests.
    await sweepPending(inviter)
  })
})

// ---------------------------------------------------------------------------
// Assertion 1 — invite codes: approved-only, existence-checkable
// ---------------------------------------------------------------------------

test.describe("assertion 1 (code layer): codes exist only for approved registrations", () => {
  test("unapproved → no code; approved → stable code resolvable by lookup", async () => {
    skipIfNoDb()
    const pending = await seedRegistration("code-pending", {
      sybilStatus: "hold",
    })
    expect(await ensureInviteCode(pending)).toBeNull()

    const approved = await seedRegistration("code-approved", {
      sybilStatus: "approved",
    })
    const code = await ensureInviteCode(approved)
    if (!code) throw new Error("approved registration must get a code")
    expect(code).toMatch(/^[23456789abcdefghjkmnpqrstuvwxyz]{10}$/)
    expect(await ensureInviteCode(approved)).toBe(code) // idempotent
    expect(await findApprovedInviterByInviteCode(code)).toBe(approved)
    expect(await findApprovedInviterByInviteCode(code.toUpperCase())).toBe(
      approved
    )
    expect(await findApprovedInviterByInviteCode("zzzzzzzzzz")).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Assertion 6/9 — track-A hit voids pending rounds; state machine untouched
// ---------------------------------------------------------------------------

test.describe("assertion 6/9: track-A scan voids bonuses, never the state machine", () => {
  test("S1-hit cluster loses pending rounds; registrations and payout queue unchanged", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("trackA-inv", {
      sybilStatus: "approved",
    })
    // Three downstreams on the SAME /24 → track-A S1 fires ("规则即判").
    const farm: number[] = []
    for (let i = 0; i < 3; i++) {
      const invitee = await seedRegistration(`trackA-e${i}`, {
        sybilStatus: "approved",
        ipPrefix24: "198.51.100.0/24",
      })
      farm.push(invitee)
      await link(inviter, invitee)
      await recordInviteApprovalSideEffects(invitee)
    }
    // Three clean downstreams push the earned count to 6 → rounds 1 AND 2.
    for (let i = 0; i < 3; i++) {
      const clean = await seedRegistration(`trackA-clean${i}`, {
        sybilStatus: "approved",
      })
      await link(inviter, clean)
      await recordInviteApprovalSideEffects(clean)
    }
    expect(await bonusRowsOf(inviter)).toHaveLength(2)

    // A second, CLEAN inviter keeps the batch payable after the void — the
    // generation call must void the hit cluster AND still pay clean ones.
    const cleanInviter = await seedRegistration("trackA-pay", {
      sybilStatus: "approved",
    })
    await approveInvitees(cleanInviter, 3, "trackA-paye")

    const stateBefore = rowsOf<{
      id: number
      status: string
      sybil_status: string
    }>(
      await sql`
        SELECT id, status, sybil_status FROM airdrop_registrations
        WHERE id = ANY(${[inviter, ...farm]})
      `
    )
    const queueBefore = (await listApprovedRegistrations(500)).map(
      (r) => `${r.id}:${r.payout_state}`
    )

    // THE pre-step wiring (plan §3.1: 复扫挂加成批次生成前): one generation
    // call scans every cluster first and voids the hit cluster's pendings.
    const result = await generateInviteBonusBatch(testCfg({}), {
      now: new Date(),
    })
    if (!result.ok) throw new Error(`batch refused: ${result.code}`)
    expect(
      result.trackAHits.some(
        (h) => h.inviterRegistrationId === inviter && h.hit.rule === "S1"
      )
    ).toBe(true)
    expect(result.voidedRecords).toBe(2)
    // The hit cluster's rows can never ride the batch that voided them;
    // the clean inviter's round still gets paid from the same batch.
    expect(
      result.rows.find((r) => r.inviterRegistrationId === inviter)
    ).toBeUndefined()
    expect(
      result.rows.find((r) => r.inviterRegistrationId === cleanInviter)
    ).toBeDefined()

    const bonusRows = await bonusRowsOf(inviter)
    expect(bonusRows.every((r) => r.status === "void")).toBe(true)
    expect(
      bonusRows.every((r) => (r.void_reason ?? "").startsWith("trackA:"))
    ).toBe(true)

    // 状态机零改动: every touched registration kept its approval state.
    const stateAfter = rowsOf<{
      id: number
      status: string
      sybil_status: string
    }>(
      await sql`
        SELECT id, status, sybil_status FROM airdrop_registrations
        WHERE id = ANY(${[inviter, ...farm]})
      `
    )
    expect(stateAfter).toEqual(stateBefore)
    // Main payout queue untouched by the voids.
    expect(
      (await listApprovedRegistrations(500)).map(
        (r) => `${r.id}:${r.payout_state}`
      )
    ).toEqual(queueBefore)

    // Weekly hit counts see the just-voided cluster (kill-switch input).
    const weekly = await weeklyClusterHitCounts(new Date())
    expect(weekly.currentWeek).toBeGreaterThanOrEqual(1)
  })
})

// ---------------------------------------------------------------------------
// Assertion 13/10/12 — revoke, pool breaker, batch marker at the store level
// ---------------------------------------------------------------------------

test.describe("assertion 13/10/12: revoke, pool breaker, batch stamping", () => {
  test("pending revoke works, paid revoke refuses, revoked rows never re-batch", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("revoke-inv", {
      sybilStatus: "approved",
    })
    await approveInvitees(inviter, 3, "revoke-e")
    const rows = await bonusRowsOf(inviter)
    expect(rows).toHaveLength(1)
    const bonusId = Number(rows[0].id)

    expect(await revokeBonusRecord(bonusId, "dry-run interception drill")).toBe(
      "revoked"
    )
    expect(await revokeBonusRecord(bonusId, "again")).toBe("not_pending")
    expect(await revokeBonusRecord(999999999, "x")).toBe("not_found")

    // Revoked row is excluded from any batch; nothing payable → no batch.
    const result = await generateInviteBonusBatch(testCfg({}), {
      skipScan: true,
      now: new Date(),
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe("no_pending_bonus")

    // Paid rows can never be revoked (发放后不追).
    const paidInviter = await seedRegistration("paid-inv", {
      sybilStatus: "approved",
    })
    await approveInvitees(paidInviter, 3, "paid-e")
    const paidRows = await bonusRowsOf(paidInviter)
    await sql`
      UPDATE airdrop_invite_bonuses SET status = 'paid', batch_ref = 'paid-drill'
      WHERE id = ${Number(paidRows[0].id)}
    `
    expect(await revokeBonusRecord(Number(paidRows[0].id), "too late")).toBe(
      "not_pending"
    )
    // Hygiene: revert the drill row to pending and revoke it, so no stray
    // paid row pollutes the pool-reconciliation assertions downstream.
    await sql`
      UPDATE airdrop_invite_bonuses SET status = 'pending', batch_ref = NULL
      WHERE id = ${Number(paidRows[0].id)}
    `
    await sweepPending(paidInviter)
  })

  test("pool below the batch total refuses the whole batch with no stamps", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("pool-inv", {
      sybilStatus: "approved",
    })
    await approveInvitees(inviter, 3, "pool-e")
    const result = await generateInviteBonusBatch(testCfg({ poolQau: 10 }), {
      skipScan: true,
      now: new Date(),
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.code).toBe("pool_insufficient")
      expect(result.poolRemainingQau).toBe(10)
      expect(result.requiredQau).toBe(30)
    }
    // 整批拒付: not a single row of THIS run got stamped into a batch
    // (scoped to the test's inviter — earlier tests may have stamped rows).
    const stamped = rowsOf<{ n: number }>(
      await sql`
        SELECT COUNT(*)::int AS n FROM airdrop_invite_bonuses
        WHERE batch_ref IS NOT NULL AND inviter_registration_id = ${inviter}
      `
    )
    expect(Number(stamped[0].n)).toBe(0)
    // Hygiene: leave nothing pending for the later batch test.
    await sweepPending(inviter)
  })

  test("kill-switch (manual flag) refuses the batch outright", async () => {
    skipIfNoDb()
    const result = await generateInviteBonusBatch(
      testCfg({ payoutPaused: true }),
      { skipScan: true, now: new Date() }
    )
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe("kill_switch_paused")
  })

  test("generated batch carries the bonus-invite marker and settles via mark-paid", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("batch-inv", {
      sybilStatus: "approved",
    })
    await approveInvitees(inviter, 6, "batch-e")
    const result = await generateInviteBonusBatch(testCfg({ poolQau: 1000 }), {
      skipScan: true,
      now: new Date(),
    })
    if (!result.ok) throw new Error(`batch refused: ${result.code}`)
    expect(result.rows).toHaveLength(1) // one inviter ⇒ one row per address
    expect(result.rows[0].walletAddress.startsWith("0x")).toBe(true)
    expect(result.rows[0].memo.startsWith("bonus-invite:")).toBe(true)
    expect(result.rows[0].amountQau).toBe(60) // rounds 1+2 aggregated

    const updated = await markBonusBatchPaid(
      result.batchRef,
      `0x${"ab".repeat(32)}`
    )
    expect(updated).toBe(2) // both rounds settled
    const rec = await getBonusPoolReconciliation(testCfg({ poolQau: 1000 }))
    expect(rec.paidTotalQau).toBe(60)
    expect(rec.remainingQau).toBe(940)
    expect(rec.computedRemainingQau).toBe(940)
  })
})

// ---------------------------------------------------------------------------
// Assertion 7 — track B: candidates + confirm path
// ---------------------------------------------------------------------------

test.describe("assertion 7: track-B candidates surface clusters from the network view", () => {
  test("subnet group containing cluster members is listed; confirm voids bonuses", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("trackB-inv", {
      sybilStatus: "approved",
    })
    // Three registrations share the subnet; two are cluster members.
    const memberA = await seedRegistration("trackB-ma", {
      sybilStatus: "approved",
      ipPrefix24: "192.0.2.0/24",
    })
    const memberB = await seedRegistration("trackB-mb", {
      sybilStatus: "approved",
      ipPrefix24: "192.0.2.0/24",
    })
    await seedRegistration("trackB-out", {
      sybilStatus: "approved",
      ipPrefix24: "192.0.2.0/24",
    })
    await link(inviter, memberA)
    await link(inviter, memberB)
    await recordInviteApprovalSideEffects(memberA)
    await recordInviteApprovalSideEffects(memberB)
    // Two more approvals → round 1+2 pending for the inviter.
    for (let i = 0; i < 4; i++) {
      const extra = await seedRegistration(`trackB-x${i}`, {
        sybilStatus: "approved",
      })
      await link(inviter, extra)
      await recordInviteApprovalSideEffects(extra)
    }
    expect(await bonusRowsOf(inviter)).toHaveLength(2)

    // Candidates come from the full-network recompute ∩ cluster membership.
    const { candidates } = await listTrackBCandidates()
    const hit = candidates.find((c) => c.key === "192.0.2.0/24")
    expect(hit).toBeDefined()
    expect(hit?.registrationIds).toContain(memberA)
    expect(hit?.registrationIds).toContain(memberB)

    // Dry-run review confirms the evidence → pending bonuses void.
    expect(await isKnownInviter(inviter)).toBe(true)
    const voided = await voidPendingBonusesForInviter(
      inviter,
      "trackB-confirmed: dry-run evidence (S1 network recompute)"
    )
    expect(voided).toBe(2)
    const after = await bonusRowsOf(inviter)
    expect(after.every((r) => r.status === "void")).toBe(true)
    expect(
      after.every((r) => (r.void_reason ?? "").startsWith("trackB-confirmed"))
    ).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Reporting + main-payout isolation
// ---------------------------------------------------------------------------

test.describe("report and main-payout isolation", () => {
  test("cluster report aggregates per inviter without exposing emails", async () => {
    skipIfNoDb()
    const report = await getClusterReport()
    const raw = JSON.stringify(report)
    expect(raw).not.toContain("@itest.local") // domain-level facts only
    expect(report.length).toBeGreaterThan(0)
    const row = report.find((r) =>
      r.members.some((m) => m.ipPrefix24 === "192.0.2.0/24")
    )
    expect(row).toBeDefined()
    expect(row?.downstreamTotal).toBeGreaterThanOrEqual(2)
    expect(row?.bonuses).toBeDefined()
  })

  test("bonus activity never touches the main payout queue", async () => {
    skipIfNoDb()
    const approvedInviter = await seedRegistration("queue-inv", {
      sybilStatus: "approved",
    })
    const before = await listApprovedRegistrations(500)
    const beforeState = new Map(before.map((r) => [r.id, r.payout_state]))
    expect(beforeState.has(approvedInviter)).toBe(true)

    // Full bonus lifecycle for a DIFFERENT inviter: batch + mark paid.
    const other = await seedRegistration("queue-bonus-inv", {
      sybilStatus: "approved",
    })
    await approveInvitees(other, 3, "queue-e")
    const result = await generateInviteBonusBatch(testCfg({ poolQau: 5000 }), {
      skipScan: true,
      now: new Date(),
    })
    if (!result.ok) throw new Error(`batch refused: ${result.code}`)
    await markBonusBatchPaid(result.batchRef, `0x${"cd".repeat(32)}`)

    // The queue keeps every pre-existing row in its exact payout state; the
    // bonus-paid inviter's registration row is still idle/pending/unpaid.
    const after = await listApprovedRegistrations(500)
    for (const row of after) {
      if (beforeState.has(row.id)) {
        expect(row.payout_state).toBe(beforeState.get(row.id))
      }
    }
    const inviterRow = await findAirdropByUserId(`${USER_PREFIX}queue-inv`)
    expect(inviterRow?.payout_state).toBe("idle")
    expect(inviterRow?.status).toBe("pending")
  })
})

// ---------------------------------------------------------------------------
// Assertion 14 — cutoff at the hook level
// ---------------------------------------------------------------------------

test.describe("assertion 14: post-cutoff approvals keep the relation but earn nothing", () => {
  test("approval inside a past cutoff window is relation-approved, bonus-ineligible", async () => {
    skipIfNoDb()
    const inviter = await seedRegistration("cutoff-inv", {
      sybilStatus: "approved",
    })
    const invitee = await seedRegistration("cutoff-e0", {
      sybilStatus: "approved",
    })
    await link(inviter, invitee)
    const pastCfg = testCfg({
      approvalCutoffAt: new Date("2020-01-01T00:00:00Z"),
    })
    const summary = await recordInviteApprovalSideEffects(invitee, pastCfg)
    expect(summary.relationApproved).toBe(true)
    expect(summary.bonusEligibleApprovals).toBeNull()
    expect(summary.bonusRoundsCreated).toEqual([])
    expect(await bonusRowsOf(inviter)).toHaveLength(0)
  })
})
