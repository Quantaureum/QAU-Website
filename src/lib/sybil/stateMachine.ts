/**
 * Sybil state machine — pending → hold → approved/rejected, with automatic
 * 14-day re-evaluation for `hold`. Pure functions for the transitions;
 * callers own the DB writes.
 *
 * Design (运营中心/09-内容与活动/空投女巫防护设计-v2.md):
 *   score ≥ 70            → approved   (enters the payout queue)
 *   40 < score < 70       → hold       (re-scored automatically after 14 days)
 *   score ≤ 40 / hard     → rejected   (appeal only affects a future re-eval)
 *
 * State transitions:
 *   pending --score--> hold | approved | rejected
 *   hold    --rescore(+14d)--> hold | approved | rejected
 *   approved/rejected are terminal for the window (a NEW registration cycle
 *   after 官宣 relaunch starts fresh rows).
 */

import type { SybilScoreResult } from "./sybilScore"

export type RegistrationStatus =
  | "pending" // awaiting first scoring
  | "hold" // scored 41..69; auto re-evaluated after 14 days
  | "approved" // in the payout queue
  | "rejected" // final for this window

export interface ScoreRecord {
  score: number
  verdict: SybilScoreResult["verdict"]
  hits: { rule: string; penalty: number; detail: string }[]
  scoredAt: Date
}

export const HOLD_RESCORE_DAYS = 14

/** Initial disposition for a freshly scored registration. */
export function dispositionForScore(
  r: ScoreRecord
): Exclude<RegistrationStatus, "pending"> {
  if (r.verdict === "approved") return "approved"
  if (r.verdict === "rejected") return "rejected"
  return "hold"
}

/** Is a hold row due for automatic re-evaluation? */
export function isRescoreDue(holdSince: Date, now: Date): boolean {
  return (
    now.getTime() - holdSince.getTime() >=
    HOLD_RESCORE_DAYS * 24 * 60 * 60 * 1000
  )
}

/**
 * Transition a held row after re-scoring. Terminal states never transition
 * (callers must guard, but this re-guards defensively).
 */
export function transitionHold(
  newScore: ScoreRecord
): Exclude<RegistrationStatus, "pending"> {
  return dispositionForScore(newScore)
}

/**
 * Reason text for the notification email. Rejected/hold mails include the
 * rule list (transparent model) but never an appeal promise for rejected —
 * per the design, appeals only affect hold→approved re-evaluations.
 */
export function notificationText(
  status: RegistrationStatus,
  r: ScoreRecord
): string {
  const ruleList = r.hits.map((h) => `- ${h.rule}: ${h.detail}`).join("\n")
  switch (status) {
    case "approved":
      return "你的登记已通过自动核验，进入发放队列。发放后可在链上查询交易。"
    case "hold":
      return (
        "你的登记需要更多时间核验（14 天后自动重新评估），无需重复报名。" +
        (r.hits.length ? `\n未达线信号:\n${ruleList}` : "")
      )
    case "rejected":
      return (
        "自动核验未达线，本次活动窗口内无法参与。" +
        (r.hits.length ? `\n未达线信号:\n${ruleList}` : "")
      )
    default:
      return "登记已收到，等待核验。"
  }
}
