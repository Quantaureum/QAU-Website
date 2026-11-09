/**
 * Admin: read-only manual-review queue.
 *
 * Lists rows parked by the sybil scorer (`sybil_status = 'hold'`) plus legacy
 * rows that were never scored (`sybil_status = 'pending'`). There is no
 * approve/reject action yet — this endpoint only makes the queue visible to
 * an operator.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { hasDatabase, listReviewRegistrations } from "@/lib/airdrop/database"

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

  const raw = Number(new URL(req.url).searchParams.get("limit") || 200)
  const limit = Number.isFinite(raw)
    ? Math.min(Math.max(Math.floor(raw), 1), 500)
    : 200

  const rows = await listReviewRegistrations(limit)
  return NextResponse.json({
    success: true,
    count: rows.length,
    review: rows.map((r) => ({
      id: r.id,
      userId: r.user_id,
      walletAddress: r.wallet_address,
      xHandle: r.x_handle,
      amount: Number(r.amount),
      sybilStatus: r.sybil_status,
      sybilScore: r.sybil_score,
      sybilRules: r.sybil_rules,
      holdSince: asIso(r.hold_since),
      createdAt: asIso(r.created_at),
    })),
  })
}
