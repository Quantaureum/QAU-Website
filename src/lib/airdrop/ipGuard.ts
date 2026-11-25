/**
 * Same-IP bulk registration/signup protection (anti-sybil layer 3).
 *
 * Policy:
 *  - send-code / register: at most 3 distinct emails verified per IP within
 *    24h (chokes bulk throwaway signups at the source; over the limit → 429)
 *  - airdrop register: at most 2 registration records per IP; from the 3rd
 *    on, rows are marked status='rejected' (reason noted) — the request is
 *    not refused outright, to avoid punishing residential NAT users, while
 *    bulk sybil farmers get no coins (manual review can still allow)
 *
 * Storage: the ip_activity_log table (created by initDatabase), fail-open on
 *  storage errors: when the table is missing or the DB is unavailable the
 *  check allows the request (never blocks the main flow) and only logs a
 *  console warning.
 */

import { sql } from "./database"

const SEND_CODE_DAILY_EMAILS = 3 // max distinct emails sent a code per IP per day
const AIRDROP_MAX_PER_IP = 2 // max normal airdrop registrations per IP

export async function initIpActivityTable(): Promise<void> {
  if (!sql) return
  await sql`
    CREATE TABLE IF NOT EXISTS ip_activity_log (
      id SERIAL PRIMARY KEY,
      ip_address VARCHAR(64) NOT NULL,
      action VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_ip_activity_ip_time
    ON ip_activity_log (ip_address, created_at)
  `
}

/** Record one IP activity event (fail-open: a failure never blocks). */
export async function logIpActivity(
  ip: string,
  action: string,
  email?: string
): Promise<void> {
  if (!sql || !ip || ip === "unknown") return
  try {
    await sql`
      INSERT INTO ip_activity_log (ip_address, action, email)
      VALUES (${ip}, ${action}, ${email || null})
    `
  } catch (err) {
    console.warn(
      "[ipGuard] log failed:",
      err instanceof Error ? err.message : err
    )
  }
}

/**
 * Pre-send-code/register IP check: has the distinct-email send-code count
 * for this IP exceeded the 24h limit?
 * @returns when allowed=false the caller should respond with 429
 */
export async function checkIpEmailQuota(ip: string): Promise<{
  allowed: boolean
  used: number
  limit: number
}> {
  if (!sql || !ip || ip === "unknown" || ip === "::1" || ip === "127.0.0.1") {
    // Local development / no IP info: allow (the airdrop-table counts still apply)
    return { allowed: true, used: 0, limit: SEND_CODE_DAILY_EMAILS }
  }
  try {
    const result = await sql`
      SELECT COUNT(DISTINCT email)::int AS used
      FROM ip_activity_log
      WHERE ip_address = ${ip}
        AND action = 'send_code'
        AND created_at > NOW() - INTERVAL '24 hours'
    `
    const used =
      Number((result as unknown as Record<string, unknown>[])[0]?.used ?? 0) ||
      0
    return {
      allowed: used < SEND_CODE_DAILY_EMAILS,
      used,
      limit: SEND_CODE_DAILY_EMAILS,
    }
  } catch (err) {
    console.warn(
      "[ipGuard] quota check failed:",
      err instanceof Error ? err.message : err
    )
    return { allowed: true, used: 0, limit: SEND_CODE_DAILY_EMAILS }
  }
}

/**
 * Airdrop registration count for an IP (rejected rows count too, so
 * switching wallets cannot retry). Returns the number of existing
 * registrations for this IP.
 */
export async function countAirdropByIp(ip: string): Promise<number> {
  if (!sql || !ip || ip === "unknown") return 0
  try {
    const result = await sql`
      SELECT COUNT(*)::int AS count
      FROM airdrop_registrations
      WHERE ip_address = ${ip}
    `
    return (
      Number((result as unknown as Record<string, unknown>[])[0]?.count ?? 0) ||
      0
    )
  } catch (err) {
    console.warn(
      "[ipGuard] airdrop count failed:",
      err instanceof Error ? err.message : err
    )
    return 0
  }
}

/** Airdrop IP threshold: registrations beyond 2 per IP should be rejected */
export function shouldRejectAirdropByIp(currentCount: number): boolean {
  return currentCount >= AIRDROP_MAX_PER_IP
}

export const IP_GUARD_CONFIG = {
  sendCodeDailyEmails: SEND_CODE_DAILY_EMAILS,
  airdropMaxPerIp: AIRDROP_MAX_PER_IP,
}
