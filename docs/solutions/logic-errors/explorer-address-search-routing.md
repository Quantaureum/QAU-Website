---
title: "Explorer Address Search Routing - localhost Origin Confusion & Query Normalization"
date: "2026-09-19"
category: "logic-errors"
tags:
  - explorer
  - routing
  - server-rendering
  - redirect
  - next-intl
  - netlify
component: "app/[locale]/explorer/page.tsx, src/lib/explorer/config.ts, tests/e2e/explorer.spec.ts"
severity: "medium"
symptoms:
  - "Searching an address on /explorer lands on localhost:3000/explorer/address/<addr>/"
  - "Searching an address with a trailing slash yields a wrong/404 detail path"
---

# Explorer Address Search Routing — localhost Origin Confusion & Query Normalization

## Problem

Two distinct issues surfaced while investigating `https://quantaureum.com/explorer`
search behavior:

1. **Reported symptom — search "jumps to localhost:3000".** In the QAU-Website
   codebase, every explorer search redirect is built as a **relative path**
   (`/explorer/address/<query>/`), never a hard-coded `http://localhost:3000`.
   `NextResponse.redirect`/`redirect()` resolves relative paths against the
   **request's own `Host` header**. The only way a browser ends up at
   `https://localhost:3000/explorer/address/...` is that the page that performed
   the search was itself served from `localhost:3000` (a local dev server or
   local production build). This is correct relative-path behavior, not a bug in
   the deployed site. Evidence gathered from every routing layer:
   - `proxy.ts` (next-intl middleware): all rewrites/redirects are relative; the
     location is derived from `request.nextUrl`, never `localhost`.
   - `redirects.config.js` + `md-redirects.config.js`: explorer paths are
     internal relative redirects only (`/apps` → `/explorer/`).
   - `netlify/edge-functions/matomo-ai-tracker/`: does not touch `Host`/location.
   - `app/[locale]/explorer/page.tsx`: `redirect()` with a relative `detailPath`.
   - Direct probe of `https://quantaureum.com/explorer/?q=...` in this ENV
     returned `ERR_CONNECTION_REFUSED`, consistent with the site being reachable
     at `localhost:3000` locally rather than over the public origin.

2. **Real defect — query shape is passed to the route un-normalized.** The search
   box accepts raw input and the redirect interpolates it verbatim:
   ```
   /explorer/address/${query}/
   ```
   `query` is only `trim()`ed. A trailing slash (`0x.../`) or a
   leading `0x` typed by the user (`...`) produces a detail route segment that
   does not match what the address/tx pages expect, yielding a wrong or 404
   detail page. This is the code-level issue worth fixing.

## First Occurrence

Reported 2026-09-19 while searching wallet address `0x607C2d725C87D033698B35c627dBfB9266d5d8b3`
on the explorer.

## Root Cause

- **localhost symptom** = environmental. Relative redirect inherits the
  request origin; searching on a local `localhost:3000` instance correctly
  redirects to `localhost:3000/explorer/address/...`. No code change can make a
  relative redirect "skip" the current origin without switching to an absolute
  `SITE_URL`-based URL, which is undesirable for local dev (it would bounce dev
  traffic to production).
- **Normalization defect** = `getExplorerLookupKind` and the route interpolator
  used the raw trim value with no canonicalization.

## Decision

Keep relative redirects (correct for environment-relative navigation). Add
**server-side query normalization** so the detail route always receives a
canonical segment:

- `src/lib/explorer/config.ts`:
  - extraction of the previous normalized-detection logic into a private
    `normalizeQuery` + `detectLookupKind`.
  - new exported `normalizeQueryForRoute(value)`: prepends `0x` when the value
    is a bare hex string (40/64 hex chars), strips trailing slashes, and returns
    `""` for non-recognizable shapes so callers fall through to the "no match"
    UI instead of building a doomed route.
  - `getExplorerLookupKind` now classifies over the normalized form too, so an
    input with a trailing slash still matches.
- `app/[locale]/explorer/page.tsx`: build `detailPath` with
  `normalizeQueryForRoute(query)` instead of the raw `query`.
- `tests/e2e/explorer.spec.ts`:
  - `BASE` now reads `process.env.PLAYWRIGHT_TEST_BASE_URL` (same default as
    `playwright.config.ts`) instead of hard-coding `http://localhost:3000`, so
    the suite points at the configured origin (Netlify preview in CI) rather
    than a possibly-stopped local server.
  - new regression test: a trailing-slash address query redirects to the
    canonical `/explorer/address/<addr>/` path.

## Alternatives Considered

### Make search redirects absolute using SITE_URL
- Pros: guarantees the destination domain regardless of where the request
  originated.
- Cons: bounces local `next dev` / preview traffic to `https://quantaureum.com`,
  breaking local testing; SITE_URL is additionally inlined at build time, so it
  would serve the wrong origin on preview/staging builds. Rejected — relative
  redirects are the correct browser semantics here.

### Client-side `router.push` with origin fixup
- The explorer page is a server component already handling `?q=`; introducing a
  client bundle just to compute an absolute path adds weight for no benefit.
  Rejected.

## Consequences

- Explorer search is robust to trailing-slash and missing-`0x` inputs.
- Non-matching shapes still show the `page-explorer-search-no-match` message
  (no 404).
- Relative-redirect semantics preserved (localhost stays localhost when run
  locally — that is expected, not a defect).
- e2e run against any base URL without a hard-coded localhost constant.

## Verification

```bash
pnpm type-check            # passes
npx eslint src/lib/explorer/config.ts "app/[locale]/explorer/page.tsx" tests/e2e/explorer.spec.ts  # clean
# Explorer e2e specs run against PLAYWRIGHT_TEST_BASE_URL (local or preview)
```