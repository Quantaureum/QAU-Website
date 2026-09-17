import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

const read = (file: string) => fs.readFileSync(path.resolve(file), "utf8")

const templates = fs
  .readdirSync(".github/ISSUE_TEMPLATE")
  .filter((file) => /\.ya?ml$/.test(file))
  .map((file) => `.github/ISSUE_TEMPLATE/${file}`)

for (const file of templates) {
  test(`${file} does not link to removed contribution policies`, () => {
    const source = read(file)
    expect(source).not.toMatch(
      /https:\/\/quantaureum\.com\/(?:en\/)?contributing\//
    )
    expect(source).not.toMatch(
      /\[[^\]]*(?:policy|guidelines for quizzes)[^\]]*\]\(https:\/\/github\.com\/Quantaureum\/QAU-Website\/blob\/master\/CONTRIBUTING\.md\)/i
    )
    expect(source).not.toContain("meets the criteria listed there")
  })
}

test("pull request template asks for verification and skipped checks", () => {
  const source = read(".github/PULL_REQUEST_TEMPLATE.md")
  expect(source).toContain("## Verification")
  expect(source).toContain("Skipped or blocked checks")
})
