/**
 * Admin: pending payout queue (approved + social-verified rows only).
 * Guarded by AIRDROP_ADMIN_KEY (X-Admin-Key header) — the distributor
 * (cmd/airdrop, S7) is the only intended caller.
 */

import { NextResponse } from "next/server"

import { hasDatabase, listApprovedRegistrations } from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

const ADMIN_KEY = process.env.AIRDROP_ADMIN_KEY || ""

export async function GET(req: Request): Promise<NextResponse> {
  if (!ADMIN_KEY) {
    return NextResponse.json(
      { success: false, error: "admin key not configured" },
      { status: 503 }
    )
  }
  if ((req.headers.get("x-admin-key") || "") !== ADMIN_KEY) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    )
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { success: false, error: "database not configured" },
      { status: 503 }
    )
  }

  const limit = Math.min(
    Number(new URL(req.url).searchParams.get("limit") || 200),
    500
  )
  const rows = await listApprovedRegistrations(limit)

  // Payout gating (防护设计 v2 L4): social binding rows must be verified.
  const registrations = rows
    .filter((r) => r.social_status !== "unverified")
    .filter((r) => (r.social_status === "failed" ? false : true))
    .map((r) => ({
      id: r.id,
      userId: r.user_id,
      walletAddress: r.wallet_address,
      amount: Number(r.amount) || 50,
    }))
  const rejected = rows
    .filter((r) => r.social_status === "failed")
    .map((r) => ({ id: r.id, note: "social verification failed" }))

  return NextResponse.json({
    success: true,
    count: registrations.length,
    registrations,
    rejected,
  })
}
