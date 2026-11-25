/**
 * Payout state-machine transitions (audit H-04) — DB integration tier.
 *
 * Runs against the LOCAL development Postgres only (host-guarded: the suite
 * skips on CI or any non-local DATABASE_URL, fail-closed). Proves what pure
 * functions cannot: the conditional-UPDATE predicates — a broadcast row can
 * never be released straight back to the idle queue, an uncertain outcome
 * parks as 'unknown' with tx hash/nonce preserved, and only reconciled
 * resolutions move it on.
 */

import { Pool } from "pg"
import { expect, test } from "@playwright/test"

import {
  findAirdropById,
  initAirdropTables,
  listApprovedRegistrations,
  listStuckPayouts,
  markAirdropConfirming,
  markAirdropPaidById,
  parkAirdropPayoutUnknown,
  recordAirdropIntent,
  releaseAirdropReservation,
  releaseUnknownAirdropPayout,
  reserveAirdropRegistration,
  rowsOf,
  sql,
} from "@/lib/airdrop/database"

test.describe.configure({ mode: "serial" })

const DATABASE_URL = process.env.DATABASE_URL || ""
// Fail-closed: never run integration DDL against a hosted database.
const LOCAL_DB =
  /\/\/(?:[^/@]+@)?(localhost|127\.0\.0\.1|\[::1\]|::1)[:/]/.test(
    DATABASE_URL
  ) && DATABASE_URL.length > 0

const RUN = Date.now().toString(16)
const USER_PREFIX = `ptest-${RUN}-`
const TX_HASH = `0x${"ab".repeat(32)}`
const TX_HASH_2 = `0x${"cd".repeat(32)}`

let pool: Pool | null = null
const registrationIds: number[] = []
let ready = false

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

test.beforeAll(async () => {
  ready = await dbUp()
  if (!ready) return
  await initAirdropTables()
})

test.afterAll(async () => {
  if (ready) {
    const ids = registrationIds.join(",") || "0"
    await pool?.query(`DELETE FROM airdrop_registrations WHERE id IN (${ids})`)
  }
  await pool?.end()
})

function skipIfNoDb(): void {
  test.skip(
    !ready,
    "local Postgres unavailable (CI path) — integration proof runs in the dev dry-run"
  )
}

let seedCounter = 0

/** Insert one approved, queue-eligible registration row directly. */
async function seedApproved(label: string): Promise<number> {
  const userId = `${USER_PREFIX}${label}`
  const suffix = String(++seedCounter).padStart(4, "0")
  const wallet = `0x${(suffix + RUN).padEnd(40, "4").slice(0, 40)}`
  const rows = rowsOf<{ id: number }>(
    await sql`
      INSERT INTO airdrop_registrations
        (user_id, email, wallet_address, ip_address, status, sybil_status)
      VALUES (${userId}, ${userId + "@gmail.com"}, ${wallet}, '203.0.113.7', 'pending', 'approved')
      RETURNING id
    `
  )
  const id = Number(rows[0].id)
  registrationIds.push(id)
  return id
}

async function stateOf(id: number): Promise<string | undefined> {
  return (await findAirdropById(id))?.payout_state
}

