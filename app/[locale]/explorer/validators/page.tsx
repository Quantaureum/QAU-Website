import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { getRecentBlocks } from "@/lib/explorer/api"

export const dynamic = "force-dynamic"

export default async function ValidatorsPage(props: {
  params: Promise<PageParams>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  // QPOS validator set is not exposed over the public JSON-RPC; derive the
  // observable proposer set from recent blocks instead.
  const recent = await getRecentBlocks("mainnet", 50, 1)
  const proposers = new Map<string, number>()
  for (const b of recent.blocks) {
    proposers.set(b.miner, (proposers.get(b.miner) ?? 0) + 1)
  }
  const rows = [...proposers.entries()]
    .map(([miner, blocks]) => ({ miner, blocks }))
    .sort((a, b) => b.blocks - a.blocks)

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-breadcrumb-validators")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-validators-title")}
      </h1>
      <p className="mb-8 text-body-medium">
        {t("page-explorer-validators-desc", { count: recent.blocks.length })}
      </p>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-border p-6 text-body-medium">
          {t("page-explorer-validators-empty")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-body-medium">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">{t("page-explorer-validators-address")}</th>
                <th className="p-3">{t("page-explorer-validators-blocks")}</th>
                <th className="p-3">{t("page-explorer-validators-share")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.miner}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-mono text-xs">
                    <Link
                      href={`/explorer/address/${r.miner}/`}
                      className="text-primary hover:underline"
                    >
                      {r.miner}
                    </Link>
                  </td>
                  <td className="p-3">{r.blocks}</td>
                  <td className="p-3">
                    {((r.blocks / recent.blocks.length) * 100).toFixed(1)}%
                  </td>
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
    slug: ["explorer", "validators"],
    title: "Validators — QAU Explorer",
    description: "Block proposers on the QAU network.",
  })
}
