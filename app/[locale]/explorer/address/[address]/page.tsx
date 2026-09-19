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
  addressDirectionCounts,
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

  // Etherscan-style: highlight the current address in From/To and surface the
  // full address on hover instead of only an ellipsized short form.
  const self = address.toLowerCase()
  const addrCell = (addr: string | null | undefined) => {
    if (!addr) return null
    const isSelf = addr.toLowerCase() === self
    return (
      <span
        className={isSelf ? "font-semibold text-primary" : undefined}
        title={addr}
      >
        {shortHash(addr, 8, 6)}
      </span>
    )
  }

  const [info] = await Promise.all([
    getAddressInfo("mainnet", address),
    syncIndex("mainnet"),
  ])
  if (!info) notFound()

  const page = Math.max(1, Number(pageParam ?? 1) || 1)
  const limit = Math.min(50, Math.max(10, Number(limitParam ?? 25) || 25))
  const dirs = addressDirectionCounts(address)
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

      {/* Overview cards (Etherscan-style): Balance / Transactions / Type badge */}
      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border p-4">
          <p className="text-sm text-body-medium">
            {t("page-explorer-balance")}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold">
            {qauFromWeiHex(info.balance, 6)}
          </p>
          <p className="mt-0.5 font-mono text-xs text-body-medium"> QAU</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-sm text-body-medium">
            {t("page-explorer-transactions")}
          </p>
          <div className="mt-2 space-y-2 font-mono">
            <div className="flex items-baseline justify-between gap-2">
              <span className="flex items-center gap-1 text-sm text-primary">
                ↑ {t("page-explorer-from")}
              </span>
              <span className="text-xl font-semibold">
                {dirs.outgoing.toLocaleString()}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="flex items-center gap-1 text-sm text-primary">
                ↓ {t("page-explorer-to")}
              </span>
              <span className="text-xl font-semibold">
                {dirs.incoming.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-sm text-body-medium">
            {t("page-explorer-address-type")}
          </p>
          {info.isContract ? (
            <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {t("page-explorer-contract")}
            </span>
          ) : (
            <span className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
              {t("page-explorer-eoa")}
            </span>
          )}
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
                      {addrCell(tx.from)}
                    </td>
                    <td className="p-3 font-mono text-xs">
                      {tx.to ? addrCell(tx.to) : t("page-explorer-creation")}
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
