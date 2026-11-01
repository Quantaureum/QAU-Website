/**
 * GitHub OAuth: step 1 — redirect the user to GitHub's authorize endpoint.
 *
 * State carries a random nonce plus the UI locale so the callback can both
 * detect CSRF and land the user back on the right-language airdrop page.
 * Disabled (503) unless GITHUB_OAUTH_CLIENT_ID/SECRET are configured, which
 * also keeps the login button hidden on the client (/me reports it).
 */

import { randomBytes } from "crypto"

import { NextRequest, NextResponse } from "next/server"

import { routing } from "@/i18n/routing"

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

  const state = `${randomBytes(16).toString("hex")}.${locale}`
  const authorize = new URL("https://github.com/login/oauth/authorize")
  authorize.searchParams.set("client_id", process.env.GITHUB_OAUTH_CLIENT_ID!)
  authorize.searchParams.set(
    "redirect_uri",
    `${url.origin}/api/airdrop/auth/oauth/github/callback`
  )
  authorize.searchParams.set("scope", "read:user")
  authorize.searchParams.set("state", state)

  const res = NextResponse.redirect(authorize.toString(), 302)
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax", // must survive the cross-site redirect back from GitHub
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/",
  })
  return res
}
