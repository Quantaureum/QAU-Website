"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"

type ContractResult = {
  address: string
  balance: string
  transactionCount: number
  isContract: boolean
}

export default function ContractsPage() {
  const t = useTranslations("page-explorer")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ContractResult | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const address = query.trim()
    if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
      setError(t("page-explorer-contracts-invalid"))
      setResult(null)
      return
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch(`/api/explorer/address/${address}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as ContractResult
      if (!data.isContract) {
        setError(t("page-explorer-contracts-not-contract"))
      } else {
        setResult(data)
      }
    } catch {
      setError(t("page-explorer-contracts-failed"))
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
        / {t("page-explorer-breadcrumb-contracts")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-contracts-title")}
      </h1>
      <p className="mb-8 text-body-medium">
        {t("page-explorer-contracts-desc")}
      </p>

      <form onSubmit={handleSearch} className="mb-8 flex max-w-3xl gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("page-explorer-contracts-placeholder")}
          className="min-h-12 min-w-0 flex-1 rounded-md border border-border bg-background px-4 font-mono text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-primary-inverse min-h-12 rounded-md bg-primary px-5 font-semibold disabled:opacity-50"
        >
          {loading
            ? t("page-explorer-contracts-searching")
            : t("page-explorer-contracts-search")}
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
                  {t("page-explorer-address")}
                </td>
                <td className="p-3 font-mono text-xs">
                  <Link
                    href={`/explorer/address/${result.address}/`}
                    className="text-primary hover:underline"
                  >
                    {result.address}
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-body-medium">
                  {t("page-explorer-status")}
                </td>
                <td className="p-3">
                  <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                    {t("page-explorer-contracts-status-deployed")}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-body-medium">
                  {t("page-explorer-contracts-outgoing")}
                </td>
                <td className="p-3">{result.transactionCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
