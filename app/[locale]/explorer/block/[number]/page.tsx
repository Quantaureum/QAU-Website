import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import {
  dateFromHex,
  gasFromHex,
  hexToNumber,
  hexToTimestamp,
  qauFromWeiHex,
  shortHash,
  timeAgo,
} from "@/components/Explorer/format"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getBlockByNumberOrTag, getBlockTxs } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

export default async function BlockDetailPage(props: {
  params: Promise<PageParams & { number: string }>
}) {
  const { locale, number } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  if (!/^\d+$/.test(number) && !/^0x[0-9a-fA-F]+$/.test(number)) notFound()
  const block = await getBlockByNumberOrTag("mainnet", number, false)
  if (!block) notFound()

  const txs = await getBlockTxs("mainnet", number)
  const blockNum = hexToNumber(block.number)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        /{" "}
        <Link href="/explorer/blocks/" className="hover:underline">
          {t("page-explorer-breadcrumb-blocks")}
        </Link>{" "}
        / {blockNum.toLocaleString()}
      </nav>
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        {t("page-explorer-block-title", { number: blockNum.toLocaleString() })}
      </h1>

      <section className="mb-10 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <tbody>
            <Row
              label={t("page-explorer-block-height")}
              value={blockNum.toLocaleString()}
              mono
            />
            <Row
              label={t("page-explorer-timestamp")}
              value={`${dateFromHex(block.timestamp)} (${timeAgo(hexToTimestamp(block.timestamp))})`}
            />
            <Row
              label={t("page-explorer-miner")}
              value={
                <Link
                  href={`/explorer/address/${block.miner}/`}
                  className="font-mono text-primary hover:underline"
                >
                  {block.miner}
                </Link>
              }
            />
            <Row
              label={t("page-explorer-transactions")}
              value={String(block.transactionCount)}
            />
            <Row
              label={t("page-explorer-gas-used")}
              value={gasFromHex(block.gasUsed)}
              mono
            />
            <Row
              label={t("page-explorer-gas-limit")}
              value={gasFromHex(block.gasLimit)}
              mono
            />
            <Row
              label={t("page-explorer-base-fee")}
              value={block.baseFeePerGas ?? "—"}
              mono
            />
            <Row
              label={t("page-explorer-block-hash")}
              value={block.hash}
              mono
            />
            <Row
              label={t("page-explorer-parent-hash")}
              value={
                <Link
                  href={`/explorer/block/hash/${block.parentHash}/`}
                  className="font-mono text-primary hover:underline"
                >
                  {block.parentHash}
                </Link>
              }
            />
            <Row
              label={t("page-explorer-difficulty")}
              value={block.difficulty}
              mono
            />
            <Row label={t("page-explorer-size")} value={block.size} mono />
            <Row label={t("page-explorer-nonce")} value={block.nonce} mono />
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          {t("page-explorer-transactions")} ({txs.length})
        </h2>
        {txs.length === 0 ? (
          <p className="rounded-xl border border-border p-6 text-body-medium">
            {t("page-explorer-block-no-txs")}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-body-medium">
                <tr>
                  <th className="p-3">{t("page-explorer-tx-hash")}</th>
                  <th className="p-3">{t("page-explorer-from")}</th>
                  <th className="p-3">{t("page-explorer-to")}</th>
                  <th className="p-3">{t("page-explorer-value")}</th>
                  <th className="p-3">{t("page-explorer-gas")}</th>
                  <th className="p-3">{t("page-explorer-status")}</th>
                </tr>
              </thead>
              <tbody>
                {txs.map((tx) => (
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
                    <td className="p-3 font-mono">{gasFromHex(tx.gas)}</td>
                    <td className="p-3">{t(`page-explorer-${tx.status}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

function Row({
  label,
  value,
  mono,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <th
        scope="row"
        className="w-56 p-3 text-left font-medium text-body-medium"
      >
        {label}
      </th>
      <td className={`p-3 break-all ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </td>
    </tr>
  )
}

export async function generateMetadata(props: {
  params: Promise<PageParams & { number: string }>
}) {
  const { locale, number } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "block", number],
    title: `Block ${number} — QAU Explorer`,
    description: `QAU block ${number}: transactions, miner, gas.`,
  })
}
