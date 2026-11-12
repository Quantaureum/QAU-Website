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
 *                          payout is gated on social verification.
 *                          Defaults to OFF. Enable only once server-side X
 *                          verification exists: while X metrics have no
 *                          server-side source, every registration would be
 *                          routed to manual review (hold) instead of being
 *                          auto-approved.
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

// ---------------------------------------------------------------------------
// Invite bonus (B-tier viral loop) — plan 运营中心/11-病毒增长/B档裂变改造方案-v2.md §3.1/§4
//
// The only monetary bonus of the campaign: for every 3 invited users whose
// registration is APPROVED, the inviter earns one bonus round. Kill-switch
// and pool circuit breaker live here so a pause or a retune needs an env
// change + restart, never a redeploy.
//
//   AIRDROP_INVITE_BONUS_ENABLED          '1' = invite codes + bonuses active
//                                         (default OFF — fail-closed launch)
//   AIRDROP_INVITE_BONUS_PAUSED           '1' = manual kill-switch, refuses
//                                         every bonus payout until cleared
//   AIRDROP_INVITE_BONUS_AMOUNT_QAU       per round (default 30)
//   AIRDROP_INVITE_BONUS_ROUND_SIZE       approved invitees per round (default 3)
//   AIRDROP_INVITE_BONUS_MAX_ROUNDS       per-user cap in rounds (default 2 → 60 QAU)
//   AIRDROP_INVITE_BONUS_POOL_QAU         bonus pool budget (default 60000)
//   AIRDROP_INVITE_BONUS_APPROVAL_CUTOFF_AT approvals after this instant never
//                                         count toward bonuses (default
//                                         2026-12-08T23:59:59Z, plan §8 N5)
//   AIRDROP_INVITE_BONUS_SETTLE_END_AT    bonus channel closes after this
//                                         instant (default 2026-12-14T23:59:59Z,
//                                         final settlement in the second week
//                                         of December, plan §3.1)
// ---------------------------------------------------------------------------

/** Week-over-week trigger for the automatic bonus pause (plan §4.3, N4). */
export const BONUS_PAUSE_THRESHOLDS = {
  /** Absolute cluster-hit count in one week that trips the pause. */
  absoluteClusterHits: 5,
  /** Ratio part of the criterion: current > 3 × last week. */
  weekOverWeekRatio: 3,
  /**
   * Minimum previous-week cluster count before the ratio criterion is even
   * considered. Pinned by anti-sybil review v4 (remark 2): the multiplier
   * criterion applies ONLY when last week's hit count is ≥ 2, so a 1 → 4
   * low-base spike can never trip it.
   */
  weekOverWeekBaseClusters: 2,
} as const

/**
 * Automatic pause criterion (plan §4.3 as pinned by review v4):
 * "仅当上周命中簇数 ≥2 时启用周环比 >3 倍判据".
 *
 * Cluster-hit counting口径 (review v4 §2 remark 2): track-A automatic hits +
 * track-B confirmed hits, deduplicated per cluster (inviter).
 * Pure function — unit tests pin both钉死 cases (1→4 no trip, 2→7 trip).
 */
export function shouldAutoPauseBonusPayout(
  lastWeekClusterHits: number,
  currentWeekClusterHits: number
): boolean {
  if (currentWeekClusterHits >= BONUS_PAUSE_THRESHOLDS.absoluteClusterHits) {
    return true
  }
  if (
    lastWeekClusterHits >= BONUS_PAUSE_THRESHOLDS.weekOverWeekBaseClusters &&
    currentWeekClusterHits >
      lastWeekClusterHits * BONUS_PAUSE_THRESHOLDS.weekOverWeekRatio
  ) {
    return true
  }
  return false
}

export interface InviteBonusConfig {
  enabled: boolean
  payoutPaused: boolean
  bonusPerRoundQau: number
  roundSize: number
  maxRounds: number
  poolQau: number
  approvalCutoffAt: Date | null
  settleEndAt: Date | null
}

function defaultIso(iso: string): Date {
  return new Date(iso)
}

export function getInviteBonusConfig(
  env: Record<string, string | undefined> = process.env
): InviteBonusConfig {
  const bonusPerRoundQau = parsePositiveInt(
    env.AIRDROP_INVITE_BONUS_AMOUNT_QAU,
    30
  )
  const roundSize = parsePositiveInt(env.AIRDROP_INVITE_BONUS_ROUND_SIZE, 3)
  const maxRounds = parsePositiveInt(env.AIRDROP_INVITE_BONUS_MAX_ROUNDS, 2)
  return {
    enabled: env.AIRDROP_INVITE_BONUS_ENABLED === "1",
    payoutPaused: env.AIRDROP_INVITE_BONUS_PAUSED === "1",
    bonusPerRoundQau,
    roundSize,
    maxRounds,
    poolQau: parsePositiveInt(env.AIRDROP_INVITE_BONUS_POOL_QAU, 60_000),
    approvalCutoffAt:
      parseDateOrNull(env.AIRDROP_INVITE_BONUS_APPROVAL_CUTOFF_AT) ??
      defaultIso("2026-12-08T23:59:59Z"),
    settleEndAt:
      parseDateOrNull(env.AIRDROP_INVITE_BONUS_SETTLE_END_AT) ??
      defaultIso("2026-12-14T23:59:59Z"),
  }
}

/** Per-user bonus cap in QAU: rounds × per-round amount (60 by default). */
export function maxBonusPerUserQau(cfg: InviteBonusConfig): number {
  return cfg.maxRounds * cfg.bonusPerRoundQau
}

/**
 * Combined pause state for bonus payouts: the manual kill-switch flag wins
 * outright, otherwise the automatic week-over-week criterion decides.
 * `lastWeekClusterHits` / `currentWeekClusterHits` come from the void audit
 * trail (deduplicated per inviter — see shouldAutoPauseBonusPayout).
 */
export function isBonusPayoutPaused(
  cfg: InviteBonusConfig,
  lastWeekClusterHits: number,
  currentWeekClusterHits: number
): boolean {
  return (
    cfg.payoutPaused ||
    shouldAutoPauseBonusPayout(lastWeekClusterHits, currentWeekClusterHits)
  )
}
