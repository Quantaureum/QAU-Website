import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { hexToNumber } from "@/components/Explorer/format"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getBlockByNumberOrTag } from "@/lib/explorer/api"
import { isTxHash } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

export default async function BlockByHashPage(props: {
  params: Promise<PageParams & { hash: string }>
}) {
  const { locale, hash } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")
  if (!isTxHash(hash)) notFound()

  const block = await getBlockByNumberOrTag("mainnet", hash, false)
  if (!block) notFound()
  const num = hexToNumber(block.number)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        /{" "}
        <Link href={`/explorer/block/${num}/`} className="hover:underline">
          {t("page-explorer-block")} {num.toLocaleString()}
        </Link>
      </nav>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">
        {t("page-explorer-block-title", { number: num.toLocaleString() })}
      </h1>
      <p className="mb-8 font-mono text-sm break-all text-body-medium">
        {hash}
      </p>
      <p className="rounded-xl border border-border p-6 text-body-medium">
        {t("page-explorer-opened-via-hash")}{" "}
        <Link
          href={`/explorer/block/${num}/`}
          className="font-semibold text-primary hover:underline"
        >
          {t("page-explorer-view-full-block")} →
        </Link>
      </p>
    </main>
  )
}

export async function generateMetadata(props: {
  params: Promise<PageParams & { hash: string }>
}) {
  const { locale, hash } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "block", "hash", hash],
    title: "Block by hash — QAU Explorer",
    description: "QAU block lookup by hash.",
  })
}
