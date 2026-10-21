# Company site: brief

Decisions from 2026-10-21. Demo 6 in notes/demos.md. Built in the public repo
`ali-moradi-design/company-site` (created by the user) in its own sessions;
this file is the handoff and is safe to make public.

## Decisions

- A FICTIONAL company (name and brand chosen at session start; suggest 3 names).
  Industry suggestion: consulting / architecture / logistics, aimed at clients in
  Türkiye and the Middle East. No real company names, logos or people.
- Bilingual: English and Persian (Persian RTL). Logical CSS, Vazirmatn for
  Persian, Persian digits in Persian, Latin digits in English, Gregorian dates.
- Static site (roadmap phase 7 deploy): Next.js static export. Subdomain
  `company-site.ali-moradi-develop.com`.
- Do not build from scratch: start from a ready open-source template.

## Starting point

- Base: "Nova" business / case-studies template,
  https://github.com/MohamedDjoudir/landing-page-template-3 (MIT, checked
  2026-10-21; Next.js 15 App Router, TypeScript, Tailwind v4, next-intl,
  Framer Motion, Radix, Embla). It already has English + Arabic with RTL
  (`/en`, `/ar`, `dir` from the locale): replace Arabic with Persian.
- Backup base if Nova does not work out: TailNext,
  https://github.com/arthelokyo/tailnext (MIT; more pages, no i18n).
- Copy the code without history. Keep the original MIT license text and credit
  in `LICENSE-THIRD-PARTY.md` (or a NOTICE section in the README).
- Replace every demo image and font with assets we may use (Unsplash, Google
  Fonts, Vazirmatn); list them in `CREDITS.md`.

## Target stack

- Next.js 16 App Router, TypeScript strict, pnpm (replace Yarn), ESLint +
  Prettier, Feature-Sliced Design checked with Steiger.
- next-intl kept for i18n; `output: 'export'` for the static build.
- Tests: Vitest for helpers; Playwright E2E (both languages, RTL layout, contact
  form, navigation) + axe. CI on GitHub Actions with one required check on `main`.

## Pages

- Already in Nova (single long page): hero, case studies, team, contact.
- To add as routes: services (list + detail), projects / case studies (list +
  detail), about, team, simple blog (MDX, a few posts in both languages),
  contact.
- Contact form: posts to the user's own `form-builder` project (hosted form or
  embed), so the static site needs no server. If form-builder is not deployed
  yet, a temporary mailto fallback.
- SEO: metadata per language, `hreflang`, Organization JSON-LD, sitemap, OG images.

## How the build session starts

1. Check prerequisites: `git`, `node` (LTS), `pnpm`, Playwright runs; the folder
   is a clean clone of `company-site`; GitHub access; the template repo is
   readable.
2. Copy this brief into the repo as `docs/brief.md`.
3. Run the template as it is, take screenshots, and propose: the fictional brand
   (names, colors, logo idea), the page list and the FSD layout. Wait for approval.
4. Convert step by step in small PRs (branch → PR → CI → squash merge): tooling
   (pnpm, ESLint, Prettier, Next 16), FSD restructure, Persian, new pages,
   rebrand, tests. Explain each step.

Language rules: explain in Persian, every English term inside parentheses and
backticks, never start a line with an English word, repo files in English.
