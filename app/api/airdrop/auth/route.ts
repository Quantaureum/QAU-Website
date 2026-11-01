/**
 * Airdrop auth: register / verify email / resend code / login.
 *
 * Separated from the production site's future auth so the airdrop campaign
 * can run isolated. Passwords use scrypt (node:crypto, no extra dep);
 * verification codes are 6-digit, emailed. Same-IP code sending is capped
 * at 3 distinct emails per 24h (L3, see ipGuard).
 *
 * Response contract: every body carries a machine-readable `code` field
 * (plus `success`). The server never sends user-facing prose — the client
 * maps `code` to localized copy from the page-airdrop namespace, so all
 * 25 locales render proper translations.
 *
 * Validation is per action: verify/resend are code-only flows and must not
 * require a password (a shared password check once made verification
 * impossible for everyone).
 */

import { randomBytes, randomInt, scryptSync, timingSafeEqual } from "crypto"

import { NextRequest, NextResponse } from "next/server"

import { generateToken } from "@/lib/airdrop/auth"
import {
  countAirdropByEmailDomain,
  createUser,
  findUserByEmail,
  updateUserVerificationCode,
  VERIFICATION_CODE_TTL_MINUTES,
  verifyUserEmail,
} from "@/lib/airdrop/database"
import { checkIpEmailQuota, logIpActivity } from "@/lib/airdrop/ipGuard"
import { sendVerificationEmail } from "@/lib/airdrop/mailer"
import { isDisposableEmailDomain } from "@/lib/sybil/signals"

const UID_PREFIX = "aid"

function newUid(): string {
  return `${UID_PREFIX}-${randomBytes(8).toString("hex")}`
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

function checkPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  const candidate = scryptSync(password, salt, 64)
  const expected = Buffer.from(hash, "hex")
  return (
    candidate.length === expected.length && timingSafeEqual(candidate, expected)
  )
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  return (fwd ? fwd.split(",")[0].trim() : null) || "unknown"
}

function jsonResponse(body: unknown, status: number): NextResponse {
  return NextResponse.json(body, { status })
}

function isValidEmail(email: string): boolean {
  return email.includes("@") && email.length <= 255
}

type IssueResult =
  | { ok: true; code: string }
  | { ok: false; response: NextResponse }

/**
 * Generate + email a fresh verification code. Shared by register and resend
 * so both flows hit the same L3 per-IP quota (3 distinct emails / 24h).
 */
async function issueCode(email: string, ip: string): Promise<IssueResult> {
  const quota = await checkIpEmailQuota(ip)
  if (!quota.allowed) {
    return {
      ok: false,
      response: jsonResponse(
        { success: false, code: "send_code_rate_limited" },
        429
      ),
    }
  }
  const code = String(randomInt(100000, 999999))
  const mail = await sendVerificationEmail(email, code)
  if (!mail.sent) {
    // Rehearsal deployments (no BREVO_API_KEY) log the code instead; a real
    // send failure must surface to the user rather than strand the account.
    console.log(
      `[airdrop-auth] ${mail.rehearsal ? "rehearsal mode" : "MAIL SEND FAILED (" + mail.error + ")"} — verification code for ${email}: ${code}`
    )
    if (!mail.rehearsal) {
      return {
        ok: false,
        response: jsonResponse(
          { success: false, code: "code_send_failed" },
          502
        ),
      }
    }
  }
  await logIpActivity(ip, "send_code", email)
  return { ok: true, code }
}

/**
 * POST /api/airdrop/auth?action=register|verify|resend|login
 * Shared endpoint to keep the route surface small; the action selects the flow.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const action = url.searchParams.get("action") || ""
  const ip = clientIp(req)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ success: false, code: "invalid_request" }, 400)
  }
  const email = String(body.email || "")
    .trim()
    .toLowerCase()
  const password = String(body.password || "")

  if (action === "register") {
    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, code: "invalid_email" }, 400)
    }
    if (password.length < 8) {
      return jsonResponse({ success: false, code: "password_too_short" }, 400)
    }
    if (isDisposableEmailDomain(email)) {
      return jsonResponse({ success: false, code: "disposable_email" }, 403)
    }
    const domain = email.split("@")[1]
    // L3/L6-v2: pre-reject on cluster signals so the account never lands.
    const domainCount = await countAirdropByEmailDomain(domain)
    if (
      domainCount >= 2 &&
      !["gmail.com", "outlook.com", "qq.com"].includes(domain)
    ) {
      return jsonResponse({ success: false, code: "email_domain_crowded" }, 403)
    }
    if (await findUserByEmail(email)) {
      return jsonResponse({ success: false, code: "email_exists" }, 409)
    }
    // Mail goes out before the insert so a send failure leaves no dead
    // account behind; the client retries register instead of resend.
    const issued = await issueCode(email, ip)
    if (!issued.ok) return issued.response
    const uid = newUid()
    await createUser(uid, email, hashPassword(password), issued.code)
    return jsonResponse(
      {
        success: true,
        uid,
        code: "code_sent",
        expiresInSeconds: VERIFICATION_CODE_TTL_MINUTES * 60,
      },
      201
    )
  }

  if (action === "verify") {
    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, code: "invalid_email" }, 400)
    }
    const code = String(body.code || "").trim()
    if (!/^\d{6}$/.test(code)) {
      return jsonResponse({ success: false, code: "wrong_code" }, 403)
    }
    const result = await verifyUserEmail(email, code)
    if (result === "expired") {
      return jsonResponse({ success: false, code: "code_expired" }, 403)
    }
    if (result !== "ok") {
      return jsonResponse({ success: false, code: "wrong_code" }, 403)
    }
    return jsonResponse({ success: true, code: "verify_ok" }, 200)
  }

  if (action === "resend") {
    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, code: "invalid_email" }, 400)
    }
    // Anti-enumeration: unknown mailboxes get the same shape as known ones
    // (nothing is sent, nothing is stored, no quota consumed).
    const user = await findUserByEmail(email)
    if (!user) {
      return jsonResponse({ success: true, code: "code_sent" }, 200)
    }
    const issued = await issueCode(email, ip)
    if (!issued.ok) return issued.response
    await updateUserVerificationCode(email, issued.code)
    return jsonResponse(
      {
        success: true,
        code: "code_sent",
        expiresInSeconds: VERIFICATION_CODE_TTL_MINUTES * 60,
      },
      200
    )
  }

  if (action === "login") {
    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, code: "invalid_email" }, 400)
    }
    if (password.length < 8) {
      return jsonResponse({ success: false, code: "password_too_short" }, 400)
    }
    const user = await findUserByEmail(email)
    const { rowsOf, sql } = await import("@/lib/airdrop/database")
    const hashRows = rowsOf<{ password_hash: string }>(
      await sql`SELECT password_hash FROM users WHERE lower(email) = lower(${email}) LIMIT 1`
    )
    if (
      !user ||
      !checkPassword(password, String(hashRows[0]?.password_hash ?? ""))
    ) {
      return jsonResponse({ success: false, code: "wrong_credentials" }, 401)
    }
    if (!user.is_verified) {
      return jsonResponse({ success: false, code: "verify_first" }, 403)
    }
    const token = generateToken({
      uid: user.uid,
      email: user.email,
      role: "user",
    })
    const res = jsonResponse(
      { success: true, uid: user.uid, code: "login_ok" },
      200
    )
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 3600,
    })
    return res
  }

  return jsonResponse({ success: false, code: "unknown_action" }, 400)
}
