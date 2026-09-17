import type { TopicConfig } from "."

// All dropdown destinations must exist. Sub-page guides (solo/saas/pools) were
// ethereum.org template residue and are removed until real pages exist.
export const staking: TopicConfig = {
  translationNs: "page-staking",
  dropdown: {
    textKey: "page-staking-dropdown-staking-options",
    ariaLabelKey: "page-staking-dropdown-staking-options-alt",
    matomoCategory: "Staking dropdown",
    items: [
      {
        textKey: "page-staking-dropdown-home",
        href: "/staking/",
        matomoEvent: "clicked staking home",
      },
      {
        textKey: "page-staking-dropdown-withdrawals",
        href: "/staking/#faq",
        matomoEvent: "clicked about withdrawals",
      },
    ],
  },
}
