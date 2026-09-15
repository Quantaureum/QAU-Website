/**
 * Local static search index for the site.
 *
 * Scans app-route page titles (from src/intl en JSON) and MDX content pages
 * (frontmatter title + description) at request time (cached in module scope),
 * replacing the old third-party Algolia DocSearch that errored out without
 * credentials.
 */

export type SearchEntry = {
  title: string
  description: string
  url: string
  section: string
}

let cachedIndex: Map<string, SearchEntry[]> | null = null

export async function getSearchIndex(locale: string): Promise<SearchEntry[]> {
  if (!cachedIndex) return []
  return cachedIndex.get(locale) || []
}

/**
 * Populate the in-memory index at module load. After the content cleanup the
 * site indexes ONLY the app-route skeleton pages (all MDX content was removed
 * because it inherited ethereum.org narrative that does not belong to
 * Quantaureum). Real content pages will be re-added incrementally from
 * node-authored source docs.
 */
export function buildSearchIndex(): void {
  if (cachedIndex) return
  cachedIndex = new Map()
  const locales = ["en"]
  const appRoutes: Array<[string, string, string, string]> = [
    [
      "/what-is-quantaureum/",
      "What is Quantaureum?",
      "The quantum-safe blockchain explained",
      "Learn",
    ],
    ["/what-is-qau/", "What is QAU?", "Quantaureum's native token", "Learn"],
    [
      "/what-is-the-quantaureum-network/",
      "What is the Quantaureum network?",
      "Quantum-safe Layer 1",
      "Learn",
    ],
    ["/get-qau/", "Get QAU", "How to obtain QAU tokens", "Get QAU"],
    [
      "/run-a-node/",
      "Run a node",
      "Operate a Quantaureum node or validator",
      "Run a node",
    ],
    ["/wallets/", "Wallets", "Quantaureum wallets", "Wallets"],
    ["/staking/", "Staking", "Stake QAU and secure the network", "Staking"],
    ["/gas/", "Gas", "How transaction fees work", "Technology"],
    ["/developers/", "Developer hub", "Build on Quantaureum", "Developers"],
    ["/learn/", "Learn hub", "Guides and tutorials", "Learn"],
    ["/roadmap/", "Roadmap", "The public roadmap", "Roadmap"],
    ["/resources/", "Resources", "Official resources", "Resources"],
    ["/community/", "Community", "Join the community", "Community"],
    [
      "/open-source/",
      "Open source",
      "Our open-source components",
      "Developers",
    ],
    ["/bug-bounty/", "Bug bounty", "Report vulnerabilities", "Security"],
    ["/assets/", "Brand assets", "Logos and brand assets", "About"],
  ]
  for (const locale of locales) {
    cachedIndex.set(
      locale,
      appRoutes.map(([url, title, description, section]) => ({
        url: `/${locale}${url}`,
        title,
        description,
        section,
      }))
    )
  }
}

buildSearchIndex()
