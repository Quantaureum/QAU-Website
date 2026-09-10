import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function StablecoinsPageJsonLD({ locale, contributors }) {
  const t = await getTranslations("page-stablecoins")

  const url = normalizeUrlForJsonLd(locale, `/stablecoins/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#stablecoins` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-stablecoins-meta-title"),
        description: t("page-stablecoins-meta-description"),
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
              name: t("page-stablecoins-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.QUANTAUREUM_ORG,
        reviewedBy: REFERENCE.QUANTAUREUM_ORG,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: t("page-stablecoins-title"),
        description: t("page-stablecoins-meta-description"),
        image: "https://quantaureum.com/images/stablecoins/hero.png",
        author: [REFERENCE.QUANTAUREUM_COMMUNITY],
        contributor: contributorList,
        publisher: REFERENCE.QUANTAUREUM_ORG,
        about: {
          "@type": "Thing",
          name: "Stablecoins",
          description:
            "Digital currencies pegged to stable assets like the US dollar",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
