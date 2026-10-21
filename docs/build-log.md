# Build log

Newest entry last. Every session appends what was done, what was decided and
what is next.

## 2026-10-21 — Session 1: prerequisites, template run, proposal

Status: no application code written. Waiting for approval of `docs/proposal.md`.

### Prerequisites

| Check | Result |
| --- | --- |
| `git` | 2.43.0 |
| `node` | v22.22.0 (LTS), matches the template `engines` (`>=22`) |
| `pnpm` | 10.28.0 (`npm` 10.9.4) |
| Playwright | `playwright-core` drives the preinstalled Chromium (`/opt/pw-browsers/chromium-1194`); screenshots worked |
| This folder | Clone of `ali-moradi-design/company-site`, remote `origin` correct, **empty repo** (no commits on any branch), working on `claude/magical-rubin-y7yadf` |
| `gh` | `gh auth status` reports the `GH_TOKEN` as **invalid**, but `gh api` calls through the proxy work (private repo `roadmap-portfolio` returned `private: true`). Treat `gh` as unreliable; use the GitHub MCP tools for PRs |
| `roadmap-portfolio` (private) | Readable (cloned, `main` fetched) |
| Template repo | `MohamedDjoudir/landing-page-template-3` cloned (MIT, `LICENSE` © 2025 NOVA) |

### Brief

Copied from `roadmap-portfolio@main:notes/company-site-brief.md` to
`docs/brief.md` unchanged.

### Template run (as is)

Cloned to a scratch folder outside this repo. Only change: removed the Yarn
`packageManager` field and `yarn.lock` / `.yarnrc.yml` so `pnpm install` works.
`pnpm build` and `pnpm start` succeed; `/en` and `/ar` return 200.
Screenshots: `docs/screenshots/nova-{en,ar}-{desktop,mobile}.jpg`.

### Findings that differ from the brief

1. Nova is a **dark SaaS landing page** ("AI assistant", pricing, integrations,
   FAQ), not a business / case-studies template. It has no case studies, no
   team, no contact form. Sections: hero, social proof, how it works, features
   (tabs), integrations, testimonials, blog preview, pricing, FAQ, CTA, footer.
2. Versions: Next **15.2.8**, **Tailwind 3.4** (the brief says v4), React 19,
   `framer-motion` 11, `next-intl` 4, `next-themes`, `.npmrc` with
   `legacy-peer-deps`.
3. **`src/middleware.ts` (next-intl) is incompatible with `output: 'export'`.**
   The static build needs: `[locale]` + `generateStaticParams`,
   `setRequestLocale`, a static root `/` redirect page, no middleware.
4. `next/image` needs `images.unoptimized: true` in a static export. The
   template config uses the image optimizer and `remotePatterns`.
5. Fonts: `Inter` + `Noto Sans Arabic` via `next/font/google`. Persian needs
   `Vazirmatn`.
6. Arabic locale is wired through `routing.ts`, `direction.ts`, `messages/ar.json`
   and the locale switcher: all must change to `fa`.
7. Template already has a feature-folder layout (`src/features/home/<Section>/`
   with `components`, `constants`, `hooks`, `types`), but it is not FSD (no
   `entities`, `widgets`, `shared` layers; barrel files everywhere).
8. In the full-page screenshots, some sections (testimonials, Persian pricing)
   look empty: they are scroll-reveal animations that had not fired; not a bug
   we need to track.

### Next

Approval of the proposal (name, colors, logo idea, page list, FSD layout), then
PR 1: tooling (pnpm, ESLint, Prettier, Next 16, Tailwind decision).
