/**
 * Admin: campaign stats for the distributor pre-flight and the public
 * progress page (public fields only when ?public=1).
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { getAirdropConfig } from "@/lib/airdrop/airdropConfig"
import {
  hasDatabase,
  initAirdropTables,
  rowsOf,
  sql,
} from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

export async function GET(req: Request): Promise<NextResponse> {
  const cfg = getAirdropConfig()
  const isPublic = new URL(req.url).searchParams.get("public") === "1"

  // Same shared guard as the other admin endpoints: constant-time key
  // comparison, key read per request. Public stats (?public=1) skip it.
  if (!isPublic) {
    const denied = adminKeyError(req)
    if (denied) return denied
  }
  if (!hasDatabase()) {
    return NextResponse.json({
      success: true,
      total: 0,
      approved: 0,
      paid: 0,
      hold: 0,
      rejected: 0,
      maxSlots: cfg.maxSlots,
      budgetQau: cfg.budgetQau,
    })
  }
  await initAirdropTables()

  const rows = await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (
        WHERE sybil_status = 'approved' AND status <> 'rejected'
      )::int AS approved,
      COUNT(*) FILTER (WHERE status = 'paid')::int AS paid,
      COUNT(*) FILTER (WHERE sybil_status = 'hold')::int AS hold,
      COUNT(*) FILTER (
        WHERE sybil_status = 'rejected' OR status = 'rejected'
      )::int AS rejected
    FROM airdrop_registrations
  `
  const s = rowsOf<Record<string, number>>(rows)[0] ?? {
    total: 0,
    approved: 0,
    paid: 0,
    hold: 0,
    rejected: 0,
  }

  const base = {
    total: s.total,
    approved: s.approved,
    paid: s.paid,
    hold: s.hold,
    rejected: s.rejected,
    maxSlots: cfg.maxSlots,
    budgetQau: cfg.budgetQau,
    amountPerUser: cfg.amountPerUser,
  }
  if (isPublic) {
    // Public view: aggregate numbers only (published figures must always be
    // re-verifiable on-chain).
    return NextResponse.json({ success: true, ...base })
  }
  const detail = rowsOf<Record<string, unknown>>(
    await sql`
    SELECT id, user_id, email, wallet_address, sybil_score, sybil_status, social_status, status
    FROM airdrop_registrations ORDER BY created_at DESC LIMIT 100
  `
  )
  return NextResponse.json({ success: true, ...base, detail })
}
