# Project instructions

Company site (Arvand Partners, English + Persian). Scope: `docs/brief.md`;
progress: `docs/build-log.md`; contact form contract: `docs/form-endpoint.md`.

## Workflow

- Small PRs: branch → local checks → PR → merge when the required check (`check`)
  is green. Every merge to `main` deploys (`.github/workflows/docker.yml` → deploy-kit).
- Local checks: `pnpm check`, `pnpm test`, `pnpm build:e2e`, `pnpm test:e2e`.
- Production: Next.js `output: "standalone"` in a container (`Dockerfile`, `deploy/`).

## Language

- Explain in Persian. Put every English word or code name inside parentheses and
  backticks. Never start a line with an English word. Repo files are in English.

## graphify

Do not use graphify in this repo (decided 2026-10-29).
