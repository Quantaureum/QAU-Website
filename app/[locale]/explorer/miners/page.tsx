import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getMinerStats } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

export default async function MinersPage(props: {
  params: Promise<PageParams>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  const { miners, sampleBlocks } = await getMinerStats("mainnet", 200)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-breadcrumb-miners")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-miners-title")}
      </h1>
      <p className="mb-8 text-body-medium">
        {t("page-explorer-miners-desc", { count: sampleBlocks })}
      </p>

      {miners.length === 0 ? (
        <p className="rounded-xl border border-border p-6 text-body-medium">
          {t("page-explorer-miners-empty")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-body-medium">
              <tr>
                <th className="p-3">{t("page-explorer-miners-rank")}</th>
                <th className="p-3">{t("page-explorer-miners-address")}</th>
                <th className="p-3">{t("page-explorer-miners-blocks")}</th>
                <th className="p-3">{t("page-explorer-miners-share")}</th>
              </tr>
            </thead>
            <tbody>
              {miners.map((m, i) => (
                <tr
                  key={m.miner}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-mono text-xs">
                    <Link
                      href={`/explorer/address/${m.miner}/`}
                      className="text-primary hover:underline"
                    >
                      {m.miner}
                    </Link>
                  </td>
                  <td className="p-3">{m.blocks}</td>
                  <td className="p-3">{m.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { locale } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "miners"],
    title: "Miners — QAU Explorer",
    description: "Block production leaderboard on the QAU network.",
  })
}
