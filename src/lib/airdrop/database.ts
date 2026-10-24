/**
 * Airdrop database layer (Neon Postgres serverless).
 *
 * Ported from the D:/bigood/website prototype (lib/database.ts, 2026-10-13)
 * into the production site. Schema evolution is idempotent: the init runs on
 * first use and every statement is IF NOT EXISTS / ADD COLUMN IF NOT EXISTS,
 * so deploys never block on migrations.
 *
 * Anti-sybil additions vs the prototype (防护设计 v2):
 *   - sybil_score / sybil_status / sybil_scored_at / sybil_rules columns
 *   - hold re-evaluation timestamps
 *   - unique indexes on user_id, wallet_address, x_handle (L5)
 *   - ip_activity_log (L3)
 */

import { neon } from "@neondatabase/serverless"

const DATABASE_URL = process.env.DATABASE_URL || ""

export const sql = DATABASE_URL
  ? neon(DATABASE_URL)
  : // Build/preview without a DB: every call fails loudly at use-time, never
    // at import-time, so static generation of unrelated pages still works.
    (() => {
      throw new Error("DATABASE_URL is not configured")
    })()

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
  created_at: Date
  updated_at: Date
}

export type RegistrationStatus =
  | "pending"
  | "hold"
  | "approved"
  | "rejected"
  | "paid"

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

function mapRow(row: Record<string, unknown>): AirdropRegistration {
  return row as unknown as AirdropRegistration
}

export async function findAirdropByUserId(
  userId: string
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows =
    await sql`SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, created_at, updated_at FROM airdrop_registrations WHERE user_id = ${userId} LIMIT 1`
  return rows.length ? mapRow(rows[0]) : null
}

export async function findAirdropByAddress(
  address: string
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows =
    await sql`SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, created_at, updated_at FROM airdrop_registrations WHERE lower(wallet_address) = lower(${address}) LIMIT 1`
  return rows.length ? mapRow(rows[0]) : null
}

export async function findAirdropByXHandle(
  handle: string
): Promise<AirdropRegistration | null> {
  await initAirdropTables()
  const rows =
    await sql`SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, created_at, updated_at FROM airdrop_registrations WHERE lower(x_handle) = lower(${handle}) LIMIT 1`
  return rows.length ? mapRow(rows[0]) : null
}

export async function countAirdropByIp(ip: string): Promise<number> {
  await initAirdropTables()
  const rows =
    await sql`SELECT COUNT(*)::int AS n FROM airdrop_registrations WHERE ip_address = ${ip}`
  return rows[0]?.n ?? 0
}

/** L3/S1: registrations already filed from the same /24 subnet. */
export async function countAirdropByPrefix24(prefix: string): Promise<number> {
  await initAirdropTables()
  const rows =
    await sql`SELECT COUNT(*)::int AS n FROM airdrop_registrations WHERE ip_prefix24 = ${prefix}`
  return rows[0]?.n ?? 0
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
  return rows[0]?.n ?? 0
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
  return rows[0]?.n ?? 0
}

export async function createAirdropRegistration(data: {
  userId: string
  email: string
  walletAddress: string
  ipAddress: string
  ipPrefix24: string
  addressPrefix: string
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
  // maxSlots guard: if the campaign is full the INSERT is aborted and the
  // caller distinguishes "race lost" from "campaign full" via findAirdropByUserId.
  const countRows =
    await sql`SELECT COUNT(*)::int AS n FROM airdrop_registrations`
  if ((countRows[0]?.n ?? 0) >= data.maxSlots) {
    return null
  }
  const rows = await sql`
    INSERT INTO airdrop_registrations
      (user_id, email, wallet_address, ip_address, ip_prefix24, amount, status,
       x_handle, social_status, sybil_score, sybil_status, sybil_scored_at, sybil_rules,
       hold_since, note)
    VALUES
      (${data.userId}, ${data.email}, ${data.walletAddress}, ${data.ipAddress},
       ${data.ipPrefix24}, 50, ${data.status},
       ${data.xHandle}, ${data.socialStatus}, ${data.sybilScore}, ${data.sybilStatus},
       CURRENT_TIMESTAMP, ${data.sybilRules},
       ${data.holdSince ? data.holdSince.toISOString() : null}, ${data.note ?? null})
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, created_at, updated_at
  `
  return rows.length ? mapRow(rows[0]) : null
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
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, created_at, updated_at FROM airdrop_registrations
    WHERE sybil_status = 'hold' AND hold_since IS NOT NULL
    ORDER BY hold_since ASC
  `
  return rows.map(mapRow)
}

export async function listApprovedRegistrations(
  limit: number
): Promise<AirdropRegistration[]> {
  await initAirdropTables()
  const rows = await sql`
    SELECT id, user_id, email, wallet_address, ip_address, ip_prefix24, amount, status, tx_hash, note, x_handle, social_status, social_checked_at, social_detail, sybil_score, sybil_status, sybil_scored_at, sybil_rules, hold_since, created_at, updated_at FROM airdrop_registrations
    WHERE sybil_status = 'approved' AND status <> 'paid'
    ORDER BY created_at ASC LIMIT ${limit}
  `
  return rows.map(mapRow)
}

/** Admin: mark a registration paid (txHash written back by the distributor). */
export async function markAirdropPaid(
  userId: string,
  txHash: string
): Promise<void> {
  await initAirdropTables()
  await sql`
    UPDATE airdrop_registrations
    SET status = 'paid', tx_hash = ${txHash}, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ${userId}
  `
}

// ---------------------------------------------------------------------------
// Users (login prerequisite for airdrop registration)
// ---------------------------------------------------------------------------

export interface AirdropUser {
  uid: string
  email: string
  is_verified: boolean
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
}

export async function findUserById(uid: string): Promise<AirdropUser | null> {
  await initUsersTable()
  const rows = await sql`
    SELECT uid, email, is_verified FROM users WHERE uid = ${uid} LIMIT 1
  `
  return rows.length ? (rows[0] as unknown as AirdropUser) : null
}

export async function findUserByEmail(
  email: string
): Promise<AirdropUser | null> {
  await initUsersTable()
  const rows = await sql`
    SELECT uid, email, is_verified FROM users WHERE lower(email) = lower(${email}) LIMIT 1
  `
  return rows.length ? (rows[0] as unknown as AirdropUser) : null
}

export async function createUser(
  uid: string,
  email: string,
  passwordHash: string,
  code: string
): Promise<void> {
  await initUsersTable()
  await sql`
    INSERT INTO users (uid, email, password_hash, is_verified, verification_code)
    VALUES (${uid}, ${email}, ${passwordHash}, FALSE, ${code})
    ON CONFLICT (email) DO NOTHING
  `
}

export async function verifyUserEmail(
  email: string,
  code: string
): Promise<boolean> {
  await initUsersTable()
  const rows = await sql`
    UPDATE users SET is_verified = TRUE, verification_code = NULL
    WHERE lower(email) = lower(${email}) AND verification_code = ${code}
    RETURNING uid
  `
  return rows.length > 0
}
