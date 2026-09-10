import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function AssetsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-assets")

  const url = normalizeUrlForJsonLd(locale, `/assets/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-assets-meta-title"),
        description: t("page-assets-meta-desc"),
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
              name: t("page-assets-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/assets/"),
            },
          ],
        },
        publisher: REFERENCE.QUANTAUREUM_ORG,
        reviewedBy: REFERENCE.QUANTAUREUM_ORG,
        mainEntity: { "@id": `${url}#assets` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#assets`,
        name: t("page-assets-h1"),
        description: t("page-assets-meta-desc"),
        url,
        numberOfItems: 3,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("page-assets-illustrations"),
            description:
              "Artistic works by Liam Cobb, Viktor Hachmang, Patrick Atkins, and others",
            url: normalizeUrlForJsonLd(locale, "/assets/#illustrations"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("page-assets-historical-artwork"),
            description: "Historical Quantaureum artwork and graphics",
            url: normalizeUrlForJsonLd(locale, "/assets/#historical"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("page-assets-quantaureum-brand-assets"),
            description: "Official Quantaureum brand assets, logos, and graphics",
            url: normalizeUrlForJsonLd(locale, "/assets/#brand"),
          },
        ],
        publisher: REFERENCE.QUANTAUREUM_ORG,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
