import { expect, test } from "@playwright/test"

import {
  explorerRateLimit,
  guardExplorerRequest,
} from "../../src/lib/explorer/rateLimit"

function headersForIp(ip: string | undefined): Headers {
  const h = new Headers()
  // Simulate the trusted proxy appending the peer address.
  if (ip) h.set("x-forwarded-for", `10.0.0.1, ${ip}`)
  return h
}

test.beforeEach(() => {
  // The module keeps one Map instance per process (the global reference is
  // only a handle for HMR); clear its contents rather than dropping the key.
  ;(
    globalThis as unknown as { __qauExplorerRateLimit?: Map<string, unknown> }
  ).__qauExplorerRateLimit?.clear()
})

test.describe("explorer rate limit", () => {
  test("allows the first requests and returns no retryAfter", () => {
    const verdict = explorerRateLimit(headersForIp("203.0.113.7"))
    expect(verdict.allowed).toBe(true)
    expect(verdict.retryAfter).toBe(0)
  })

  test("denies requests past the per-IP budget within the window", () => {
    const h = headersForIp("203.0.113.7")
    let denied = 0
    for (let i = 0; i < 61; i++) {
      const verdict = explorerRateLimit(h)
      if (!verdict.allowed) {
        denied++
        expect(verdict.retryAfter).toBeGreaterThan(0)
        expect(verdict.retryAfter).toBeLessThanOrEqual(60)
      }
    }
    expect(denied).toBe(1)
  })

  test("tracks clients independently — a spoofed leftmost XFF entry cannot share or shift budgets", () => {
    // Same client rotating a spoofed leftmost entry: the trusted tail is
    // identical, so all of these count against one bucket.
    let denied = 0
    for (let i = 0; i < 70; i++) {
      const h = new Headers({
        "x-forwarded-for": `${i}.2.3.4, 203.0.113.7`,
      })
      if (!explorerRateLimit(h).allowed) denied++
    }
    expect(denied).toBeGreaterThan(0)

    // A different real client is unaffected.
    const other = explorerRateLimit(headersForIp("198.51.100.23"))
    expect(other.allowed).toBe(true)
  })

  test("returns unknown-header clients a shared bucket without failing open", () => {
    let denied = 0
    for (let i = 0; i < 61; i++) {
      if (!explorerRateLimit(new Headers()).allowed) denied++
    }
    expect(denied).toBe(1)
  })

  test("guardExplorerRequest returns a 429 with Retry-After when over budget", async () => {
    const h = headersForIp("203.0.113.7")
    let last: Response | null = null
    for (let i = 0; i < 61; i++) {
      last = guardExplorerRequest(
        new Request("http://x/api/explorer/stats", { headers: h })
      )
    }
    expect(last).not.toBeNull()
    expect(last!.status).toBe(429)
    expect(Number(last!.headers.get("retry-after"))).toBeGreaterThan(0)
    const body = (await last!.json()) as { error: string }
    expect(body.error).toBe("rate_limited")
  })

  test("guardExplorerRequest returns null while under budget", () => {
    const res = guardExplorerRequest(
      new Request("http://x/api/explorer/stats", {
        headers: headersForIp("203.0.113.8"),
      })
    )
    expect(res).toBeNull()
  })
})
