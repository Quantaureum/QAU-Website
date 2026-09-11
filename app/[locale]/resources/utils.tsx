import { getTranslations } from "next-intl/server"

import type { DashboardSection } from "./types"

import SectionIconArrowsFullscreen from "@/components/icons/arrows-fullscreen.svg"
import SectionIconQauGlyph from "@/components/icons/qau-glyph.svg"
import SectionIconHeartPulse from "@/components/icons/heart-pulse.svg"
import SectionIconQauWallet from "@/components/icons/qau-wallet.svg"
import SectionIconPrivacy from "@/components/icons/privacy.svg"

import IconBrandMark from "@/public/images/qau-logo.png"
import IconGlyph from "@/public/images/qau-glyph-thumbnail.png"

export const getResources = async (): Promise<DashboardSection[]> => {
  const t = await getTranslations("page-resources")

  const networkBoxes = [
    {
      title: t("page-resources-block-explorers-title"),
      items: [
        {
          title: "Quantaureum Explorer",
          description: t("page-resources-block-explorers-explorer-description"),
          href: "https://explorer.quantaureum.com",
          imgSrc: IconBrandMark,
        },
      ],
    },
    {
      title: t("page-resources-nodes-title"),
      items: [
        {
          title: "Run a Quantaureum node",
          description: t("page-resources-nodes-explorer-description"),
          href: "https://quantaureum.com/run-a-node/",
          imgSrc: IconBrandMark,
        },
      ],
    },
    {
      title: t("page-resources-network-title"),
      items: [
        {
          title: "JSON-RPC interface",
          description: t("page-resources-rpc-description"),
          href: "https://quantaureum.com/developers/docs/",
          imgSrc: IconGlyph,
        },
      ],
    },
  ]

  const usingBoxes = [
    {
      title: t("page-resources-wallets-title"),
      items: [
        {
          title: "Quantaureum wallets",
          description: t("page-resources-wallets-description"),
          href: "https://quantaureum.com/wallets/",
          imgSrc: IconBrandMark,
        },
      ],
    },
    {
      title: t("page-resources-gas-title"),
      items: [
        {
          title: "Gas and fees",
          description: t("page-resources-gas-explorer-description"),
          href: "https://quantaureum.com/gas/",
          imgSrc: IconBrandMark,
        },
      ],
    },
  ]

  const scalingBoxes = [
    {
      title: t("page-resources-roadmap-title"),
      items: [
        {
          title: "Quantaureum roadmap",
          description: t("page-resources-roadmap-description"),
          href: "https://quantaureum.com/roadmap/",
          imgSrc: IconBrandMark,
        },
      ],
    },
  ]

  const resilienceBoxes = [
    {
      title: t("page-resources-network-resilience-title"),
      items: [
        {
          title: "Post-quantum cryptography",
          description: t("page-resources-pqc-description"),
          href: "https://quantaureum.com/roadmap/quantum-resistance/",
          imgSrc: IconBrandMark,
        },
      ],
    },
  ]

  const privacySecurityBoxes = [
    {
      title: t("page-resources-privacy-security-title"),
      items: [
        {
          title: "Security policy",
          description: t("page-resources-security-description"),
          href: "https://quantaureum.com/security/",
          imgSrc: IconBrandMark,
        },
        {
          title: "Bug bounty program",
          description: t("page-resources-bug-bounty-description"),
          href: "https://quantaureum.com/bug-bounty/",
          imgSrc: IconBrandMark,
        },
      ],
    },
  ]

  const resources = [
    {
      key: "network",
      label: t("page-resources-network-title"),
      icon: <SectionIconQauGlyph />,
      boxes: networkBoxes,
    },
    {
      key: "using",
      label: t("page-resources-using-title"),
      icon: <SectionIconQauWallet />,
      boxes: usingBoxes,
    },
    {
      key: "scaling",
      label: t("page-resources-scaling-title"),
      icon: <SectionIconArrowsFullscreen />,
      boxes: scalingBoxes,
    },
    {
      key: "resilience",
      label: t("page-resources-resilience-title"),
      icon: <SectionIconHeartPulse />,
      boxes: resilienceBoxes,
    },
    {
      key: "privacy-security",
      label: t("page-resources-privacy-security-title"),
      icon: <SectionIconPrivacy />,
      boxes: privacySecurityBoxes,
    },
  ]

  return resources
}
