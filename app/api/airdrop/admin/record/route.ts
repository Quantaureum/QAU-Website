/**
 * Admin: record payout results.
 *
 * The distributor drives a three-phase protocol:
 *
 *   { id, phase: "intent", txHash, nonce }  the reveal transaction is signed;
 *        its hash is stored before the transaction is broadcast, so a crash
 *        between signing and broadcasting can be reconciled against the chain
 *        instead of paying the address a second time.
 *   { id, phase: "paid", txHash }           a receipt with status 0x1 was
 *        observed — the registration is marked paid.
 *   { id, phase: "failed", note }           the attempt failed — the
 *        reservation is released and the row is retried after a backoff.
 *   { failures: [{ id, note }] }            batch form of "failed".
 *
 * A write-back without a phase is treated as "paid" (older distributors).
 * Same guard as the pending queue: X-Admin-Key only.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import {
  hasDatabase,
  markAirdropPaidById,
  recordAirdropIntent,
  releaseAirdropReservation,
} from "@/lib/airdrop/database"

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
    for (const f of body.failures as { id?: number; note?: string }[]) {
      const id = Number(f.id)
      if (!Number.isInteger(id) || id <= 0) continue
      const note = String(f.note || "").slice(0, 500)
      if (
        await releaseAirdropReservation(
          id,
          note,
          RETRY_DELAY_MINUTES,
          MAX_ATTEMPTS
        )
      )
        released++
    }
    return NextResponse.json({ success: true, released })
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
    const ok = await releaseAirdropReservation(
      id,
      note || "payout failed",
      RETRY_DELAY_MINUTES,
      MAX_ATTEMPTS
    )
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "not reserved" },
        { status: 409 }
      )
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { success: false, error: "unknown phase" },
    { status: 400 }
  )
}
