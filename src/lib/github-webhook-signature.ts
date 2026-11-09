import { createHmac, timingSafeEqual } from "node:crypto"

const SIGNATURE_PREFIX = "sha256="
const SIGNATURE_HEX_LENGTH = 64

/**
 * Verifies the `X-Hub-Signature-256` header produced by GitHub webhooks.
 *
 * The comparison is constant-time and fails closed: a missing secret, a
 * missing/malformed header, or any digest mismatch returns `false`.
 */
export function verifyGitHubWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret: string | undefined
): boolean {
  if (!secret || !signatureHeader) {
    return false
  }

  if (!signatureHeader.startsWith(SIGNATURE_PREFIX)) {
    return false
  }

  const receivedHex = signatureHeader
    .slice(SIGNATURE_PREFIX.length)
    .trim()
    .toLowerCase()

  if (!new RegExp(`^[0-9a-f]{${SIGNATURE_HEX_LENGTH}}$`).test(receivedHex)) {
    return false
  }

  const expectedHex = createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex")

  const received = Buffer.from(receivedHex, "hex")
  const expected = Buffer.from(expectedHex, "hex")

  if (received.length !== expected.length) {
    return false
  }

  return timingSafeEqual(received, expected)
}
