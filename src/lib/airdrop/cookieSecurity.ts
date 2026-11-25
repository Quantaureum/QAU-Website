/**
 * Cookie security attributes (single source of truth).
 *
 * LOCALHOST FIX (2026-09-09): all auth cookies previously used
 * `secure: process.env.NODE_ENV === 'production'`, so under a production
 * build even http://localhost got the Secure flag — browsers refuse to send
 * such a cookie over HTTP, which completely broke the login session in
 * local production mode (login succeeded but every API call returned 401).
 *
 * Rule: attach Secure only when the request provably comes from a
 * non-localhost origin.
 * - Production HTTPS deployment: host is not localhost → secure: true
 *   (unchanged)
 * - Local next start: localhost → secure: false (the fix target)
 * - Do NOT derive this from the request Host header (spoofable); combine
 *   deployment env vars with NODE_ENV instead — see shouldUseSecureCookie.
 */

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]", "0.0.0.0"])

/**
 * Whether the current deployment faces localhost (env vars, not request
 * headers, to prevent spoofing). If NEXT_PUBLIC_SITE_URL is unset, default
 * to non-localhost (production safety first).
 */
export function shouldUseSecureCookie(): boolean {
  if (process.env.NODE_ENV !== "production") return false
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || ""
  try {
    const host = new URL(siteUrl).hostname
    return !LOCAL_HOSTNAMES.has(host)
  } catch {
    // No site URL or not URL-shaped: fall back to the old logic, production
    // safety first.
    return true
  }
}

/** Common security attributes for auth_token and the other cookies */
export function secureCookieAttrs() {
  return {
    httpOnly: true,
    secure: shouldUseSecureCookie(),
    sameSite: "strict" as const,
    path: "/",
  }
}
