/**
 * Invitation-cluster re-scan — pure functions only.
 *
 * Plan 运营中心/11-病毒增长/B档裂变改造方案-v2.md §3.1 (pinned by anti-sybil
 * reviews v2 N1 / v3 / v4): before every bonus-invite batch is generated,
 * each inviter's downstream cluster is re-scanned on the two tracks:
 *
 *   Track A (intra-cluster aggregation, "rule is the judge", no human step)
 *     S1 — ≥ 3 downstreams share one /24 IP subnet (threshold = 防护 v2 S1)
 *     S7 — ≥ 3 downstreams share one email domain, with the common-provider
 *          whitelist (gmail/outlook/qq/163/126/…) exempt
 *     S9 — ≥ 2 downstreams share one payout-address prefix, counted only when
 *          the address-relation corroboration holds (on-chain transfer link
 *          between the hit address and another cluster member or the inviter)
 *     any hit → the inviter's not-yet-paid bonus rounds of this batch cycle
 *     are voided automatically
 *
 *   Track B (full-network recompute ∩ cluster members, human-confirmed):
 *     the whole network is re-grouped per 防护 v2 GROUP BY semantics; groups
 *     that contain a cluster member are reported as candidates and only void
 *     bonuses after an operator confirms the evidence at the weekly dry-run
 *     review. This catches slow-drip farms whose per-registration signals
 *     never fire at registration time.
 *
 * Everything here is pure and synchronous except the injected S9
 * corroboration provider, so unit tests pin the thresholds and the whitelist
 * with in-memory fixtures. Callers own the DB writes (voids live in the
 * bonus-record table; the registration state machine is NEVER touched —
 * downstream main payouts are unaffected, plan §3.1 N2).
 */

import { isCommonEmailDomainName } from "./signals"

/** Pinned thresholds (防护 v2 S1/S9 + review-pinned S7), mirrored in tests. */
export const CLUSTER_SCAN_THRESHOLDS = {
  /** S1: downstreams sharing one /24 that trips the cluster rule. */
  sameSubnet: 3,
  /** S7: downstreams sharing one non-whitelisted email domain. */
  sameEmailDomain: 3,
  /** S9: downstreams sharing one payout-address prefix segment. */
  sameAddressPrefix: 2,
} as const

/**
 * Minimal per-member facts needed for the scan. Derived server-side from
 * already-stored registration columns; no PII beyond what the sybil scorer
 * already consumes (no nickname, no device fingerprint — privacy red line).
 */
export interface ClusterMember {
  registrationId: number
  /** /24 subnet of the registration IP, or null when unknown. */
  ipPrefix24: string | null
  /** Lower-cased email domain (e.g. "gmail.com"). */
  emailDomain: string
  /** First 4 hex chars of the payout address (lower-case, no 0x). */
  addressPrefix: string
}

export type ClusterRule = "S1" | "S7" | "S9"

export interface ClusterHit {
  rule: ClusterRule
  /** Which aggregate key fired (subnet / domain / address prefix). */
  key: string
  /** How many members matched (for the audit trail). */
  count: number
}

/**
 * Injected S9 corroboration: does an on-chain transfer relation exist
 * between the two addresses (either direction)? The website wires this to
 * its explorer index; ops-side re-scan tooling may mock it. Fail-open by
 * contract: a provider error must resolve to `false` (S9 stays silent) —
 * corroboration only ever guards against false positives, its absence must
 * not freeze bonuses.
 */
export type TransferRelationProvider = (
  addressA: string,
  addressB: string
) => Promise<boolean>

export interface TrackADeps {
  /**
   * Payout addresses (0x-prefixed) by registration id, needed to ask the S9
   * provider concrete address pairs when a prefix group fires.
   */
  addressByRegistrationId: Map<number, string>
  /**
   * The inviter's own payout address joins the S9 corroboration pool as the
   * cluster anchor ("存在链上转账关联 … 或邀请人") but is NEVER aggregated
   * into the S1/S7/S9 counts themselves — those stay downstream-only.
   */
  anchorAddresses: string[]
  transferRelated: TransferRelationProvider
}

