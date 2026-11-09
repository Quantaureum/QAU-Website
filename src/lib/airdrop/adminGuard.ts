/**
 * Shared guard for the airdrop admin endpoints.
 *
 * The distributor is the only intended caller and authenticates with the
 * X-Admin-Key header. The key is read per request (not at module scope) so a
 * configuration change takes effect without a rebuild.
 *
 * Returns a response to send back, or null when the caller may proceed.
 */

import { NextResponse } from "next/server"

import { secretEquals } from "@/lib/security/timingSafe"

export function adminKeyError(req: Request): NextResponse | null {
  const configured = process.env.AIRDROP_ADMIN_KEY || ""
  if (!configured) {
    return NextResponse.json(
      { success: false, error: "admin key not configured" },
      { status: 503 }
    )
  }
  if (!secretEquals(req.headers.get("x-admin-key"), configured)) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    )
  }
  return null
}
