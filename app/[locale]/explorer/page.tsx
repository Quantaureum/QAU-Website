import { redirect } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import BlockBarChart from "@/components/Explorer/BlockBarChart"
import {
  gasFromHex,
  gweiFromHex,
  hexToNumber,
  hexToTimestamp,
  qauFromWeiHex,
  shortHash,
  timeAgo,
} from "@/components/Explorer/format"
import { Image } from "@/components/Image"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import {
  getRecentBlocks,
  getStats,
  getTxDetail,
  listTransactions,
  syncIndex,
} from "@/lib/explorer/api"
import {
  getExplorerLookupKind,
  normalizeQueryForRoute,
  QAU_MAINNET,
} from "@/lib/explorer/config"
import explorerHeroImg from "@/public/images/heroes/explorer-hero.png"

export const dynamic = "force-dynamic"

export const RECENT_BLOCKS = 10
export const RECENT_TXS = 8

export default async function ExplorerPage(props: {
  params: Promise<PageParams>
  searchParams: Promise<{ q?: string }>
}) {
  const { locale } = await props.params
  const { q } = await props.searchParams
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  // Search redirect (old-site behavior): /explorer?q=... → matching detail page
  const query = q?.trim() ?? ""
  let searchNoMatch = false
  if (query) {
    const kind = getExplorerLookupKind(query)
    // Canonical query shape (leading 0x + no trailing slash) so the detail
    // route segment matches the value the address/tx pages expect.
    const canonical = normalizeQueryForRoute(query)
    // Keep the current locale when redirecting into a detail page.
    const detailPath =
      kind === "address"
        ? `/explorer/address/${canonical}/`
        : kind === "transaction"
          ? `/explorer/tx/${canonical}/`
          : kind === "block"
            ? `/explorer/block/${canonical}/`
            : null
    if (detailPath) {
      redirect(locale === "en" ? detailPath : `/${locale}${detailPath}`)
    }
    // Query present but not a recognizable address/tx/block shape.
    searchNoMatch = true
  }

  // Kick the indexer so stats/list pages fill progressively
  await syncIndex("mainnet")
  const [stats, blocks, txList] = await Promise.all([
    getStats("mainnet"),
    getRecentBlocks("mainnet", RECENT_BLOCKS, 1),
    (async () => {
      await syncIndex("mainnet")
      return listTransactions(RECENT_TXS, 1)
    })(),
  ])
  const txs = await Promise.all(
    txList.txs.slice(0, RECENT_TXS).map((t) => getTxDetail("mainnet", t.hash))
  )

  // chart data (old-site: gas_usage + tx_per_block)
  const chartBlocks = [...blocks.blocks].reverse()
  const gasLabels = chartBlocks.map((b) => `#${hexToNumber(b.number)}`)
  const gasValues = chartBlocks.map((b) => hexToNumber(b.gasUsed) / 1e6)
  const txLabels = chartBlocks.map((b) => `#${hexToNumber(b.number)}`)
  const txValues = chartBlocks.map((b) => b.transactionCount)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 font-mono text-sm tracking-[0.2em] text-body-medium uppercase">
          {QAU_MAINNET.name} · Chain ID {QAU_MAINNET.chainId}
        </p>
        <h1 className="mb-5 text-5xl font-bold tracking-tight">QAU Explorer</h1>
        <p className="text-lg text-body-medium">
          {t("page-explorer-hero-sub")}
        </p>
      </header>

      <div className="mb-10 overflow-hidden rounded-2xl border">
        <Image
          src={explorerHeroImg}
          alt=""
          sizes="(max-width: 768px) 100vw, 1152px"
          className="h-56 w-full object-cover md:h-72"
        />
      </div>

      {/*
        Submit back to THIS explorer page (which handles ?q= server-side and
        redirects to the matching detail page). Because trailingSlash is on, the
        page URL is always /{locale}/explorer/ , so action="." resolves to the
        current directory and preserves the locale prefix. A path like
        "./explorer/" would resolve to /{locale}/explorer/explorer/ and 404.
      */}
      <form className="mb-10 flex max-w-3xl gap-3" method="get" action=".">
        <label className="sr-only" htmlFor="explorer-query">
          Search
        </label>
        <input
          id="explorer-query"
          name="q"
          defaultValue={query}
          placeholder={t("page-explorer-search-placeholder")}
          className="min-h-12 min-w-0 flex-1 rounded-md border border-border bg-background px-4 font-mono text-sm"
        />
        <button
          type="submit"
          className="text-primary-foreground min-h-12 rounded-md bg-primary px-6 font-semibold"
        >
          {t("page-explorer-search")}
        </button>
      </form>

      {searchNoMatch && (
        <p role="alert" className="-mt-6 mb-10 max-w-3xl text-sm text-red-500">
          {t("page-explorer-search-no-match", { query })}
        </p>
      )}

      {/* Quick links */}
      <section aria-labelledby="quick-links" className="mb-10">
        <h2 id="quick-links" className="mb-4 text-2xl font-semibold">
          {t("page-explorer-explore")}
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            [t("page-explorer-validators"), "/explorer/validators/"],
            [t("page-explorer-miners"), "/explorer/miners/"],
            [t("page-explorer-contracts"), "/explorer/contracts/"],
            [t("page-explorer-qpos-short"), "/explorer/qpos/"],
            [t("page-explorer-network"), "/explorer/network/"],
            [t("page-explorer-quantum-verify"), "/explorer/quantum-verify/"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-border p-4 text-center font-semibold transition-colors hover:bg-background-highlight"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Network stats */}
      <section aria-labelledby="network-stats" className="mb-10">
        <h2 id="network-stats" className="mb-4 text-2xl font-semibold">
          {t("page-explorer-network-status")}
        </h2>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border p-4">
            <dt className="text-sm text-body-medium">
              {t("page-explorer-latest-block")}
            </dt>
            <dd className="mt-1 font-mono text-xl font-semibold">
              {stats.latestBlock.toLocaleString()}
            </dd>
          </div>
          <div className="rounded-xl border border-border p-4">
            <dt className="text-sm text-body-medium">
              {t("page-explorer-total-transactions")}
            </dt>
            <dd className="mt-1 font-mono text-xl font-semibold">
              {stats.totalTransactions.toLocaleString()}
            </dd>
          </div>
          <div className="rounded-xl border border-border p-4">
            <dt className="text-sm text-body-medium">
              {t("page-explorer-peers")}
            </dt>
            <dd className="mt-1 font-mono text-xl font-semibold">
              {stats.peerCount}
            </dd>
          </div>
          <div className="rounded-xl border border-border p-4">
            <dt className="text-sm text-body-medium">
              {t("page-explorer-gas-price")}
            </dt>
            <dd className="mt-1 font-mono text-xl font-semibold">
              {gweiFromHex(stats.gasPrice)} gwei
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-body-medium">
          {t("page-explorer-index-progress")}:{" "}
          {Math.round(stats.txIndex.progress * 100)}% ·{" "}
          {stats.txIndex.scanning
            ? t("page-explorer-scanning")
            : t("page-explorer-up-to-date")}
        </p>
      </section>

      {/* Charts */}
      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-lg font-semibold">
            {t("page-explorer-gas-used-per-block")}
          </h3>
          <BlockBarChart
            labels={gasLabels}
            values={gasValues}
            unit="Gas Used (M)"
          />
        </div>
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-lg font-semibold">
            {t("page-explorer-txs-per-block")}
          </h3>
          <BlockBarChart labels={txLabels} values={txValues} unit="Txs" />
        </div>
      </section>

      {/* Latest blocks */}
      <section aria-labelledby="latest-blocks" className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="latest-blocks" className="text-2xl font-semibold">
            {t("page-explorer-latest-blocks")}
          </h2>
          <Link
            href="/explorer/blocks/"
            className="text-sm font-semibold text-primary hover:underline"
          >
            {t("page-explorer-view-all-blocks")}
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-body-medium">
              <tr>
                <th className="p-3">{t("page-explorer-block")}</th>
                <th className="p-3">{t("page-explorer-age")}</th>
                <th className="p-3">{t("page-explorer-miner")}</th>
                <th className="p-3">{t("page-explorer-txs")}</th>
                <th className="p-3">{t("page-explorer-gas-used")}</th>
              </tr>
            </thead>
            <tbody>
              {blocks.blocks.map((b) => (
                <tr
                  key={b.hash}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-3 font-mono">
                    <Link
                      href={`/explorer/block/${hexToNumber(b.number)}/`}
                      className="font-medium text-primary hover:underline"
                    >
                      {hexToNumber(b.number).toLocaleString()}
                    </Link>
                  </td>
                  <td className="p-3">
                    {timeAgo(hexToTimestamp(b.timestamp))}
                  </td>
                  <td className="p-3 font-mono text-xs">
                    {shortHash(b.miner, 10, 8)}
                  </td>
                  <td className="p-3">{b.transactionCount}</td>
                  <td className="p-3 font-mono">{gasFromHex(b.gasUsed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Latest transactions */}
      <section aria-labelledby="latest-txs" className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="latest-txs" className="text-2xl font-semibold">
            {t("page-explorer-latest-transactions")}
          </h2>
          <Link
            href="/explorer/transactions/"
            className="text-sm font-semibold text-primary hover:underline"
          >
            {t("page-explorer-view-all-transactions")}
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-body-medium">
              <tr>
                <th className="p-3">{t("page-explorer-tx-hash")}</th>
                <th className="p-3">{t("page-explorer-block")}</th>
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
                  <td className="p-3 font-mono text-xs">
                    {shortHash(tx!.from, 8, 6)}
                  </td>
                  <td className="p-3 font-mono text-xs">
                    {tx!.to
                      ? shortHash(tx!.to, 8, 6)
                      : t("page-explorer-contract-creation")}
                  </td>
                  <td className="p-3 font-mono">
                    {qauFromWeiHex(tx!.value, 4)} QAU
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        tx!.status === "success"
                          ? "rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success"
                          : tx!.status === "failed"
                            ? "rounded-full bg-error/10 px-2 py-0.5 text-xs font-semibold text-error"
                            : "rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning"
                      }
                    >
                      {t(`page-explorer-${tx!.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { locale } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer"],
    title: "QAU Explorer",
    description: "Official Quantaureum QAU network explorer.",
  })
}
