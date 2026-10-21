# Build log

Newest entry last. Every session appends what was done, what was decided and
what is next.

## 2026-10-21 — Session 1: prerequisites, template run, proposal

Status: no application code written. Waiting for approval of `docs/proposal.md`.

### Prerequisites

| Check                         | Result                                                                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `git`                         | 2.43.0                                                                                                                                                                                                                    |
| `node`                        | v22.22.0 (LTS), matches the template `engines` (`>=22`)                                                                                                                                                                   |
| `pnpm`                        | 10.28.0 (`npm` 10.9.4)                                                                                                                                                                                                    |
| Playwright                    | `playwright-core` drives the preinstalled Chromium (`/opt/pw-browsers/chromium-1194`); screenshots worked                                                                                                                 |
| This folder                   | Clone of `ali-moradi-design/company-site`, remote `origin` correct, **empty repo** (no commits on any branch), working on `claude/magical-rubin-y7yadf`                                                                   |
| `gh`                          | `gh auth status` reports the `GH_TOKEN` as **invalid**, but `gh api` calls through the proxy work (private repo `roadmap-portfolio` returned `private: true`). Treat `gh` as unreliable; use the GitHub MCP tools for PRs |
| `roadmap-portfolio` (private) | Readable (cloned, `main` fetched)                                                                                                                                                                                         |
| Template repo                 | `MohamedDjoudir/landing-page-template-3` cloned (MIT, `LICENSE` © 2025 NOVA)                                                                                                                                              |

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

## 2026-10-21 — Session 1 (continued): PR 1, tooling

Proposal approved with these choices: **Arvand Partners**, light theme as the
default, Tailwind v4, latest Next.js. Other decisions from the proposal stand
(Persian replaces Arabic, drop pricing / integrations / FAQ, drop middleware).

Done in the tooling step (no restructure, no rebrand yet):

- Copied Nova (`src`, `messages`, `public`, configs) without history; MIT text
  in `third-party/NOVA-LICENSE`, credit in `LICENSE-THIRD-PARTY.md`.
- Yarn replaced by pnpm 10 (`packageManager`, `.nvmrc` = 22, `.npmrc`).
- Next 15.2.8 → 16.4.2, React 19.3.1, TypeScript kept at 5.9.3 (TS 7 is too
  new for the ecosystem), ESLint 10 flat config, Prettier with the Tailwind
  plugin.
- Tailwind 3.4 → 4.3.3: `tailwind.config.ts` removed, theme moved into
  `@theme inline` in `globals.css`, `tw-animate-css` replaces
  `tailwindcss-animate`, renamed utilities updated (`shadow-sm` → `shadow-xs`,
  `blur-sm` → `blur-xs`, `outline-none` → `outline-hidden`, `flex-grow` →
  `grow`, `bg-gradient-to-*` → `bg-linear-to-*`, and so on).
- Removed the `BUILD_STANDALONE` Docker option from `next.config.mjs` (static
  export comes later).
- Fixed the one new `react-hooks/set-state-in-effect` lint error with
  `useSyncExternalStore`.
- Added CI (`lint`, `format:check`, `typecheck`, `build`).
- Checked: `lint`, `format:check`, `typecheck`, `build` pass; screenshots of
  `/en` match the original apart from a thin header border.

Known leftovers for later PRs:

- `lucide-react` pinned to 0.454.0: newer versions removed brand icons
  (`Twitter`, `Github`, …) used in the footer; replace with own SVGs in the
  rebrand.
- `src/middleware.ts` still exists (Next 16 calls it "proxy"); removed in the
  static-export / Persian PR.
- Dark theme is still the look of the template; light default comes with the
  rebrand.
- `main` does not exist on the remote (empty repo), so a PR cannot be opened yet.
