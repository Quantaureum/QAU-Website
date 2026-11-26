# CI credentials

The workflows in `.github/workflows/` reference the repository secrets listed
below. Only the four `DEPLOY_*` secrets are configured today, which is why the
workflows that need anything else are skipped instead of failing (each one
starts with a `credentials` gate job that reports exactly what is missing).

Secret **values** never live in this repository. Add them under
**Settings → Secrets and variables → Actions** (or with `gh secret set`).

## Configured

| Secret | Used by | Purpose |
| --- | --- | --- |
| `DEPLOY_HOST` | Deploy to production | SSH target that runs `~/deploy-qau.sh` |
| `DEPLOY_PORT` | Deploy to production | SSH port of that host |
| `DEPLOY_USER` | Deploy to production | SSH user on that host |
| `DEPLOY_SSH_KEY` | Deploy to production | Private key used for the deploy connection |

## Not configured

### Release (weekly, Tue + Thu)

| Secret | Purpose |
| --- | --- |
| `RELEASE_BOT_TOKEN` | Token that authors the deploy pull request, so the downstream `pull_request` workflows fire |
| `DISCORD_RELEASE_WEBHOOK_URL` | Posts the release announcements to Discord |
| `ANTHROPIC_API_KEY` | Writes the release notes |

`NETLIFY_TOKEN` and `NETLIFY_SITE_ID` are also referenced by the release
workflow, but only for reading the staging preview deploy state; the step
degrades to `unknown` when they are absent.

### Netlify preview cleanup

| Secret | Purpose |
| --- | --- |
| `NETLIFY_TOKEN` | Deletes stale Netlify preview deploys |
| `NETLIFY_SITE_ID` | Selects the Netlify site |

### Trigger.dev data layer

| Secret | Purpose |
| --- | --- |
| `TRIGGER_ACCESS_TOKEN` | Deploys the data layer to Trigger.dev |
| `TRIGGER_PROJECT_REF` | Target Trigger.dev project |

### Translation review

| Secret | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Runs the Claude translation review |

### Agentic workflows (currently disabled)

`PR Backlog Sweeper`, `Issue Triager` and `Intake Decisions` are disabled in
this repository. Re-enabling them needs `ANTHROPIC_API_KEY`,
`GH_AW_GITHUB_TOKEN`, `GH_AW_GITHUB_MCP_SERVER_TOKEN` and
`ETHORG_AGENT_PRIVATE_KEY` (the last one is a private key: it belongs in
Actions secrets only, never in this repository).

### Referenced but unused by any active workflow

`CHROMATIC_PAGES_TOKEN`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY` and
`I18N_GITHUB_TOKEN` are still referenced by workflow files that no longer run
on a schedule. Configure them only together with the workflow that needs
them.
