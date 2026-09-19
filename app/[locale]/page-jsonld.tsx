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

  // Factual FAQ for SGO/snippet extraction. Content mirrors the protocol
  // facts in llms.txt (post-quantum L1, QAU, QPOS, QVM).
  const faq = [
    {
      q: "What is Quantaureum?",
      a: "Quantaureum is an independent post-quantum secure Layer-1 blockchain, built in Go, with a native token (QAU), a Proof-of-Stake consensus (QPOS), and a smart-contract virtual machine (QVM).",
    },
    {
      q: "Is Quantaureum an Ethereum fork or Layer 2?",
      a: "No. Quantaureum is an independent Layer-1 blockchain, not an Ethereum fork or L2.",
    },
    {
      q: "What is QAU?",
      a: "QAU is the native token of Quantaureum, with 18 decimals and a total supply of 100,000,000.",
    },
    {
      q: "How is Quantaureum quantum-secure?",
      a: "Quantaureum uses post-quantum cryptography: Dilithium3 signatures (NIST FIPS 204) and Kyber768 KEM (NIST FIPS 203), replacing ECDSA.",
    },
    {
      q: "What consensus does Quantaureum use?",
      a: "Quantaureum uses QPOS (Quantum Proof of Stake) with threshold (QTD) key signing.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      KNOWN_ORGANIZATIONS["quantaureum-org"],
      KNOWN_ORGANIZATIONS["quantaureum-community"],
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
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
          "@id": "https://quantaureum.com/#quantaureum",
          name: "Quantaureum",
          description:
            "Quantaureum is an independent quantum-secure (post-quantum) Layer-1 blockchain, built in Go, with the QAU token, QPOS consensus, and the QVM smart-contract engine.",
          image: "https://quantaureum.com/images/assets/qau-mark-glyph.png",
          sameAs: ["https://github.com/Quantaureum"],
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
