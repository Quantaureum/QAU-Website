import { timingSafeEqual } from "node:crypto"

/**
 * Constant-time comparison for shared secrets (admin keys, revalidation
 * secrets). Plain `===` leaks a prefix-length timing signal.
 *
 * An empty configured value or an empty provided value never matches, so a
 * missing environment variable fails closed instead of accepting "".
 */
export function secretEquals(
  provided: string | null | undefined,
  expected: string | null | undefined
): boolean {
  if (!provided || !expected) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
