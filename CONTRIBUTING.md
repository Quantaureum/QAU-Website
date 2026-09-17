# Contributing to quantaureum.com

Contributions are welcome: bug reports, content corrections, translation reviews,
accessibility improvements, tests, and code. You do not need a wallet or funds to
submit an issue or pull request.

## Choose a contribution

- Report a bug or propose an improvement through the
  [issue chooser](https://github.com/Quantaureum/QAU-Website/issues/new/choose).
- For a first contribution, consider a reproducible broken link, a typo with its
  page URL, or a small regression test. Comment on an existing issue before
  starting work to avoid duplication.
- Discuss substantial features in an issue before implementing them.
- Report vulnerabilities privately using [SECURITY.md](SECURITY.md), not a public
  issue. Do not include credentials or private data in reports or screenshots.

## Set up a local checkout

Use the Node.js version in [.nvmrc](.nvmrc) and the pnpm version specified by
`packageManager` in [package.json](package.json). CI uses these same version pins.
On Windows, use Git Bash or WSL for the shell commands below and package scripts
that use POSIX environment-variable syntax.

1. Fork [QAU-Website](https://github.com/Quantaureum/QAU-Website) on GitHub.
2. Clone your fork, replacing `YOUR-GITHUB-USERNAME` below:

   ```bash
   git clone https://github.com/YOUR-GITHUB-USERNAME/QAU-Website.git
   cd QAU-Website
   git switch -c docs/my-contribution
   corepack enable
   pnpm install --frozen-lockfile
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open <http://localhost:3000>. For configuration options, consult `.env.example`.
   If your task needs local overrides, put only the required values in `.env.local`;
   never commit that file. External integrations may need additional configuration.
   Do not request production credentials for routine contributions.

## Find the relevant files

| Change                   | Location                                     |
| ------------------------ | -------------------------------------------- |
| Pages and routing        | `app/[locale]/`                              |
| Reusable components      | `src/components/`                            |
| English UI strings       | `src/intl/en/`                               |
| English Markdown content | `public/content/`, excluding `translations/` |
| Translated UI strings    | `src/intl/<locale>/`                         |
| Unit tests               | `tests/unit/`                                |
| Global styles            | `src/styles/`                                |

Write new code comments and repository documentation in English. Keep user-facing
strings translatable. Use existing components and patterns where possible.
English content headings from h1 through h4 require explicit `{#lower-kebab-id}`
anchors; check them with `pnpm lint:md`.

## Check your change

For code changes, run:

```bash
pnpm lint
pnpm type-check
pnpm test:unit
```

For English Markdown content changes, also run `pnpm lint:md`.
For routing or build changes, run `pnpm build`. For UI changes, include screenshots
and check mobile layouts, keyboard navigation, and relevant RTL locales. Add a
Storybook story for a new component and open it locally with `pnpm storybook`.

A focused unit test can be run without the entire suite:

```bash
pnpm exec playwright test tests/unit/explorer-config.spec.ts --project=unit
```

For browser tests, follow [the E2E guide](docs/e2e-testing.md). Unit checks do not
replace browser verification of changed UI. In your PR, record the exact checks
run and their results, including anything skipped or blocked. Do not claim that
checks passed when they were not run.

## Submit a pull request

1. Keep the change focused on one issue or improvement.
2. Add a regression test for a bug fix where practical.
3. Check your diff for credentials, wallet material, internal infrastructure
   details, generated files, and unrelated changes. Keep temporary scripts and
   logs in the ignored `.local-only/` directory.
4. Push the branch to your fork and open a PR against `master` in
   [Quantaureum/QAU-Website](https://github.com/Quantaureum/QAU-Website).
5. Fill in the PR template with the issue, scope, and verification evidence.

Maintainers review contributions before merging. If a CI check fails, inspect the
logs and report whether it relates to your change. Checks involving external
services may require maintainer configuration; never work around missing access
by exposing secrets. This guide does not promise a review deadline or a reward.

## Review translations

The canonical locale list is [i18n.config.json](i18n.config.json). English content
changes are propagated by the [intl-pipeline](tests/specs/PIPELINE-SPEC.md); do not
manually copy them across non-English files or edit pipeline manifests to bypass
translation checks.

A targeted correction to an existing translation is welcome when the English
source has not changed. Include the page URL, locale, current wording, suggested
wording, and reason. If unsure about the source state, open a content issue first.

## Community standards

Participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md).
The repository license is [MIT](LICENSE).
