/**
 * Admin: track-B slow-drip farm channel (plan §3.1, review v2 N1).
 *
 *   GET    — full-network S1 recompute (防护 v2 GROUP BY semantics) intersected
 *            with invitation-cluster membership: the candidate list the
 *            weekly dry-run review inspects.
 *   POST   — operator CONFIRMS a candidate cluster: voids that inviter's
 *            pending bonus records with a trackB-confirmed reason. This is
 *            the only human step in the bonus layer (confirming re-scan
 *            evidence, an existing SOP duty — no new sampling防线).
 *
 * Voids are terminal and scoped to bonus records only — the registration
 * state machine and downstream main payouts are never touched (plan §3.1 N2).
 */

import { NextResponse } from "next/server"

import { adminKeyError } from "@/lib/airdrop/adminGuard"
import { hasDatabase } from "@/lib/airdrop/database"
import {
  initInviteTables,
  isKnownInviter,
  listTrackBCandidates,
  voidPendingBonusesForInviter,
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
  const { candidates, clusterMemberIds } = await listTrackBCandidates()
  return NextResponse.json({
    success: true,
    candidateCount: candidates.length,
    clusterMemberCount: clusterMemberIds.length,
    candidates,
  })
}

interface ConfirmBody {
  inviterRegistrationId?: unknown
  evidence?: unknown
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

  let body: ConfirmBody
  try {
    body = (await req.json()) as ConfirmBody
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid JSON body" },
      { status: 400 }
    )
  }
  const inviterRegistrationId = Number(body.inviterRegistrationId)
  if (!Number.isInteger(inviterRegistrationId) || inviterRegistrationId <= 0) {
    return NextResponse.json(
      {
        success: false,
        error: "inviterRegistrationId must be a positive integer",
      },
      { status: 400 }
    )
  }
  const evidence =
    typeof body.evidence === "string" && body.evidence.trim()
      ? body.evidence.trim()
      : ""
  if (!evidence) {
    return NextResponse.json(
      { success: false, error: "evidence (re-scan hit summary) is required" },
      { status: 400 }
    )
  }

  await initInviteTables()
  // The confirm target must be a real inviter (has at least one invitee).
  if (!(await isKnownInviter(inviterRegistrationId))) {
    return NextResponse.json(
      { success: false, code: "not_an_inviter" },
      { status: 404 }
    )
  }

  const voided = await voidPendingBonusesForInviter(
    inviterRegistrationId,
    `trackB-confirmed: ${evidence}`
  )
  return NextResponse.json({ success: true, voided })
}
