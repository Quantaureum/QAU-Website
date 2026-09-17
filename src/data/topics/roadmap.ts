import type { TopicConfig } from "."

// All dropdown destinations must resolve to real pages. Sub-page routes
// (security, scaling, privacy, user-experience, verkle-trees,
// quantum-resistance) were ethereum.org template IA and have no pages —
// removed until real content exists.
export const roadmap: TopicConfig = {
  translationNs: "common",
  dropdown: {
    textKey: "nav-roadmap-options",
    ariaLabelKey: "nav-roadmap-options-alt",
    matomoCategory: "Roadmap dropdown",
    items: [
      {
        textKey: "nav-roadmap-home",
        href: "/roadmap/",
        matomoEvent: "clicked roadmap home",
      },
    ],
  },
}
