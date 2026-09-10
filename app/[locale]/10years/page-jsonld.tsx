import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function TenYearJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-10-year-anniversary")

  const url = normalizeUrlForJsonLd(locale, "/10years/")

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
        name: t("page-10-year-anniversary-meta-title"),
        description: t("page-10-year-anniversary-meta-description"),
        url,
        inLanguage: locale,
        author: [REFERENCE.QUANTAUREUM_COMMUNITY],
        contributor: contributorList,
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
              name: t("page-10-year-anniversary-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.QUANTAUREUM_FOUNDATION,
        reviewedBy: REFERENCE.QUANTAUREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#video` },
      },
      {
        "@type": "VideoObject",
        name: "Quantaureum: 10 Years Anniversary",
        description: t("page-10-year-anniversary-meta-description"),
        thumbnailUrl: "https://i.ytimg.com/vi/gjwr-7PgpTC/maxresdefault.jpg",
        uploadDate: "2024-07-30T00:00:00Z",
        duration: "PT5M30S",
        embedUrl: "https://www.youtube.com/embed/gjwr-7PgpTC",
        publisher: REFERENCE.QUANTAUREUM_FOUNDATION,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
