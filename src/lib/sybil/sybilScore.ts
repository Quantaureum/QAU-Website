/**
 * Sybil trust scoring — pure functions only.
 *
 * Rationale (see 运营中心/09-内容与活动/空投女巫防护设计-v2.md): every
 * registration is scored by a transparent linear model over automatically
 * collected signals. No human review. Thresholds are public on purpose —
 * an attacker who satisfies every rule pays the same cost as a real user.
 *
 * The scorer NEVER sees PII beyond what the signals already encode, and it
 * never mutates anything: callers gather a SybilSignals object, get back a
 * score plus the exact rule hits, and apply the disposition themselves.
 */

/** Signals collected automatically at registration / re-evaluation time. */
export interface SybilSignals {
  /** L3/S1: existing registrations from the same /24 IP subnet (excluding this one). */
  sameSubnetRegistrations: number
  /** L2/S6: email domain is on the disposable-domain list. */
  disposableEmailDomain: boolean
  /** L6-v2/S7: registrations sharing this email domain (excluding this one). */
  sameEmailDomainRegistrations: number
  /** L4/S2: X account creation date, or null when social binding is disabled. */
  xAccountCreatedAt: Date | null
  /** L4/S3: X follower count, or null. */
  xFollowers: number | null
  /** L4/S3: X following count, or null. */
  xFollowing: number | null
  /** L4/S4: X account has zero tweets, or null when unknown. */
  xZeroTweets: boolean | null
  /** L4/S5: follow verification passed. */
  xFollowsCampaign: boolean
  /** L7/S8: on-chain transaction count (nonce) of the payout address. */
  addressNonce: number | null
  /** L7/S8: on-chain balance (wei, decimal string) of the payout address, or null. */
  addressBalanceWei: string | null
  /** L6-v2/S9: other registrations whose payout address shares the same /24. */
  sameSubnetPayoutAddresses: number
  /** L6-v2/S10: seconds between registration and payout-address submission. */
  registrationToAddressSeconds: number | null
  /** B档/S11: max Pearson correlation of daily production curve vs any same-batch node (0..1, null = not tier B). */
  productionCurveCorrelation: number | null
  /** B档/S12: node self-reported public IP does not match its on-chain P2P peers. */
  nodeIpMismatch: boolean | null
  /** Date the evaluation runs at (injection point for deterministic tests). */
  now: Date
}

/** One scored rule hit, for the rejection email and the audit log. */
export interface ScoreRuleHit {
  rule: string
  penalty: number
  detail: string
}

export interface SybilScoreResult {
  score: number
  verdict: "approved" | "hold" | "rejected"
  hardReject: boolean
  hits: ScoreRuleHit[]
}

/** Thresholds exported so the docs and the tests cannot drift. */
export const THRESHOLDS = {
  approved: 70,
  rejected: 40,
  /** X accounts younger than this are "new" (weaker penalty band applies too). */
  xAccountYoungDays: 90,
  xAccountVeryYoungDays: 30,
  /** Freebie X-shell signature: few followers, huge following ratio. */
  xShellMinFollowers: 10,
  xShellFollowRatio: 20,
  /** Same-subnet registration count that triggers the batch penalty. */
  subnetBatchRegistrations: 3,
  /** Same-email-domain registration count that triggers the batch penalty. */
  emailDomainBatchRegistrations: 3,
  /** Payout addresses sharing a /24 that trigger the farm penalty. */
  payoutFarmAddresses: 2,
  /** Seconds between registration and address submission under which the
   *  "script inertia" rule fires (a human reads a page, a script doesn't). */
  scriptInertiaSeconds: 60,
  /** B档: curve correlation above which a same-batch cluster is flagged. */
  curveCorrelationFlag: 0.9,
} as const

/** B档 hard signals — S12 mismatch voids the tranche regardless of score. */
export interface HardRejectInput {
  duplicatePayoutInBatch: boolean
  nodeIpMismatch: boolean | null
}

const DAY_MS = 24 * 60 * 60 * 1000

function daysBetween(from: Date, to: Date): number {
  return Math.max(0, (to.getTime() - from.getTime()) / DAY_MS)
}

