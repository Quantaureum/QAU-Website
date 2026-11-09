import { NextRequest } from "next/server"
import { expect, test } from "@playwright/test"

import { GET as callback } from "../../app/api/airdrop/auth/oauth/github/callback/route"
import { GET as authorize } from "../../app/api/airdrop/auth/oauth/github/route"

import { consumeOAuthState, issueOAuthState } from "@/lib/oauth/state"

const originalFetch = globalThis.fetch
const originalEnv = {
  clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
  clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
}

function restoreEnv(key: string, value: string | undefined) {
  if (value === undefined) delete process.env[key]
  else process.env[key] = value
}

test.beforeEach(() => {
  process.env.GITHUB_OAUTH_CLIENT_ID = "test-client-id"
  process.env.GITHUB_OAUTH_CLIENT_SECRET = "test-client-secret"
  process.env.JWT_SECRET = "test-jwt-secret"
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
  restoreEnv("GITHUB_OAUTH_CLIENT_ID", originalEnv.clientId)
  restoreEnv("GITHUB_OAUTH_CLIENT_SECRET", originalEnv.clientSecret)
  restoreEnv("JWT_SECRET", originalEnv.jwtSecret)
})

function authorizeRequest(): NextRequest {
  return new NextRequest(
    "https://quantaureum.com/api/airdrop/auth/oauth/github?locale=en"
  )
}

function callbackRequest(
  state: string,
  cookieState: string | undefined,
  code = "test-code"
): NextRequest {
  const headers: Record<string, string> = {}
  if (cookieState !== undefined) {
    headers.cookie = `oauth_state=${cookieState}`
  }
  return new NextRequest(
    `https://quantaureum.com/api/airdrop/auth/oauth/github/callback?code=${code}&state=${state}`,
    { headers }
  )
}

async function issueState(): Promise<{ state: string; cookie: string }> {
  const res = await authorize(authorizeRequest())
  expect(res.status).toBe(302)

  const location = new URL(res.headers.get("location") || "")
  const state = location.searchParams.get("state") || ""

  const setCookie = res.headers.get("set-cookie") || ""
  const match = /oauth_state=([^;]+)/.exec(setCookie)

  return { state, cookie: match?.[1] || "" }
}

test.describe("GitHub OAuth state binding", () => {
  test("authorize stores the state in an httpOnly cookie", async () => {
    const res = await authorize(authorizeRequest())
    const setCookie = res.headers.get("set-cookie") || ""
    const location = new URL(res.headers.get("location") || "")
    const state = location.searchParams.get("state") || ""
    const match = /oauth_state=([^;]+)/.exec(setCookie)

    expect(state).not.toHaveLength(0)
    expect(match?.[1]).toBe(state)
    expect(setCookie.toLowerCase()).toContain("httponly")
  })

  test("a callback from a different session is rejected", async () => {
    const { state } = await issueState()
    let githubCalls = 0
    globalThis.fetch = async () => {
      githubCalls += 1
      return Response.json({})
    }

    const res = await callback(callbackRequest(state, "f".repeat(state.length)))

    expect(res.status).toBe(302)
    expect(res.headers.get("location") || "").toContain(
      "authError=state_mismatch"
    )
    expect(githubCalls).toBe(0)
  })

  test("a callback without the binding cookie is rejected", async () => {
    const { state } = await issueState()
    let githubCalls = 0
    globalThis.fetch = async () => {
      githubCalls += 1
      return Response.json({})
    }

    const res = await callback(callbackRequest(state, undefined))

    expect(res.headers.get("location") || "").toContain(
      "authError=state_mismatch"
    )
    expect(githubCalls).toBe(0)
  })

  test("the same state cannot be consumed twice", async () => {
    const { state, cookie } = await issueState()
    let githubCalls = 0
    globalThis.fetch = async () => {
      githubCalls += 1
      // Token exchange fails, but the state must already be consumed.
      return Response.json({})
    }

    const first = await callback(callbackRequest(state, cookie))
    expect(first.headers.get("location") || "").toContain(
      "authError=github_error"
    )

    const second = await callback(callbackRequest(state, cookie))
    expect(second.headers.get("location") || "").toContain(
      "authError=state_mismatch"
    )
    expect(githubCalls).toBe(1)
  })

  test("expired server-side state is refused", () => {
    const now = 1_700_000_000_000
    const state = issueOAuthState("en", now)

    expect(consumeOAuthState(state, state, now)).toBe("en")

    const expired = issueOAuthState("en", now)
    expect(consumeOAuthState(expired, expired, now + 11 * 60 * 1000)).toBeNull()
  })
})
