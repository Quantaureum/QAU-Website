import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { getMetadata } from "@/lib/utils/metadata"

import { Link } from "@/i18n/navigation"
import { hexToInt } from "@/lib/explorer/rpc"
import { fetchBlock } from "@/lib/explorer/rpc"

export const dynamic = "force-dynamic"

const SLOT_SECONDS = 12
const SLOTS_PER_EPOCH = 32

export default async function QposPage(props: { params: Promise<PageParams> }) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations("page-explorer")

  // QPOS consensus status is not exposed over public JSON-RPC; present the
  // parameters plus live head derived from the latest block.
  const head = await fetchBlock("mainnet", "latest", false)
  const headNum = head ? hexToInt(head.number) : 0
  const currentEpoch = Math.floor(headNum / SLOTS_PER_EPOCH)
  const slotInEpoch = headNum % SLOTS_PER_EPOCH

  const params: [string, string][] = [
    [t("page-explorer-network-consensus"), "QPOS (Proof of Stake)"],
    [t("page-explorer-qpos-slot"), `${SLOT_SECONDS}s`],
    [t("page-explorer-qpos-slots-per-epoch"), String(SLOTS_PER_EPOCH)],
    [t("page-explorer-qpos-current-slot"), headNum.toLocaleString()],
    [t("page-explorer-qpos-current-epoch"), currentEpoch.toLocaleString()],
    [
      t("page-explorer-qpos-slot-in-epoch"),
      `${slotInEpoch} / ${SLOTS_PER_EPOCH}`,
    ],
    [t("page-explorer-qpos-finality"), t("page-explorer-qpos-finality-value")],
    [
      t("page-explorer-qpos-signature"),
      t("page-explorer-qpos-signature-value"),
    ],
  ]

  return (
    <main className="mx-auto w-full max-w-6xl px-page py-page-2x">
      <nav className="mb-6 text-sm text-body-medium">
        <Link href="/explorer/" className="hover:underline">
          {t("page-explorer-breadcrumb-explorer")}
        </Link>{" "}
        / {t("page-explorer-breadcrumb-qpos")}
      </nav>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("page-explorer-qpos-title")}
      </h1>
      <p className="mb-8 text-body-medium">{t("page-explorer-qpos-desc")}</p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <tbody>
            {params.map(([label, value]) => (
              <tr key={label} className="border-b border-border last:border-0">
                <td className="p-3 font-medium text-body-medium">{label}</td>
                <td className="p-3 font-mono">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-body-medium">
        {t("page-explorer-qpos-see-also")}{" "}
        <Link
          href="/explorer/validators/"
          className="text-primary hover:underline"
        >
          {t("page-explorer-validators")}
        </Link>{" "}
        ·{" "}
        <Link
          href="/explorer/network/"
          className="text-primary hover:underline"
        >
          {t("page-explorer-network-status")}
        </Link>
      </p>
    </main>
  )
}

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const { locale } = await props.params
  setRequestLocale(locale)
  return getMetadata({
    locale,
    slug: ["explorer", "qpos"],
    title: "QPOS Consensus — QAU Explorer",
    description: "QPOS consensus status on the QAU network.",
  })
}
