import type { NavSections } from "@/components/Nav/types"

type TranslateFn = (key: string) => string

/**
 * Quantaureum navigation structure.
 * Structure of record: .local-only/specs/nav-structure.md
 */
export const buildNavigation = (t: TranslateFn): NavSections => {
  return {
    learn: {
      label: t("nav2-learn"),
      ariaLabel: t("nav2-learn-aria"),
      items: [
        {
          id: "learn/what-is",
          label: t("nav2-what-is-quantaureum"),
          description: t("nav2-what-is-quantaureum-desc"),
          href: "/what-is-quantaureum/",
        },
        {
          id: "learn/network",
          label: t("nav2-the-network"),
          description: t("nav2-the-network-desc"),
          href: "/what-is-the-quantaureum-network/",
        },
        {
          id: "learn/qau",
          label: t("nav2-what-is-qau"),
          description: t("nav2-what-is-qau-desc"),
          href: "/what-is-qau/",
        },
        {
          id: "learn/security",
          label: t("nav2-quantum-security"),
          description: t("nav2-quantum-security-desc"),
          href: "/security/",
        },
        {
          id: "learn/wallets",
          label: t("nav2-wallets"),
          description: t("nav2-wallets-desc"),
          href: "/wallets/",
        },
        {
          id: "learn/glossary",
          label: t("nav2-glossary"),
          description: t("nav2-glossary-desc"),
          href: "/glossary/",
        },
      ],
    },
    build: {
      label: t("nav2-build"),
      ariaLabel: t("nav2-build-aria"),
      items: [
        {
          id: "build/hub",
          label: t("nav2-developers-hub"),
          description: t("nav2-developers-hub-desc"),
          href: "/developers/",
        },
        {
          id: "build/docs",
          label: t("nav2-docs"),
          description: t("nav2-docs-desc"),
          href: "/developers/docs/",
        },
        {
          id: "build/tutorials",
          label: t("nav2-tutorials"),
          description: t("nav2-tutorials-desc"),
          href: "/developers/tutorials/",
        },
        {
          id: "build/bounty",
          label: t("nav2-bug-bounty"),
          description: t("nav2-bug-bounty-desc"),
          href: "/bug-bounty/",
        },
      ],
    },
    network: {
      label: t("nav2-network"),
      ariaLabel: t("nav2-network-aria"),
      items: [
        {
          id: "network/explorer",
          label: t("nav2-explorer"),
          description: t("nav2-explorer-desc"),
          href: "https://explorer.quantaureum.com",
        },
        {
          id: "network/staking",
          label: t("nav2-staking"),
          description: t("nav2-staking-desc"),
          href: "/staking/",
        },
        {
          id: "network/run-a-node",
          label: t("nav2-run-a-node"),
          description: t("nav2-run-a-node-desc"),
          href: "/run-a-node/",
        },
        {
          id: "network/get-qau",
          label: t("nav2-get-qau"),
          description: t("nav2-get-qau-desc"),
          href: "/get-qau/",
        },
        {
          id: "network/gas",
          label: t("nav2-gas"),
          description: t("nav2-gas-desc"),
          href: "/gas/",
        },
      ],
    },
    roadmap: {
      label: t("nav2-roadmap"),
      ariaLabel: t("nav2-roadmap-aria"),
      items: [
        {
          id: "roadmap/overview",
          label: t("nav2-roadmap-overview"),
          description: t("nav2-roadmap-overview-desc"),
          href: "/roadmap/",
        },
        {
          id: "roadmap/security",
          label: t("nav2-roadmap-security"),
          description: t("nav2-roadmap-security-desc"),
          href: "/roadmap/security/",
        },
        {
          id: "roadmap/scaling",
          label: t("nav2-roadmap-scaling"),
          description: t("nav2-roadmap-scaling-desc"),
          href: "/roadmap/scaling/",
        },
        {
          id: "roadmap/privacy",
          label: t("nav2-roadmap-privacy"),
          description: t("nav2-roadmap-privacy-desc"),
          href: "/roadmap/privacy/",
        },
        {
          id: "roadmap/ux",
          label: t("nav2-roadmap-ux"),
          description: t("nav2-roadmap-ux-desc"),
          href: "/roadmap/user-experience/",
        },
        {
          id: "roadmap/verkle",
          label: t("nav2-roadmap-verkle"),
          description: t("nav2-roadmap-verkle-desc"),
          href: "/roadmap/verkle-trees/",
        },
      ],
    },
    community: {
      label: t("nav2-community"),
      ariaLabel: t("nav2-community-aria"),
      items: [
        {
          id: "community/hub",
          label: t("nav2-community-hub"),
          description: t("nav2-community-hub-desc"),
          href: "/community/",
        },
        {
          id: "community/get-involved",
          label: t("nav2-get-involved"),
          description: t("nav2-get-involved-desc"),
          href: "/community/get-involved/",
        },
        {
          id: "community/x",
          label: t("nav2-x"),
          description: t("nav2-x-desc"),
          href: "https://x.com/ldf1570073",
        },
        {
          id: "community/discord",
          label: t("nav2-discord"),
          description: t("nav2-discord-desc"),
          href: "https://discord.gg/MSctkBT5j",
        },
        {
          id: "community/github",
          label: t("nav2-github"),
          description: t("nav2-github-desc"),
          href: "https://github.com/Quantaureum",
        },
        {
          id: "community/telegram",
          label: t("nav2-telegram"),
          description: t("nav2-telegram-desc"),
          href: "https://t.me/quantaureum",
        },
      ],
    },
  }
}
