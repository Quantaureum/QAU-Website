/**
 * Airdrop status: public campaign state for the landing page progress bar.
 * Aggregates only — no PII.
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

export async function GET(): Promise<NextResponse> {
  const cfg = getAirdropConfig()
  const phase = (await import("@/lib/airdrop/airdropConfig")).campaignPhase(
    new Date(),
    cfg
  )
  let registered = 0
  let paid = 0
  if (hasDatabase()) {
    await initAirdropTables()
    const rows = await sql`
      SELECT
        COUNT(*)::int AS registered,
        COUNT(*) FILTER (WHERE status = 'paid')::int AS paid
      FROM airdrop_registrations
    `
    const agg = rowsOf<{ registered?: number; paid?: number }>(rows)[0]
    registered = agg?.registered ?? 0
    paid = agg?.paid ?? 0
  }
  return NextResponse.json({
    success: true,
    phase,
    registered,
    paid,
    maxSlots: cfg.maxSlots,
    budgetQau: cfg.budgetQau,
    amountPerUser: cfg.amountPerUser,
    startAt: cfg.startAt?.toISOString() ?? null,
    endAt: cfg.endAt?.toISOString() ?? null,
  })
}
