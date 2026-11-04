/**
 * Mock data files for local development.
 *
 * These files are generated from Netlify Blobs storage and can be used
 * for local development without needing to connect to Netlify Blobs.
 *
 * D-34 status note (2026-11-04): these payloads are inherited from the
 * upstream ethereum.org / Superchain template. They contain third-party
 * project self-descriptions and sample metrics that are NOT Quantaureum
 * facts, are NOT verified, and must NOT be treated as public claims about
 * this project (mainnet status, EVM compatibility, throughput, uptime,
 * audits, yields or prices). Authoritative wording lives in
 * .local-only/ops/board/decisions.md, qau/README.zh-CN.md,
 * qau/GOVERNANCE.md, qau/ROADMAP.md and qau/SECURITY.md.
 * Do not publish these mocks as project data.
 */

export const mockTaskIds = [
  "fetch-apps",
  "fetch-events",
  "fetch-calendar-events",
  "fetch-community-picks",
  "fetch-gas-price",
  "fetch-gfis",
  "fetch-git-history",
  "fetch-github-contributors",
  "fetch-github-repo-data",
  "fetch-posts",
  "fetch-rss",
  "fetch-translation-glossary",
  "fetch-quiz-stats",
  "fetch-developer-tools",
] as const

export type MockTaskId = (typeof mockTaskIds)[number]
