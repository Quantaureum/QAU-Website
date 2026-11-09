import { expect, test } from "@playwright/test"

import { verifyTurnstile } from "@/lib/airdrop/turnstile"

const originalFetch = globalThis.fetch
const originalSecret = process.env.TURNSTILE_SECRET_KEY
const originalSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

test.afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY
  else process.env.TURNSTILE_SECRET_KEY = originalSecret
  if (originalSiteKey === undefined)
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = originalSiteKey
})

test.describe("turnstile — fail closed", () => {
  test("unconfigured Turnstile is degraded instead of trusted", async () => {
    delete process.env.TURNSTILE_SECRET_KEY
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

    const result = await verifyTurnstile("token", "203.0.113.10")

    expect(result.ok).toBe(true)
    expect(result.degraded).toBe(true)
    expect(result.reason).toBe("turnstile_unconfigured")
  })

  test("network error is degraded instead of fail-open", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret"
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key"
    globalThis.fetch = async () => {
      throw new Error("cloudflare unavailable")
    }

    const result = await verifyTurnstile("token", "203.0.113.10")

    expect(result.ok).toBe(true)
    expect(result.degraded).toBe(true)
    expect(result.reason).toBe("turnstile_unavailable")
  })

  test("a successful verification is not degraded", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret"
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key"
    globalThis.fetch = async () => Response.json({ success: true })

    const result = await verifyTurnstile("token", "203.0.113.10")

    expect(result.ok).toBe(true)
    expect(result.degraded).toBe(false)
  })

  test("a rejected token still blocks the request", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret"
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key"
    globalThis.fetch = async () => Response.json({ success: false })

    const result = await verifyTurnstile("token", "203.0.113.10")

    expect(result.ok).toBe(false)
    expect(result.degraded).toBe(false)
    expect(result.reason).toBe("turnstile_failed")
  })
})
