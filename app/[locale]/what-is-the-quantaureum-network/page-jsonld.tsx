import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function WhatIsTheQuantaureumNetworkPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-what-is-the-quantaureum-network")

  const url = normalizeUrlForJsonLd(locale, `/what-is-the-quantaureum-network/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#what-is-the-quantaureum-network` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-what-is-quantaureum-network-meta-title"),
        description: t("page-what-is-quantaureum-network-meta-description"),
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
              name: "Learn",
              item: normalizeUrlForJsonLd(locale, "/learn/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-what-is-quantaureum-network-meta-title"),
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
        headline: t("page-what-is-quantaureum-network-title"),
        description: t("page-what-is-quantaureum-network-meta-description"),
        image: "https://quantaureum.com/images/what-is-quantaureum-network.png",
        author: [REFERENCE.QUANTAUREUM_COMMUNITY],
        publisher: REFERENCE.QUANTAUREUM_FOUNDATION,
        contributor: contributorList,
        about: {
          "@type": "Thing",
          name: "Quantaureum Network",
          description:
            "Comprehensive guide to the Quantaureum network, including fees, staking, layer 2 solutions, and live network data",
        },
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
