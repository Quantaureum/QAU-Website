"use client"

/**
 * Airdrop registration flow (client-side).
 *
 * Talks to the isolated /api/airdrop/* namespace. States mirror the sybil
 * state machine: approved → success card; hold → wait-14-days card;
 * rejected → rejection card with the rule list. The form is disabled
 * outside the campaign window.
 */

import { type ReactNode, useCallback, useEffect, useState } from "react"

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

export function AirdropRegistration({ locale }: { locale: string }) {
  const t = useCallback(
    (en: string, zh: string) => (locale === "zh" ? zh : en),
    [locale]
  )

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
    // Logged-in probe: a cheap authed request. 401 → not logged in.
    void fetch("/api/airdrop/admin/stats?public=1").then(() => {
      /* noop — actual login probe happens on submit */
    })
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
      setError("network error")
      return false
    } finally {
      setBusy(false)
    }
  }

  const submitRegistration = async () => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError(
        t(
          "Invalid wallet address (0x + 40 hex)",
          "无效的钱包地址（0x + 40 位十六进制）"
        )
      )
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
          setDone({
            kind: "already",
            message: data.error || t("Already registered", "已登记过"),
          })
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
      setError("network error")
    } finally {
      setBusy(false)
    }
  }

  // ---- render helpers ----------------------------------------------------

  const card = (children: ReactNode) => (
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
            ? t("Registration approved", "报名已通过")
            : done.kind === "hold"
              ? t("Under review", "需要额外核验")
              : done.kind === "already"
                ? t("Already registered", "已登记过")
                : t("Registration rejected", "报名未通过")}
        </h2>
        <p className="text-sm text-gray-700">{done.message}</p>
      </div>
    )
  }

  if (phase === "not_started") {
    return card(
      <p className="text-center">
        {t("The airdrop has not started yet.", "空投活动尚未开始。")}
      </p>
    )
  }
  if (phase === "ended") {
    return card(
      <p className="text-center">
        {t("The airdrop has ended.", "空投活动已结束。")}
      </p>
    )
  }

  if (screen === "login") {
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{t("Login", "登录")}</h2>
        <input
          className={inputCls}
          placeholder={t("Email", "邮箱")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={inputCls}
          type="password"
          placeholder={t("Password", "密码")}
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
          {t("Login", "登录")}
        </button>
        <button
          className="text-sm text-blue-600"
          onClick={async () => {
            const r = await authCall("register", { email, password })
            if (r) setScreen("verify")
          }}
        >
          {t("No account? Register", "没有账号？注册")}
        </button>
      </div>
    )
  }

  if (screen === "verify") {
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          {t("Verify your email", "邮箱验证")}
        </h2>
        <p className="text-sm text-gray-600">
          {t(
            "Enter the 6-digit code sent to your inbox. (Rehearsal deployments print it in the server log.)",
            "输入发送到邮箱的 6 位验证码。（预演部署会打印在服务端日志中。）"
          )}
        </p>
        <input
          className={inputCls}
          placeholder={t("6-digit code", "6 位验证码")}
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
          {t("Verify", "验证")}
        </button>
      </div>
    )
  }

  if (screen === "register") {
    return card(
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          {t("Register for the airdrop", "空投报名")}
        </h2>
        <p className="text-sm text-gray-600">
          {status
            ? t(
                `${status.registered}/${status.maxSlots} slots taken · ${status.amountPerUser} QAU each`,
                `已报 ${status.registered}/${status.maxSlots} 名 · 每人 ${status.amountPerUser} QAU`
              )
            : ""}
        </p>
        <input
          className={inputCls}
          placeholder={t("Wallet address (0x...)", "钱包地址 (0x...)")}
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          className={inputCls}
          placeholder={t("X (Twitter) username", "X (Twitter) 用户名")}
          value={xHandle}
          onChange={(e) => setXHandle(e.target.value)}
        />
        <TurnstileWidget onChange={setTurnstileToken} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className={btnCls} disabled={busy} onClick={submitRegistration}>
          {busy
            ? t("Submitting...", "提交中...")
            : t("Submit registration", "提交报名")}
        </button>
      </div>
    )
  }

  // default: status → CTA
  return card(
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold">
        {t("Community Airdrop", "社区空投")}
      </h2>
      {status && (
        <p className="text-sm text-gray-600">
          {t(
            `${status.registered}/${status.maxSlots} registered · ${status.paid} paid`,
            `已报 ${status.registered}/${status.maxSlots} · 已发放 ${status.paid}`
          )}
        </p>
      )}
      <button className={btnCls} onClick={() => setScreen("login")}>
        {t("Participate", "参与空投")}
      </button>
    </div>
  )
}
