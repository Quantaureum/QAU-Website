/**
 * Airdrop auth session probe for the client component.
 *
 * Returns whether the visitor holds a valid auth_token cookie (plus minimal
 * identity) and whether GitHub sign-in is configured — the login button is
 * rendered from this so deploys without OAuth credentials hide it instead
 * of dead-ending users.
 */

import { NextRequest, NextResponse } from "next/server"

import { resolveAuthUser } from "@/lib/airdrop/authSession"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest): Promise<NextResponse> {
  const user = await resolveAuthUser(req)
  return NextResponse.json({
    authenticated: Boolean(user),
    email: user ? String(user.email) : null,
    provider: user ? (user.provider ?? "email") : null,
    githubEnabled: Boolean(
      process.env.GITHUB_OAUTH_CLIENT_ID &&
        process.env.GITHUB_OAUTH_CLIENT_SECRET
    ),
  })
}
