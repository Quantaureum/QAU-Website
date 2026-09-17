import fs from "fs"
import { createRequire } from "module"
import path from "path"

import { expect, test } from "@playwright/test"

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8")

for (const file of [
  "src/components/Homepage/PersonaModalCTA.tsx",
  "src/components/Homepage/FeatureCards.tsx",
  "src/components/Homepage/RoadmapSection.tsx",
  "app/[locale]/roadmap/page.tsx",
]) {
  test(`${file} does not send visitors to removed pages`, () => {
    const source = read(file)
    expect(source).not.toMatch(/["']\/apps\/?["']/)
    expect(source).not.toMatch(/["']\/developers\/docs(?:\/[^"']*)?["']/)
    expect(source).not.toMatch(
      /["']\/roadmap\/(?:security|scaling|privacy|user-experience|verkle-trees)(?:\/[^"']*)?["']/
    )
  })
}

const legacyDestinations = [
  ["/apps", "/explorer/"],
  ["/developers/docs", "/developers/#docs"],
  ["/roadmap/security", "/roadmap/#technical-upgrades"],
  ["/roadmap/scaling", "/roadmap/#technical-upgrades"],
  ["/roadmap/privacy", "/roadmap/#technical-upgrades"],
  ["/roadmap/user-experience", "/roadmap/#changes-coming"],
  ["/roadmap/verkle-trees", "/roadmap/#technical-upgrades"],
  ["/roadmap/security/quantum-resistance", "/roadmap/#technical-upgrades"],
]

const redirects = createRequire(__filename)("../../redirects.config.js") as [
  string,
  string,
  boolean?,
][]

for (const [source, destination] of legacyDestinations) {
  test(`bookmarked ${source} has a real replacement`, () => {
    expect(redirects.find(([from]) => from === source)?.[1]).toBe(destination)
    const [pathname, anchor] = destination.split("#")
    const page = `app/[locale]${pathname}page.tsx`
    expect(fs.existsSync(page)).toBe(true)
    if (anchor) expect(read(page)).toContain(`id="${anchor}"`)
  })
}
