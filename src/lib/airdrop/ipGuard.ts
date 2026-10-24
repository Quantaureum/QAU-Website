/**
 * 同 IP 批量注册/登记防护（防女巫第三层）
 *
 * 策略：
 *  - send-code / register：同一 IP 24h 内最多验证 3 个不同邮箱
 *    （从源头掐批量注册小号；超过返回 429）
 *  - airdrop register：同一 IP 最多 2 条登记记录，第 3 条起标记
 *    status='rejected'（note 注明原因）——不直接拒绝请求，避免家宽
 *    NAT 误伤，同时让批量女巫拿不到币（可人工复核放行）
 *
 * 存储：ip_activity_log 表（initDatabase 创建），失败容错：
 *  表不存在/DB 不可用时返回放行（不阻断主流程），只记 console 警告。
 */

import { sql } from "./database"

const SEND_CODE_DAILY_EMAILS = 3 // 同 IP 每天最多发码邮箱数
const AIRDROP_MAX_PER_IP = 2 // 同 IP 最多正常登记数

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

/** 记录一次 IP 活动（容错：失败不阻断） */
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
 * send-code / register 前 IP 检查：
 * 24h 内该 IP 发码的不同邮箱数是否超限。
 * @returns allowed=false 时应返回 429
 */
export async function checkIpEmailQuota(ip: string): Promise<{
  allowed: boolean
  used: number
  limit: number
}> {
  if (!sql || !ip || ip === "unknown" || ip === "::1" || ip === "127.0.0.1") {
    // 本地开发/无 IP 信息：放行（airdrop 表计数仍生效）
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
 * airdrop 登记的 IP 计数（含 rejected 的也计入，防换号重试）。
 * 返回该 IP 已有登记数。
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

/** 空投 IP 门槛：超过 2 个的登记应标记 rejected */
export function shouldRejectAirdropByIp(currentCount: number): boolean {
  return currentCount >= AIRDROP_MAX_PER_IP
}

export const IP_GUARD_CONFIG = {
  sendCodeDailyEmails: SEND_CODE_DAILY_EMAILS,
  airdropMaxPerIp: AIRDROP_MAX_PER_IP,
}
