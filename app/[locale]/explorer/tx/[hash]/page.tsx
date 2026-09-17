import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import {
  dateFromHex,
  gasFromHex,
  gweiFromHex,
  hexToNumber,
  qauFromWeiHex,
} from "@/components/Explorer/format"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getTxDetail } from "@/lib/explorer/api"
import { isTxHash } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

export default async function TxPage(props: {
  params: Promise<PageParams & { hash: string }>
}) {
  const { locale, hash } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")
  if (!isTxHash(hash)) notFound()

  const tx = await getTxDetail("mainnet", hash)
  if (!tx) notFound()

  const blockNum = hexToNumber(tx.blockNumber)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        /{" "}
        <Link href="/explorer/transactions/" className="hover:underline">
          {t("page-explorer-breadcrumb-transactions")}
        </Link>{" "}
        / <span className="font-mono">{hash.slice(0, 14)}…</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("page-explorer-transaction")}
        </h1>
        <span
          className={
            tx.status === "success"
              ? "rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success"
              : tx.status === "failed"
                ? "rounded-full bg-error/10 px-3 py-1 text-sm font-semibold text-error"
                : "rounded-full bg-warning/10 px-3 py-1 text-sm font-semibold text-warning"
          }
        >
          {t(`page-explorer-${tx.status}`)}
        </span>
      </div>

      <section className="mb-10 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <tbody>
            <Row label={t("page-explorer-tx-hash")} value={tx.hash} mono />
            <Row
              label={t("page-explorer-block")}
              value={
                <Link
                  href={`/explorer/block/${blockNum}/`}
                  className="font-mono text-primary hover:underline"
                >
                  {blockNum.toLocaleString()}
                </Link>
              }
            />
            <Row
              label={t("page-explorer-timestamp")}
              value={dateFromHex(tx.timestamp)}
            />
            <Row
              label={t("page-explorer-from")}
              value={
                <Link
                  href={`/explorer/address/${tx.from}/`}
                  className="font-mono text-primary hover:underline"
                >
                  {tx.from}
                </Link>
              }
            />
            <Row
              label={t("page-explorer-to")}
              value={
                tx.to ? (
                  <Link
                    href={`/explorer/address/${tx.to}/`}
                    className="font-mono text-primary hover:underline"
                  >
                    {tx.to}
                  </Link>
                ) : (
                  t("page-explorer-contract-creation")
                )
              }
            />
            <Row
              label={t("page-explorer-value")}
              value={`${qauFromWeiHex(tx.value, 6)} QAU`}
              mono
            />
            <Row
              label={t("page-explorer-gas")}
              value={gasFromHex(tx.gas)}
              mono
            />
            <Row
              label={t("page-explorer-gas-used")}
              value={tx.gasUsed ? gasFromHex(tx.gasUsed) : "—"}
              mono
            />
            <Row
              label={t("page-explorer-gas-price")}
              value={tx.gasPrice ? `${gweiFromHex(tx.gasPrice)} gwei` : "—"}
              mono
            />
            <Row
              label={t("page-explorer-nonce")}
              value={hexToNumber(tx.nonce).toString()}
              mono
            />
            <Row label={t("page-explorer-tx-type")} value={tx.txType} mono />
            <Row
              label={t("page-explorer-signature-type")}
              value={tx.signatureType}
              mono
            />
            <Row
              label={t("page-explorer-input")}
              value={
                <span className="break-all">
                  {tx.input && tx.input !== "0x"
                    ? tx.input
                    : t("page-explorer-input-empty")}
                </span>
              }
              mono
            />
          </tbody>
        </table>
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
  params: Promise<PageParams & { hash: string }>
}) {
  const { locale, hash } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "tx", hash],
    title: `Tx ${hash.slice(0, 12)}… — QAU Explorer`,
    description: "QAU transaction details.",
  })
}
