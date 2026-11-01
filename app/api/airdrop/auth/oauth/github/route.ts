/**
 * GitHub OAuth: step 1 — redirect the user to GitHub's authorize endpoint.
 *
 * State is an HMAC-signed nonce+locale so the callback can verify CSRF
 * without a cookie (some embedded browsers drop cookies on the GitHub
 * redirect chain) and land the user back on the right-language page.
 * Disabled (503) unless GITHUB_OAUTH_CLIENT_ID/SECRET are configured, which
 * also keeps the login button hidden on the client (/me reports it).
 */

import { createHmac, randomBytes } from "crypto"

import { NextRequest, NextResponse } from "next/server"

import { SITE_URL } from "@/lib/constants"

import { routing } from "@/i18n/routing"

function requireSecret(): string {
  const s = process.env.JWT_SECRET || ""
  if (!s) throw new Error("JWT_SECRET environment variable is required")
  return s
}

/**
 * State is HMAC-signed (nonce + locale + signature) instead of a cookie
 * double-submit: the sign-in redirect chain crosses GitHub and back through
 * a 308, and some embedded browsers drop SameSite cookies along that chain.
 * The signature (JWT_SECRET) makes forged states impossible, so CSRF is
 * still covered without depending on cookie delivery.
 */
function signedState(locale: string): string {
  const nonce = randomBytes(16).toString("hex")
  const sig = createHmac("sha256", requireSecret())
    .update(`${nonce}.${locale}`)
    .digest("hex")
    .slice(0, 32)
  return `${nonce}.${locale}.${sig}`
}

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

  const state = signedState(locale)
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

  return NextResponse.redirect(authorize.toString(), 302)
}
