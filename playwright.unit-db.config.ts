import path from "path"

import dotenv from "dotenv"
import { defineConfig } from "@playwright/test"

dotenv.config({ path: path.resolve(__dirname, ".env.local") })

/**
 * DB integration specs (tests/unit-db) — the specs that share the LOCAL
 * development Postgres.
 *
 * Runs with ONE worker and fullyParallel disabled (OBS-1): these specs read
 * whole-database snapshots (global registration counts, the full payout
 * queue, global pool sums) and each spec file DELETEs its own rows on
 * cleanup. Under the main config's fullyParallel + multi-worker run, one
 * file's cleanup DELETE distorts another file's snapshot mid-test and the
 * assertions flake. Serial execution makes every whole-DB snapshot stable.
 *
 * Run via `pnpm test:unit` (which chains this after the mock unit project)
 * or directly: `playwright test --config playwright.unit-db.config.ts`.
 */
export default defineConfig({
  testDir: "./tests/unit-db",
  outputDir: "./tests/__results__",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["html", { outputFolder: "./tests/__report__", open: "never" }],
    ["line"],
    process.env.CI ? ["github"] : ["list"],
  ],
  timeout: 30000,
})
