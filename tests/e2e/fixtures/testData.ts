import en from "@/intl/en/common.json"
import enIndex from "@/intl/en/page-index.json"
import enFindWallet from "@/intl/en/page-wallets-find-wallet.json"
import es from "@/intl/es/common.json"

/**
 * Test data and fixtures for e2e tests
 */

export const testData = {
  urls: {
    invalid: "/invalid-url",
    invalidInternationalized: "/es/invalid-url",
  },

  search: {
    validQuery: "smart contract",
    invalidQuery: "xyz123nonexistent",
  },

  navigation: {
    menu: [
      {
        name: en["nav2-learn"],
        subsections: [en["nav2-what-is-quantaureum"]],
      },
      {
        name: en["nav2-network"],
        subsections: [en["nav2-wallets"]],
      },
      {
        name: en["nav2-developers-hub"],
        subsections: [en["nav2-developers-hub-desc"]],
      },
    ],
  },

  content: {
    headings: {
      homepage: enIndex["page-index-title"],
      findWallet: enFindWallet["page-find-wallet-title"],
      findWalletRelated: enFindWallet["page-find-wallet-related-title"],
      notFoundEn: en["we-couldnt-find-that-page"],
      notFoundEs: es["we-couldnt-find-that-page"],
    },
  },
}
