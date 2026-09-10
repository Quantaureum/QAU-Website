import { NavSectionKey } from "@/components/Nav/types"

import i18nConfig from "../../i18n.config.json"

import type { CommunityBlog } from "./types"

export const OLD_CONTENT_DIR = "src/content" // For old git commit history -- do not remove
export const CONTENT_DIR = "public/content"
export const CONTENT_PATH = "/content"
export const TRANSLATED_IMAGES_DIR = "/content/translations"
export const PLACEHOLDER_IMAGE_DIR = "src/data/placeholders"
export const INTERNAL_TUTORIALS_JSON = "src/data/internalTutorials.json"
export const INTL_JSON_DIR = "src/intl"

export const NULL_VALUE = "—"

// i18n
export const DEFAULT_LOCALE = "en"
export const FAKE_LOCALE = "default"
// Sorted list of supported locales codes, defined in `i18n.config.json`
const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES
export const LOCALES_CODES = BUILD_LOCALES
  ? BUILD_LOCALES.split(",")
  : i18nConfig.map(({ code }) => code)

// Site URL - resolved at build time in next.config.js from Netlify deploy context
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://quantaureum.com"

export const IS_PRODUCTION_DEPLOY =
  process.env.NEXT_PUBLIC_CONTEXT === "production"
export const DISCORD_PATH = "https://discord.gg/MSctkBT5j"
export const GITHUB_REPO_URL =
  "https://github.com/Quantaureum/quantaureum-website/"
export const EDIT_CONTENT_URL = `https://github.com/Quantaureum/quantaureum-website/tree/master/`
export const MAIN_CONTENT_ID = "main-content"
export const WEBSITE_EMAIL = "hello@quantaureum.com"
export const DEFAULT_OG_IMAGE = "/images/home/hero.png"
export const SITE_TITLE = "quantaureum.com"

// Config
export const CONTENT_IMAGES_MAX_WIDTH = 800
export const GITHUB_BASE_API =
  "https://api.github.com/repos/Quantaureum/quantaureum-website"
export const GITHUB_COMMITS_URL = GITHUB_BASE_API + "/commits"
export const GITHUB_URL = `https://github.com/`
export const COLOR_MODE_STORAGE_KEY = "theme"

// API timing
export const BASE_TIME_UNIT = 3600 // (seconds) 1 hour
export const TIMEOUT_MS = 5000 // (milliseconds)
export const MAX_RETRIES = 1
export const RETRY_DELAY_BASE_MS = 250 // (milliseconds)

// Quiz Hub
export const PROGRESS_BAR_GAP = "4px"
export const PASSING_QUIZ_SCORE = 65
export const USER_STATS_KEY = "quizzes-stats"
export const INITIAL_QUIZ = "what-is-quantaureum"

// Crowdin
export const CROWDIN_PROJECT_URL = "https://crowdin.com/project/quantaureum"

// Metrics
export const DAYS_TO_FETCH = 1
// TODO(P4): legacy external data sources below are only referenced by pages
// scheduled for rewrite/removal (see .local-only audit). Delete them with P4.
export const BEACONCHA_IN_URL = "https://beaconcha.in/"
export const ETHERSCAN_API_URL = "https://explorer.quantaureum.com"
export const DUNE_API_URL = "https://api.dune.com"

// Wallets
export const NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN = 5

export const WALLETS_FILTERS_DEFAULT = {
  android: false,
  ios: false,
  linux: false,
  windows: false,
  macOS: false,
  firefox: false,
  chromium: false,
  hardware: false,
  open_source: false,
  non_custodial: false,
  hardware_support: false,
  rpc_importing: false,
  nft_support: false,
  connect_to_dapps: false,
  staking: false,
  swaps: false,
  layer_2: false,
  gas_fee_customization: false,
  ens_support: false,
  erc_20_support: false,
  buy_crypto: false,
  withdraw_crypto: false,
  multisig: false,
  social_recovery: false,
  eip_4337_support: false,
  eip_7702_support: false,
  new_to_crypto: false,
}

export const NEW_TO_CRYPTO_FEATURES = ["new_to_crypto"]

export const NFTS_FEATURES = ["nft_support", "layer_2", "connect_to_dapps"]

export const LONG_TERM_FEATURES = ["hardware", "non_custodial"]

export const FINANCE_FEATURES = [
  "hardware_support",
  "connect_to_dapps",
  "gas_fee_customization",
  "erc_20_support",
]

export const DEVELOPER_FEATURES = [
  "open_source",
  "rpc_importing",
  "connect_to_dapps",
  "gas_fee_customization",
  "erc_20_support",
]

// Chains
export const CHAINID_NETWORK_ENDPOINT = "https://chainid.network/chains.json"

export const CANONICAL_STAKING_TESTNET = "QAU Testnet"

export const TESTNETS = ["qau-testnet"]

export const EXCLUDED_NAMES = ["deprecated", "testnet"]

export const QAU = "QAU"

/**
 * Navigation
 */

export const MAIN_NAV_ID = "main-navigation"
export const NAV_BAR_PX_HEIGHT = "75px"
export const FROM_QUERY = "from"
export const NAV_PY = 4

// Determines the order of sections in the menu
export const SECTION_LABELS: NavSectionKey[] = [
  "learn",
  "use",
  "build",
  "participate",
  "research",
]

// Glossary Definition Component
export const DEFAULT_GLOSSARY_NS = "glossary"

export const HAMBURGER_BUTTON_ID = "mobile-menu-button"
export const MOBILE_LANGUAGE_BUTTON_NAME = "mobile-language-button"
export const DESKTOP_LANGUAGE_BUTTON_NAME = "desktop-language-button"

// Codeblock
export const LINES_BEFORE_COLLAPSABLE = 8

// Community
export const CALENDAR_DISPLAY_COUNT = 4

// RSS Feeds
export const RSS_DISPLAY_COUNT = 6

// Quantaureum community blog list. Populated as official channels come
// online; keep entries neutral and community-authored.
export const COMMUNITY_BLOGS: CommunityBlog[] = []

export const BLOG_FEEDS = COMMUNITY_BLOGS.map(({ feed }) => feed).filter(
  Boolean
) as string[]

export const BLOGS_WITHOUT_FEED = COMMUNITY_BLOGS.filter((item) => !item.feed)

export const SIZE_CLASS_MAPPING = {
  10: "size-10",
  12: "size-12",
  14: "size-14",
  16: "size-16",
  24: "size-24",
} as const

export const LINE_CLAMP_CLASS_MAPPING = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
} as const


