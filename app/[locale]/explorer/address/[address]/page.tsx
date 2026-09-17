import { notFound } from "next/navigation"
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
import {
  addressTransactionList,
  getAddressInfo,
  syncIndex,
} from "@/lib/explorer/api"
import { isAddress } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

export default async function AddressPage(props: {
  params: Promise<PageParams & { address: string }>
  searchParams: Promise<{ page?: string; limit?: string }>
}) {
  const { locale, address } = await props.params
  const { page: pageParam, limit: limitParam } = await props.searchParams
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")
  if (!isAddress(address)) notFound()

  const [info] = await Promise.all([
    getAddressInfo("mainnet", address),
    syncIndex("mainnet"),
  ])
  if (!info) notFound()

  const page = Math.max(1, Number(pageParam ?? 1) || 1)
  const limit = Math.min(50, Math.max(10, Number(limitParam ?? 25) || 25))
  const txList = addressTransactionList(address, limit, page)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-address")}
      </nav>

      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        {info.isContract
          ? t("page-explorer-contract")
          : t("page-explorer-address")}
      </h1>
      <p className="mb-8 font-mono text-sm break-all">{address}</p>

      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border p-4">
          <p className="text-sm text-body-medium">
            {t("page-explorer-balance")}
          </p>
          <p className="mt-1 font-mono text-xl font-semibold">
            {qauFromWeiHex(info.balance, 6)} QAU
          </p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-sm text-body-medium">
            {t("page-explorer-transactions")}
          </p>
          <p className="mt-1 font-mono text-xl font-semibold">
            {info.transactionCount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-sm text-body-medium">
            {t("page-explorer-address-type")}
          </p>
          <p className="mt-1 text-xl font-semibold">
            {info.isContract
              ? t("page-explorer-contract")
              : t("page-explorer-eoa")}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          {t("page-explorer-transactions")} ({txList.total.toLocaleString()})
        </h2>
        {txList.txs.length === 0 ? (
          <p className="rounded-xl border border-border p-6 text-body-medium">
            {t("page-explorer-address-txs-empty")}
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
                {txList.txs.map((tx) => (
                  <tr
                    key={tx.hash}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-3 font-mono">
                      <Link
                        href={`/explorer/tx/${tx.hash}/`}
                        className="text-primary hover:underline"
                      >
                        {shortHash(tx.hash, 10, 8)}
                      </Link>
                    </td>
                    <td className="p-3 font-mono">
                      {hexToNumber(tx.blockNumber).toLocaleString()}
                    </td>
                    <td className="p-3">
                      {timeAgo(hexToTimestamp(tx.timestamp))}
                    </td>
                    <td className="p-3 font-mono text-xs">
                      {shortHash(tx.from, 8, 6)}
                    </td>
                    <td className="p-3 font-mono text-xs">
                      {tx.to
                        ? shortHash(tx.to, 8, 6)
                        : t("page-explorer-creation")}
                    </td>
                    <td className="p-3 font-mono">
                      {qauFromWeiHex(tx.value, 4)} QAU
                    </td>
                    <td className="p-3">
                      {t(`page-explorer-${tx.status ?? "unknown"}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {txList.total > limit && (
          <div className="mt-6 flex items-center justify-between text-sm">
            {page > 1 ? (
              <Link
                href={`/explorer/address/${address}/?page=${page - 1}&limit=${limit}`}
                className="rounded-md border border-border px-4 py-2 font-semibold hover:bg-background-highlight"
              >
                ← {t("page-explorer-newer")}
              </Link>
            ) : (
              <span />
            )}
            <span className="text-body-medium">
              {t("page-explorer-page-of", {
                page,
                total: Math.ceil(txList.total / limit),
              })}
            </span>
            {page * limit < txList.total ? (
              <Link
                href={`/explorer/address/${address}/?page=${page + 1}&limit=${limit}`}
                className="rounded-md border border-border px-4 py-2 font-semibold hover:bg-background-highlight"
              >
                {t("page-explorer-older")} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export async function generateMetadata(props: {
  params: Promise<PageParams & { address: string }>
}) {
  const { locale, address } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "address", address],
    title: `Address ${address.slice(0, 10)}… — QAU Explorer`,
    description: "QAU address details: balance, nonce, transactions.",
  })
}
