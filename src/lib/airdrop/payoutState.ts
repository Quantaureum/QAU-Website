/**
 * Payout state-machine vocabulary and transition rules — pure, DB-free.
 *
 * Lifecycle of an airdrop registration's payout:
 *
 *   idle       → eligible for the payout queue
 *   reserved   → claimed by a distributor run (nothing on chain yet)
 *   broadcast  → the reveal transaction hash is recorded; the transaction
 *                MAY already be on chain
 *   confirming → the distributor is waiting for the receipt of a broadcast
 *                transaction
 *   unknown    → the outcome after a broadcast is uncertain (timeout,
 *                unknown error); the row MUST be reconciled by tx hash /
 *                nonce before it may re-enter the queue
 *   paid       → a receipt with status 0x1 was observed and recorded
 *
 * Hard rules (audit H-04):
 *   - only a 'reserved' (never broadcast) row may be released back to 'idle'
 *   - a 'broadcast'/'confirming' row with an uncertain outcome is parked in
 *     'unknown' — it is never re-queued directly
 *   - every state transition is a conditional UPDATE that carries the
 *     current state as a predicate (enforced in database.ts)
 */

export type PayoutState =
  | "idle"
  | "reserved"
  | "broadcast"
  | "confirming"
  | "unknown"
  | "paid"

export type PayoutFailureDisposition =
  | { action: "release"; to: "idle" }
  | { action: "park"; to: "unknown" }
  | { action: "ignore" }

/**
 * What to do with a payout attempt that reports failure while in `state`:
 *   - reserved             → release to idle (retry after backoff; nothing
 *                            was broadcast, so re-queueing is safe)
 *   - broadcast/confirming → park as unknown (the transaction may exist on
 *                            chain; reconcile by tx hash / nonce first)
 *   - idle/unknown/paid    → nothing to do (already settled or parked)
 */
export function dispositionForPayoutFailure(
  state: PayoutState
): PayoutFailureDisposition {
  switch (state) {
    case "reserved":
      return { action: "release", to: "idle" }
    case "broadcast":
    case "confirming":
      return { action: "park", to: "unknown" }
    default:
      return { action: "ignore" }
  }
}

/** Only idle rows may enter the payout queue. */
export function isPayoutQueueEligible(state: PayoutState): boolean {
  return state === "idle"
}

/** States shown on the distributor's stuck-payout reconciliation listing. */
export const STUCK_PAYOUT_STATES: PayoutState[] = [
  "reserved",
  "broadcast",
  "confirming",
  "unknown",
]

/** States counted as "paying" by the public campaign status endpoint. */
export const PAYING_PAYOUT_STATES: PayoutState[] = [
  "reserved",
  "broadcast",
  "confirming",
]
