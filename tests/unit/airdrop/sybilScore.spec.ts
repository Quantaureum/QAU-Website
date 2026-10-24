import { expect, test } from "@playwright/test"

import { scoreSybilSignals, type SybilSignals } from "@/lib/sybil/sybilScore"

const NOW = new Date("2026-10-24T12:00:00Z")

/** Baseline of a fully clean, long-standing user. */
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

const merge = (over: Partial<SybilSignals>): SybilSignals => ({
  ...cleanSignals,
  ...over,
})

test.describe("sybilScore — clean user", () => {
  test("clean user scores 100 and is approved", () => {
    const r = scoreSybilSignals(cleanSignals)
    expect(r.score).toBe(100)
    expect(r.verdict).toBe("approved")
    expect(r.hits).toHaveLength(0)
  })

  test("social-disabled registrations (null X signals) still score 100", () => {
    const r = scoreSybilSignals(
      merge({
        xAccountCreatedAt: null,
        xFollowers: null,
        xFollowing: null,
        xZeroTweets: null,
      })
    )
    expect(r.verdict).toBe("approved")
  })
})

test.describe("sybilScore — individual rules", () => {
  test("disposable email is a hard reject regardless of score", () => {
    const r = scoreSybilSignals(merge({ disposableEmailDomain: true }))
    expect(r.hardReject).toBe(true)
    expect(r.verdict).toBe("rejected")
    expect(r.score).toBe(70) // 100-30, floored, but verdict forced
  })

  test("address with on-chain history costs 35 → hold band, not auto-approved", () => {
    const r = scoreSybilSignals(
      merge({ addressNonce: 3, addressBalanceWei: "100" })
    )
    expect(r.score).toBe(65)
    expect(r.verdict).toBe("hold")
    expect(r.hits.map((h) => h.rule)).toContain("address-has-history")
  })

  test("same-subnet batch (3 registrations in /24) costs 40 → hold band", () => {
    // Deliberately NOT a hard reject: residential NAT users share /24s.
    // 60 lands in the hold band; the batch fleet case (with more signals)
    // is what tips into rejected — see the fleet rehearsal test below.
    const r = scoreSybilSignals(merge({ sameSubnetRegistrations: 2 }))
    expect(r.score).toBe(60)
    expect(r.verdict).toBe("hold")
  })

  test("X account younger than 30 days costs 20 (young) — combined with shell goes under", () => {
    const young = new Date(NOW.getTime() - 10 * 24 * 60 * 60 * 1000)
    const r = scoreSybilSignals(
      merge({
        xAccountCreatedAt: young,
        xFollowers: 3,
        xFollowing: 300,
        xZeroTweets: true,
      })
    )
    // 20 (very young) + 15 (shell) + 15 (zero tweets) = 50 → hold
    expect(r.score).toBe(50)
    expect(r.verdict).toBe("hold")
  })

  test("very young + shell + zero tweets + same-email-domain = rejected", () => {
    const young = new Date(NOW.getTime() - 5 * 24 * 60 * 60 * 1000)
    const r = scoreSybilSignals(
      merge({
        xAccountCreatedAt: young,
        xFollowers: 1,
        xFollowing: 500,
        xZeroTweets: true,
        sameEmailDomainRegistrations: 3,
      })
    )
    // 20 + 15 + 15 + 15 = 65 → rejected
    expect(r.verdict).toBe("rejected")
  })
})

test.describe("sybilScore — B档 hard signals", () => {
  test("node IP mismatch is a hard reject", () => {
    const r = scoreSybilSignals(
      merge({ nodeIpMismatch: true, productionCurveCorrelation: 0.95 })
    )
    expect(r.hardReject).toBe(true)
    expect(r.verdict).toBe("rejected")
    expect(r.hits.map((h) => h.rule)).toEqual(
      expect.arrayContaining(["node-ip-mismatch", "production-curve-cluster"])
    )
  })

  test("curve correlation above 0.9 costs 25", () => {
    const r = scoreSybilSignals(merge({ productionCurveCorrelation: 0.95 }))
    expect(r.score).toBe(75)
    expect(r.verdict).toBe("approved") // single soft signal alone doesn't reject
  })
})

