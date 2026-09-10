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

> The official Quantaureum website providing comprehensive education, resources, and community information about Quantaureum — the decentralized world computer that enables smart contracts and decentralized applications.

quantaureum.com is the primary educational hub for Quantaureum, offering beginner-friendly explanations alongside advanced technical documentation. The site covers everything from basic concepts like "What is Quantaureum?" to detailed developer guides, staking information, and protocol research. For the developer-documentation-only index, see ${SITE_URL}/developers/docs/llms.txt. Markdown-backed pages (most educational and documentation content) serve their raw markdown source at the page URL plus a \`.md\` suffix — e.g. ${SITE_URL}/smart-contracts.md, or ${SITE_URL}/es/smart-contracts.md for a translation — and advertise it in HTML via \`<link rel="alternate" type="text/markdown">\`. To report a security vulnerability in Quantaureum's core protocol, clients, or key smart contracts, see the Quantaureum project Bug Bounty Program at ${SITE_URL}/bug-bounty (summarized under "Security & Bug Bounty" below).`

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
