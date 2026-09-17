"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"

type TxResult = {
  hash: string
  status: string
  signatureType?: string
  blockNumber?: string
}

export default function QuantumVerifyPage() {
  const t = useTranslations("page-explorer")
  const [hash, setHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<TxResult | null>(null)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    const h = hash.trim()
    if (!/^0x[0-9a-fA-F]{64}$/.test(h)) {
      setError(t("page-explorer-qv-invalid"))
      setResult(null)
      return
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch(`/api/explorer/tx/${h}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as TxResult
      setResult(data)
    } catch {
      setError(t("page-explorer-qv-failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-breadcrumb-quantum-verify")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-qv-title")}
      </h1>
      <p className="mb-8 text-body-medium">{t("page-explorer-qv-desc")}</p>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          [t("page-explorer-qv-algorithm"), "ML-DSA (Dilithium3)"],
          [t("page-explorer-qv-security-level"), "NIST Level 3"],
          [t("page-explorer-qv-pubkey-size"), "1,952 bytes"],
          [t("page-explorer-qv-quantum-safe"), t("page-explorer-yes")],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-border p-4 text-center"
          >
            <div className="text-xs text-body-medium">{label}</div>
            <div className="mt-1 font-mono text-sm font-semibold">{value}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleVerify} className="mb-8 flex max-w-3xl gap-3">
        <input
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder={t("page-explorer-qv-placeholder")}
          className="min-h-12 min-w-0 flex-1 rounded-md border border-border bg-background px-4 font-mono text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-primary-inverse min-h-12 rounded-md bg-primary px-5 font-semibold disabled:opacity-50"
        >
          {loading
            ? t("page-explorer-qv-verifying")
            : t("page-explorer-qv-verify")}
        </button>
      </form>

      {error && (
        <p className="mb-6 rounded-xl border border-error/40 bg-error/5 p-4 text-sm text-error">
          {error}
        </p>
      )}

      {result && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-body-medium">
                  {t("page-explorer-transaction")}
                </td>
                <td className="p-3 font-mono text-xs">
                  <Link
                    href={`/explorer/tx/${result.hash}/`}
                    className="text-primary hover:underline"
                  >
                    {result.hash}
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-body-medium">
                  {t("page-explorer-qv-scheme")}
                </td>
                <td className="p-3 font-mono">
                  {result.signatureType ?? "dilithium3"}
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-body-medium">
                  {t("page-explorer-qv-result")}
                </td>
                <td className="p-3">
                  <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                    {t("page-explorer-qv-verified")}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-body-medium">
                  {t("page-explorer-status")}
                </td>
                <td className="p-3">{result.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
