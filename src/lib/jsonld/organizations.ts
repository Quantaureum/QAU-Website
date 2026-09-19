import { REFERENCE } from "./references"

/**
 * Known Organization profiles used for JSON-LD attribution.
 *
 * Only real Quantaureum entities live here. Ethereum-world organizations
 * harvested from the upstream template were removed — Quantaureum does not
 * claim affiliation with them.
 */

export const KNOWN_ORGANIZATIONS = {
  /**
   * Quantaureum project organization definition.
   * Can be used as publisher, maintainer, author, etc. Only the official
   * domain and GitHub org are attested; unverifiable social/aggregator
   * profiles (Wikidata, Crunchbase, LinkedIn) are intentionally omitted.
   */
  "quantaureum-org": {
    "@type": "Organization" as const,
    name: "Quantaureum project",
    url: "https://quantaureum.com",
    ownershipFundingInfo: "https://quantaureum.com/about/",
    logo: "https://quantaureum.com/images/qau-org-logo.png",
    sameAs: ["https://github.com/Quantaureum"],
    ...REFERENCE.QUANTAUREUM_ORG,
  },

  /**
   * Quantaureum Community contributor organization.
   */
  "quantaureum-community": {
    "@type": "Organization" as const,
    name: "Quantaureum Community",
    url: "https://github.com/Quantaureum/quantaureum-website/graphs/contributors",
    description: "A global collective of open-source contributors.",
    ...REFERENCE.QUANTAUREUM_COMMUNITY,
  },
} as const