function groupCounts(values: (string | null)[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const v of values) {
    if (!v) continue
    counts.set(v, (counts.get(v) ?? 0) + 1)
  }
  return counts
}

/** Track A: scan ONE inviter's downstream cluster. Pure except S9 provider. */
export async function scanClusterTrackA(
  members: ClusterMember[],
  deps: TrackADeps
): Promise<ClusterHit[]> {
  const hits: ClusterHit[] = []

  // S1: /24 subnet aggregation (exclude members with unknown subnet).
  for (const [subnet, count] of groupCounts(members.map((m) => m.ipPrefix24))) {
    if (count >= CLUSTER_SCAN_THRESHOLDS.sameSubnet) {
      hits.push({ rule: "S1", key: subnet, count })
    }
  }

  // S7: email-domain aggregation with the common-provider whitelist exempt.
  for (const [domain, count] of groupCounts(
    members.map((m) => m.emailDomain)
  )) {
    if (domain && !isCommonEmailDomainName(domain)) {
      if (count >= CLUSTER_SCAN_THRESHOLDS.sameEmailDomain) {
        hits.push({ rule: "S7", key: domain, count })
      }
    }
  }

  // S9: payout-address prefix aggregation, gated by transfer corroboration.
  for (const [prefix, count] of groupCounts(
    members.map((m) => m.addressPrefix)
  )) {
    if (count < CLUSTER_SCAN_THRESHOLDS.sameAddressPrefix) continue
    const inGroup = members.filter((m) => m.addressPrefix === prefix)
    const corroborated = await hasCorroboratedPair(inGroup, deps)
    if (corroborated) {
      hits.push({ rule: "S9", key: prefix, count })
    }
  }

  return hits
}

/**
 * S9 corroboration (plan §3.1: "仅当命中地址与簇内其他成员或邀请人存在链上
 * 转账关联时才计入"): a prefix group counts only when at least one of its
 * members is transfer-related to another group member (the inviter's own
 * address joins the candidate pool as the cluster anchor).
 */
async function hasCorroboratedPair(
  group: ClusterMember[],
  deps: TrackADeps
): Promise<boolean> {
  const addresses = group
    .map((m) => deps.addressByRegistrationId.get(m.registrationId))
    .filter((a): a is string => Boolean(a))
  // Candidate pair pool: group members themselves + the inviter anchor(s).
  const pool = [...addresses, ...deps.anchorAddresses]
  for (let i = 0; i < addresses.length; i++) {
    for (let j = 0; j < pool.length; j++) {
      if (addresses[i] === pool[j]) continue
      let related = false
      try {
        related = await deps.transferRelated(addresses[i], pool[j])
      } catch {
        // Provider failure must never void bonuses: treat as not related.
        related = false
      }
      if (related) return true
    }
  }
  return false
}

/**
 * Track B candidate extraction: given full-network recompute groups (the
 * 防护 v2 GROUP BY output — one entry per subnet/domain/prefix bucket that
 * exceeded the network-wide threshold) and the set of registration ids that
 * belong to invitation clusters (any downstream or inviter), return the
 * groups that contain at least one cluster member. Pure.
 */
export interface TrackBCandidate {
  /** Aggregation rule the network group came from (reuses rule names). */
  rule: ClusterRule
  key: string
  registrationIds: number[]
}

export function pickTrackBCandidates(
  networkGroups: TrackBCandidate[],
  clusterMemberRegistrationIds: Set<number>
): TrackBCandidate[] {
  return networkGroups.filter((g) =>
    g.registrationIds.some((id) => clusterMemberRegistrationIds.has(id))
  )
}

/**
 * Deduplicated cluster-hit count for the kill-switch criterion input
 * (review v4 §2 remark 2: track-A automatic + track-B confirmed hits,
 * deduplicated per cluster/inviter). Pure.
 */
export function countDistinctClusters(
  hits: { inviterRegistrationId: number }[]
): number {
  return new Set(hits.map((h) => h.inviterRegistrationId)).size
}
