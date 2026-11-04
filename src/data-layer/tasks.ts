/**
 * Trigger.dev scheduled tasks for data fetching.
 *
 * Weekly tasks run on Sundays at midnight UTC.
 * Daily tasks run at midnight UTC.
 * Hourly tasks run every hour.
 */

import * as Sentry from "@sentry/nextjs"
import { logger, schedules, task, tasks } from "@trigger.dev/sdk/v3"

import { fetchDeveloperTools } from "./fetchers/developer-tools"
import { fetchApps } from "./fetchers/fetchApps"
import { fetchCalendarEvents } from "./fetchers/fetchCalendarEvents"
import { fetchCommunityPicks } from "./fetchers/fetchCommunityPicks"
import { fetchEvents } from "./fetchers/fetchEvents"
import { fetchGasPrice } from "./fetchers/fetchGasPrice"
import { fetchGFIs } from "./fetchers/fetchGFIs"
import { fetchGitHistory } from "./fetchers/fetchGitHistory"
import { fetchGitHubContributors } from "./fetchers/fetchGitHubContributors"
import { fetchGithubRepoData } from "./fetchers/fetchGithubRepoData"
import { fetchQuizStats } from "./fetchers/fetchQuizStats"
import { fetchTranslationGlossary } from "./fetchers/fetchTranslationGlossary"
import { set } from "./storage"

// Note: Ethereum-ecosystem data sources (Dune, L2BEAT, GrowThePie, DefiLlama,
// CoinGecko) were decommissioned -- QAU has no listings on those platforms and
// the site must not display unverifiable numbers.
export const KEYS = {
  APPS: "fetch-apps",
  CALENDAR_EVENTS: "fetch-calendar-events",
  GITHUB_CONTRIBUTORS: "fetch-github-contributors",
  COMMUNITY_PICKS: "fetch-community-picks",
  DEVELOPER_TOOLS: "fetch-developer-tools",
  GFIS: "fetch-gfis",
  GIT_HISTORY: "fetch-git-history",
  GITHUB_REPO_DATA: "fetch-github-repo-data",
  EVENTS: "fetch-events",
  GAS_PRICE: "fetch-gas-price",
  TRANSLATION_GLOSSARY: "fetch-translation-glossary",
  QUIZ_STATS: "fetch-quiz-stats",
} as const

// Task definition: storage key + fetch function
type TaskDef = [string, () => Promise<unknown>]

const WEEKLY: TaskDef[] = [[KEYS.GITHUB_CONTRIBUTORS, fetchGitHubContributors]]

const DAILY: TaskDef[] = [
  [KEYS.APPS, fetchApps],
  [KEYS.CALENDAR_EVENTS, fetchCalendarEvents],
  [KEYS.COMMUNITY_PICKS, fetchCommunityPicks],
  [KEYS.GFIS, fetchGFIs],
  [KEYS.GIT_HISTORY, fetchGitHistory],
  [KEYS.GITHUB_REPO_DATA, fetchGithubRepoData],
  [KEYS.EVENTS, fetchEvents],
  [KEYS.DEVELOPER_TOOLS, fetchDeveloperTools],
  [KEYS.TRANSLATION_GLOSSARY, fetchTranslationGlossary],
  [KEYS.QUIZ_STATS, fetchQuizStats],
]

const HOURLY: TaskDef[] = [[KEYS.GAS_PRICE, fetchGasPrice]]

// ─── Dynamic task creation ───
function createDataTask([key, fetchFn]: TaskDef) {
  return task({
    id: key,
    retry: {
      maxAttempts: 2,
    },
    catchError: async ({ error }) => {
      logger.error(`[${key}] failed`, { error })
    },
    run: async () => {
      const data = await fetchFn()
      await set(key, data)
      logger.info(`✓ ${key}`)
      return { key }
    },
  })
}

const weeklyFetchTasks = WEEKLY.map(createDataTask)
const dailyFetchTasks = DAILY.map(createDataTask)
const hourlyFetchTasks = HOURLY.map(createDataTask)

// Must export for trigger.dev to discover
export const allFetchTasks = [
  ...weeklyFetchTasks,
  ...dailyFetchTasks,
  ...hourlyFetchTasks,
]

// ─── Scheduled orchestrators ───
export const weeklyTask = schedules.task({
  id: "weekly-data-fetch",
  cron: "0 0 * * 0", // Sundays at midnight UTC
  run: () => Promise.all(weeklyFetchTasks.map((t) => t.trigger())),
})

export const dailyTask = schedules.task({
  id: "daily-data-fetch",
  cron: "0 0 * * *",
  run: () => Promise.all(dailyFetchTasks.map((t) => t.trigger())),
})

export const hourlyTask = schedules.task({
  id: "hourly-data-fetch",
  cron: "0 * * * *",
  run: () => Promise.all(hourlyFetchTasks.map((t) => t.trigger())),
})

// ─── Global failure handler → Sentry + Discord ───
tasks.onFailure(async ({ ctx, error }) => {
  Sentry.captureException(error, {
    tags: { module: "data-layer" },
    extra: { taskId: ctx.task.id },
  })

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: `Data Fetch Failed: ${ctx.task.id}`,
          color: 0xff0000,
          description: String(error).slice(0, 2000),
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  })
})
