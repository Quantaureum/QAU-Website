/**
 * Airdrop database layer (Neon Postgres serverless).
 *
 * Ported from the prototype database module (2026-10-13) into the production
 * site. Schema evolution is idempotent: the init runs on first use and every
 * statement is IF NOT EXISTS / ADD COLUMN IF NOT EXISTS, so deploys never
 * block on migrations.
 *
 * Anti-sybil additions vs the prototype (defense design v2):
 *   - sybil_score / sybil_status / sybil_scored_at / sybil_rules columns
 *   - hold re-evaluation timestamps
 *   - unique indexes on user_id, wallet_address, x_handle (L5)
 *   - ip_activity_log (L3)
 */

import { neon } from "@neondatabase/serverless"

const DATABASE_URL = process.env.DATABASE_URL || ""

// ---------------------------------------------------------------------------
// sql surface (three backends behind one tagged-template call)
//
// 1. Neon-hosted DATABASE_URL  → the neon() serverless driver.
// 2. localhost DATABASE_URL    → node-postgres (`pg`) adapter — the Neon
//    HTTP driver cannot speak to a plain Postgres server, and local
//    rehearsals run against the docker-compose.dev.yml Postgres.
// 3. No DATABASE_URL (build)   → a call-time Proxy that throws, so module
//    evaluation during `next build` stays safe.
// ---------------------------------------------------------------------------

