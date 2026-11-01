"use client"

/**
 * Airdrop registration flow (client-side).
 *
 * Talks to the isolated /api/airdrop/* namespace. States mirror the sybil
 * state machine: approved → success card; hold → wait-14-days card;
 * rejected → rejection card with the rule list. The form is disabled
 * outside the campaign window.
 *
 * API contract: server responses carry machine-readable `code` fields and
 * no user-facing prose; this component maps every code to localized copy
 * (API_ERROR_KEYS below) so all 25 locales render translated messages.
 * Register/resend responses also carry expiresInSeconds, driving the
 * visible verification-code countdown on the verify screen.
 *
 * All copy is served by next-intl from the page-airdrop namespace
 * (src/intl/<locale>/page-airdrop.json) — 25-locale coverage, with
 * ICU placeholders ({registered}/{maxSlots}/{amount}/{paid}) for the
 * live counters.
 */

import { useCallback, useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import TurnstileWidget from "@/components/TurnstileWidget"

type Phase = "loading" | "not_started" | "open" | "ended"

interface StatusResponse {
  phase: Phase
  registered: number
  paid: number
  maxSlots: number
  amountPerUser: number
}

type Screen = "status" | "register" | "login" | "verify" | "done"

interface DoneState {
  kind: "approved" | "hold" | "rejected" | "already"
  message: string
}

interface ApiResponse extends Record<string, unknown> {
  success?: boolean
  code?: string
}

// Server error codes → page-airdrop keys. Codes missing here (and network
// failures) fall back to the generic network-error copy. A few codes reuse
// existing page copy instead of dedicated ui-api-* keys.
const API_ERROR_KEYS: Record<string, string> = {
  invalid_request: "ui-api-invalid-request",
  invalid_email: "ui-api-invalid-email",
  password_too_short: "ui-api-password-too-short",
  disposable_email: "ui-api-disposable-email",
  email_domain_crowded: "ui-api-email-domain-crowded",
  email_exists: "ui-api-email-exists",
  code_send_failed: "ui-api-code-send-failed",
  wrong_code: "ui-api-wrong-code",
  code_expired: "ui-code-expired",
  wrong_credentials: "ui-api-wrong-credentials",
  verify_first: "ui-api-verify-first",
  unknown_action: "ui-api-unknown-action",
  not_logged_in: "ui-api-not-logged-in",
  system_not_configured: "ui-api-system-not-configured",
  send_code_rate_limited: "ui-api-send-code-rate-limited",
  invalid_x_handle: "ui-api-invalid-x-handle",
  x_handle_taken: "ui-api-x-handle-taken",
  wallet_taken: "ui-api-wallet-taken",
  turnstile_missing: "ui-api-turnstile-missing",
  turnstile_failed: "ui-api-turnstile-failed",
  turnstile_invalid: "ui-api-turnstile-invalid",
  turnstile_fast: "ui-api-turnstile-fast",
  // reuse of existing page copy
  campaign_not_started: "ui-not-started",
  campaign_ended: "ui-ended",
  invalid_wallet: "ui-invalid-wallet",
}

export function AirdropRegistration() {
  const t = useTranslations("page-airdrop")

  const [phase, setPhase] = useState<Phase>("loading")
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [screen, setScreen] = useState<Screen>("status")
  const [done, setDone] = useState<DoneState | null>(null)

  // auth form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")

  // registration form state
  const [walletAddress, setWalletAddress] = useState("")
  const [xHandle, setXHandle] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  // verification-code validity countdown (ms epoch deadline; null = hidden)
  const [codeDeadline, setCodeDeadline] = useState<number | null>(null)
  const [nowTick, setNowTick] = useState(Date.now())

  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/airdrop/status")
      const data = (await res.json()) as StatusResponse
      setPhase(data.phase ?? "open")
      setStatus(data)
    } catch {
      setPhase("open") // status endpoint down: let the register route decide
    }
  }, [])

  useEffect(() => {
    void refreshStatus()
  }, [refreshStatus])

  // 1-second ticker for the code countdown, only while the verify screen shows
  useEffect(() => {
    if (screen !== "verify") return
    const id = setInterval(() => setNowTick(Date.now()), 1000)
    return () => clearInterval(id)
  }, [screen])

  // Anchor the countdown to the moment the server issues the code: refreshing
  // the tick base here keeps the first paint from overstating the remaining
  // time by however long the page has been open.
  const startCountdown = (expiresInSeconds: unknown) => {
    setNowTick(Date.now())
    setCodeDeadline(Date.now() + (Number(expiresInSeconds) || 600) * 1000)
  }

  // Localized text for a server error response (machine code → copy).
  const errorText = (data: ApiResponse): string => {
    if (data.code === "slots_full") {
      return t("ui-api-slots-full", {
        maxSlots: Number(data.maxSlots ?? 0),
        budgetQau: Number(data.budgetQau ?? 0),
      })
    }
    const key = data.code ? API_ERROR_KEYS[data.code] : undefined
    return key ? t(key) : t("ui-network-error")
  }

  const authCall = async (
    action: string,
    body: Record<string, unknown>
  ): Promise<ApiResponse | null> => {
    setBusy(true)
    setError("")
    setNotice("")
    try {
      const res = await fetch(`/api/airdrop/auth?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = (await res.json()) as ApiResponse
      if (!data.success) {
        setError(errorText(data))
        return null
      }
      return data
    } catch {
      setError(t("ui-network-error"))
      return null
    } finally {
      setBusy(false)
    }
  }

  const submitRegistration = async () => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError(t("ui-invalid-wallet"))
      return
    }
    setBusy(true)
    setError("")
    try {
      const res = await fetch("/api/airdrop/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          xHandle: xHandle || undefined,
          turnstileToken: turnstileToken || undefined,
        }),
      })
      const data = (await res.json()) as ApiResponse
      if (data.success) {
        const sybil = data.sybil as { status?: string } | undefined
        const sybilStatus = sybil?.status
        if (data.code === "already_registered" || data.alreadyRegistered) {
          setDone({ kind: "already", message: t("ui-already-registered") })
        } else if (
          data.code === "sybil_approved" ||
          sybilStatus === "approved"
        ) {
          setDone({ kind: "approved", message: t("ui-msg-sybil-approved") })
        } else if (data.code === "sybil_hold" || sybilStatus === "hold") {
          setDone({ kind: "hold", message: t("ui-msg-sybil-hold") })
        } else {
          setDone({ kind: "rejected", message: t("ui-msg-sybil-rejected") })
        }
        setScreen("done")
        void refreshStatus()
      } else {
        setError(errorText(data))
      }
    } catch {
      setError(t("ui-network-error"))
    } finally {
      setBusy(false)
    }
  }

  // ---- render helpers ----------------------------------------------------

  const card = (children: React.ReactNode) => (
    <div className="mx-auto max-w-xl rounded-lg border p-6 shadow-sm">
      {children}
    </div>
  )

  const inputCls =
    "w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  const btnCls =
    "w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"

  if (screen === "done" && done) {
    const tone =
      done.kind === "approved"
        ? "border-green-500 bg-green-50"
        : done.kind === "rejected"
          ? "border-red-500 bg-red-50"
          : "border-yellow-500 bg-yellow-50"
    return (
      <div
        className={`mx-auto max-w-xl rounded-lg border p-6 shadow-sm ${tone}`}
      >
        <h2 className="mb-3 text-lg font-semibold">
          {done.kind === "approved"
            ? t("ui-registration-approved")
            : done.kind === "hold"
              ? t("ui-under-review")
              : done.kind === "already"
                ? t("ui-already-registered")
                : t("ui-registration-rejected")}
        </h2>
        <p className="text-sm text-gray-700">{done.message}</p>
      </div>
    )
  }

  if (phase === "not_started") {
    return card(<p className="text-center">{t("ui-not-started")}</p>)
  }
  if (phase === "ended") {
    return card(<p className="text-center">{t("ui-ended")}</p>)
  }

  if (screen === "login") {
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t("ui-login")}</h2>
        <input
          className={inputCls}
          placeholder={t("ui-email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={inputCls}
          type="password"
          placeholder={t("ui-password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {notice && <p className="text-sm text-green-600">{notice}</p>}
        <button
          className={btnCls}
          disabled={busy}
          onClick={async () => {
            const r = await authCall("login", { email, password })
            if (r) setScreen("register")
          }}
        >
          {t("ui-login")}
        </button>
        <button
          className="text-sm text-blue-600"
          disabled={busy}
          onClick={async () => {
            const r = await authCall("register", { email, password })
            if (r) {
              startCountdown(r.expiresInSeconds)
              setScreen("verify")
            }
          }}
        >
          {t("ui-no-account-register")}
        </button>
      </div>
    )
  }

  if (screen === "verify") {
    const remaining = codeDeadline ? Math.max(0, codeDeadline - nowTick) : null
    const mmss = (ms: number) => {
      const total = Math.floor(ms / 1000)
      return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
    }
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t("ui-verify-email")}</h2>
        <p className="text-sm text-gray-600">{t("ui-code-hint")}</p>
        <input
          className={inputCls}
          placeholder={t("ui-code-placeholder")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {remaining !== null && remaining > 0 && (
          <p className="text-sm text-gray-500">
            {t("ui-code-expiry", { time: mmss(remaining) })}
          </p>
        )}
        {remaining !== null && remaining <= 0 && (
          <p className="text-sm text-orange-600">{t("ui-code-expired")}</p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {notice && <p className="text-sm text-green-600">{notice}</p>}
        <button
          className={btnCls}
          disabled={busy}
          onClick={async () => {
            const r = await authCall("verify", { email, code })
            if (r) {
              setNotice(t("ui-msg-verify-ok"))
              setScreen("login")
            }
          }}
        >
          {t("ui-verify")}
        </button>
        <button
          className="text-sm text-blue-600"
          disabled={busy}
          onClick={async () => {
            const r = await authCall("resend", { email })
            if (r) {
              startCountdown(r.expiresInSeconds)
              setNotice(t("ui-msg-code-sent"))
            }
          }}
        >
          {t("ui-resend")}
        </button>
      </div>
    )
  }

  if (screen === "register") {
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t("ui-register-title")}</h2>
        <p className="text-sm text-gray-600">
          {status
            ? t("ui-slots-taken", {
                registered: status.registered,
                maxSlots: status.maxSlots,
                amount: status.amountPerUser,
              })
            : ""}
        </p>
        <input
          className={inputCls}
          placeholder={t("ui-wallet-placeholder")}
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          className={inputCls}
          placeholder={t("ui-x-placeholder")}
          value={xHandle}
          onChange={(e) => setXHandle(e.target.value)}
        />
        <TurnstileWidget onChange={setTurnstileToken} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className={btnCls} disabled={busy} onClick={submitRegistration}>
          {busy ? t("ui-submitting") : t("ui-submit")}
        </button>
      </div>
    )
  }

  // default: status → CTA
  return card(
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold">{t("page-airdrop-title")}</h2>
      {status && (
        <p className="text-sm text-gray-600">
          {t("ui-registered-paid", {
            registered: status.registered,
            maxSlots: status.maxSlots,
            paid: status.paid,
          })}
        </p>
      )}
      <button className={btnCls} onClick={() => setScreen("login")}>
        {t("ui-participate")}
      </button>
    </div>
  )
}
