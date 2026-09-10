import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function Layer2PageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-layer-2")

  const url = normalizeUrlForJsonLd(locale, `/layer-2/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#layer-2` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-layer-2-meta-title"),
        description: t("page-layer-2-meta-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [REFERENCE.QUANTAUREUM_COMMUNITY],
        isPartOf: REFERENCE.QUANTAUREUM_ORG_WEBSITE,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: normalizeUrlForJsonLd(locale, "/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t("page-layer-2-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.QUANTAUREUM_FOUNDATION,
        reviewedBy: REFERENCE.QUANTAUREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: t("page-layer-2-hero-title"),
        description: t("page-layer-2-meta-description"),
        image: "https://quantaureum.com/images/layer-2/learn-hero.png", // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
        author: [REFERENCE.QUANTAUREUM_COMMUNITY],
        contributor: contributorList,
        publisher: REFERENCE.QUANTAUREUM_FOUNDATION,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#layer-2-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-1-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-layer-2-faq-ExpandableCard-1-description-1")} ${t("page-layer-2-faq-ExpandableCard-1-description-2")}`,
            },
          },
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-2-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-layer-2-faq-ExpandableCard-2-description-1")} ${t("page-layer-2-faq-ExpandableCard-2-description-2")}`,
            },
          },
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-3-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-layer-2-faq-ExpandableCard-3-description"),
            },
          },
          {
            "@type": "Question",
            name: t("page-layer-2-faq-ExpandableCard-4-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-layer-2-faq-ExpandableCard-4-description"),
            },
          },
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
