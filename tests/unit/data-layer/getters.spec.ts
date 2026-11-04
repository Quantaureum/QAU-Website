/**
 * Playwright Test suite for data-layer getter functions.
 *
 * Tests all public getter functions to ensure they:
 * 1. Execute without errors
 * 2. Return the expected types and structures
 * 3. Handle null cases gracefully
 * 4. Validate data structure when data is present
 */

import { expect, test } from "@playwright/test"

import * as dataLayer from "@/data-layer"

test.describe("Data-Layer Getters", () => {
  test.describe("Apps & Community", () => {
    test("getAppsData returns apps data or null", async () => {
      const result = await dataLayer.getAppsData()
      if (result !== null) {
        expect(typeof result).toBe("object")
        expect(Array.isArray(result)).toBe(false)
        // Check that values are arrays
        const categoryKeys = Object.keys(result)
        if (categoryKeys.length > 0) {
          const firstCategory = result[categoryKeys[0]]
          expect(Array.isArray(firstCategory)).toBe(true)
          if (firstCategory.length > 0) {
            const firstApp = firstCategory[0]
            expect(firstApp).toHaveProperty("name")
            expect(firstApp).toHaveProperty("url")
            expect(typeof firstApp.name).toBe("string")
            expect(typeof firstApp.url).toBe("string")
          }
        }
      }
    })

    test("getCommunityPicks returns array or null", async () => {
      const result = await dataLayer.getCommunityPicks()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstPick = result[0]
          expect(firstPick).toHaveProperty("name")
          expect(firstPick).toHaveProperty("twitterURL")
          expect(firstPick).toHaveProperty("twitterHandle")
          expect(typeof firstPick.name).toBe("string")
          expect(typeof firstPick.twitterURL).toBe("string")
        }
      }
    })

    test("getCalendarEvents returns calendar events or null", async () => {
      const result = await dataLayer.getCalendarEvents()
      if (result !== null) {
        expect(result).toHaveProperty("pastEventData")
        expect(result).toHaveProperty("upcomingEventData")
        expect(Array.isArray(result.pastEventData)).toBe(true)
        expect(Array.isArray(result.upcomingEventData)).toBe(true)
      }
    })
  })

  test.describe("GitHub Data", () => {
    test("getGFIs returns array of GitHub issues or null", async () => {
      const result = await dataLayer.getGFIs()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstIssue = result[0]
          expect(firstIssue).toHaveProperty("title")
          expect(firstIssue).toHaveProperty("html_url")
          expect(firstIssue).toHaveProperty("created_at")
          expect(typeof firstIssue.title).toBe("string")
          expect(typeof firstIssue.html_url).toBe("string")
          expect(typeof firstIssue.created_at).toBe("string")
        }
      }
    })

    test("getGitHistory returns array of commits or null", async () => {
      const result = await dataLayer.getGitHistory()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstCommit = result[0]
          expect(firstCommit).toHaveProperty("commit")
          expect(firstCommit).toHaveProperty("author")
          expect(firstCommit.commit).toHaveProperty("author")
          expect(firstCommit.commit.author).toHaveProperty("date")
          expect(typeof firstCommit.commit.author.date).toBe("string")
          expect(firstCommit.author).toHaveProperty("login")
          expect(typeof firstCommit.author.login).toBe("string")
        }
      }
    })

    test("getGithubRepoData returns repo data or null", async () => {
      const result = await dataLayer.getGithubRepoData()
      if (result !== null) {
        expect(typeof result).toBe("object")
        expect(Array.isArray(result)).toBe(false)
        const repoKeys = Object.keys(result)
        if (repoKeys.length > 0) {
          const firstRepo = result[repoKeys[0]]
          expect(firstRepo).toHaveProperty("starCount")
          expect(firstRepo).toHaveProperty("languages")
          expect(typeof firstRepo.starCount).toBe("number")
          expect(Array.isArray(firstRepo.languages)).toBe(true)
        }
      }
    })
  })
})