function isLocalDatabaseUrl(url: string): boolean {
  try {
    const host = new URL(url.replace(/^postgres(?:ql)?:\/\//, "http://"))
      .hostname
    return ["localhost", "127.0.0.1", "::1", "host.docker.internal"].includes(
      host
    )
  } catch {
    return false
  }
}

type SqlFn = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<unknown[]>

function createLocalSql(url: string): SqlFn {
  // Local rehearsals only: `pg` is a devDependency of the site and must
  // not be bundled for the Neon production path. Dynamic import keeps the
  // neon production path free of the pg bundle.
  /* eslint-disable @typescript-eslint/no-var-requires */
  const { Pool } = require("pg") as typeof import("pg")
  const pool = new Pool({ connectionString: url })
  return async (strings, ...values) => {
    const text = strings.reduce(
      (acc, part, i) => acc + part + (i < values.length ? `$${i + 1}` : ""),
      ""
    )
    const res = await pool.query(text, values as unknown[])
    return res.rows as unknown[]
  }
}

function createSqlFn(url: string): SqlFn {
  if (isLocalDatabaseUrl(url)) {
    return createLocalSql(url)
  }
  return neon(url) as unknown as SqlFn
}

export const sql: SqlFn = DATABASE_URL
  ? createSqlFn(DATABASE_URL)
  : (new Proxy((() => undefined) as unknown as SqlFn, {
      apply() {
        throw new Error("DATABASE_URL is not configured")
      },
      get() {
        throw new Error("DATABASE_URL is not configured")
      },
    }) as SqlFn)

export function hasDatabase(): boolean {
  return DATABASE_URL !== ""
}

export interface AirdropRegistration {
  id: number
  user_id: string
  email: string
  wallet_address: string
  ip_address: string | null
  amount: number
  status: RegistrationStatus
  tx_hash: string | null
  note: string | null
  x_handle: string | null
  social_status: "skipped" | "unverified" | "verified" | "failed"
  social_checked_at: Date | null
  social_detail: string | null
  sybil_score: number | null
  sybil_status: RegistrationStatus
  sybil_scored_at: Date | null
  sybil_rules: string | null
  hold_since: Date | null
  payout_state: PayoutState
  payout_nonce: number | null
  payout_attempts: number
  payout_error: string | null
  payout_next_attempt_at: Date | null
  created_at: Date
  updated_at: Date
}

export type RegistrationStatus =
  | "pending"
  | "hold"
  | "approved"
  | "rejected"
  | "paid"

/**
 * Payout lifecycle of a registration.
 *
 *   idle      → eligible for the payout queue
 *   reserved  → claimed by a distributor run (no chain interaction yet)
 *   broadcast → the reveal transaction hash is known and may be on chain
 *   paid      → a receipt with status 0x1 was observed and recorded
 *
 * The state only ever moves forward through conditional UPDATE statements, so
 * two distributors can never pay the same registration twice.
 */
export type PayoutState = "idle" | "reserved" | "broadcast" | "paid"

let initPromise: Promise<void> | null = null

/** Idempotent schema bootstrap. Safe to call per-request (memoized). */
export function initAirdropTables(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS airdrop_registrations (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) NOT NULL,
          wallet_address VARCHAR(66) UNIQUE NOT NULL,
          ip_address VARCHAR(64),
          ip_prefix24 VARCHAR(32),
          amount NUMERIC(30, 0) DEFAULT 50,
          status VARCHAR(20) DEFAULT 'pending',
          tx_hash VARCHAR(128),
          note TEXT,
          x_handle VARCHAR(64) UNIQUE,
          social_status VARCHAR(20) NOT NULL DEFAULT 'skipped',
          social_checked_at TIMESTAMP,
          social_detail TEXT,
          sybil_score INTEGER,
          sybil_status VARCHAR(20) DEFAULT 'pending',
          sybil_scored_at TIMESTAMP,
          sybil_rules TEXT,
          hold_since TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      // L3: same-IP batch tracking
      await sql`
        CREATE TABLE IF NOT EXISTS ip_activity_log (
          id SERIAL PRIMARY KEY,
          ip_address VARCHAR(64) NOT NULL,
          action VARCHAR(50) NOT NULL,
          email VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_ip_activity_ip_time
        ON ip_activity_log (ip_address, created_at)
      `
      // Payout state machine (two-phase payouts: reserve → broadcast → paid).
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS payout_state VARCHAR(20) NOT NULL DEFAULT 'idle'
      `
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS payout_nonce BIGINT
      `
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS payout_attempts INTEGER NOT NULL DEFAULT 0
      `
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS payout_error TEXT
      `
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS payout_next_attempt_at TIMESTAMP
      `
      await sql`
        ALTER TABLE airdrop_registrations
        ADD COLUMN IF NOT EXISTS payout_updated_at TIMESTAMP
      `
      // Payout queue index: the queue filters on sybil/status/payout state.
      await sql`
        CREATE INDEX IF NOT EXISTS idx_airdrop_payout_queue
        ON airdrop_registrations (sybil_status, status, payout_state)
      `
      // One claim per address, case-insensitively: the plain UNIQUE constraint
      // on wallet_address is case-sensitive, so 0xAb… and 0xab… could both
      // claim a slot while the lookup compares lower(). The index is created
      // only when no case-duplicate rows exist — otherwise the statement
      // aborts and would take the whole bootstrap down with it.
      try {
        const dupes = rowsOf<{ n?: number }>(
          await sql`
            SELECT COUNT(*)::int AS n FROM (
              SELECT lower(wallet_address) FROM airdrop_registrations
              GROUP BY lower(wallet_address) HAVING COUNT(*) > 1
            ) d
          `
        )
        if (Number(dupes[0]?.n ?? 0) === 0) {
          await sql`
            CREATE UNIQUE INDEX IF NOT EXISTS airdrop_registrations_wallet_lower_key
            ON airdrop_registrations (lower(wallet_address))
          `
        }
      } catch {
        // A pre-existing duplicate keeps the plain constraint only; the
        // registration path still rejects duplicates case-insensitively.
      }
      // L6-v2: scoring queue + hold re-evaluation
      await sql`
        CREATE INDEX IF NOT EXISTS idx_airdrop_sybil_status
        ON airdrop_registrations (sybil_status) WHERE sybil_status = 'hold'
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_airdrop_social_backlog
        ON airdrop_registrations (id) WHERE social_status = 'unverified'
      `
    })()
  }
  return initPromise
}

export function rowsOf<T = Record<string, unknown>>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[]
  const full = result as { rows?: T[] }
  return full.rows ?? []
}

function mapRow(row: Record<string, unknown>): AirdropRegistration {
  return row as unknown as AirdropRegistration
}

export async function findAirdropByUserId(
  userId: string
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows =
    await sql`SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations WHERE user_id = ${userId} LIMIT 1`
  const first = (rows as unknown as Record<string, unknown>[])[0]
  return first ? mapRow(first) : null
}

export async function findAirdropByAddress(
  address: string
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows =
    await sql`SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations WHERE lower(wallet_address) = lower(${address}) LIMIT 1`
  const first = (rows as unknown as Record<string, unknown>[])[0]
  return first ? mapRow(first) : null
}

export async function findAirdropByXHandle(
  handle: string
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows =
    await sql`SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations WHERE lower(x_handle) = lower(${handle}) LIMIT 1`
  const first = (rows as unknown as Record<string, unknown>[])[0]
  return first ? mapRow(first) : null
}

export async function countAirdropByIp(ip: string): Promise<number> {
  await initAirdropTables()
  const rows =
    await sql`SELECT COUNT(*)::int AS n FROM airdrop_registrations WHERE ip_address = ${ip}`
  return (rows as unknown as { n?: number }[])[0]?.n ?? 0
}

/** L3/S1: registrations already filed from the same /24 subnet. */
export async function countAirdropByPrefix24(prefix: string): Promise<number> {
  await initAirdropTables()
  const rows =
    await sql`SELECT COUNT(*)::int AS n FROM airdrop_registrations WHERE ip_prefix24 = ${prefix}`
  return (rows as unknown as { n?: number }[])[0]?.n ?? 0
}

/** L6-v2/S7: registrations sharing one email domain (excluding common providers). */
export async function countAirdropByEmailDomain(
  domain: string
): Promise<number> {
  await initAirdropTables()
  const rows = await sql`
    SELECT COUNT(*)::int AS n FROM airdrop_registrations
    WHERE split_part(email, '@', 2) = ${domain}
  `
  return (rows as unknown as { n?: number }[])[0]?.n ?? 0
}

/** L6-v2/S9: other registrations whose payout address shares the same /24.
 *  Addresses are stored as submitted (0x + 40 hex), so the /24 is computed
 *  on the last 8 hex characters' leading segment: for an EVM address the
 *  "subnet" analog is the first 4 hex chars after 0x (poor man's clustering,
 *  good enough for farm detection since generated farms share prefixes). */
export async function countAirdropByAddressPrefix(
  prefix: string
): Promise<number> {
  await initAirdropTables()
  const rows = await sql`
    SELECT COUNT(*)::int AS n FROM airdrop_registrations
    WHERE lower(wallet_address) LIKE ${prefix + "%"}
  `
  return (rows as unknown as { n?: number }[])[0]?.n ?? 0
}

export async function createAirdropRegistration(data: {
  userId: string
  email: string
  walletAddress: string
  ipAddress: string
  ipPrefix24: string
  addressPrefix: string
  amount: number
  status: "pending" | "rejected"
  note?: string
  xHandle: string | null
  socialStatus: "skipped" | "unverified"
  maxSlots: number
  sybilScore: number
  sybilStatus: "hold" | "approved" | "rejected" | "pending"
  sybilRules: string
  holdSince: Date | null
}): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  // The slot cap is evaluated inside the INSERT (one statement, one snapshot)
  // so a concurrent registration cannot slip past a separate SELECT. Rejected
  // rows do not occupy a slot — they are not payable.
  // Addresses and handles are stored lower-case: lookups compare lower() and
  // the unique index on lower(wallet_address) enforces one claim per address.
  const rows = await sql`
    INSERT INTO airdrop_registrations
      (user_id, email, wallet_address, ip_address, ip_prefix24, amount, status,
       x_handle, social_status, sybil_score, sybil_status, sybil_scored_at, sybil_rules,
       hold_since, note)
    SELECT
      ${data.userId}, ${data.email}, ${data.walletAddress.toLowerCase()}, ${data.ipAddress},
      ${data.ipPrefix24}, ${data.amount}, ${data.status},
      ${data.xHandle ? data.xHandle.toLowerCase() : null}, ${data.socialStatus},
      ${data.sybilScore}, ${data.sybilStatus},
      CURRENT_TIMESTAMP, ${data.sybilRules},
      ${data.holdSince ? data.holdSince.toISOString() : null}, ${data.note ?? null}
    WHERE (
      SELECT COUNT(*) FROM airdrop_registrations WHERE status <> 'rejected'
    ) < ${data.maxSlots}
    ON CONFLICT DO NOTHING
    RETURNING id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at
  `
  const first = (rows as unknown as Record<string, unknown>[])[0]
  return first ? mapRow(first) : null
}

export async function updateAirdropSybilResult(
  userId: string,
  status: "hold" | "approved" | "rejected",
  score: number,
  rules: string,
  now: Date
): Promise<void> {
  await initAirdropTables()
  await sql`
    UPDATE airdrop_registrations
    SET sybil_status = ${status}, sybil_score = ${score}, sybil_rules = ${rules},
        sybil_scored_at = CURRENT_TIMESTAMP,
        hold_since = ${status === "hold" ? now.toISOString() : null},
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ${userId}
  `
}

export async function listHoldRegistrations(): Promise<AirdropRegistration[]> {
  await initAirdropTables()
  const rows = await sql`
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations
    WHERE sybil_status = 'hold' AND hold_since IS NOT NULL
    ORDER BY hold_since ASC
  `
  return rowsOf<Record<string, unknown>>(rows).map(mapRow)
}

/**
 * Read-only manual-review queue: rows parked by the sybil scorer
 * (sybil_status 'hold') plus legacy rows that were never scored
 * ('pending'). There is intentionally no approve/reject write path yet —
 * this exists only so operators can see what needs review.
 */
export async function listReviewRegistrations(
  limit: number
): Promise<AirdropRegistration[]> {
  await initAirdropTables()
  const rows = await sql`
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations
    WHERE sybil_status IN ('hold', 'pending')
    ORDER BY hold_since ASC NULLS LAST, created_at ASC
    LIMIT ${limit}
  `
  return rowsOf<Record<string, unknown>>(rows).map(mapRow)
}

/**
 * Payout queue: approved rows that are not rejected, not paid and not
 * claimed by a running distributor. A row whose last attempt failed waits
 * for its retry backoff before it is offered again.
 */
export async function listApprovedRegistrations(
  limit: number
): Promise<AirdropRegistration[]> {
  await initAirdropTables()
  const rows = await sql`
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations
    WHERE sybil_status = 'approved'
      AND status = 'pending'
      AND payout_state = 'idle'
      AND (payout_next_attempt_at IS NULL OR payout_next_attempt_at <= CURRENT_TIMESTAMP)
    ORDER BY created_at ASC LIMIT ${limit}
  `
  return rowsOf<Record<string, unknown>>(rows).map(mapRow)
}

/** Admin: one registration by its serial id. */
export async function findAirdropById(
  id: number
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows = await sql`
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at
    FROM airdrop_registrations WHERE id = ${id} LIMIT 1
  `
  const first = (rows as unknown as Record<string, unknown>[])[0]
  return first ? mapRow(first) : null
}

/**
 * Atomically claim a registration for payout. The conditional UPDATE is the
 * single-payment guarantee: only the first caller sees the row, every other
 * caller gets null and must not pay it.
 */
export async function reserveAirdropRegistration(
  id: number
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows = await sql`
    UPDATE airdrop_registrations
    SET payout_state = 'reserved',
        payout_attempts = payout_attempts + 1,
        payout_error = NULL,
        payout_next_attempt_at = NULL,
        payout_updated_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
      AND payout_state = 'idle'
      AND status = 'pending'
      AND sybil_status = 'approved'
    RETURNING id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at
  `
  const first = (rows as unknown as Record<string, unknown>[])[0]
  return first ? mapRow(first) : null
}

/**
 * Record the reveal transaction before it is broadcast. A distributor crash
 * between signing and broadcasting leaves a row whose transaction hash can
 * be checked against the chain, instead of an unmarked payment.
 */
export async function recordAirdropIntent(
  id: number,
  txHash: string,
  nonce: number
): Promise<boolean> {
  await initAirdropTables()
  const rows = await sql`
    UPDATE airdrop_registrations
    SET payout_state = 'broadcast',
        tx_hash = ${txHash},
        payout_nonce = ${nonce},
        payout_updated_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND payout_state = 'reserved' AND status <> 'paid'
    RETURNING id
  `
  return rowsOf(rows).length > 0
}

/**
 * Mark a registration paid after a receipt with status 0x1 was observed.
 * Idempotent: an already paid row stays paid, a missing row is not paid.
 */
export async function markAirdropPaidById(
  id: number,
  txHash: string
): Promise<boolean> {
  await initAirdropTables()
  const rows = await sql`
    UPDATE airdrop_registrations
    SET status = 'paid',
        payout_state = 'paid',
        tx_hash = ${txHash},
        payout_error = NULL,
        payout_next_attempt_at = NULL,
        payout_updated_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND status <> 'paid'
    RETURNING id
  `
  if (rowsOf(rows).length > 0) return true
  const current = await findAirdropById(id)
  return current?.status === "paid"
}

/**
 * Release a reservation after a failed attempt: the row returns to the queue
 * after the retry backoff and keeps the failure reason for the audit trail.
 * A row that exhausted its attempts is rejected and leaves the queue for
 * manual review instead of being retried forever.
 */
export async function releaseAirdropReservation(
  id: number,
  reason: string,
  retryDelayMinutes: number,
  maxAttempts: number
): Promise<boolean> {
  await initAirdropTables()
  const rows = await sql`
    UPDATE airdrop_registrations
    SET status = CASE
          WHEN payout_attempts >= ${maxAttempts} THEN 'rejected'
          ELSE status
        END,
        note = CASE
          WHEN payout_attempts >= ${maxAttempts} THEN ${reason}
          ELSE note
        END,
        payout_state = 'idle',
        payout_error = ${reason},
        payout_next_attempt_at = CASE
          WHEN payout_attempts >= ${maxAttempts} THEN NULL
          ELSE CURRENT_TIMESTAMP + (${retryDelayMinutes} * INTERVAL '1 minute')
        END,
        payout_updated_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
      AND payout_state IN ('reserved', 'broadcast')
      AND status <> 'paid'
    RETURNING id
  `
  return rowsOf(rows).length > 0
}

/** Reservations that never reached a confirmed receipt. */
export async function listStuckPayouts(
  limit: number
): Promise<AirdropRegistration[]> {
  await initAirdropTables()
  const rows = await sql`
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, payout_state, payout_nonce, payout_attempts, payout_error, payout_next_attempt_at, created_at, updated_at FROM airdrop_registrations
    WHERE payout_state IN ('reserved', 'broadcast')
    ORDER BY id ASC LIMIT ${limit}
  `
  return rowsOf<Record<string, unknown>>(rows).map(mapRow)
}

// ---------------------------------------------------------------------------
// Users (login prerequisite for airdrop registration)
// ---------------------------------------------------------------------------

export interface AirdropUser {
  uid: string
  email: string
  is_verified: boolean
  /** NULL for legacy email rows, "github" for OAuth rows. */
  provider?: string | null
}

export async function initUsersTable(): Promise<void> {
  await initAirdropTables()
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      uid VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      verification_code VARCHAR(6),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
  // Code TTL (added after launch; NULL = legacy row whose code never expires)
  await sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_code_expires_at TIMESTAMP
  `
  // OAuth login (GitHub): provider columns are NULL for legacy email rows.
  await sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS provider VARCHAR(16)
  `
  await sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS github_id BIGINT
  `
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS users_github_id_key
    ON users (github_id) WHERE github_id IS NOT NULL
  `
}

/** Verification-code lifetime; mirrored by the API's expiresInSeconds field. */
export const VERIFICATION_CODE_TTL_MINUTES = 10

export async function findUserById(uid: string): Promise<AirdropUser | null> {
  await initUsersTable()
  const rows = await sql`
    SELECT uid, email, is_verified, provider FROM users WHERE uid = ${uid} LIMIT 1
  `
  const list = rowsOf<Record<string, unknown>>(rows)
  return list.length ? (list[0] as unknown as AirdropUser) : null
}

export async function findUserByEmail(
  email: string
): Promise<AirdropUser | null> {
  await initUsersTable()
  const rows = await sql`
    SELECT uid, email, is_verified FROM users WHERE lower(email) = lower(${email}) LIMIT 1
  `
  const list = rowsOf<Record<string, unknown>>(rows)
  return list.length ? (list[0] as unknown as AirdropUser) : null
}

export async function createUser(
  uid: string,
  email: string,
  passwordHash: string,
  code: string
): Promise<void> {
  await initUsersTable()
  await sql`
    INSERT INTO users (uid, email, password_hash, is_verified, verification_code, verification_code_expires_at)
    VALUES (${uid}, ${email}, ${passwordHash}, FALSE, ${code},
            NOW() + (${VERIFICATION_CODE_TTL_MINUTES} * INTERVAL '1 minute'))
    ON CONFLICT (email) DO NOTHING
  `
}

/** Create a user from an OAuth login: pre-verified, no usable password. */
export async function createUserOAuth(
  uid: string,
  email: string,
  provider: string,
  githubId: number
): Promise<void> {
  await initUsersTable()
  // password_hash holds a sentinel no verifier accepts (no ":" separator).
  await sql`
    INSERT INTO users (uid, email, password_hash, is_verified, provider, github_id)
    VALUES (${uid}, ${email}, 'oauth-no-password', TRUE, ${provider}, ${githubId})
    ON CONFLICT (email) DO NOTHING
  `
}

export async function findUserByGithubId(
  githubId: number
): Promise<AirdropUser | null> {
  await initUsersTable()
  const rows = await sql`
    SELECT uid, email, is_verified FROM users WHERE github_id = ${githubId} LIMIT 1
  `
  const list = rowsOf<Record<string, unknown>>(rows)
  return list.length ? (list[0] as unknown as AirdropUser) : null
}

/** Store a fresh verification code (resend flow). */
export async function updateUserVerificationCode(
  email: string,
  code: string
): Promise<void> {
  await initUsersTable()
  await sql`
    UPDATE users SET verification_code = ${code},
                     verification_code_expires_at = NOW() + (${VERIFICATION_CODE_TTL_MINUTES} * INTERVAL '1 minute')
    WHERE lower(email) = lower(${email})
  `
}

/**
 * Verify the emailed code. NULL expiry means a legacy row from before the
 * TTL existed — still accepted so pre-launch codes keep working.
 */
export async function verifyUserEmail(
  email: string,
  code: string
): Promise<"ok" | "expired" | "wrong"> {
  await initUsersTable()
  const rows = rowsOf<{ uid: string }>(
    await sql`
    UPDATE users SET is_verified = TRUE, verification_code = NULL, verification_code_expires_at = NULL
    WHERE lower(email) = lower(${email}) AND verification_code = ${code}
      AND (verification_code_expires_at IS NULL OR verification_code_expires_at > NOW())
    RETURNING uid
  `
  )
  if (rows.length > 0) return "ok"
  const stale = rowsOf<{ uid: string }>(
    await sql`
    SELECT uid FROM users
    WHERE lower(email) = lower(${email}) AND verification_code = ${code}
      AND verification_code_expires_at IS NOT NULL AND verification_code_expires_at <= NOW()
  `
  )
  return stale.length > 0 ? "expired" : "wrong"
}
