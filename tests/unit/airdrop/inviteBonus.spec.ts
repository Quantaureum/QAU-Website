/**
 * Invite-bonus acceptance assertions (plan §7.1, the 14-item checklist) —
 * pure-logic tier. These run everywhere (no DB): scorer purity, threshold
 * rules, batch build rules, kill-switch criterion, terminal-state semantics.
 * The DB-level counterparts (unique constraints, hook orchestration) live in
 * inviteBonusDb.spec.ts and the dev dry-run.
 */

import { expect, test } from "@playwright/test"

import {
  BONUS_PAUSE_THRESHOLDS,
  getInviteBonusConfig,
  isBonusPayoutPaused,
  maxBonusPerUserQau,
  shouldAutoPauseBonusPayout,
} from "@/lib/airdrop/airdropConfig"
import {
  applyClusterVoid,
  BONUS_BATCH_TYPE,
  type BonusRecordLike,
  buildBonusBatch,
  computeEarnedRounds,
  isApprovalBonusEligible,
  isBonusPayable,
  isoWeekStart,
  reconcileBonusPool,
  roundsToCreate,
} from "@/lib/airdrop/inviteBonus"
import {
  CLUSTER_SCAN_THRESHOLDS,
  type ClusterMember,
  countDistinctClusters,
  pickTrackBCandidates,
  scanClusterTrackA,
  type TrackBCandidate,
} from "@/lib/sybil/clusterScan"
import { scoreSybilSignals, type SybilSignals } from "@/lib/sybil/sybilScore"

const NOW = new Date("2026-11-12T12:00:00Z")

const bonusCfg = {
  ...getInviteBonusConfig({
    AIRDROP_INVITE_BONUS_ENABLED: "1",
  }),
}

const cleanSignals: SybilSignals = {
  sameSubnetRegistrations: 0,
  disposableEmailDomain: false,
  sameEmailDomainRegistrations: 0,
  xAccountCreatedAt: new Date(NOW.getTime() - 400 * 24 * 60 * 60 * 1000),
  xFollowers: 120,
  xFollowing: 80,
  xZeroTweets: false,
  xFollowsCampaign: true,
  addressNonce: 0,
  addressBalanceWei: "0",
  sameSubnetPayoutAddresses: 0,
  registrationToAddressSeconds: 180,
  productionCurveCorrelation: null,
  nodeIpMismatch: null,
  now: NOW,
}

function bonusRecord(over: Partial<BonusRecordLike>): BonusRecordLike {
  return {
    id: 1,
    inviterRegistrationId: 100,
    round: 1,
    amountQau: 30,
    status: "pending",
    revoked: false,
    batchRef: null,
    ...over,
  }
}

// ---------------------------------------------------------------------------
// Assertion 1 — the invite code NEVER enters the sybil scorer
// ---------------------------------------------------------------------------

test.describe("assertion 1: scorer purity vs the invite code", () => {
  test("SybilSignals input domain contains no invite field (structural lock)", () => {
    // The scorer's input interface is pinned: any future "invite" input
    // would break the plan's design rule 2 and must fail this test.
    const expected = new Set([
      "sameSubnetRegistrations",
      "disposableEmailDomain",
      "sameEmailDomainRegistrations",
      "xAccountCreatedAt",
      "xFollowers",
      "xFollowing",
      "xZeroTweets",
      "xFollowsCampaign",
      "addressNonce",
      "addressBalanceWei",
      "sameSubnetPayoutAddresses",
      "registrationToAddressSeconds",
      "productionCurveCorrelation",
      "nodeIpMismatch",
      "now",
    ])
    const keys = Object.keys(cleanSignals)
    expect(new Set(keys)).toEqual(expected)
    expect(keys.some((k) => k.toLowerCase().includes("invite"))).toBe(false)
  })

  test("score ignores injected invite context and stays deterministic", () => {
    const withInvite = {
      ...cleanSignals,
      // An invite code riding along in the object must be inert: the pure
      // function reads exactly the declared signals.
      inviteCode: "ab23456789",
      invitedBy: 42,
    } as SybilSignals & { inviteCode: string; invitedBy: number }
    const a = scoreSybilSignals(cleanSignals)
    const b = scoreSybilSignals(withInvite)
    expect(b.score).toBe(a.score)
    expect(b.verdict).toBe(a.verdict)
    expect(b.hits).toEqual(a.hits)
    // Determinism (purity): same input → identical result, no clock/random.
    expect(scoreSybilSignals(withInvite)).toEqual(b)
  })
})

