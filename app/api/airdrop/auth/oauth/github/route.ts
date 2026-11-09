/**
 * GitHub OAuth: step 1 — redirect the user to GitHub's authorize endpoint.
 *
 * The `state` is a random nonce whose server-side copy is bound to the
 * browser by an httpOnly cookie. The callback only accepts a state when both
 * halves match and the server-side entry is still live and unused, which
 * closes the state-fixation / login-CSRF window.
 * Disabled (503) unless GITHUB_OAUTH_CLIENT_ID/SECRET are configured, which
 * also keeps the login button hidden on the client (/me reports it).
 */

import { NextRequest, NextResponse } from "next/server"

import { SITE_URL } from "@/lib/constants"

import { routing } from "@/i18n/routing"
import {
  issueOAuthState,
  OAUTH_STATE_COOKIE,
  OAUTH_STATE_COOKIE_PATH,
} from "@/lib/oauth/state"

export function isGithubOAuthConfigured(): boolean {
  return Boolean(
    process.env.GITHUB_OAUTH_CLIENT_ID && process.env.GITHUB_OAUTH_CLIENT_SECRET
  )
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isGithubOAuthConfigured()) {
    return NextResponse.json(
      { success: false, code: "github_not_configured" },
      { status: 503 }
    )
  }
  const url = new URL(req.url)
  const localeParam = url.searchParams.get("locale") || ""
  const locale = (routing.locales as readonly string[]).includes(localeParam)
    ? localeParam
    : routing.defaultLocale

  const state = issueOAuthState(locale)
  const authorize = new URL("https://github.com/login/oauth/authorize")
  authorize.searchParams.set("client_id", process.env.GITHUB_OAUTH_CLIENT_ID!)
  // Base from SITE_URL, not req.url: behind the reverse proxy the internal
  // origin leaks into redirect_uri and GitHub rejects the mismatch.
  authorize.searchParams.set(
    "redirect_uri",
    `${SITE_URL}/api/airdrop/auth/oauth/github/callback`
  )
  authorize.searchParams.set("scope", "read:user")
  authorize.searchParams.set("state", state)

  const res = NextResponse.redirect(authorize.toString(), 302)
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60,
    path: OAUTH_STATE_COOKIE_PATH,
  })
  return res
}