test.describe("H-04: payout state machine (DB)", () => {
  test("reserved failure releases to idle and the row is re-reservable", async () => {
    skipIfNoDb()
    const id = await seedApproved("rel")
    expect(await reserveAirdropRegistration(id)).not.toBeNull()
    expect(
      await releaseAirdropReservation(id, "insufficient funds", 30, 5)
    ).toBe(true)
    const row = await findAirdropById(id)
    expect(row?.payout_state).toBe("idle")
    expect(row?.payout_error).toBe("insufficient funds")
    expect(row?.payout_next_attempt_at).not.toBeNull()
    // The queue withholds the row until the backoff passes, but a direct
    // reserve (distributor path) can re-claim it.
    expect(await reserveAirdropRegistration(id)).not.toBeNull()
  })

  test("broadcast failure parks as unknown — never straight back to idle", async () => {
    skipIfNoDb()
    const id = await seedApproved("park")
    expect(await reserveAirdropRegistration(id)).not.toBeNull()
    expect(await recordAirdropIntent(id, TX_HASH, 7)).toBe(true)
    // The old behavior released broadcast rows straight to idle — now
    // forbidden: the transaction may already be on chain.
    expect(await releaseAirdropReservation(id, "timeout", 30, 5)).toBe(false)
    expect(await stateOf(id)).toBe("broadcast")
    expect(await parkAirdropPayoutUnknown(id, "broadcast timeout")).toBe(true)
    const row = await findAirdropById(id)
    expect(row?.payout_state).toBe("unknown")
    expect(row?.tx_hash).toBe(TX_HASH) // kept for tx-hash/nonce reconciliation
    expect(Number(row?.payout_nonce)).toBe(7) // BIGINT comes back as string
    expect(row?.payout_error).toBe("broadcast timeout")
    // Unknown is not queue-eligible and not re-reservable.
    expect(await reserveAirdropRegistration(id)).toBeNull()
    expect(
      (await listApprovedRegistrations(500)).find((r) => r.id === id)
    ).toBeUndefined()
    // ...but it does show up on the reconciliation listing.
    expect((await listStuckPayouts(500)).find((r) => r.id === id)).toBeDefined()
  })

  test("confirming is reachable only from broadcast, and parks the same way", async () => {
    skipIfNoDb()
    const id = await seedApproved("conf")
    expect(await markAirdropConfirming(id)).toBe(false) // idle → refused
    expect(await reserveAirdropRegistration(id)).not.toBeNull()
    expect(await markAirdropConfirming(id)).toBe(false) // reserved → refused
    expect(await recordAirdropIntent(id, TX_HASH_2, 8)).toBe(true)
    expect(await markAirdropConfirming(id)).toBe(true)
    expect(await stateOf(id)).toBe("confirming")
    expect(await parkAirdropPayoutUnknown(id, "receipt unknown")).toBe(true)
    expect(await stateOf(id)).toBe("unknown")
  })

  test("reconcile: paid settles an unknown row; idle re-queues a proven miss", async () => {
    skipIfNoDb()
    const paidId = await seedApproved("rec-paid")
    await reserveAirdropRegistration(paidId)
    await recordAirdropIntent(paidId, TX_HASH, 9)
    await parkAirdropPayoutUnknown(paidId, "unknown outcome")
    expect(await markAirdropPaidById(paidId, TX_HASH)).toBe(true)
    expect((await findAirdropById(paidId))?.status).toBe("paid")

    const idleId = await seedApproved("rec-idle")
    await reserveAirdropRegistration(idleId)
    await recordAirdropIntent(idleId, TX_HASH, 10)
    await parkAirdropPayoutUnknown(idleId, "unknown outcome")
    expect(
      await releaseUnknownAirdropPayout(idleId, "not on chain", 30, 5)
    ).toBe(true)
    expect(await stateOf(idleId)).toBe("idle")
    expect(await reserveAirdropRegistration(idleId)).not.toBeNull()
    // From 'reserved' the unknown-release path is refused again (state
    // predicate): only reconciled unknown rows take it.
    expect(await releaseUnknownAirdropPayout(idleId, "again", 30, 5)).toBe(
      false
    )
  })

  test("a reserved row that exhausts its attempts is rejected, not retried", async () => {
    skipIfNoDb()
    const id = await seedApproved("maxatt")
    for (let i = 0; i < 5; i++) {
      expect(await reserveAirdropRegistration(id)).not.toBeNull()
      expect(await releaseAirdropReservation(id, "fail", 30, 5)).toBe(true)
    }
    expect((await findAirdropById(id))?.status).toBe("rejected")
    expect(await reserveAirdropRegistration(id)).toBeNull()
  })
})
