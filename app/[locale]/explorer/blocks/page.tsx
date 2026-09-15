import Link from "next/link"
import { setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import {
  dateFromHex,
  gasFromHex,
  hexToNumber,
  hexToTimestamp,
  shortHash,
  timeAgo,
} from "@/components/Explorer/format"

import { getMetadata } from "@/lib/utils/metadata"

import { getRecentBlocks } from "@/lib/explorer/api"
import { QAU_MAINNET } from "@/lib/explorer/config"

export const dynamic = "force-dynamic"

export default async function BlocksPage(props: {
  params: Promise<PageParams>
  searchParams: Promise<{ page?: string; limit?: string }>
}) {
  const { locale } = await props.params
  const { page: pageParam, limit: limitParam } = await props.searchParams
  setRequestLocale(locale)

  const page = Math.max(1, Number(pageParam ?? 1) || 1)
  const limit = Math.min(50, Math.max(10, Number(limitParam ?? 25) || 25))
  const result = await getRecentBlocks("mainnet", limit, page)
  const totalPages = result.totalPages

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          Explorer
        </Link>{" "}
        / Blocks
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">Blocks</h1>
      <p className="mb-8 text-body-medium">
        {QAU_MAINNET.name} · {result.totalBlocks.toLocaleString()} blocks
        indexed
      </p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-body-medium">
            <tr>
              <th className="p-3">Block</th>
              <th className="p-3">Age</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Miner</th>
              <th className="p-3">Txs</th>
              <th className="p-3">Gas used</th>
              <th className="p-3">Gas limit</th>
            </tr>
          </thead>
          <tbody>
            {result.blocks.map((b) => (
              <tr key={b.hash} className="border-b border-border last:border-0">
                <td className="p-3 font-mono">
                  <Link
                    href={`/explorer/block/${hexToNumber(b.number)}/`}
                    className="font-medium text-primary hover:underline"
                  >
                    {hexToNumber(b.number).toLocaleString()}
                  </Link>
                </td>
                <td className="p-3">{timeAgo(hexToTimestamp(b.timestamp))}</td>
                <td className="p-3 font-mono text-xs">
                  {dateFromHex(b.timestamp)}
                </td>
                <td className="p-3 font-mono text-xs">
                  {shortHash(b.miner, 10, 8)}
                </td>
                <td className="p-3">{b.transactionCount}</td>
                <td className="p-3 font-mono">{gasFromHex(b.gasUsed)}</td>
                <td className="p-3 font-mono">{gasFromHex(b.gasLimit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between text-sm">
        {page > 1 ? (
          <Link
            href={`/explorer/blocks/?page=${page - 1}&limit=${limit}`}
            className="rounded-md border border-border px-4 py-2 font-semibold hover:bg-background-highlight"
          >
            ← Newer
          </Link>
        ) : (
          <span />
        )}
        <span className="text-body-medium">
          Page {page} of {totalPages.toLocaleString()}
        </span>
        {page < totalPages ? (
          <Link
            href={`/explorer/blocks/?page=${page + 1}&limit=${limit}`}
            className="rounded-md border border-border px-4 py-2 font-semibold hover:bg-background-highlight"
          >
            Older →
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
    slug: ["explorer", "blocks"],
    title: "Blocks — QAU Explorer",
    description: "Browse QAU blocks.",
  })
}
