/**
 * Admin: record payout results.
 *
 * The distributor drives the payout state machine:
 *
 *   { id, phase: "intent", txHash, nonce }  the reveal transaction is signed;
 *        its hash is stored before the transaction is broadcast, so a crash
 *        between signing and broadcasting can be reconciled against the chain
 *        instead of paying the address a second time. reserved → broadcast.
 *   { id, phase: "confirming" }             the distributor is waiting for
 *        the receipt of the broadcast transaction. broadcast → confirming.
 *   { id, phase: "paid", txHash }           a receipt with status 0x1 was
 *        observed — the registration is marked paid.
 *   { id, phase: "failed", note }           the attempt failed. A reserved
 *        (never broadcast) row is released back to the queue; a
 *        broadcast/confirming row has an UNCERTAIN outcome and is parked in
 *        'unknown' for tx-hash/nonce reconciliation — it is never re-queued
 *        directly (audit H-04).
 *   { id, phase: "reconcile", outcome, txHash?, note? }  resolve an unknown
 *        row after checking the chain: outcome "paid" marks it paid,
 *        outcome "idle" releases a provably-not-on-chain row back to the
 *        queue (with retry backoff / max-attempt rejection).
 *   { failures: [{ id, note }] }            batch form of "failed".
 *
 * A write-back without a phase is treated as "paid" (older distributors).
 * Same guard as the pending queue: X-Admin-Key only.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import {
  findAirdropById,
  hasDatabase,
  markAirdropConfirming,
  markAirdropPaidById,
  parkAirdropPayoutUnknown,
  recordAirdropIntent,
  releaseAirdropReservation,
  releaseUnknownAirdropPayout,
} from "@/lib/airdrop/database"
import { dispositionForPayoutFailure } from "@/lib/airdrop/payoutState"

export const dynamic = "force-dynamic"

const TX_HASH_RE = /^0x[0-9a-fA-F]{64}$/

function envInt(name: string, fallback: number): number {
  const raw = Number(process.env[name])
  if (!Number.isFinite(raw) || raw <= 0) return fallback
  return Math.floor(raw)
}

/** Minutes a failed row waits before it is offered to the queue again. */
const RETRY_DELAY_MINUTES = envInt("AIRDROP_RETRY_DELAY_MINUTES", 30)
/** Attempts after which a row is rejected and needs manual review. */
const MAX_ATTEMPTS = envInt("AIRDROP_MAX_ATTEMPTS", 5)

type FailureOutcome = "released" | "parked" | "conflict"

/**
 * Apply the failure disposition for a row's CURRENT state (audit H-04):
 * reserved → idle, broadcast/confirming → unknown, everything else is a
 * conflict. The conditional UPDATEs in the database layer carry the state
 * predicate, so a state change between the read and the write fails closed.
 */
async function reportPayoutFailure(
  id: number,
  note: string
): Promise<FailureOutcome> {
  const row = await findAirdropById(id)
  if (!row) return "conflict"
  const disposition = dispositionForPayoutFailure(row.payout_state)
  if (disposition.action === "release") {
    const ok = await releaseAirdropReservation(
      id,
      note,
      RETRY_DELAY_MINUTES,
      MAX_ATTEMPTS
    )
    return ok ? "released" : "conflict"
  }
  if (disposition.action === "park") {
    const ok = await parkAirdropPayoutUnknown(id, note)
    return ok ? "parked" : "conflict"
  }
  return "conflict"
}

export async function POST(req: Request): Promise<NextResponse> {
  const denied = adminKeyError(req)
  if (denied) return denied
  if (!hasDatabase()) {
    return NextResponse.json(
      { success: false, error: "database not configured" },
      { status: 503 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "bad json" },
      { status: 400 }
    )
  }

  // Failure batch: { failures: [{ id, note }] }
  if (Array.isArray(body.failures)) {
    let released = 0
    let parked = 0
    for (const f of body.failures as { id?: number; note?: string }[]) {
      const id = Number(f.id)
      if (!Number.isInteger(id) || id <= 0) continue
      const note = String(f.note || "").slice(0, 500)
      const outcome = await reportPayoutFailure(id, note || "payout failed")
      if (outcome === "released") released++
      if (outcome === "parked") parked++
    }
    return NextResponse.json({ success: true, released, parked })
  }

  const id = Number(body.id)
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json(
      { success: false, error: "invalid id" },
      { status: 400 }
    )
  }

  const phase = String(body.phase || "paid")
  const txHash = body.txHash ? String(body.txHash) : ""
  const note = body.note ? String(body.note).slice(0, 500) : ""

  if (phase === "intent") {
    if (!TX_HASH_RE.test(txHash)) {
      return NextResponse.json(
        { success: false, error: "invalid tx hash" },
        { status: 400 }
      )
    }
    const nonce = Number(body.nonce)
    if (!Number.isInteger(nonce) || nonce < 0) {
      return NextResponse.json(
        { success: false, error: "invalid nonce" },
        { status: 400 }
      )
    }
    const ok = await recordAirdropIntent(id, txHash, nonce)
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "not reserved" },
        { status: 409 }
      )
    }
    return NextResponse.json({ success: true })
  }

  if (phase === "confirming") {
    const ok = await markAirdropConfirming(id)
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "not broadcast" },
        { status: 409 }
      )
    }
    return NextResponse.json({ success: true })
  }

  if (phase === "paid") {
    if (!TX_HASH_RE.test(txHash)) {
      return NextResponse.json(
        { success: false, error: "invalid tx hash" },
        { status: 400 }
      )
    }
    const ok = await markAirdropPaidById(id, txHash)
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "registration not found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true })
  }

  if (phase === "failed") {
    const outcome = await reportPayoutFailure(id, note || "payout failed")
    if (outcome === "conflict") {
      return NextResponse.json(
        { success: false, error: "not reserved or already settled" },
        { status: 409 }
      )
    }
    return NextResponse.json({ success: true, disposition: outcome })
  }

  if (phase === "reconcile") {
    const outcome = String(body.outcome || "")
    if (outcome === "paid") {
      if (!TX_HASH_RE.test(txHash)) {
        return NextResponse.json(
          { success: false, error: "invalid tx hash" },
          { status: 400 }
        )
      }
      const ok = await markAirdropPaidById(id, txHash)
      if (!ok) {
        return NextResponse.json(
          { success: false, error: "registration not found" },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true })
    }
    if (outcome === "idle") {
      const ok = await releaseUnknownAirdropPayout(
        id,
        note || "reconciled: transaction not found on chain",
        RETRY_DELAY_MINUTES,
        MAX_ATTEMPTS
      )
      if (!ok) {
        return NextResponse.json(
          { success: false, error: "not in unknown state" },
          { status: 409 }
        )
      }
      return NextResponse.json({ success: true })
    }
    return NextResponse.json(
      { success: false, error: "unknown reconcile outcome" },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { success: false, error: "unknown phase" },
    { status: 400 }
  )
}
