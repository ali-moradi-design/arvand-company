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

## 2026-10-21 — PR 2: static export, FSD, Persian, new pages, rebrand

Because Nova is a SaaS landing page, the content was rewritten rather than
ported. What came from Nova: the project skeleton and configuration ideas
(App Router + `next-intl`, theme provider, `cva` buttons, CSS variable tokens).

- `output: 'export'` with `trailingSlash` and `images.unoptimized`; middleware
  removed. `/` is a prerendered redirect to `/en/`. `next/image` is still used
  everywhere (lazy loading, `sizes`, `priority` for the hero, no layout shift)
  but images are pre-sized in `public/images` because the optimizer needs a
  server.
- Locale `ar` replaced by `fa`: RTL via `dir`, Vazirmatn, Persian digits in
  Persian text and in formatted numbers (`formatNumber`), Gregorian dates
  (`fa-IR-u-ca-gregory`), logical CSS (`ps-`, `ms-`, `start-`, `rtl:` only for
  arrows).
- FSD: layers in `src/` and routes in root `app/`; empty root `pages/` so Next
  ignores `src/pages`. Steiger passes (`pnpm steiger`).
- Pages: home, services (+4 details), projects (+6 details, sector filter),
  about, team, blog (+3 MDX posts per language), contact (FAQ, form with
  endpoint or `mailto:` fallback), localized and global 404.
- SEO: metadata per page, `hreflang` alternates, Organization JSON-LD,
  `sitemap.xml` with alternates, `robots.txt`, per-language Open Graph images,
  manifest, icons.
- Rebrand to Arvand Partners: navy / teal / sand / copper tokens, light theme by
  default with an optional dark theme, SVG logo, monogram avatars for the
  fictional team, fictional-company notice in the footer.
- Removed dependencies no longer used: `framer-motion`, `embla-carousel-react`,
  Radix accordion and tabs, `@emotion/is-prop-valid`. Added `@next/mdx`.
- Checked: `pnpm check`, `pnpm build`; 60 screenshots (2 languages x 10 pages x
  3 widths) with no console errors and no horizontal overflow; theme toggle,
  mobile menu and the project filter tried by hand in a browser.

### Tests (same PR)

- Vitest: 16 tests (formatting, `mailto:`, direction, metadata, message parity).
- Playwright: 93 passing tests on desktop and mobile viewports; axe found two
  real problems on the first run, both fixed: contrast of the teal eyebrow text
  on the sand background (teal darkened) and a logo link whose accessible name
  was "ArvandPartners" (missing space) / mismatched its `aria-label`.
- CI now also runs Steiger, unit tests, the build and the Playwright suite.
