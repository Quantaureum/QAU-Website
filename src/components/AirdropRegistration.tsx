"use client"

/**
 * Airdrop registration flow (client-side).
 *
 * Talks to the isolated /api/airdrop/* namespace. States mirror the sybil
 * state machine: approved → success card; hold → wait-14-days card;
 * rejected → rejection card with the rule list. The form is disabled
 * outside the campaign window.
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

  const authCall = async (action: string, body: Record<string, unknown>) => {
    setBusy(true)
    setError("")
    try {
      const res = await fetch(`/api/airdrop/auth?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error || "error")
        return false
      }
      return data
    } catch {
      setError(t("ui-network-error"))
      return false
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
      const data = await res.json()
      if (data.success) {
        const sybilStatus = data.sybil?.status as string | undefined
        if (data.alreadyRegistered) {
          setDone({ kind: "already", message: t("ui-already-registered") })
        } else if (sybilStatus === "approved") {
          setDone({ kind: "approved", message: data.message })
        } else if (sybilStatus === "hold") {
          setDone({ kind: "hold", message: data.message })
        } else {
          setDone({ kind: "rejected", message: data.message })
        }
        setScreen("done")
        void refreshStatus()
      } else {
        setError(data.error || "error")
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
          onClick={async () => {
            const r = await authCall("register", { email, password })
            if (r) setScreen("verify")
          }}
        >
          {t("ui-no-account-register")}
        </button>
      </div>
    )
  }

  if (screen === "verify") {
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
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          className={btnCls}
          disabled={busy}
          onClick={async () => {
            const r = await authCall("verify", { email, code })
            if (r) setScreen("login")
          }}
        >
          {t("ui-verify")}
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