// ---------------------------------------------------------------------------
// Assertion 2/5 — unique inviter per invitee, no duplicate counting
// (in-memory counterpart; DB constraint proof in inviteBonusDb.spec.ts)
// ---------------------------------------------------------------------------

test.describe("assertion 2/5: one invitee, one inviter — no duplicate counting", () => {
  test("relation map keyed by invitee admits only the first inviter", () => {
    // Mirrors createInviteRelation (ON CONFLICT (invitee) DO NOTHING).
    const relations = new Map<number, number>() // invitee → inviter
    const create = (inviter: number, invitee: number) => {
      if (inviter === invitee) return false
      if (relations.has(invitee)) return false
      relations.set(invitee, inviter)
      return true
    }
    expect(create(100, 200)).toBe(true)
    expect(create(300, 200)).toBe(false) // second inviter rejected
    expect(create(100, 200)).toBe(false) // re-registration cannot re-link
    expect(create(200, 200)).toBe(false) // self-invite impossible
    // Counting is per distinct invitee — duplicates cannot inflate it.
    const approvedCountFor = (inviter: number) =>
      [...relations.values()].filter((i) => i === inviter).length
    expect(approvedCountFor(100)).toBe(1)
    expect(approvedCountFor(300)).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Assertion 3/4 — bonus rounds: 3 approvals → round 1; downstream never paid
// ---------------------------------------------------------------------------

test.describe("assertion 3/4: round accounting — inviter earns, downstream never", () => {
  test("3 approved invitees earn round 1, 6 earn round 2, 9 stay capped at 2", () => {
    expect(computeEarnedRounds(2, bonusCfg)).toBe(0)
    expect(computeEarnedRounds(3, bonusCfg)).toBe(1)
    expect(computeEarnedRounds(5, bonusCfg)).toBe(1)
    expect(computeEarnedRounds(6, bonusCfg)).toBe(2)
    expect(computeEarnedRounds(9, bonusCfg)).toBe(2) // per-user cap: 60 QAU
    expect(maxBonusPerUserQau(bonusCfg)).toBe(60)
  })

  test("missing rounds are back-filled exactly once (idempotent)", () => {
    expect(roundsToCreate([], 1)).toEqual([1])
    expect(roundsToCreate([1], 1)).toEqual([])
    expect(roundsToCreate([1], 2)).toEqual([2])
    expect(roundsToCreate([1, 2], 2)).toEqual([])
  })

  test("being approved AS INVITED never creates the invitee's own bonus", () => {
    // The hook's shape: approval of invitee #200 (invited by #100) touches
    // only inviter #100's round counter. #200 has invited nobody, so #200
    // has zero earned rounds regardless of being invited — 设计总则 4.
    const invitedUserEarnedRounds = computeEarnedRounds(0, bonusCfg)
    expect(invitedUserEarnedRounds).toBe(0)
    expect(roundsToCreate([], invitedUserEarnedRounds)).toEqual([])
    // Structural lock: bonus rows are keyed by the INVITER column only —
    // there is no "invitee bonus" concept in the record shape at all.
    const record = bonusRecord({})
    expect(Object.keys(record)).not.toContain("inviteeRegistrationId")
  })
})

// ---------------------------------------------------------------------------
// Assertion 6/9 — track-A cluster hit voids pending rounds, terminal states
// ---------------------------------------------------------------------------

test.describe("assertion 6/9: cluster void freezes bonuses only, and is terminal", () => {
  test("void flips pending → void; paid and already-void stay untouched", () => {
    const records = [
      bonusRecord({ id: 1, status: "pending" }),
      bonusRecord({ id: 2, status: "paid" }),
      bonusRecord({ id: 3, status: "void" }),
    ]
    const { records: after, voidedCount } = applyClusterVoid(records, 100)
    expect(voidedCount).toBe(1)
    expect(after.find((r) => r.id === 1)?.status).toBe("void")
    expect(after.find((r) => r.id === 2)?.status).toBe("paid")
    expect(after.find((r) => r.id === 3)?.status).toBe("void")
  })

  test("void is scoped to the hit cluster's inviter only", () => {
    const records = [
      bonusRecord({ id: 1, inviterRegistrationId: 100 }),
      bonusRecord({ id: 2, inviterRegistrationId: 200 }),
    ]
    const { records: after, voidedCount } = applyClusterVoid(records, 100)
    expect(voidedCount).toBe(1)
    expect(after.find((r) => r.id === 2)?.status).toBe("pending")
  })

  test("voided round never resurrects and never re-pays (作废不复活)", () => {
    // A later clean re-scan restores FUTURE eligibility only: round 2 can be
    // created while the voided round 1 stays void — never re-created, never
    // flipped back to pending.
    const existingRounds = [1] // round 1 record exists (status void)
    expect(roundsToCreate(existingRounds, 2)).toEqual([2])
    expect(roundsToCreate(existingRounds, 1)).toEqual([])
    const voided = bonusRecord({ id: 1, status: "void" })
    const reApplied = applyClusterVoid([voided], 100)
    expect(reApplied.voidedCount).toBe(0)
    expect(reApplied.records[0].status).toBe("void")
    expect(isBonusPayable(voided)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Assertion 8 — track-A scan thresholds incl. whitelist + S9 corroboration
// ---------------------------------------------------------------------------

function member(over: Partial<ClusterMember>): ClusterMember {
  return {
    registrationId: 1,
    ipPrefix24: null,
    emailDomain: "",
    addressPrefix: "",
    ...over,
  }
}

const scanDeps = (correlated: boolean) => ({
  addressByRegistrationId: new Map<number, string>([
    [1, "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa01"],
    [2, "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa02"],
    [3, "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa03"],
  ]),
  anchorAddresses: ["0x1111111111111111111111111111111111111111"],
  transferRelated: async () => correlated,
})

test.describe("assertion 8: track-A thresholds (S1≥3, S7≥3 whitelist-exempt, S9≥2 corroborated)", () => {
  test("S1 fires at ≥3 downstreams sharing one /24", async () => {
    const members = [
      member({ registrationId: 1, ipPrefix24: "1.2.3.0/24" }),
      member({ registrationId: 2, ipPrefix24: "1.2.3.0/24" }),
      member({ registrationId: 3, ipPrefix24: "1.2.3.0/24" }),
    ]
    const hits = await scanClusterTrackA(members, scanDeps(false))
    expect(hits.find((h) => h.rule === "S1")).toEqual({
      rule: "S1",
      key: "1.2.3.0/24",
      count: 3,
    })
    // Two members sharing a subnet stay below the pinned threshold.
    const two = await scanClusterTrackA(members.slice(0, 2), scanDeps(false))
    expect(two.find((h) => h.rule === "S1")).toBeUndefined()
  })

  test("S7 fires at ≥3 sharing a non-whitelisted domain", async () => {
    const members = [1, 2, 3].map((i) =>
      member({ registrationId: i, emailDomain: "farmbox.example" })
    )
    const hits = await scanClusterTrackA(members, scanDeps(false))
    expect(hits.find((h) => h.rule === "S7")?.key).toBe("farmbox.example")
  })

  test("S7 whitelist: common provider domains never fire (豁免 gmail/qq/163…)", async () => {
    // Even 10 downstreams on gmail.com stay clean — the whitelist is the
    // review-pinned exemption; offenders must be caught by S1/S9/track-B.
    const members = Array.from({ length: 10 }, (_, i) =>
      member({ registrationId: i + 1, emailDomain: "gmail.com" })
    )
    const hits = await scanClusterTrackA(members, scanDeps(false))
    expect(hits.find((h) => h.rule === "S7")).toBeUndefined()
    for (const domain of ["outlook.com", "qq.com", "163.com", "126.com"]) {
      const crowd = [1, 2, 3].map((i) =>
        member({ registrationId: i, emailDomain: domain })
      )
      expect(
        (await scanClusterTrackA(crowd, scanDeps(false))).find(
          (h) => h.rule === "S7"
        )
      ).toBeUndefined()
    }
    expect(CLUSTER_SCAN_THRESHOLDS.sameEmailDomain).toBe(3)
  })

  test("S9 fires at ≥2 same-prefix ONLY with transfer corroboration (佐证)", async () => {
    const members = [
      member({ registrationId: 1, addressPrefix: "aaaa" }),
      member({ registrationId: 2, addressPrefix: "aaaa" }),
    ]
    // Corroborated (on-chain transfer link exists) → the cluster counts.
    const withProof = await scanClusterTrackA(members, scanDeps(true))
    expect(withProof.find((h) => h.rule === "S9")?.key).toBe("aaaa")
    // No corroboration → S9 stays silent (anti-false-positive guard).
    const unproved = await scanClusterTrackA(members, scanDeps(false))
    expect(unproved.find((h) => h.rule === "S9")).toBeUndefined()
    // Provider throwing must also stay silent (fail-open by contract).
    const broken = await scanClusterTrackA(members, {
      addressByRegistrationId: scanDeps(false).addressByRegistrationId,
      anchorAddresses: [],
      transferRelated: async () => {
        throw new Error("explorer down")
      },
    })
    expect(broken.find((h) => h.rule === "S9")).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// Assertion 7 — track B: candidates from full-network recompute ∩ cluster
// ---------------------------------------------------------------------------

test.describe("assertion 7: track-B candidate extraction (human-confirmed trigger)", () => {
  test("only groups containing a cluster member become candidates", () => {
    const networkGroups: TrackBCandidate[] = [
      { rule: "S1", key: "9.9.9.0/24", registrationIds: [10, 11, 12] },
      { rule: "S1", key: "7.7.7.0/24", registrationIds: [20, 21, 22] },
    ]
    const clusterMembers = new Set([22, 99])
    const candidates = pickTrackBCandidates(networkGroups, clusterMembers)
    expect(candidates).toHaveLength(1)
    expect(candidates[0].key).toBe("7.7.7.0/24")
    expect(candidates[0].registrationIds).toContain(22)
  })
})

// ---------------------------------------------------------------------------
// Assertion 10/12 — whole-batch build: pool breaker + reconciliation marker
// ---------------------------------------------------------------------------

test.describe("assertion 10/12: batch build — pool refusal, one row per address, bonus-invite marker", () => {
  const twoRoundSameInviter = [
    bonusRecord({ id: 1, inviterRegistrationId: 100, round: 1 }),
    bonusRecord({ id: 2, inviterRegistrationId: 100, round: 2 }),
    bonusRecord({ id: 3, inviterRegistrationId: 200, round: 1 }),
  ]

  test("happy path: per-inviter aggregation, memo carries the batch type", () => {
    const result = buildBonusBatch({
      eligible: twoRoundSameInviter,
      poolRemainingQau: 60000,
      cfg: bonusCfg,
      lastWeekClusterHits: 0,
      currentWeekClusterHits: 0,
      now: NOW,
      batchRef: "bonus-invite-20261112-ab12cd",
    })
    if (!result.ok) throw new Error(`expected ok, got ${result.code}`)
    expect(result.totalAmountQau).toBe(90)
    expect(result.poolRemainingAfterQau).toBe(59910)
    // One row per inviter ⇒ one row per payout address per batch — the
    // distributor's per-file duplicate-address check passes unchanged.
    expect(result.rows).toHaveLength(2)
    const inviter100 = result.rows.find((r) => r.inviterRegistrationId === 100)
    expect(inviter100?.amountQau).toBe(60)
    expect(inviter100?.memo.startsWith(`${BONUS_BATCH_TYPE}:`)).toBe(true)
  })

  test("pool below the batch total refuses the ENTIRE batch (整批拒付)", () => {
    const result = buildBonusBatch({
      eligible: twoRoundSameInviter,
      poolRemainingQau: 89, // one QAU short of 90 — no partial payout
      cfg: bonusCfg,
      lastWeekClusterHits: 0,
      currentWeekClusterHits: 0,
      now: NOW,
      batchRef: "bonus-invite-20261112-ab12cd",
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.code).toBe("pool_insufficient")
      expect(result.poolRemainingQau).toBe(89)
      expect(result.requiredQau).toBe(90)
    }
  })

  test("revoked and paid records never enter a batch", () => {
    const result = buildBonusBatch({
      eligible: [
        bonusRecord({ id: 1, revoked: true }),
        bonusRecord({ id: 2, status: "paid" }),
      ],
      poolRemainingQau: 60000,
      cfg: bonusCfg,
      lastWeekClusterHits: 0,
      currentWeekClusterHits: 0,
      now: NOW,
      batchRef: "bonus-invite-20261112-ab12cd",
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe("no_pending_bonus")
  })

  test("bonus ledger reconciliation: pool − Σpaid = remaining (误差 < 0.01)", () => {
    const rec = reconcileBonusPool(60000, 90)
    expect(rec.remainingQau).toBe(59910)
    expect(
      Math.abs(rec.poolQau - rec.paidTotalQau - rec.remainingQau)
    ).toBeLessThan(0.01)
  })
})

// ---------------------------------------------------------------------------
// Assertion 11 — kill-switch: manual flag + pinned week-over-week criterion
// ---------------------------------------------------------------------------

test.describe("assertion 11: kill-switch and the v4-pinned multiplier criterion", () => {
  test("manual pause flag wins outright", () => {
    const paused = getInviteBonusConfig({ AIRDROP_INVITE_BONUS_PAUSED: "1" })
    expect(isBonusPayoutPaused(paused, 0, 0)).toBe(true)
  })

  test("absolute criterion: ≥5 hit clusters in one week trips the pause", () => {
    expect(BONUS_PAUSE_THRESHOLDS.absoluteClusterHits).toBe(5)
    expect(shouldAutoPauseBonusPayout(0, 5)).toBe(true)
    expect(shouldAutoPauseBonusPayout(0, 4)).toBe(false)
  })

  test("v4 钉死 case 1: last week 1 → current 4 does NOT trip (低基数毛刺)", () => {
    expect(shouldAutoPauseBonusPayout(1, 4)).toBe(false)
  })

  test("v4 钉死 case 2: last week 2 → current 7 trips (7 > 3×2)", () => {
    expect(BONUS_PAUSE_THRESHOLDS.weekOverWeekBaseClusters).toBe(2)
    expect(shouldAutoPauseBonusPayout(2, 7)).toBe(true)
    // Below the absolute band the ratio decides: lastWeek 2 → current 4 is
    // under 3× and under 5, so neither criterion trips.
    expect(shouldAutoPauseBonusPayout(2, 4)).toBe(false)
    // current 6 is exactly 3× (not >) but also inside the ≥5 absolute band —
    // the trip there comes from the absolute criterion, by design.
    expect(shouldAutoPauseBonusPayout(2, 6)).toBe(true)
  })

  test("multiplier gate is dormant below the ≥2 base", () => {
    expect(shouldAutoPauseBonusPayout(0, 4)).toBe(false)
    expect(shouldAutoPauseBonusPayout(1, 3)).toBe(false)
  })

  test("feature defaults are fail-closed (off until explicitly enabled)", () => {
    const off = getInviteBonusConfig({})
    expect(off.enabled).toBe(false)
    expect(off.payoutPaused).toBe(false)
    expect(off.bonusPerRoundQau).toBe(30)
    expect(off.roundSize).toBe(3)
    expect(off.maxRounds).toBe(2)
    expect(off.poolQau).toBe(60000)
    expect(off.approvalCutoffAt?.toISOString()).toBe("2026-12-08T23:59:59.000Z")
    expect(off.settleEndAt?.toISOString()).toBe("2026-12-14T23:59:59.000Z")
  })

  test("distinct-cluster counting dedupes per inviter (counting口径)", () => {
    const hits = [
      { inviterRegistrationId: 100 },
      { inviterRegistrationId: 100 },
      { inviterRegistrationId: 200 },
    ]
    expect(countDistinctClusters(hits)).toBe(2)
  })
})

// ---------------------------------------------------------------------------
// Assertion 13 — revocation semantics (pending-only, final)
// ---------------------------------------------------------------------------

test.describe("assertion 13: revocation is pending-only and final", () => {
  test("a revoked record is not payable and never re-created", () => {
    const revoked = bonusRecord({ id: 1, revoked: true })
    expect(isBonusPayable(revoked)).toBe(false)
    // The round still "exists" (unique (inviter, round)) — a later approval
    // wave cannot regenerate the revoked round into a second payout.
    expect(roundsToCreate([1], 1)).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// Assertion 14 — cutoff + final settlement window
// ---------------------------------------------------------------------------

test.describe("assertion 14: approval cutoff and settlement channel close", () => {
  test("approvals after 12-08 never count toward bonuses (N5)", () => {
    const cutoff = bonusCfg.approvalCutoffAt
    expect(
      isApprovalBonusEligible(new Date("2026-12-08T12:00:00Z"), cutoff)
    ).toBe(true)
    expect(
      isApprovalBonusEligible(new Date("2026-12-09T00:00:01Z"), cutoff)
    ).toBe(false)
    expect(isApprovalBonusEligible(null, cutoff)).toBe(false)
  })

  test("after the settle window the bonus channel is closed for the whole batch", () => {
    const result = buildBonusBatch({
      eligible: [bonusRecord({})],
      poolRemainingQau: 60000,
      cfg: bonusCfg,
      lastWeekClusterHits: 0,
      currentWeekClusterHits: 0,
      now: new Date("2026-12-15T00:00:01Z"),
      batchRef: "bonus-invite-20261215-ab12cd",
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.code).toBe("bonus_channel_closed")
    // The last batch inside the window still pays everything payable.
    const finalBatch = buildBonusBatch({
      eligible: [
        bonusRecord({}),
        bonusRecord({ id: 2, inviterRegistrationId: 200 }),
      ],
      poolRemainingQau: 60000,
      cfg: bonusCfg,
      lastWeekClusterHits: 0,
      currentWeekClusterHits: 0,
      now: new Date("2026-12-14T23:59:59Z"),
      batchRef: "bonus-invite-20261214-ab12cd",
    })
    expect(finalBatch.ok).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Week boundary helper (kill-switch weekly counting)
// ---------------------------------------------------------------------------

test.describe("isoWeekStart", () => {
  test("snaps to Monday 00:00 UTC", () => {
    expect(isoWeekStart(new Date("2026-11-12T12:00:00Z")).toISOString()).toBe(
      "2026-11-09T00:00:00.000Z"
    ) // 2026-11-12 is a Thursday → Monday is 11-09
    expect(isoWeekStart(new Date("2026-11-09T00:00:01Z")).toISOString()).toBe(
      "2026-11-09T00:00:00.000Z"
    )
    expect(isoWeekStart(new Date("2026-11-08T23:59:59Z")).toISOString()).toBe(
      "2026-11-02T00:00:00.000Z"
    )
  })
})
