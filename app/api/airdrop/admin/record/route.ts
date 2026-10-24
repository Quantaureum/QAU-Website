/**
 * Admin: record payout results (txHash write-back + failure notes).
 * Same guard as pending; the distributor writes these after each batch.
 */

import { NextResponse } from "next/server"

import { hasDatabase, markAirdropPaid } from "@/lib/airdrop/database"

export const dynamic = "force-dynamic"

const ADMIN_KEY = process.env.AIRDROP_ADMIN_KEY || ""

export async function POST(req: Request): Promise<NextResponse> {
  if (!ADMIN_KEY) {
    return NextResponse.json(
      { success: false, error: "admin key not configured" },
      { status: 503 }
    )
  }
  if ((req.headers.get("x-admin-key") || "") !== ADMIN_KEY) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    )
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { success: false, error: "database not configured" },
      { status: 503 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "bad json" },
      { status: 400 }
    )
  }

  // Single write-back: { id, txHash } — the userId lookup maps it.
  if (body.id && body.txHash) {
    const note = body.note ? String(body.note).slice(0, 500) : null
    void note
    // The pending endpoint exposes id = registrations.id (serial), but
    // markAirdropPaid keys on user_id. Resolve the row first.
    const { sql } = await import("@/lib/airdrop/database")
    const rows =
      await sql`SELECT user_id FROM airdrop_registrations WHERE id = ${Number(body.id)} LIMIT 1`
    if (!rows.length) {
      return NextResponse.json(
        { success: false, error: "registration not found" },
        { status: 404 }
      )
    }
    await markAirdropPaid(String(rows[0].user_id), String(body.txHash))
    return NextResponse.json({ success: true })
  }

  // Failure batch: { failures: [{ id, note }] }
  if (Array.isArray(body.failures)) {
    const { sql } = await import("@/lib/airdrop/database")
    for (const f of body.failures as { id?: number; note?: string }[]) {
      if (!f.id) continue
      const note = String(f.note || "").slice(0, 500)
      await sql`
        UPDATE airdrop_registrations
        SET note = ${note}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${Number(f.id)}
      `
    }
    return NextResponse.json({ success: true, recorded: body.failures.length })
  }

  return NextResponse.json(
    { success: false, error: "nothing to record" },
    { status: 400 }
  )
}
