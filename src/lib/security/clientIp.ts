/**
 * Client IP derivation for security-sensitive checks (per-IP caps, sybil
 * signals, rate limits).
 *
 * Trust model: the app runs behind a single trusted reverse proxy that
 * APPENDS the observed peer address to `X-Forwarded-For` (nginx
 * `proxy_add_x_forwarded_for` semantics). Under that model the LEFTMOST XFF
 * entry is fully client-controlled (spoofable per request), while the
 * RIGHTMOST entry is the one the trusted proxy appended and is the only
 * usable client signal: a client can poison its own left-side entries but
 * cannot fake the tail. Deployments MUST keep the proxy appending; a proxy
 * that passes XFF through unmodified leaves every value untrusted.
 *
 * `x-real-ip` is only consulted when XFF is absent (some proxies set only
 * that header); when the proxy sets it, it is proxy-owned.
 */

const IPV4 =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/

/** Bounded hex/colon form for full and shortened IPv6 addresses. */
const IPV6 = /^[0-9A-Fa-f:]{2,45}$/

/** IPv4-mapped IPv6, e.g. ::ffff:203.0.113.7 — unwrap to the IPv4 part. */
const IPV4_MAPPED = /^::ffff:((?:\d{1,3}\.){3}\d{1,3})$/i

function normalize(candidate: string): string | null {
  const value = candidate.trim()
  if (!value) return null

  const mapped = value.match(IPV4_MAPPED)
  if (mapped) return normalize(mapped[1])

  if (IPV4.test(value)) return value

  if (value.includes(":") && IPV6.test(value)) return value.toLowerCase()

  return null
}

/**
 * Best-effort client IP from proxy-appended headers, or `"unknown"` when no
 * trustworthy value is present. `"unknown"` is fail-soft on purpose: callers
 * treat it as a shared bucket and must not use it to attribute abuse.
 */
export function trustedClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for")
  if (xff) {
    // Rightmost valid entry: the one appended by the trusted proxy.
    const entries = xff.split(",")
    for (let i = entries.length - 1; i >= 0; i--) {
      const ip = normalize(entries[i])
      if (ip) return ip
    }
  }

  const realIp = headers.get("x-real-ip")
  if (realIp) {
    const ip = normalize(realIp)
    if (ip) return ip
  }

  return "unknown"
}
