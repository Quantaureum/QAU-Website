import type {
  AppData,
  Commit,
  CommunityPick,
  EventItem,
  GHIssue,
  GitHubContributorsData,
  GithubRepoData,
} from "@/lib/types"
import type { CommunityEventsReturnType } from "@/lib/interfaces"

import type { DeveloperToolsDataEnvelope } from "./fetchers/developer-tools/utils"
import type { GasPriceData } from "./fetchers/fetchGasPrice"
import type { QuizStatsData } from "./fetchers/fetchQuizStats"
import type { GlossaryEntry } from "./fetchers/fetchTranslationGlossary"
import { get } from "./storage"
import { KEYS } from "./tasks"

export { KEYS }

// Note: Ethereum-ecosystem metric getters (price, market cap, TVL, stablecoins,
// L2BEAT, GrowThePie, Dune staking/address stats) were decommissioned -- no QAU
// data source exists for them, and the site must not display unverifiable
// numbers. On-chain metrics are served from the QAU node RPC instead
// (see app/api/explorer/*).

export const getAppsData = () => get<Record<string, AppData[]>>(KEYS.APPS)
export const getCommunityPicks = () => get<CommunityPick[]>(KEYS.COMMUNITY_PICKS)
export const getCalendarEvents = () => get<CommunityEventsReturnType>(KEYS.CALENDAR_EVENTS)
export const getGasPriceData = () => get<GasPriceData>(KEYS.GAS_PRICE)
export const getGFIs = () => get<GHIssue[]>(KEYS.GFIS)
export const getGitHistory = () => get<Commit[]>(KEYS.GIT_HISTORY)
export const getGithubRepoData = () => get<Record<string, GithubRepoData>>(KEYS.GITHUB_REPO_DATA)
export const getEventsData = () => get<EventItem[]>(KEYS.EVENTS)
export const getDeveloperToolsData = () => get<DeveloperToolsDataEnvelope>(KEYS.DEVELOPER_TOOLS)
export const getTranslationGlossary = () => get<GlossaryEntry[]>(KEYS.TRANSLATION_GLOSSARY)
export const getGitHubContributors = () => get<GitHubContributorsData>(KEYS.GITHUB_CONTRIBUTORS)
export const getQuizStats = () => get<QuizStatsData>(KEYS.QUIZ_STATS)
