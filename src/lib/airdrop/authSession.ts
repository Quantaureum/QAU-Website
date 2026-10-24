import { NextRequest } from "next/server"

import { verifyRawToken } from "./auth"
import { findUserById } from "./database"

/**
 * Session resolution for the airdrop namespace (production site).
 * Only the JWT auth_token cookie form is supported: /api/airdrop/auth/login
 * issues it, SameSite=strict, so cross-site requests never carry it (CSRF).
 * Returns the users row (snake_case) or null when unauthenticated.
 */
export async function resolveAuthUser(
  request: NextRequest
): Promise<Record<string, unknown> | null> {
  const authToken = request.cookies.get("auth_token")?.value
  if (!authToken) return null

  const payload = verifyRawToken(authToken)
  if (payload?.uid) {
    const user = await findUserById(payload.uid)
    if (user) return user as unknown as Record<string, unknown>
  }
  return null
}
