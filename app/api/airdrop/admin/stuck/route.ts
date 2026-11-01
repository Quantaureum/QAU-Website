/**
 * Admin: reservations that never reached a confirmed receipt.
 *
 * The distributor reconciles these against the chain before it pays
 * anything: a row whose transaction is confirmed becomes paid, a row whose
 * transaction provably never landed is released for a later attempt.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { hasDatabase, listStuckPayouts } from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

function asIso(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string") return value
  return null
}

export async function GET(req: Request): Promise<NextResponse> {
  const denied = adminKeyError(req)
  if (denied) return denied
  if (!hasDatabase()) {
    return NextResponse.json(
      { success: false, error: "database not configured" },
      { status: 503 }
    )
  }

  const raw = Number(new URL(req.url).searchParams.get("limit") || 100)
  const limit = Number.isFinite(raw)
    ? Math.min(Math.max(Math.floor(raw), 1), 500)
    : 100

  const rows = await listStuckPayouts(limit)
  return NextResponse.json({
    success: true,
    count: rows.length,
    reservations: rows.map((r) => ({
      id: r.id,
      walletAddress: r.wallet_address,
      amount: Number(r.amount),
      txHash: r.tx_hash,
      nonce: r.payout_nonce,
      state: r.payout_state,
      attempts: r.payout_attempts,
      error: r.payout_error,
      updatedAt: asIso(r.updated_at),
    })),
  })
}
