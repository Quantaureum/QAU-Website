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
  let paying = 0
  if (hasDatabase()) {
    await initAirdropTables()
    const rows = await sql`
      SELECT
        COUNT(*) FILTER (WHERE status <> 'rejected')::int AS registered,
        COUNT(*) FILTER (WHERE status = 'paid')::int AS paid,
        COUNT(*) FILTER (
          WHERE payout_state IN ('reserved', 'broadcast')
        )::int AS paying
      FROM airdrop_registrations
    `
    const agg = rowsOf<{
      registered?: number
      paid?: number
      paying?: number
    }>(rows)[0]
    registered = agg?.registered ?? 0
    paid = agg?.paid ?? 0
    paying = agg?.paying ?? 0
  }
  return NextResponse.json({
    success: true,
    phase,
    registered,
    paid,
    paying,
    maxSlots: cfg.maxSlots,
    budgetQau: cfg.budgetQau,
    amountPerUser: cfg.amountPerUser,
    requireSocial: cfg.requireSocial,
    startAt: cfg.startAt?.toISOString() ?? null,
    endAt: cfg.endAt?.toISOString() ?? null,
  })
}
