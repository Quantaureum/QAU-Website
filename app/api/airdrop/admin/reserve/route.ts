/**
 * Admin: claim a registration for payout.
 *
 * The distributor reserves a row before it touches the chain. The claim is a
 * conditional UPDATE inside the database, so two distributors can never hold
 * the same row — a registration can never be paid twice.
 *
 * Request:  { id }
 * Response: the reserved registration (address + amount to pay), or 409 when
 *           the row is already claimed, already paid or not payable.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { hasDatabase, reserveAirdropRegistration } from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

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

  const id = Number(body.id)
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json(
      { success: false, error: "invalid id" },
      { status: 400 }
    )
  }

  const row = await reserveAirdropRegistration(id)
  if (!row) {
    return NextResponse.json(
      { success: false, error: "not reservable" },
      { status: 409 }
    )
  }

  return NextResponse.json({
    success: true,
    registration: {
      id: row.id,
      userId: row.user_id,
      walletAddress: row.wallet_address,
      amount: Number(row.amount),
      attempts: row.payout_attempts,
    },
  })
}
