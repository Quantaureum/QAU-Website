/**
 * Payout state-machine rules (audit H-04) — pure tier, no DB.
 *
 * Locks the failure dispositions: only a reserved (never broadcast) row may
 * return to the idle queue; broadcast/confirming rows with an uncertain
 * outcome park as 'unknown' for reconciliation; settled states are inert.
 */

import { expect, test } from "@playwright/test"

import {
  dispositionForPayoutFailure,
  isPayoutQueueEligible,
  PAYING_PAYOUT_STATES,
  type PayoutState,
  STUCK_PAYOUT_STATES,
} from "@/lib/airdrop/payoutState"

const ALL_STATES: PayoutState[] = [
  "idle",
  "reserved",
  "broadcast",
  "confirming",
  "unknown",
  "paid",
]

test.describe("payout failure disposition (H-04)", () => {
  test("reserved (never broadcast) releases back to the idle queue", () => {
    expect(dispositionForPayoutFailure("reserved")).toEqual({
      action: "release",
      to: "idle",
    })
  })

  test("broadcast/confirming park as unknown — never re-queued directly", () => {
    expect(dispositionForPayoutFailure("broadcast")).toEqual({
      action: "park",
      to: "unknown",
    })
    expect(dispositionForPayoutFailure("confirming")).toEqual({
      action: "park",
      to: "unknown",
    })
  })

  test("idle/unknown/paid are inert (already settled, parked or queued)", () => {
    for (const state of ["idle", "unknown", "paid"] as PayoutState[]) {
      expect(dispositionForPayoutFailure(state)).toEqual({ action: "ignore" })
    }
  })

  test("every state has a defined disposition", () => {
    for (const state of ALL_STATES) {
      expect(dispositionForPayoutFailure(state).action).toBeDefined()
    }
  })
})

test.describe("payout queue eligibility (H-04)", () => {
  test("only idle rows may enter the payout queue", () => {
    for (const state of ALL_STATES) {
      expect(isPayoutQueueEligible(state)).toBe(state === "idle")
    }
  })
})

test.describe("payout state lists", () => {
  test("stuck listing covers every in-flight (non-terminal) state", () => {
    expect(STUCK_PAYOUT_STATES).toEqual([
      "reserved",
      "broadcast",
      "confirming",
      "unknown",
    ])
  })

  test("public paying count excludes the unresolved 'unknown' state", () => {
    expect(PAYING_PAYOUT_STATES).toEqual([
      "reserved",
      "broadcast",
      "confirming",
    ])
    expect(PAYING_PAYOUT_STATES).not.toContain("unknown")
  })
})
