"use client"

/**
 * Airdrop registration flow (client-side), OAuth-only.
 *
 * GitHub is the only sign-in path (the email/password + verification-code
 * flow was retired): clicking Participate probes /api/airdrop/auth/me and
 * either opens the wallet form or the GitHub sign-in card. Server responses
 * carry machine-readable `code` fields; every code maps to localized copy
 * (API_ERROR_KEYS) so all 25 locales render translated messages.
 *
 * All copy is served by next-intl from the page-airdrop namespace
 * (src/intl/<locale>/page-airdrop.json) — 25-locale coverage, with ICU
 * placeholders ({registered}/{maxSlots}/{amount}/{paid}) for live counters.
 */

import { useCallback, useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import TurnstileWidget from "@/components/TurnstileWidget"

import { API_ERROR_KEYS, SLOTS_FULL_ERROR_KEY } from "@/lib/airdrop/errorCodes"

type Phase = "loading" | "not_started" | "open" | "ended"

interface StatusResponse {
  phase: Phase
  registered: number
  paid: number
  maxSlots: number
  amountPerUser: number
  requireSocial?: boolean
}

type Screen = "status" | "oauth" | "register" | "done"

interface DoneState {
  kind: "approved" | "hold" | "rejected" | "already"
  message: string
}

interface ApiResponse extends Record<string, unknown> {
  success?: boolean
  code?: string
}

interface MeResponse {
  authenticated: boolean
  email: string | null
  provider: string | null
  githubEnabled: boolean
}

export function AirdropRegistration() {
  const t = useTranslations("page-airdrop")
  const locale = useLocale()

  const [phase, setPhase] = useState<Phase>("loading")
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [screen, setScreen] = useState<Screen>("status")
  const [done, setDone] = useState<DoneState | null>(null)

  // registration form state
  const [walletAddress, setWalletAddress] = useState("")
  const [xHandle, setXHandle] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [authError, setAuthError] = useState("")
  const [me, setMe] = useState<MeResponse | null>(null)

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
    // OAuth callback failures land back with ?authError=<code>; surface it
    // once as a localized banner, then strip it from the address bar.
    const params = new URLSearchParams(window.location.search)
    const code = params.get("authError")
    if (code) {
      const key = API_ERROR_KEYS[code]
      setAuthError(key ? t(key) : t("ui-api-github-error"))
      window.history.replaceState(null, "", window.location.pathname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Localized text for a server error response (machine code → copy).
  const errorText = (data: ApiResponse): string => {
    if (data.code === "slots_full") {
      return t(SLOTS_FULL_ERROR_KEY, {
        maxSlots: Number(data.maxSlots ?? 0),
        budgetQau: Number(data.budgetQau ?? 0),
      })
    }
    const key = data.code ? API_ERROR_KEYS[data.code] : undefined
    return key ? t(key) : t("ui-network-error")
  }

  const openParticipation = async () => {
    setAuthError("")
    setError("")
    try {
      const res = await fetch("/api/airdrop/auth/me")
      const data = (await res.json()) as MeResponse
      setMe(data)
      setScreen(data.authenticated ? "register" : "oauth")
    } catch {
      setMe(null)
      setScreen("oauth")
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

  // SSR and the first paint render a skeleton, never the CTA: the status
  // fetch only resolves client-side, so any CTA rendered server-side would
  // flash before hydration.
  if (phase === "loading") {
    return card(
      <div className="space-y-4 text-center" aria-busy="true">
        <h2 className="text-lg font-semibold">{t("page-airdrop-title")}</h2>
        <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto h-9 w-full animate-pulse rounded bg-gray-200" />
      </div>
    )
  }

  if (phase === "not_started") {
    return card(<p className="text-center">{t("ui-not-started")}</p>)
  }
  if (phase === "ended") {
    return card(<p className="text-center">{t("ui-ended")}</p>)
  }

  if (screen === "oauth") {
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t("ui-login")}</h2>
        {authError && <p className="text-sm text-red-600">{authError}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-sm text-gray-600">{t("ui-login-github-hint")}</p>
        {status?.requireSocial && (
          <p className="text-sm text-gray-600">{t("ui-x-required-hint")}</p>
        )}
        {me?.githubEnabled ? (
          <a
            className="flex w-full items-center justify-center gap-2 rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            href={`/api/airdrop/auth/oauth/github?locale=${locale}`}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            {t("ui-login-github")}
          </a>
        ) : (
          <p className="text-sm text-orange-600">
            {t("ui-login-github-unavailable")}
          </p>
        )}
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
        {status?.requireSocial && (
          <p className="text-sm text-gray-500">{t("ui-x-required-hint")}</p>
        )}
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
      <button className={btnCls} onClick={() => void openParticipation()}>
        {t("ui-participate")}
      </button>
    </div>
  )
}
