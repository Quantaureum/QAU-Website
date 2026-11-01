/**
 * Cloudflare Turnstile bot verification
 *
 * Sybil defense layer 2: human verification required before registration
 * / code sending.
 *
 * - When TURNSTILE_SECRET_KEY is absent the module degrades gracefully
 *   (not enabled); the degraded path relies on honeypot-field + submit-
 *   timing heuristics (see fallbackHumanCheck).
 * - The client widget is src/components/TurnstileWidget.tsx: it also skips
 *   rendering without a site key, so front and back stay in sync via env.
 *
 * Environment variables:
 *  - NEXT_PUBLIC_TURNSTILE_SITE_KEY  — widget key from the Cloudflare dashboard
 *  - TURNSTILE_SECRET_KEY            — server-side verification secret
 *  - TURNSTILE_VERIFY_URL optional, defaults to the official endpoint
 *
 * `reason` values are machine codes consumed by the API contract (the
 * client maps them to localized copy), never user-facing prose.
 */

const DEFAULT_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export interface TurnstileCheckResult {
  ok: boolean
  /** true when Turnstile is not enabled (degraded mode) */
  skipped: boolean
  /** machine code, e.g. "turnstile_missing" */
  reason?: string
}

export function isTurnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  )
}

/**
 * Verify a Turnstile token server-side.
 * @param token cf-turnstile-response obtained from window.turnstile
 * @param ip client IP (optional, Cloudflare uses it as a signal)
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string
): Promise<TurnstileCheckResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  // Not configured: degraded mode (do not block; honeypot + timing checks)
  if (!secret || !siteKey) {
    return { ok: true, skipped: true }
  }

  if (!token) {
    return { ok: false, skipped: false, reason: "turnstile_missing" }
  }

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set("remoteip", ip)

    const res = await fetch(
      process.env.TURNSTILE_VERIFY_URL || DEFAULT_VERIFY_URL,
      {
        method: "POST",
        body,
      }
    )
    const data = (await res.json()) as {
      success: boolean
      "error-codes"?: string[]
    }

    if (data.success) return { ok: true, skipped: false }

    console.warn("[turnstile] verify failed:", data["error-codes"])
    return { ok: false, skipped: false, reason: "turnstile_failed" }
  } catch (err) {
    // Fail open on network errors (a Cloudflare outage must not lock out
    // every user), but log it.
    console.error("[turnstile] verify error:", err)
    return { ok: true, skipped: false }
  }
}

/**
 * Heuristic human check for the degraded mode:
 *  - honeypot field: invisible to real users; a filled value means a bot
 *  - submit timing: submitting under N seconds after render is a script
 *    (a real user needs to read the form, type an email, wait for codes)
 */
export function fallbackHumanCheck(opts: {
  honeypotValue?: string
  formLoadedAt?: number
  minSeconds?: number
}): { ok: boolean; reason?: string } {
  const minSeconds = opts.minSeconds ?? 3

  if (opts.honeypotValue && opts.honeypotValue.trim() !== "") {
    return { ok: false, reason: "turnstile_invalid" }
  }

  if (opts.formLoadedAt) {
    const elapsed = (Date.now() - opts.formLoadedAt) / 1000
    if (elapsed < minSeconds) {
      return { ok: false, reason: "turnstile_fast" }
    }
  }

  return { ok: true }
}
