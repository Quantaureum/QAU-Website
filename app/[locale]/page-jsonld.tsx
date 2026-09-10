import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { QUANTAUREUM_ORG_WEBSITE } from "@/lib/jsonld/constants"
import { KNOWN_ORGANIZATIONS } from "@/lib/jsonld/organizations"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function IndexPageJsonLD({
  locale,
}: {
  locale: Lang | undefined
}) {
  const t = await getTranslations("page-index")

  const url = normalizeUrlForJsonLd(locale, "/")

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      KNOWN_ORGANIZATIONS["quantaureum-org"],
      KNOWN_ORGANIZATIONS["quantaureum-community"],
      {
        ...QUANTAUREUM_ORG_WEBSITE,
        url,
        description: t("page-index-meta-description"),
        educationalUse: "Self-Paced",
        keywords:
          "Quantaureum, QAU, Crypto, Digital Ownership, DeFi, Decentralized Finance, Privacy, Stablecoins, Web3, Blockchain, Smart Contracts, Open Source",
        inLanguage: locale,
        license: "https://opensource.org/licenses/MIT",
        audience: {
          "@type": "EducationalAudience",
          audienceType: "public",
        },
        publisher: REFERENCE.QUANTAUREUM_ORG,
        maintainer: REFERENCE.QUANTAUREUM_ORG,
        contributor: REFERENCE.QUANTAUREUM_COMMUNITY,
        about: {
          "@type": "Thing",
          name: "Quantaureum",
          description:
            "Quantaureum is a global, open-source blockchain network with smart contract functionality, and a platform that powers digital ownership, decentralized finance (DeFi), and privacy-preserving applications.",
          image: "https://quantaureum.com/images/assets/qau-diamond-glyph.png",
          sameAs: [
            "https://www.wikidata.org/wiki/Q16783523",
            "https://en.wikipedia.org/wiki/Quantaureum",
            "https://x.com/ldf1570073",
            "https://github.com/quantaureum",
          ],
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
