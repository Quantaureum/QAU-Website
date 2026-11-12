/**
 * Admin: generate one whole bonus-invite batch (plan §4/§6-5).
 *
 * Runs the track-A cluster re-scan as a pre-step (cluster hits void that
 * cluster's pending bonus records automatically), applies the kill-switch
 * (manual flag + week-over-week criterion) and the pool circuit breaker —
 * every refusal refuses the ENTIRE batch, never a partial payout. Returns
 * the payout CSV rows (address,amount,memo) for the distributor's -batch
 * mode; rows carry the independent `bonus-invite` batch type marker so the
 * main-payout reconciliation stays untouched.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { getInviteBonusConfig } from "@/lib/airdrop/airdropConfig"
import { hasDatabase } from "@/lib/airdrop/database"
import { generateInviteBonusBatch } from "@/lib/airdrop/inviteStore"

export const dynamic = "force-dynamic"

const HTTP_STATUS_BY_CODE: Record<string, number> = {
  invite_bonus_disabled: 409,
  kill_switch_paused: 409,
  bonus_channel_closed: 409,
  no_pending_bonus: 200,
  pool_insufficient: 409,
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

  const cfg = getInviteBonusConfig()
  const result = await generateInviteBonusBatch(cfg)

  if (!result.ok) {
    const code = result.code
    return NextResponse.json(
      {
        success: false,
        code,
        ...(result.poolRemainingQau !== undefined
          ? { poolRemainingQau: result.poolRemainingQau }
          : {}),
        ...(result.requiredQau !== undefined
          ? { requiredQau: result.requiredQau }
          : {}),
      },
      { status: HTTP_STATUS_BY_CODE[code] ?? 409 }
    )
  }

  // CSV for the distributor's -batch mode: address,amountQau,memo — the
  // third field marks every row as the bonus-invite batch type.
  const csv = [
    "# bonus-invite batch (independent payout type; reconciles against the",
    "# bonus pool: pool budget - sum(paid bonus rows) must equal the ledger)",
    ...result.rows.map((r) => `${r.walletAddress},${r.amountQau},${r.memo}`),
  ].join("\n")

  return NextResponse.json({
    success: true,
    batchRef: result.batchRef,
    totalAmountQau: result.totalAmountQau,
    poolRemainingAfterQau: result.poolRemainingAfterQau,
    trackAHits: result.trackAHits,
    voidedRecords: result.voidedRecords,
    weeklyHits: result.weeklyHits,
    rows: result.rows,
    csv,
  })
}
