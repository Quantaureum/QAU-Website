/**
 * Admin: weekly invitation-cluster report (plan §3.1: 同邀请人下游的聚合一览,
 * consumed by the ops re-scan script; reviewed at the weekly dry-run gate).
 *
 * Facts only, per inviter: downstream membership with the S1/S7/S9-relevant
 * attributes (subnet / email DOMAIN only / payout-address prefix), approval
 * state, bonus-record tallies — plus the bonus-pool reconciliation and the
 * weekly cluster-hit counts that feed the kill-switch criterion. No PII
 * beyond what the sybil layer already stores; email is never exposed whole.
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { getInviteBonusConfig } from "@/lib/airdrop/airdropConfig"
import { hasDatabase } from "@/lib/airdrop/database"
import {
  getBonusPoolReconciliation,
  getClusterReport,
  initInviteTables,
  weeklyClusterHitCounts,
} from "@/lib/airdrop/inviteStore"

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

  await initInviteTables()
  const now = new Date()
  const [clusters, weeklyHits, pool] = await Promise.all([
    getClusterReport(),
    weeklyClusterHitCounts(now),
    getBonusPoolReconciliation(getInviteBonusConfig()),
  ])

  return NextResponse.json({
    success: true,
    clusterCount: clusters.length,
    clusters,
    killSwitchInputs: {
      weeklyHits,
      pool,
      // Mirrors airdropConfig.shouldAutoPauseBonusPayout — the SOP reads the
      // same inputs the batch generator enforces.
      autoPauseCriteria: {
        absoluteClusterHits: 5,
        weekOverWeekRatio: 3,
        weekOverWeekBaseClusters: 2,
      },
    },
  })
}
