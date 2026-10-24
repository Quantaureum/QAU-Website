import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import { AirdropRegistration } from "@/components/AirdropRegistration"
import PageHero from "@/components/Hero/PageHero/index"
import MainArticle from "@/components/MainArticle"

type Props = {
  params: PageParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: "page-airdrop" })
  return {
    title: t("page-airdrop-title"),
    description: t("page-airdrop-subtitle"),
  }
}

export default async function Page({ params }: Props) {
  const { locale } = params
  return (
    <>
      <PageHero
        variant="no-divider"
        breadcrumbs={{ slug: "airdrop" }}
        heroComponent={
          <div className="relative grid size-full place-items-center">
            <span className="text-6xl">🎁</span>
          </div>
        }
      />
      <MainArticle className="flex flex-col items-center gap-8 py-8">
        <AirdropRegistration locale={locale as Lang} />
      </MainArticle>
    </>
  )
}
