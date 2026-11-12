/**
 * Admin: mark a generated bonus-invite batch paid (plan §5 ledger: the
 * distributor's -batch mode never calls the website, so the weekly SOP
 * writes the settlement back with the batch reference and tx hash).
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { hasDatabase } from "@/lib/airdrop/database"
import { initInviteTables, markBonusBatchPaid } from "@/lib/airdrop/inviteStore"

export const dynamic = "force-dynamic"

interface MarkPaidBody {
  batchRef?: unknown
  txHash?: unknown
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

  let body: MarkPaidBody
  try {
    body = (await req.json()) as MarkPaidBody
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid JSON body" },
      { status: 400 }
    )
  }
  const batchRef = typeof body.batchRef === "string" ? body.batchRef.trim() : ""
  const txHash = typeof body.txHash === "string" ? body.txHash.trim() : ""
  if (!batchRef) {
    return NextResponse.json(
      { success: false, error: "batchRef is required" },
      { status: 400 }
    )
  }
  if (!/^0x[0-9a-fA-F]{64}$/.test(txHash)) {
    return NextResponse.json(
      { success: false, error: "txHash must be a 0x-prefixed 32-byte hash" },
      { status: 400 }
    )
  }

  await initInviteTables()
  const updated = await markBonusBatchPaid(batchRef, txHash)
  return NextResponse.json({ success: true, updated })
}
