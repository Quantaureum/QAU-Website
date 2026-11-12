/**
 * Airdrop auth session probe for the client component.
 *
 * Returns whether the visitor holds a valid auth_token cookie (plus minimal
 * identity), whether GitHub sign-in is configured — and, for users with an
 * approved airdrop registration, their own invite code plus the bonus
 * summary their invitees earned them (B-tier viral loop, plan §3.1: the
 * code is generated only AFTER approval).
 */

import { NextRequest, NextResponse } from "next/server"

import { resolveAuthUser } from "@/lib/airdrop/authSession"
import { findAirdropByUserId, hasDatabase } from "@/lib/airdrop/database"
import { getInviteSummaryForRegistration } from "@/lib/airdrop/inviteStore"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const user = await resolveAuthUser(req)

  let invite: {
    inviteCode: string | null
    approvedInviteeCount: number
    bonus: { pendingQau: number; paidQau: number; voidQau: number }
  } | null = null
  if (user && hasDatabase()) {
    try {
      const registration = await findAirdropByUserId(String(user.uid))
      if (registration) {
        invite = await getInviteSummaryForRegistration(
          registration.id,
          registration.sybil_status
        )
      }
    } catch (error) {
      // The session probe must stay usable even when the invite layer is
      // unreachable — the summary is auxiliary.
      console.error("invite summary lookup failed:", error)
    }
  }

  return NextResponse.json({
    authenticated: Boolean(user),
    email: user ? String(user.email) : null,
    provider: user ? (user.provider ?? "email") : null,
    githubEnabled: Boolean(
      process.env.GITHUB_OAUTH_CLIENT_ID &&
        process.env.GITHUB_OAUTH_CLIENT_SECRET
    ),
    invite,
  })
}
