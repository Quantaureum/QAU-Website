import { expect, test } from "@playwright/test"

import {
  dispositionForScore,
  HOLD_RESCORE_DAYS,
  isRescoreDue,
  notificationText,
  type ScoreRecord,
  transitionHold,
} from "@/lib/sybil/stateMachine"

const NOW = new Date("2026-10-24T12:00:00Z")

const approvedRec: ScoreRecord = {
  score: 100,
  verdict: "approved",
  hits: [],
  scoredAt: NOW,
}
const holdRec: ScoreRecord = {
  score: 60,
  verdict: "hold",
  hits: [{ rule: "x-account-young", penalty: 25, detail: "60 days old" }],
  scoredAt: NOW,
}
const rejectedRec: ScoreRecord = {
  score: 30,
  verdict: "rejected",
  hits: [{ rule: "same-subnet-batch", penalty: 40, detail: "50 in /24" }],
  scoredAt: NOW,
}

test.describe("state machine — initial disposition", () => {
  test("approved/hold/rejected map correctly from the verdict", () => {
    expect(dispositionForScore(approvedRec)).toBe("approved")
    expect(dispositionForScore(holdRec)).toBe("hold")
    expect(dispositionForScore(rejectedRec)).toBe("rejected")
  })
})

test.describe("state machine — hold re-evaluation timing", () => {
  test("not due before 14 days", () => {
    expect(
      isRescoreDue(NOW, new Date(NOW.getTime() + 13 * 24 * 3600 * 1000))
    ).toBe(false)
  })
  test("due exactly at 14 days", () => {
    expect(
      isRescoreDue(
        NOW,
        new Date(NOW.getTime() + HOLD_RESCORE_DAYS * 24 * 3600 * 1000)
      )
    ).toBe(true)
  })
  test("due after 14 days", () => {
    expect(
      isRescoreDue(NOW, new Date(NOW.getTime() + 20 * 24 * 3600 * 1000))
    ).toBe(true)
  })
})

test.describe("state machine — hold transitions", () => {
  test("hold → approved when the re-score improves", () => {
    expect(transitionHold(approvedRec)).toBe("approved")
  })
  test("hold → rejected when the re-score worsens", () => {
    expect(transitionHold(rejectedRec)).toBe("rejected")
  })
  test("hold → hold when still in the band", () => {
    expect(transitionHold(holdRec)).toBe("hold")
  })
})

test.describe("state machine — notification text", () => {
  test("rejected mail includes the rule list but no appeal promise", () => {
    const t = notificationText("rejected", rejectedRec)
    expect(t).toContain("无法参与")
    expect(t).toContain("same-subnet-batch")
    expect(t.toLowerCase()).not.toContain("申诉")
  })
  test("hold mail tells the user to wait, not re-register", () => {
    const t = notificationText("hold", holdRec)
    expect(t).toContain("无需重复报名")
  })
  test("approved mail confirms queue entry", () => {
    expect(notificationText("approved", approvedRec)).toContain("发放队列")
  })
})
