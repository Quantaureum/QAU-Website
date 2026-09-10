/**
 * Shared JSON-LD structured data definitions
 * These can be imported and reused across page-jsonld.tsx files
 */

import { KNOWN_ORGANIZATIONS } from "./organizations"
import { REFERENCE } from "./references"

/**
 * quantaureum.com WebSite entity
 * Anchors the site in the knowledge graph. Every page's JSON-LD graph
 * should include this as a top-level node and reference it via @id from
 * the page's `isPartOf`.
 */
export const QUANTAUREUM_ORG_WEBSITE = {
  "@type": "WebSite" as const,
  name: "quantaureum.com",
  url: "https://quantaureum.com",
  ...REFERENCE.QUANTAUREUM_ORG_WEBSITE,
}

/**
 * Core entities present in every page's JSON-LD @graph.
 * Spread at the top of each page's `@graph` array so that `@id`
 * references (e.g. `quantaureumFoundationReference`) resolve within the
 * same graph.
 */
export const BASE_GRAPH_NODES = [
  KNOWN_ORGANIZATIONS["quantaureum-org"],
  KNOWN_ORGANIZATIONS["quantaureum-community"],
  QUANTAUREUM_ORG_WEBSITE,
]
