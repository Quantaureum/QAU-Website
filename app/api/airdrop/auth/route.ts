/**
 * Airdrop auth: GitHub OAuth is the only sign-in path.
 *
 * The email/password + verification-code flow was retired when the campaign
 * moved to verified third-party identities (see oauth/github/*): the email
 * actions below are kept as a stable machine-coded refusal so stale clients
 * get a clean "email_disabled" answer instead of a 404.
 *
 * Login flow: GET /api/airdrop/auth/oauth/github -> GitHub authorize ->
 * .../github/callback -> user row (pre-verified) + auth_token cookie.
 * Session contract is unchanged: JWT auth_token cookie, resolved by
 * authSession.resolveAuthUser.
 */

import { NextResponse } from "next/server"

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { success: false, code: "email_disabled" },
    { status: 410 }
  )
}