/** Evaluate the transparent model. Pure: no IO, no clock, no randomness. */
export function scoreSybilSignals(s: SybilSignals): SybilScoreResult {
  const hits: ScoreRuleHit[] = []
  const now = s.now

  // ---- hard rejects first (verdict forced, score still computed for the log)
  let hardReject = false
  if (s.disposableEmailDomain) {
    hardReject = true
    hits.push({
      rule: "disposable-email",
      penalty: 30,
      detail: "email domain is on the disposable list",
    })
  }
  if (s.nodeIpMismatch === true) {
    hardReject = true
    hits.push({
      rule: "node-ip-mismatch",
      penalty: 50,
      detail: "B档 node IP does not match on-chain P2P peers",
    })
  }

  // ---- soft penalties
  if (s.sameSubnetRegistrations + 1 >= THRESHOLDS.subnetBatchRegistrations) {
    hits.push({
      rule: "same-subnet-batch",
      penalty: 40,
      detail: `${s.sameSubnetRegistrations + 1} registrations share this /24 subnet`,
    })
  }

  if (s.xAccountCreatedAt) {
    const ageDays = daysBetween(s.xAccountCreatedAt, now)
    if (ageDays < THRESHOLDS.xAccountVeryYoungDays) {
      hits.push({
        rule: "x-account-very-young",
        penalty: 20,
        detail: `X account created ${Math.floor(ageDays)} days ago (<${THRESHOLDS.xAccountVeryYoungDays})`,
      })
    } else if (ageDays < THRESHOLDS.xAccountYoungDays) {
      hits.push({
        rule: "x-account-young",
        penalty: 25,
        detail: `X account created ${Math.floor(ageDays)} days ago (<${THRESHOLDS.xAccountYoungDays})`,
      })
    }
  }

  if (s.xFollowers !== null && s.xFollowing !== null) {
    const shell =
      s.xFollowers < THRESHOLDS.xShellMinFollowers &&
      s.xFollowers > 0 &&
      s.xFollowing / Math.max(s.xFollowers, 1) > THRESHOLDS.xShellFollowRatio
    if (shell) {
      hits.push({
        rule: "x-shell-account",
        penalty: 15,
        detail: `${s.xFollowers} followers / ${s.xFollowing} following (empty shell signature)`,
      })
    }
  }

  if (s.xZeroTweets === true) {
    hits.push({
      rule: "x-zero-tweets",
      penalty: 15,
      detail: "X account has no tweets",
    })
  }

  if (
    s.sameEmailDomainRegistrations + 1 >=
    THRESHOLDS.emailDomainBatchRegistrations
  ) {
    hits.push({
      rule: "email-domain-batch",
      penalty: 15,
      detail: `${s.sameEmailDomainRegistrations + 1} registrations share this email domain`,
    })
  }

  if (s.addressNonce !== null && s.addressNonce > 0) {
    hits.push({
      rule: "address-has-history",
      penalty: 35,
      detail: `payout address has on-chain history (nonce=${s.addressNonce})`,
    })
  }

  if (s.sameSubnetPayoutAddresses + 1 >= THRESHOLDS.payoutFarmAddresses) {
    hits.push({
      rule: "payout-address-farm",
      penalty: 20,
      detail: `${s.sameSubnetPayoutAddresses + 1} payout addresses share this /24`,
    })
  }

  if (
    s.registrationToAddressSeconds !== null &&
    s.registrationToAddressSeconds >= 0 &&
    s.registrationToAddressSeconds < THRESHOLDS.scriptInertiaSeconds
  ) {
    hits.push({
      rule: "script-inertia",
      penalty: 10,
      detail: `address submitted ${s.registrationToAddressSeconds}s after registration`,
    })
  }

  if (
    s.productionCurveCorrelation !== null &&
    s.productionCurveCorrelation > THRESHOLDS.curveCorrelationFlag
  ) {
    hits.push({
      rule: "production-curve-cluster",
      penalty: 25,
      detail: `daily production curve correlates ${s.productionCurveCorrelation.toFixed(2)} with a same-batch node`,
    })
  }

  // ---- score = 100 − Σ penalties, floored at 0
  const penalty = hits.reduce((acc, h) => acc + h.penalty, 0)
  const score = Math.max(0, 100 - penalty)

  // ---- disposition
  let verdict: SybilScoreResult["verdict"]
  // The rejected line is <=40: at 40 penalty points, 40% of trust is gone —
  // the conservative call at the exact line is to reject and let the 14-day
  // re-evaluation give genuinely-improved signals a second chance.
  if (hardReject || score <= THRESHOLDS.rejected) {
    verdict = "rejected"
  } else if (score >= THRESHOLDS.approved) {
    verdict = "approved"
  } else {
    verdict = "hold"
  }

  // A hard reject also needs its full penalty chain visible in the log —
  // but the verdict stays "rejected" even when the floored score ≥ 40.
  return { score, verdict, hardReject, hits }
}
