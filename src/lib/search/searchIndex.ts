import { readdir, readFile } from "fs/promises"
import path from "path"

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

const SECTION_LABELS: Record<string, string> = {
  about: "About",
  "bug-bounty": "Security",
  community: "Community",
  contributing: "Contributing",
  "cookie-policy": "About",
  developers: "Developers",
  "energy-consumption": "Technology",
  gas: "Technology",
  "get-qau": "Get QAU",
  glossary: "Learn",
  governance: "Community",
  guides: "Learn",
  learn: "Learn",
  "open-source": "Developers",
  resources: "Resources",
  roadmap: "Roadmap",
  "run-a-node": "Run a node",
  security: "Security",
  "smart-contracts": "Developers",
  staking: "Staking",
  "terms-of-use": "About",
  wallets: "Wallets",
  "what-is-qau": "Learn",
  "what-is-quantaureum": "Learn",
  "what-is-the-quantaureum-network": "Learn",
  "wrapped-qau": "Technology",
  "zero-knowledge-proofs": "Technology",
}

function parseFrontmatter(md: string): Record<string, string> {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const out: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/)
    if (kv) out[kv[1]] = kv[2].replace(/^['"]|['"]$/g, "").replace(/\r$/, "")
  }
  return out
}

async function walkContent(
  base: string,
  locale: string,
  acc: SearchEntry[],
  urlPrefix: string
): Promise<void> {
  let entries: Array<{ name: string; isDirectory: () => boolean }>
  try {
    entries = (await readdir(base, { withFileTypes: true })) as unknown as Array<{
      name: string
      isDirectory: () => boolean
    }>
  } catch {
    return
  }
  for (const e of entries) {
    const p = path.join(base, e.name)
    if (e.isDirectory()) {
      // translations/ holds per-locale subtrees; index only the requested
      // locale's subtree, and skip it entirely when walking the en tree
      if (e.name === "translations") {
        if (locale !== "en") {
          await walkContent(
            path.join(p, locale),
            locale,
            acc,
            urlPrefix
          )
        }
        continue
      }
      await walkContent(p, locale, acc, `${urlPrefix}/${e.name}`)
    } else if (e.name === "index.md") {
      const rel = urlPrefix
      const md = await readFile(p, "utf-8")
      const fm = parseFrontmatter(md)
      const title = fm.title || e.name
      if (title) {
        acc.push({
          title,
          description: fm.description || "",
          url: `/${locale}/${rel.replace(new RegExp("^/"), "")}/`,
          section: SECTION_LABELS[rel.split("/")[0]] || "Pages",
        })
      }
    }
  }
}

export async function getSearchIndex(
  locale: string
): Promise<SearchEntry[]> {
  if (!cachedIndex) {
    cachedIndex = new Map()
  }
  if (cachedIndex.has(locale)) return cachedIndex.get(locale)!

  const acc: SearchEntry[] = []

  // 1. App route pages (titles from en page-index/page JSONs are localized at
  //    render time; here we index by content title which is translated per
  //    locale dir for MDX, and use intl titles for app routes)
  const appRoutes: Array<[string, string, string, string]> = [
    ["/what-is-quantaureum/", "What is Quantaureum?", "The quantum-safe blockchain explained", "Learn"],
    ["/what-is-qau/", "What is QAU?", "Quantaureum's native token", "Learn"],
    ["/what-is-the-quantaureum-network/", "What is the Quantaureum network?", "Quantum-safe Layer 1", "Learn"],
    ["/get-qau/", "Get QAU", "How to obtain QAU tokens", "Get QAU"],
    ["/run-a-node/", "Run a node", "Operate a Quantaureum node or validator", "Run a node"],
    ["/wallets/", "Wallets", "Quantaureum wallets", "Wallets"],
    ["/staking/", "Staking", "Stake QAU and secure the network", "Staking"],
    ["/gas/", "Gas", "How transaction fees work", "Technology"],
    ["/developers/", "Developer hub", "Build on Quantaureum", "Developers"],
    ["/learn/", "Learn hub", "Guides and tutorials", "Learn"],
    ["/roadmap/", "Roadmap", "The public roadmap", "Roadmap"],
    ["/resources/", "Resources", "Official resources", "Resources"],
    ["/community/", "Community", "Join the community", "Community"],
    ["/open-source/", "Open source", "Our open-source components", "Developers"],
    ["/bug-bounty/", "Bug bounty", "Report vulnerabilities", "Security"],
    ["/assets/", "Brand assets", "Logos and brand assets", "About"],
  ]
  for (const [url, title, description, section] of appRoutes) {
    acc.push({ url: `/${locale}${url}`, title, description, section })
  }

  // 2. MDX content pages (per-locale: translations/<locale> when present)
  const contentRoot = path.join(process.cwd(), "public", "content")
  const translatedRoot = path.join(
    contentRoot,
    "translations",
    locale,
  )
  if (locale === "en") {
    await walkContent(contentRoot, "en", acc, "")
  } else {
    // walk translated tree for localized titles
    const seen = new Set<string>()
    await walkContent(translatedRoot, locale, acc, "")
    for (const e of acc) seen.add(e.url)
    // walk en tree for pages missing in this locale
    const enAcc: SearchEntry[] = []
    await walkContent(contentRoot, locale, enAcc, "")
    for (const e of enAcc) {
      if (!seen.has(e.url)) acc.push(e)
    }
  }

  // sort: app routes first, then alphabetical
  const order = (s: string) => (s === "Pages" ? 1 : 0)
  acc.sort(
    (a, b) => order(a.section) - order(b.section) || a.title.localeCompare(b.title)
  )

  cachedIndex.set(locale, acc)
  return acc
}
