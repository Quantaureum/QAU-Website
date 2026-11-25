/**
 * Airdrop slot-cap concurrency (audit H-02) — DB integration tier.
 *
 * Runs against the LOCAL development Postgres only (host-guarded: the suite
 * skips on CI or any non-local DATABASE_URL, fail-closed). Proves that the
 * advisory-locked cap check + insert admits at most `maxSlots` non-rejected
 * registrations even when many registrations race concurrently.
 *
 * PRECONDITION (OBS-1): this spec lives in the single-worker unit-db
 * project — the cap is a whole-database count, so no other spec may insert
 * or DELETE registrations while the burst below is measuring it. The
 * refusing-insert case uses a cap that is provably reached (maxSlots below
 * the always-present row floor of this suite), which stays hermetic.
 */

import { Pool } from "pg"
import { expect, test } from "@playwright/test"

import {
  createAirdropRegistration,
  initAirdropTables,
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
const USER_PREFIX = `captest-${RUN}-`

let pool: Pool | null = null
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
    await pool?.query(
      `DELETE FROM airdrop_registrations WHERE user_id LIKE '${USER_PREFIX}%'`
    )
  }
  await pool?.end()
})

function skipIfNoDb(): void {
  test.skip(
    !ready,
    "local Postgres unavailable (CI path) — integration proof runs in the dev dry-run"
  )
}

async function nonRejectedCount(): Promise<number> {
  const rows = rowsOf<{ n: number }>(
    await sql`
      SELECT COUNT(*)::int AS n FROM airdrop_registrations WHERE status <> 'rejected'
    `
  )
  return Number(rows[0].n)
}

let seq = 0

function capRegistration(prefix: string, maxSlots: number) {
  const i = ++seq
  const suffix = String(i).padStart(4, "0")
  return createAirdropRegistration({
    userId: `${USER_PREFIX}${prefix}u${suffix}`,
    email: `${USER_PREFIX}${prefix}u${suffix}@gmail.com`,
    walletAddress: `0x${(suffix + RUN).padEnd(40, "5").slice(0, 40)}`,
    ipAddress: "203.0.113.5",
    ipPrefix24: "203.0.113.0/24",
    addressPrefix: "0000",
    amount: 50,
    status: "pending",
    xHandle: null,
    socialStatus: "skipped",
    maxSlots,
    sybilScore: 100,
    sybilStatus: "approved",
    sybilRules: "captest",
    holdSince: null,
  })
}

async function countMine(prefix: string): Promise<number> {
  const rows = rowsOf<{ n: number }>(
    await sql`
      SELECT COUNT(*)::int AS n FROM airdrop_registrations
      WHERE user_id LIKE ${USER_PREFIX + prefix + "%"}
    `
  )
  return Number(rows[0].n)
}

test.describe("H-02: registration slot cap under concurrency", () => {
  test("registrations succeed while the cap has room", async () => {
    skipIfNoDb()
    // Headroom of 100 can never be consumed by the other local specs within
    // this test's millisecond window, so the success assertion is stable.
    const before = await nonRejectedCount()
    const first = await capRegistration("ok-", before + 100)
    expect(first).not.toBeNull()
    const second = await capRegistration("ok-", before + 100)
    expect(second).not.toBeNull()
    expect(first?.id).not.toBe(second?.id)
  })

  test("a concurrent burst admits at most the free slot count", async () => {
    skipIfNoDb()
    // Whole-DB snapshot: valid only because the unit-db project runs with a
    // single worker (OBS-1) — a concurrent DELETE from another spec file
    // would shrink the count after this read and widen the cap window.
    const before = await nonRejectedCount()
    const freeSlots = 3
    const attempts = 12
    const results = await Promise.all(
      Array.from({ length: attempts }, () =>
        capRegistration("burst-", before + freeSlots)
      )
    )
    const accepted = results.filter(
      (r): r is NonNullable<typeof r> => r !== null
    )
    // THE property (H-02): never more accepted registrations than free slots.
    expect(accepted.length).toBeLessThanOrEqual(freeSlots)
    // Hermetic consistency: exactly the accepted rows persist under this
    // test's own prefix (no phantom rows, no lost rows).
    expect(await countMine("burst-")).toBe(accepted.length)
    const wallets = new Set(accepted.map((r) => r.wallet_address))
    expect(wallets.size).toBe(accepted.length)
  })

  test("an insert at a cap that is already reached is refused", async () => {
    skipIfNoDb()
    // This suite's own rows (previous tests) guarantee at least 3
    // non-rejected rows exist for the whole run, so maxSlots = 3 is always
    // already reached — independent of what the parallel specs do.
    expect(await capRegistration("full-", 3)).toBeNull()
    expect(await countMine("full-")).toBe(0)
  })
})
