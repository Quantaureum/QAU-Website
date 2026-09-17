import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import {
  hexToNumber,
  hexToTimestamp,
  qauFromWeiHex,
  shortHash,
  timeAgo,
} from "@/components/Explorer/format"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getTxDetail, listTransactions, syncIndex } from "@/lib/explorer/api"
import { QAU_MAINNET } from "@/lib/explorer/config"

export const dynamic = "force-dynamic"

export default async function TransactionsPage(props: {
  params: Promise<PageParams>
  searchParams: Promise<{ page?: string; limit?: string }>
}) {
  const { locale } = await props.params
  const { page: pageParam, limit: limitParam } = await props.searchParams
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  await syncIndex("mainnet")
  const page = Math.max(1, Number(pageParam ?? 1) || 1)
  const limit = Math.min(50, Math.max(10, Number(limitParam ?? 25) || 25))
  const result = listTransactions(limit, page)
  const txs = await Promise.all(
    result.txs.map((t) => getTxDetail("mainnet", t.hash))
  )

  const totalPages = Math.ceil(result.total / limit)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-breadcrumb-transactions")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-breadcrumb-transactions")}
      </h1>
      <p className="mb-8 text-body-medium">
        {QAU_MAINNET.name} · {result.total.toLocaleString()}{" "}
        {t("page-explorer-txs-indexed")}
      </p>

      {txs.filter(Boolean).length === 0 ? (
        <p className="rounded-xl border border-border p-6 text-body-medium">
          {t("page-explorer-txs-empty")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-body-medium">
              <tr>
                <th className="p-3">{t("page-explorer-tx-hash")}</th>
                <th className="p-3">{t("page-explorer-block")}</th>
                <th className="p-3">{t("page-explorer-age")}</th>
                <th className="p-3">{t("page-explorer-from")}</th>
                <th className="p-3">{t("page-explorer-to")}</th>
                <th className="p-3">{t("page-explorer-value")}</th>
                <th className="p-3">{t("page-explorer-status")}</th>
              </tr>
            </thead>
            <tbody>
              {txs.filter(Boolean).map((tx) => (
                <tr
                  key={tx!.hash}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-3 font-mono">
                    <Link
                      href={`/explorer/tx/${tx!.hash}/`}
                      className="text-primary hover:underline"
                    >
                      {shortHash(tx!.hash, 10, 8)}
                    </Link>
                  </td>
                  <td className="p-3 font-mono">
                    {hexToNumber(tx!.blockNumber).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {timeAgo(hexToTimestamp(tx!.timestamp))}
                  </td>
                  <td className="p-3 font-mono text-xs">
                    {shortHash(tx!.from, 8, 6)}
                  </td>
                  <td className="p-3 font-mono text-xs">
                    {tx!.to
                      ? shortHash(tx!.to, 8, 6)
                      : t("page-explorer-creation")}
                  </td>
                  <td className="p-3 font-mono">
                    {qauFromWeiHex(tx!.value, 4)} QAU
                  </td>
                  <td className="p-3">{t(`page-explorer-${tx!.status}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between text-sm">
        {page > 1 ? (
          <Link
            href={`/explorer/transactions/?page=${page - 1}&limit=${limit}`}
            className="rounded-md border border-border px-4 py-2 font-semibold hover:bg-background-highlight"
          >
            ← {t("page-explorer-newer")}
          </Link>
        ) : (
          <span />
        )}
        <span className="text-body-medium">
          {t("page-explorer-page-of", { page, total: totalPages })}
        </span>
        {page < totalPages ? (
          <Link
            href={`/explorer/transactions/?page=${page + 1}&limit=${limit}`}
            className="rounded-md border border-border px-4 py-2 font-semibold hover:bg-background-highlight"
          >
            {t("page-explorer-older")} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { locale } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "transactions"],
    title: "Transactions — QAU Explorer",
    description: "Browse QAU transactions.",
  })
}
