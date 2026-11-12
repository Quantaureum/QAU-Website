/**
 * Admin: revoke a pending bonus record (plan §3.1: 发放前均可撤销，发放后
 * 不追). A paid record can never be revoked; a voided record is already
 * terminal. The (inviter, round) unique constraint blocks regeneration, so
 * revocation is final — the round can never pay out twice.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { hasDatabase } from "@/lib/airdrop/database"
import { revokeBonusRecord } from "@/lib/airdrop/inviteStore"

export const dynamic = "force-dynamic"

interface RevokeBody {
  bonusId?: unknown
  reason?: unknown
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

  let body: RevokeBody
  try {
    body = (await req.json()) as RevokeBody
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid JSON body" },
      { status: 400 }
    )
  }
  const bonusId = Number(body.bonusId)
  if (!Number.isInteger(bonusId) || bonusId <= 0) {
    return NextResponse.json(
      { success: false, error: "bonusId must be a positive integer" },
      { status: 400 }
    )
  }
  const reason =
    typeof body.reason === "string" && body.reason.trim()
      ? body.reason.trim()
      : "operator revocation"

  const outcome = await revokeBonusRecord(bonusId, reason)
  if (outcome === "not_found") {
    return NextResponse.json(
      { success: false, code: "bonus_not_found" },
      { status: 404 }
    )
  }
  if (outcome === "not_pending") {
    // paid → 发放后不追; void → already terminal.
    return NextResponse.json(
      { success: false, code: "bonus_not_pending" },
      { status: 409 }
    )
  }
  return NextResponse.json({ success: true, code: "revoked" })
}
