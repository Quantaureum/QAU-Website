import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function PrivacyQuantaureumPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-privacy-quantaureum")
  const tPrivacy = await getTranslations("page-privacy")

  const url = normalizeUrlForJsonLd(locale, `/privacy/quantaureum/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#privacy-on-quantaureum` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-privacy-quantaureum-meta-title"),
        description: t("page-privacy-quantaureum-meta-description"),
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
              name: tPrivacy("page-privacy-title"),
              item: normalizeUrlForJsonLd(locale, "/privacy/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-privacy-quantaureum-title"),
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
        headline: t("page-privacy-quantaureum-title"),
        description: t("page-privacy-quantaureum-meta-description"),
        image: "https://quantaureum.com/images/infrastructure_transparent.png",
        author: [REFERENCE.QUANTAUREUM_COMMUNITY],
        publisher: REFERENCE.QUANTAUREUM_FOUNDATION,
        contributor: contributorList,
        about: [
          {
            "@type": "Thing",
            name: "Privacy on Quantaureum",
            description:
              "Tools and techniques for protecting your privacy on Quantaureum, including zero-knowledge proofs, stealth addresses, and privacy pools",
          },
          {
            "@type": "Thing",
            name: "Quantaureum",
            description:
              "A decentralized platform for applications and digital economies powered by smart contracts",
          },
        ],
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
