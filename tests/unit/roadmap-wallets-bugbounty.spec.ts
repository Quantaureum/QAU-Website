import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import bugBountyMessages from "@/intl/en/page-bug-bounty.json"

// The roadmap topic dropdown lists sub-routes that have no pages. Every href
// in the dropdown must resolve to a real page.
test("roadmap dropdown links only to real routes", () => {
  const source = fs.readFileSync(
    path.resolve("src/data/topics/roadmap.ts"),
    "utf8"
  )
  // These sub-routes never had pages — they are ethereum.org template IA.
  expect(source).not.toContain('href: "/roadmap/security"')
  expect(source).not.toContain('href: "/roadmap/scaling"')
  expect(source).not.toContain('href: "/roadmap/privacy"')
  expect(source).not.toContain('href: "/roadmap/user-experience"')
  expect(source).not.toContain('href: "/roadmap/verkle-trees/"')
  expect(source).not.toContain('href: "/roadmap/security/quantum-resistance/"')
  // The only real roadmap route is the index.
  expect(source).toContain('href: "/roadmap/"')
})

// The wallets page must surface the real Quantaureum wallet products from
// wallet-data.ts, not just generic copy.
test("wallets page renders the real wallet product list", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/wallets/page.tsx"),
    "utf8"
  )
  expect(fs.existsSync(path.resolve("src/data/wallets/wallet-data.ts"))).toBe(
    true
  )
  expect(source).toMatch(/walletsData|wallet-data/)
})

// Bug bounty scope must be consistent with mainnet being live: excluding
// "testnet-only configurations" while claiming mainnet is live is fine only
// if the exclusion is about testnet *deployments*, not implying no mainnet.
test("bug bounty scope is consistent with live mainnet", () => {
  const serialized = JSON.stringify(bugBountyMessages)
  // Mainnet is live (chainId 1668). The bounty must protect it.
  expect(serialized).not.toMatch(
    /mainnet follows.*roadmap|mainnet is not yet live/i
  )
  // "testnet-only configurations" exclusion is legitimate (testnet bugs are
  // out of scope) — keep it, but make sure we don't claim mainnet isn't live.
})
