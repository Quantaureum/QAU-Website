import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

// Footer legal links and nav must resolve to real pages. 404s on legal pages
// are credibility-critical for a site handling wallet / QAU / bounty content.
test("footer and nav legal + security links resolve to real pages", () => {
  const footerSource = fs.readFileSync(
    path.resolve("src/lib/nav/footerLinks.ts"),
    "utf8"
  )
  const navSource = fs.readFileSync(
    path.resolve("src/lib/nav/buildNavigation.ts"),
    "utf8"
  )

  // Legal pages now exist on disk.
  for (const slug of [
    "public/content/privacy-policy/index.md",
    "public/content/terms-of-use/index.md",
    "public/content/cookie-policy/index.md",
  ]) {
    expect(fs.existsSync(path.resolve(slug)), `${slug} must exist`).toBe(true)
  }

  // The /security/ route never had a page; footer/nav must not link to it.
  expect(footerSource).not.toContain('href: "/security/"')
  expect(navSource).not.toContain('href: "/security/"')
})

test("get-qau page does not link to missing /apps/ or /security/ routes", () => {
  const source = fs.readFileSync(
    path.resolve("app/[locale]/get-qau/page.tsx"),
    "utf8"
  )
  expect(source).not.toMatch(/\/apps\/categories\//)
  expect(source).not.toMatch(/\/security\//)
  expect(source).not.toMatch(/\/guides\//)
})
