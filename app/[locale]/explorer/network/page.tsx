import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { gweiFromHex } from "@/components/Explorer/format"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getNetworkInfo } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

export default async function NetworkPage(props: {
  params: Promise<PageParams>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  const info = await getNetworkInfo("mainnet")

  const rows: [string, string][] = [
    [t("page-explorer-network-name"), info.network],
    [t("page-explorer-network-chain-id"), String(info.chainId)],
    [t("page-explorer-network-consensus"), info.consensus],
    [t("page-explorer-network-slot-time"), `${info.slotTime}s`],
    [
      t("page-explorer-latest-block"),
      info.latestBlock?.toLocaleString() ?? "—",
    ],
    [t("page-explorer-peers"), String(info.peerCount)],
    [t("page-explorer-gas-price"), `${gweiFromHex(info.gasPrice)} Gwei`],
    [t("page-explorer-network-rpc"), info.rpcEndpoint],
  ]

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-breadcrumb-network")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-network-title")}
      </h1>
      <p className="mb-8 text-body-medium">
        {t("page-explorer-network-desc", { network: info.network })}
      </p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b border-border last:border-0">
                <td className="p-3 font-medium text-body-medium">{label}</td>
                <td className="p-3 font-mono">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { locale } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "network"],
    title: "Network — QAU Explorer",
    description: "Live status of the QAU network.",
  })
}
