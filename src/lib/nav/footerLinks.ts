import type { FooterLink, FooterLinkSection } from "@/lib/types"

type TranslateFn = (key: string) => string

/**
 * Quantaureum footer link structure.
 * Only real, existing routes and official external destinations.
 */
export const buildFooterLinkSections = (
  t: TranslateFn
): FooterLinkSection[] => [
  {
    title: t("nav2-learn"),
    links: [
      { href: "/what-is-quantaureum/", text: t("nav2-what-is-quantaureum") },
      {
        href: "/what-is-the-quantaureum-network/",
        text: t("nav2-the-network"),
      },
      { href: "/what-is-qau/", text: t("nav2-what-is-qau") },
      { href: "/security/", text: t("nav2-quantum-security") },
      { href: "/wallets/", text: t("nav2-wallets") },
      { href: "/glossary/", text: t("nav2-glossary") },
    ],
  },
  {
    title: t("nav2-build"),
    links: [
      {
        href: "/developers/",
        text: t("nav2-developers-hub"),
        isPartiallyActive: false,
      },
      { href: "/developers/docs/", text: t("nav2-docs") },
      { href: "/developers/tutorials/", text: t("nav2-tutorials") },
      { href: "/bug-bounty/", text: t("nav2-bug-bounty") },
    ],
  },
  {
    title: t("nav2-network"),
    links: [
      { href: "https://explorer.quantaureum.com", text: t("nav2-explorer") },
      { href: "/staking/", text: t("nav2-staking") },
      { href: "/run-a-node/", text: t("nav2-run-a-node") },
      { href: "/get-qau/", text: t("nav2-get-qau") },
      { href: "/gas/", text: t("nav2-gas") },
      { href: "/roadmap/", text: t("nav2-roadmap") },
    ],
  },
  {
    title: t("nav2-community"),
    links: [
      { href: "/community/", text: t("nav2-community-hub") },
      { href: "/community/get-involved/", text: t("nav2-get-involved") },
      { href: "https://x.com/ldf1570073", text: t("nav2-x") },
      { href: "https://discord.gg/MSctkBT5j", text: t("nav2-discord") },
      { href: "https://github.com/Quantaureum", text: t("nav2-github") },
      { href: "https://t.me/quantaureum", text: t("nav2-telegram") },
    ],
  },
]

export const buildFooterDipperLinks = (t: TranslateFn): FooterLink[] => [
  { href: "/about/", text: t("about-us") },
  { href: "/assets/", text: t("quantaureum-brand-assets") },
  { href: "/community/code-of-conduct/", text: t("nav-code-of-conduct") },
  { href: "/privacy-policy/", text: t("privacy-policy") },
  { href: "/terms-of-use/", text: t("terms-of-use") },
  { href: "/cookie-policy/", text: t("cookie-policy") },
  { href: "mailto:hello@quantaureum.com", text: t("contact") },
]
