import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import { LinkWithArrow } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"
import { getIdFromHash } from "@/lib/utils/url"

import DifferencesTable from "./_components/DifferencesTable"
import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import enterpriseQauImg from "@/public/images/enterprise-qau.png"
import ethdotorgLogoImg from "@/public/images/qau-org-logo.png"
import heroImg from "@/public/images/quantaureum-vs-bitcoin/bitcoin-vs-quantaureum-robots.png"
import hackathonImg from "@/public/images/hackathon_transparent.png"
import guidesHubHeroImg from "@/public/images/heroes/guides-hub-hero.jpg"
import layer2HeroImg from "@/public/images/heroes/layer-2-hub-hero.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-quantaureum-vs-bitcoin")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("quantaureum-vs-bitcoin", locale as Lang)

  const tocItems: ToCItem[] = [
    {
      title: t("page-quantaureum-vs-bitcoin-title"),
      url: "#quantaureum-vs-bitcoin",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-bitcoin-section-title"),
      url: "#bitcoin",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-quantaureum-section-title"),
      url: "#quantaureum",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-differences-section-title"),
      url: "#differences",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-purpose-title"),
      url: "#purpose",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-usecases-and-adoption-title"),
      url: "#usecases-and-adoption",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-monetary-policy-title"),
      url: "#monetary-policy",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-developer-ecosystem-title"),
      url: "#developer-ecosystem",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-security-and-consensus-title"),
      url: "#security-and-consensus",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-underlying-technology-title"),
      url: "#underlying-technology",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-decentralization-title"),
      url: "#decentralization",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-environmental-impact-title"),
      url: "#environmental-impact",
    },
    {
      title: t("page-quantaureum-vs-bitcoin-future-outlook-title"),
      url: "#future-outlook",
    },
  ]

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentLayout
        heroSection={
          <PageHero
            breadcrumbs={{ slug: "learn/quantaureum-vs-bitcoin", startDepth: 1 }}
            heroImg={heroImg}
            title={t("page-quantaureum-vs-bitcoin-title")}
            description={t("page-quantaureum-vs-bitcoin-description-1")}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        variant="narrow"
      >
        <Section id={getIdFromHash(tocItems[0].url)}>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-section-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-section-2")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-bitcoin-section-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-bitcoin-section-2", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-bitcoin-section-3")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-bitcoin-section-4", {
              strong: Strong,
            })}
          </p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[2].url)}>
          <Image
            src={ethdotorgLogoImg}
            alt=""
            sizes="128px"
            className="mx-auto max-w-32"
          />
          <h2 id={getIdFromHash(tocItems[2].url)}>{tocItems[2].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-quantaureum-section-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-quantaureum-section-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-quantaureum-section-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-quantaureum-section-4")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-quantaureum-section-5", {
              strong: Strong,
            })}
          </p>
          <LinkWithArrow href="/what-is-quantaureum/">
            {t("page-quantaureum-vs-bitcoin-quantaureum-section-6")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>{t("page-quantaureum-vs-bitcoin-differences-section-1")}</p>
          <DifferencesTable />
        </Section>

        <Section id={getIdFromHash(tocItems[4].url)}>
          <h2>{tocItems[4].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-purpose-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-purpose-2", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-purpose-3")}</p>
          <p>{t("page-quantaureum-vs-bitcoin-purpose-4")}</p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[5].url)}>
          <Image
            src={layer2HeroImg}
            alt=""
            sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            className="mx-auto rounded-base"
          />
          <h2 id={getIdFromHash(tocItems[5].url)}>{tocItems[5].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-usecases-and-adoption-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-usecases-and-adoption-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-usecases-and-adoption-3", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-usecases-and-adoption-4", {
              strong: Strong,
            })}
          </p>
          <LinkWithArrow href="/what-is-quantaureum/">
            {t("page-quantaureum-vs-bitcoin-usecases-and-adoption-5")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[6].url)}>
          <h2>{tocItems[6].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-monetary-policy-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-monetary-policy-2")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-monetary-policy-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-monetary-policy-4")}</p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[7].url)}>
          <Image
            src={guidesHubHeroImg}
            alt=""
            sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            className="mx-auto rounded-base"
          />
          <h2 id={getIdFromHash(tocItems[7].url)}>{tocItems[7].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-developer-ecosystem-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-developer-ecosystem-2")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-developer-ecosystem-3", {
              strong: Strong,
            })}
          </p>
          <LinkWithArrow href="/developers/">
            {t("page-quantaureum-vs-bitcoin-developer-ecosystem-4")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[8].url)}>
          <h2>{tocItems[8].title}</h2>
          <p>{t("page-quantaureum-vs-bitcoin-security-and-consensus-1")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-security-and-consensus-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-security-and-consensus-3", {
              strong: Strong,
            })}
          </p>
          <LinkWithArrow href="/developers/docs/consensus-mechanisms/">
            {t("page-quantaureum-vs-bitcoin-security-and-consensus-4")}
          </LinkWithArrow>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[9].url)}>
          <Image
            src={enterpriseQauImg}
            alt=""
            sizes="(max-width: 320px) calc(100vw - 32px), 320px"
            className="mx-auto max-w-xs"
          />
          <h2 id={getIdFromHash(tocItems[9].url)}>{tocItems[9].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-underlying-technology-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-underlying-technology-2")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-underlying-technology-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-underlying-technology-4")}</p>
          <LinkWithArrow href="/developers/docs/">
            {t("page-quantaureum-vs-bitcoin-underlying-technology-5")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[10].url)}>
          <h2>{tocItems[10].title}</h2>
          <p>{t("page-quantaureum-vs-bitcoin-decentralization-1")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-decentralization-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-decentralization-3", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-decentralization-4", {
              strong: Strong,
            })}
          </p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[11].url)}>
          <Image
            src={hackathonImg}
            alt=""
            sizes="(max-width: 320px) calc(100vw - 32px), 320px"
            className="mx-auto max-w-xs"
          />
          <h2 id={getIdFromHash(tocItems[11].url)}>{tocItems[11].title}</h2>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-environmental-impact-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-environmental-impact-2")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-environmental-impact-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-quantaureum-vs-bitcoin-environmental-impact-4")}</p>
          <LinkWithArrow href="https://consensys.io/blog/quantaureum-blockchain-eliminates-99-99-of-its-carbon-footprint-overnight-after-a-successful-merge-according-to-new-report">
            {t("page-quantaureum-vs-bitcoin-environmental-impact-5")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[12].url)}>
          <h2>{tocItems[12].title}</h2>
          <p>{t("page-quantaureum-vs-bitcoin-future-outlook-1")}</p>
          <p>{t("page-quantaureum-vs-bitcoin-future-outlook-2")}</p>
          <p>
            {t.rich("page-quantaureum-vs-bitcoin-future-outlook-3", {
              strong: Strong,
            })}
          </p>
          <LinkWithArrow href="/roadmap/">
            {t("page-quantaureum-vs-bitcoin-future-outlook-4")}
          </LinkWithArrow>
        </Section>

        <Section id="quiz-section">
          <StandaloneQuizWidget quizKey="quantaureum-vs-bitcoin" />
        </Section>
      </ContentLayout>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-quantaureum-vs-bitcoin")

  return await getMetadata({
    locale,
    slug: ["quantaureum-vs-bitcoin"],
    title: t("page-quantaureum-vs-bitcoin-meta-title"),
    description: t("page-quantaureum-vs-bitcoin-meta-description"),
    twitterDescription: t("page-quantaureum-vs-bitcoin-twitter-meta-description"),
    image: "/images/quantaureum-vs-bitcoin/bitcoin-vs-quantaureum-robots.png",
  })
}

export default Page
