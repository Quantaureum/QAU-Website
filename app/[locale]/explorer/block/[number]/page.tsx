import Link from "next/link"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

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

import { getBlockByNumberOrTag, getBlockTxs } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

export default async function BlockDetailPage(props: {
  params: Promise<PageParams & { number: string }>
}) {
  const { locale, number } = await props.params
  setRequestLocale(locale)

  if (!/^\d+$/.test(number) && !/^0x[0-9a-fA-F]+$/.test(number)) notFound()
  const block = await getBlockByNumberOrTag("mainnet", number, false)
  if (!block) notFound()

  const txs = await getBlockTxs("mainnet", number)
  const blockNum = hexToNumber(block.number)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          Explorer
        </Link>{" "}
        /{" "}
        <Link href="/explorer/blocks/" className="hover:underline">
          Blocks
        </Link>{" "}
        / {blockNum.toLocaleString()}
      </nav>
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Block #{blockNum.toLocaleString()}
      </h1>

      <section className="mb-10 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <tbody>
            <Row label="Block height" value={blockNum.toLocaleString()} mono />
            <Row
              label="Timestamp"
              value={`${dateFromHex(block.timestamp)} (${timeAgo(hexToTimestamp(block.timestamp))})`}
            />
            <Row
              label="Miner"
              value={
                <Link
                  href={`/explorer/address/${block.miner}/`}
                  className="font-mono text-primary hover:underline"
                >
                  {block.miner}
                </Link>
              }
            />
            <Row label="Transactions" value={String(block.transactionCount)} />
            <Row label="Gas used" value={gasFromHex(block.gasUsed)} mono />
            <Row label="Gas limit" value={gasFromHex(block.gasLimit)} mono />
            <Row label="Base fee" value={block.baseFeePerGas ?? "—"} mono />
            <Row label="Hash" value={block.hash} mono />
            <Row
              label="Parent hash"
              value={
                <Link
                  href={`/explorer/block/hash/${block.parentHash}/`}
                  className="font-mono text-primary hover:underline"
                >
                  {block.parentHash}
                </Link>
              }
            />
            <Row label="Difficulty" value={block.difficulty} mono />
            <Row label="Size" value={block.size} mono />
            <Row label="Nonce" value={block.nonce} mono />
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          Transactions ({txs.length})
        </h2>
        {txs.length === 0 ? (
          <p className="rounded-xl border border-border p-6 text-body-medium">
            No transactions in this block.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-body-medium">
                <tr>
                  <th className="p-3">Tx hash</th>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Gas</th>
                  <th className="p-3">Status</th>
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
                      {tx.to ? shortHash(tx.to, 8, 6) : "creation"}
                    </td>
                    <td className="p-3 font-mono">
                      {qauFromWeiHex(tx.value, 4)} QAU
                    </td>
                    <td className="p-3 font-mono">{gasFromHex(tx.gas)}</td>
                    <td className="p-3">{tx.status}</td>
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
