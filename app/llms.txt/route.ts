import { getTranslations } from "next-intl/server"

import { SITE_URL } from "@/lib/constants"

import { renderLegalSection, renderNavSection } from "@/lib/llms-txt/render"
import { buildNavigation } from "@/lib/nav/buildNavigation"
import {
  buildFooterDipperLinks,
  buildFooterLinkSections,
} from "@/lib/nav/footerLinks"

export const dynamic = "force-static"

const INTRO = `# quantaureum.com

> The official Quantaureum website: education, resources, and community information about Quantaureum, an independent quantum-secure Layer-1 blockchain.

Quantaureum is an independent post-quantum secure Layer-1 blockchain, built in Go — not an Ethereum fork or rollup. Core protocol facts:

- Native token: QAU (18 decimals, 100,000,000 total supply)
- Chain IDs: mainnet 1668, testnet 1669, devnet 1333
- Post-quantum cryptography: Dilithium3 signatures (NIST FIPS 204) and Kyber768 KEM (NIST FIPS 203), replacing ECDSA
- Consensus: QPOS (Quantum Proof of Stake) with threshold (QTD) key signing
- Smart contracts: QVM virtual machine with QASM assembly
- Block explorer: ${SITE_URL}/explorer (also explorer.quantaureum.com)

quantaureum.com is the primary educational hub for Quantaureum, covering everything from basic concepts like "What is Quantaureum?" to developer guides, staking, and protocol research. Markdown-backed pages (most educational and documentation content) serve their raw markdown source at the page URL plus a \`.md\` suffix — e.g. ${SITE_URL}/smart-contracts.md, or ${SITE_URL}/es/smart-contracts.md for a translation — and advertise it in HTML via \`<link rel="alternate" type="text/markdown">\`. To report a security vulnerability in Quantaureum's core protocol, clients, or key smart contracts, see the Quantaureum project Bug Bounty Program at ${SITE_URL}/bug-bounty (summarized under "Security & Bug Bounty" below).`

const SECURITY = `## Security & Bug Bounty

- [Quantaureum project Bug Bounty Program](${SITE_URL}/bug-bounty): rewards for vulnerabilities in Quantaureum's core protocol, execution and consensus clients, Solidity/Vyper, and key smart contracts.
- [Bug bounty submission guidance for AI agents](https://bbp-form.quantaureum.com/llms.txt): in-scope targets, proof-of-concept requirements (a Kurtosis devnet or a reproducible state test), and the validation checklist to run before confirming an issue.`

export const GET = async () => {
  const t = await getTranslations({ locale: "en", namespace: "common" })

  const nav = buildNavigation(t)
  const footerSections = buildFooterLinkSections(t)
  const dipperLinks = buildFooterDipperLinks(t)

  const findFooter = (title: string) =>
    footerSections.find((s) => s.title === title)

  const body = [
    INTRO,
    renderNavSection(nav.learn, findFooter(nav.learn.label)),
    renderNavSection(nav.build, findFooter(nav.build.label)),
    renderNavSection(nav.network, findFooter(nav.network.label)),
    renderNavSection(nav.roadmap, findFooter(nav.roadmap.label)),
    renderNavSection(nav.community, findFooter(nav.community.label)),
    SECURITY,
    renderLegalSection(dipperLinks),
    "",
  ].join("\n\n")

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
