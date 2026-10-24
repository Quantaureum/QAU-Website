/**
 * Admin: campaign stats for the distributor pre-flight and the public
 * progress page (public fields only when ?public=1).
 */

import { NextResponse } from "next/server"

import { getAirdropConfig } from "@/lib/airdrop/airdropConfig"
import {
  hasDatabase,
  initAirdropTables,
  rowsOf,
  sql,
} from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

const ADMIN_KEY = process.env.AIRDROP_ADMIN_KEY || ""

export async function GET(req: Request): Promise<NextResponse> {
  const cfg = getAirdropConfig()
  const isPublic = new URL(req.url).searchParams.get("public") === "1"
  const isAdmin =
    (req.headers.get("x-admin-key") || "") === ADMIN_KEY && ADMIN_KEY !== ""

  if (!isPublic && !isAdmin) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    )
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
      COUNT(*) FILTER (WHERE sybil_status = 'approved')::int AS approved,
      COUNT(*) FILTER (WHERE status = 'paid')::int AS paid,
      COUNT(*) FILTER (WHERE sybil_status = 'hold')::int AS hold,
      COUNT(*) FILTER (WHERE sybil_status = 'rejected' OR status = 'rejected')::int AS rejected
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
    // Public view: aggregate numbers only (对外公布数字必须可随时链上复查)
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
