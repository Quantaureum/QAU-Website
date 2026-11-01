/**
 * Admin: pending payout queue (approved rows, gated by social binding mode).
 * Guarded by AIRDROP_ADMIN_KEY (X-Admin-Key header) — the distributor
 * (cmd/airdrop on the payout node) is the only intended caller.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { getAirdropConfig } from "@/lib/airdrop/airdropConfig"
import { hasDatabase, listApprovedRegistrations } from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

export async function GET(req: Request): Promise<NextResponse> {
  const denied = adminKeyError(req)
  if (denied) return denied
  if (!hasDatabase()) {
    return NextResponse.json(
      { success: false, error: "database not configured" },
      { status: 503 }
    )
  }

  const cfg = getAirdropConfig()
  const raw = Number(new URL(req.url).searchParams.get("limit") || 200)
  const limit = Number.isFinite(raw)
    ? Math.min(Math.max(Math.floor(raw), 1), 500)
    : 200
  const rows = await listApprovedRegistrations(limit)

  // Payout gating (defense design v2 L4): social binding rows must be
  // verified — but the current campaign mode is binding-only (a handle is
  // required and recorded, no follow-target to verify), so an unverified
  // binding is acceptable while no verification step exists.
  const socialRequired = process.env.AIRDROP_REQUIRE_SOCIAL === "1"
  const followTargetConfigured = Boolean(
    (process.env.AIRDROP_X_TARGET_HANDLE || "").trim()
  )
  const registrations = rows
    .filter(
      (r) =>
        !followTargetConfigured ||
        !socialRequired ||
        r.social_status !== "unverified"
    )
    .filter((r) => (r.social_status === "failed" ? false : true))
    .map((r) => ({
      id: r.id,
      userId: r.user_id,
      walletAddress: r.wallet_address,
      amount: Number(r.amount) || cfg.amountPerUser,
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