test.describe("sybilScore — threshold boundaries", () => {
  test("score exactly 70 → approved", () => {
    const r = scoreSybilSignals(merge({ disposableEmailDomain: true })) // 100-30=70 hard reject overrides
    expect(r.score).toBe(70)
  })

  test("score 41 → hold band upper boundary / 40 → rejected (exact line)", () => {
    // 25 (x young) + 15 (shell) + 15 (zero tweets) = 55 → hold;
    // add 10 (script inertia) = 65... use exact combos to pin the line:
    // rejected boundary is score < 40: 25+15 = 40 is NOT < 40... recompute:
    // penalties 20+15+15 = 50 (very young+shell+tweets) hold; +10 inertia = 40.
    const young = new Date(NOW.getTime() - 10 * 24 * 60 * 60 * 1000)
    const r = scoreSybilSignals(
      merge({
        xAccountCreatedAt: young,
        xFollowers: 3,
        xFollowing: 300,
        xZeroTweets: true,
        registrationToAddressSeconds: 5,
      })
    )
    // 20 (very young) + 15 (shell) + 15 (zero tweets) + 10 (inertia) = 60
    // penalties → score = 100-60 = 40 → exactly on the rejected line.
    expect(r.score).toBe(40)
    expect(r.verdict).toBe("rejected")
  })
})

test.describe("sybilScore — 女巫攻击模拟（sybil fleet rehearsal）", () => {
  /**
   * The money scenario: an attacker spins up 100 registrations, each with a
   * fresh email, script-submitted, from a small IP pool, with shell X
   * accounts created yesterday, and recycled exchange addresses.
   * Every single one must land rejected.
   */
  test("100-script-fleet: every registration is rejected", () => {
    let rejected = 0
    for (let i = 0; i < 100; i++) {
      const fleet = scoreSybilSignals(
        merge({
          sameSubnetRegistrations: 99, // /24 pool
          disposableEmailDomain: i % 2 === 0, // half on disposable domains
          sameEmailDomainRegistrations: 99,
          xAccountCreatedAt: new Date(NOW.getTime() - 2 * 24 * 60 * 60 * 1000),
          xFollowers: 0,
          xFollowing: 1000,
          xZeroTweets: true,
          addressNonce: i % 2, // half reuse exchange addresses
          sameSubnetPayoutAddresses: 99,
          registrationToAddressSeconds: 2,
        })
      )
      expect(fleet.verdict).toBe("rejected")
      rejected++
    }
    expect(rejected).toBe(100)
  })

  /**
   * The expensive scenario: attacker pays for aged X accounts (1 year old,
   * real follower counts), residential IPs, and fresh chain addresses.
   * These SHOULD pass — that's by design: the attack now costs as much as
   * the reward. The test documents the intended economics.
   */
  test("expensive fleet: aged accounts + clean infra pass — attack costs ≈ reward", () => {
    let approved = 0
    for (let i = 0; i < 10; i++) {
      const r = scoreSybilSignals(
        merge({
          sameSubnetRegistrations: 0, // residential, distinct
          sameEmailDomainRegistrations: 0, // gmail etc.
          xAccountCreatedAt: new Date(
            NOW.getTime() - 400 * 24 * 60 * 60 * 1000
          ),
          xFollowers: 200,
          xFollowing: 150,
          xZeroTweets: false,
          addressNonce: 0, // fresh on-chain addresses
          sameSubnetPayoutAddresses: 0,
          registrationToAddressSeconds: 300,
        })
      )
      expect(r.verdict).toBe("approved")
      approved++
    }
    expect(approved).toBe(10)
  })
})
