/**
 * Per-client rate limit for the explorer endpoints that can trigger upstream
 * RPC work (the ones that await syncIndex). In-memory fixed window keyed on
 * the trusted client IP — enough for a single-instance deployment; with more
 * than one instance the effective budget multiplies per replica, which is
 * acceptable for a public read-only API (the underlying indexer also paces
 * itself: SCAN_INTERVAL_MS + MAX_SCAN_PER_TICK in src/lib/explorer/indexer.ts).
 */

import { trustedClientIp } from "@/lib/security/clientIp"

const WINDOW_MS = 60_000
const MAX_REQUESTS = 60
/** Upper bound on tracked clients so an anonymous flood cannot grow memory. */
const MAX_TRACKED_CLIENTS = 10_000

type Bucket = { count: number; windowStart: number }

// Survives HMR / route re-evaluation within the same server process, like the
// explorer index itself.
const globalStore = globalThis as unknown as {
  __qauExplorerRateLimit?: Map<string, Bucket>
}
const buckets: Map<string, Bucket> =
  globalStore.__qauExplorerRateLimit ?? new Map()
globalStore.__qauExplorerRateLimit = buckets

export function explorerRateLimit(headers: Headers): {
  allowed: boolean
  retryAfter: number
} {
  const now = Date.now()

  if (buckets.size > MAX_TRACKED_CLIENTS) {
    // Shed expired windows first, then everything — the window resets
    // anyway, so dropping state never grants a client extra budget.
    for (const [key, entry] of buckets) {
      if (now - entry.windowStart >= WINDOW_MS) buckets.delete(key)
    }
    if (buckets.size > MAX_TRACKED_CLIENTS) buckets.clear()
  }

  const client = trustedClientIp(headers)
  const entry = buckets.get(client)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    buckets.set(client, { count: 1, windowStart: now })
    return { allowed: true, retryAfter: 0 }
  }

  entry.count++
  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(
        1,
        Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000)
      ),
    }
  }
  return { allowed: true, retryAfter: 0 }
}

/** Convenience guard: returns a 429 Response when the caller is over budget. */
export function guardExplorerRequest(req: Request): Response | null {
  const verdict = explorerRateLimit(req.headers)
  if (verdict.allowed) return null
  return Response.json(
    { error: "rate_limited" },
    { status: 429, headers: { "Retry-After": String(verdict.retryAfter) } }
  )
}
