import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import HomeHero from "@/components/Hero/HomeHero"
import ArchitectureSection from "@/components/Homepage/ArchitectureSection"
import EcosystemSection from "@/components/Homepage/EcosystemSection"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import RoadmapSection from "@/components/Homepage/RoadmapSection"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import IndexPageJsonLD from "./page-jsonld"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  if (!LOCALES_CODES.includes(locale)) return notFound()

  setRequestLocale(locale)

  const { direction: dir } = getDirection(locale)
  const allMessages = await getMessages()
  const glossary = allMessages["glossary-tooltip"] as Record<string, string>
  const messages = {
    ...pick(allMessages, "page-index"),
    "glossary-tooltip": pick(glossary, [
      "nft-term",
      "nft-definition",
      "web3-term",
      "web3-definition",
    ]),
  }

  const eventCategory = `Homepage - ${locale}`

  return (
    <>
      <IndexPageJsonLD locale={locale} />
      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="flex w-full flex-col items-center" dir={dir}>
          <HomeHero eventCategory={eventCategory} />

          <div className="my-24 w-full space-y-24 lg:my-32 lg:space-y-32">
            <FeatureCards eventCategory={eventCategory} />

            <ArchitectureSection />

            <GetStartedGrid eventCategory={eventCategory} />

            <EcosystemSection eventCategory={eventCategory} />

            <RoadmapSection eventCategory={eventCategory} />
          </div>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  try {
    const t = await getTranslations("page-index")
    return await getMetadata({
      locale,
      slug: [""],
      title: t("page-index-meta-title"),
      description: t("page-index-meta-description"),
    })
  } catch (error) {
    const t = await getTranslations({
      locale: DEFAULT_LOCALE,
      namespace: "common",
    })

    // Return basic metadata for invalid paths
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}

export default Page
