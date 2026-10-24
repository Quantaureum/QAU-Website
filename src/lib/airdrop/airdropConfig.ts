/**
 * Airdrop campaign configuration: budget cap, per-user amount, time window
 * and optional social-task binding.
 *
 * Everything is env-driven so the campaign can be retuned without touching
 * business logic. When the env vars are absent the defaults reproduce the
 * pre-campaign behavior (no window, no social requirement) except for the
 * budget cap, which defaults to the approved 4,000,000 QAU campaign budget
 * on purpose: an unlimited airdrop is never the safe fallback.
 *
 *   AIRDROP_BUDGET_QAU     total campaign budget, default 4,000,000
 *   AIRDROP_AMOUNT_QAU     per-user payout, default 50
 *   AIRDROP_START_AT       ISO-8601 start; empty = already open
 *   AIRDROP_END_AT         ISO-8601 end; empty = no end date
 *   AIRDROP_REQUIRE_SOCIAL '1' = X handle required at registration and
 *                          payout is gated on social verification
 *   AIRDROP_X_TARGET_HANDLE the X account participants must follow
 */

export type AirdropPhase = "not_started" | "open" | "ended"

export interface AirdropCampaignConfig {
  amountPerUser: number
  budgetQau: number
  maxSlots: number
  startAt: Date | null
  endAt: Date | null
  requireSocial: boolean
  xTargetHandle: string
}

const DEFAULT_BUDGET_QAU = 4_000_000
const DEFAULT_AMOUNT_QAU = 50

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return fallback
  return Math.floor(n)
}

function parseDateOrNull(raw: string | undefined): Date | null {
  if (!raw || !raw.trim()) return null
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? null : d
}

export function getAirdropConfig(
  env: Record<string, string | undefined> = process.env
): AirdropCampaignConfig {
  const amountPerUser = parsePositiveInt(
    env.AIRDROP_AMOUNT_QAU,
    DEFAULT_AMOUNT_QAU
  )
  const budgetQau = parsePositiveInt(env.AIRDROP_BUDGET_QAU, DEFAULT_BUDGET_QAU)
  return {
    amountPerUser,
    budgetQau,
    maxSlots: Math.floor(budgetQau / amountPerUser),
    startAt: parseDateOrNull(env.AIRDROP_START_AT),
    endAt: parseDateOrNull(env.AIRDROP_END_AT),
    requireSocial: env.AIRDROP_REQUIRE_SOCIAL === "1",
    xTargetHandle: (env.AIRDROP_X_TARGET_HANDLE || "").replace(/^@/, ""),
  }
}

/** Where the campaign stands at `now`. Absent bounds are treated as open. */
export function campaignPhase(
  now: Date,
  cfg: AirdropCampaignConfig
): AirdropPhase {
  if (cfg.startAt && now < cfg.startAt) return "not_started"
  if (cfg.endAt && now >= cfg.endAt) return "ended"
  return "open"
}

/** X (Twitter) handle format: 1-15 chars, letters/digits/underscore. */
export function isValidXHandle(handle: string): boolean {
  return /^[A-Za-z0-9_]{1,15}$/.test(handle)
}
