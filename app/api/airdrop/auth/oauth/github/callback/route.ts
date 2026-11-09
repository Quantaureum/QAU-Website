/**
 * GitHub OAuth: step 2 — exchange the code, enforce the account-age policy,
 * find-or-create the user, and issue the same JWT auth_token cookie the
 * retired email login used.
 *
 * Policy: the GitHub account must be at least one year old (campaign
 * anti-sybil rule; GitHub exposes created_at on /user). All failures
 * redirect back to the airdrop page with ?authError=<machine-code> — the
 * client maps codes to localized copy. No user-facing prose here.
 */

import { NextRequest, NextResponse } from "next/server"

import { SITE_URL } from "@/lib/constants"

import { isGithubOAuthConfigured } from "../route"

import { routing } from "@/i18n/routing"
import { generateToken } from "@/lib/airdrop/auth"
import { createUserOAuth, findUserByGithubId } from "@/lib/airdrop/database"
import {
  consumeOAuthState,
  OAUTH_STATE_COOKIE,
  OAUTH_STATE_COOKIE_PATH,
} from "@/lib/oauth/state"

const ACCOUNT_MIN_AGE_MS = 365 * 24 * 3600 * 1000

function fail(locale: string, code: string): NextResponse {
  const res = NextResponse.redirect(
    `${SITE_URL}/${locale}/airdrop?authError=${code}`,
    302
  )
  res.cookies.set(OAUTH_STATE_COOKIE, "", {
    maxAge: 0,
    path: OAUTH_STATE_COOKIE_PATH,
  })
  return res
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const code = url.searchParams.get("code") || ""
  const state = url.searchParams.get("state") || ""

  if (!isGithubOAuthConfigured())
    return fail(routing.defaultLocale, "github_error")

  // Bind the state to this browser session and consume it on first use.
  const locale = consumeOAuthState(
    state,
    req.cookies.get(OAUTH_STATE_COOKIE)?.value
  )
  if (!locale || !code) {
    console.log("[airdrop-oauth] rejected: state invalid or missing code")
    return fail(locale || routing.defaultLocale, "state_mismatch")
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${SITE_URL}/api/airdrop/auth/oauth/github/callback`,
    }),
  })
  const token = (await tokenRes.json()) as { access_token?: string }
  if (!token.access_token) {
    console.log("[airdrop-oauth] rejected: token exchange failed")
    return fail(locale, "github_error")
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      Accept: "application/vnd.github+json",
    },
  })
  if (!userRes.ok) {
    console.log("[airdrop-oauth] rejected: /user fetch failed", userRes.status)
    return fail(locale, "github_error")
  }
  const profile = (await userRes.json()) as {
    id: number
    login: string
    email: string | null
    created_at: string
  }

  // Anti-sybil policy: accounts must be at least one year old. An unparseable
  // created_at is treated as too young (fail closed).
  const createdAtMs = new Date(profile.created_at).getTime()
  if (
    !Number.isFinite(createdAtMs) ||
    Date.now() - createdAtMs < ACCOUNT_MIN_AGE_MS
  ) {
    console.log("[airdrop-oauth] rejected: account too young")
    return fail(locale, "account_too_young")
  }

  let user = await findUserByGithubId(profile.id)
  if (!user) {
    const email =
      profile.email || `${profile.id}+${profile.login}@users.noreply.github.com`
    const uid = `aid-gh-${profile.id}`
    await createUserOAuth(uid, email, "github", profile.id)
    user = await findUserByGithubId(profile.id)
    if (!user) {
      console.log("[airdrop-oauth] rejected: user row missing after create")
      return fail(locale, "github_error")
    }
    console.log("[airdrop-oauth] created user", user.uid)
  }

  const authToken = generateToken({
    uid: user.uid,
    email: user.email,
    role: "user",
  })
  console.log("[airdrop-oauth] success, issuing session cookie")
  const res = NextResponse.redirect(`${SITE_URL}/${locale}/airdrop`, 302)
  res.cookies.set(OAUTH_STATE_COOKIE, "", {
    maxAge: 0,
    path: OAUTH_STATE_COOKIE_PATH,
  })
  res.cookies.set("auth_token", authToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 3600,
    path: "/",
  })
  return res
}
