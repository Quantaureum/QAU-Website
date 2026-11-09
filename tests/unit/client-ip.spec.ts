import { expect, test } from "@playwright/test"

import { trustedClientIp } from "../../src/lib/security/clientIp"

function headersWith(init: Record<string, string>): Headers {
  return new Headers(init)
}

test.describe("trustedClientIp", () => {
  test("ignores client-supplied leftmost XFF entries (spoofed)", () => {
    // Single trusted proxy appended the real peer address at the tail; the
    // left entries are attacker-chosen and must be ignored.
    const ip = trustedClientIp(
      headersWith({ "x-forwarded-for": "1.2.3.4, 10.0.0.9, 203.0.113.7" })
    )
    expect(ip).toBe("203.0.113.7")
  })

  test("uses the sole XFF entry when the client sent none", () => {
    const ip = trustedClientIp(
      headersWith({ "x-forwarded-for": "203.0.113.7" })
    )
    expect(ip).toBe("203.0.113.7")
  })

  test("skips junk tail entries and takes the nearest valid one", () => {
    const ip = trustedClientIp(
      headersWith({ "x-forwarded-for": "not-an-ip, 203.0.113.7, also-bad" })
    )
    expect(ip).toBe("203.0.113.7")
  })

  test("rejects out-of-range IPv4 octets", () => {
    const ip = trustedClientIp(
      headersWith({ "x-forwarded-for": "999.999.999.999, 203.0.113.7" })
    )
    expect(ip).toBe("203.0.113.7")
  })

  test("unwraps IPv4-mapped IPv6 tail entries", () => {
    const ip = trustedClientIp(
      headersWith({ "x-forwarded-for": "::ffff:203.0.113.7" })
    )
    expect(ip).toBe("203.0.113.7")
  })

  test("accepts plain IPv6 addresses", () => {
    const ip = trustedClientIp(
      headersWith({ "x-forwarded-for": "2001:db8::1" })
    )
    expect(ip).toBe("2001:db8::1")
  })

  test("falls back to proxy-owned x-real-ip when XFF is absent", () => {
    const ip = trustedClientIp(headersWith({ "x-real-ip": "198.51.100.23" }))
    expect(ip).toBe("198.51.100.23")
  })

  test("prefers XFF tail over x-real-ip", () => {
    const ip = trustedClientIp(
      headersWith({
        "x-forwarded-for": "198.51.100.23",
        "x-real-ip": "203.0.113.99",
      })
    )
    expect(ip).toBe("198.51.100.23")
  })

  test("returns unknown without any address headers", () => {
    expect(trustedClientIp(headersWith({}))).toBe("unknown")
  })

  test("returns unknown when every header value is junk", () => {
    const ip = trustedClientIp(
      headersWith({
        "x-forwarded-for": "garbage, <script>",
        "x-real-ip": "not an ip",
      })
    )
    expect(ip).toBe("unknown")
  })
})
