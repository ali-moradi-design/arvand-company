# Proposal (awaiting approval)

## 1. Fictional company: three options

All names are invented; run no trademark search, but do not use them outside
this demo. Target clients: Türkiye and the Middle East. Bilingual EN / FA.

### A. Arvand Partners — engineering and project consulting
- Idea: "Arvand" is a river name in Persian; a firm that guides large projects.
- Colors: deep navy `#0F2A47`, river teal `#1F8A8C`, warm sand `#E9DFCB`,
  ink `#101820`, accent copper `#C8743A`.
- Logo idea: a wordmark with an "A" built from two converging flow lines
  (a river forking), copper dot as the source.

### B. Bosphor Freight — logistics and customs brokerage
- Idea: Istanbul gateway between Europe and the Middle East.
- Colors: marine blue `#0B3C5D`, signal orange `#F28C28`, cool gray `#E8EDF2`,
  white, graphite `#1B1F24`.
- Logo idea: a shipping container seen from the side whose door lines form a
  "B"; orange accent on one panel.

### C. Sahand Atelier — architecture and interior studio
- Idea: Sahand is a mountain in the region; calm, mineral, premium.
- Colors: stone `#EFEBE4`, charcoal `#22252A`, olive `#6B7A4B`,
  terracotta `#B5563A`, off-white `#FBFAF7`.
- Logo idea: a mountain silhouette drawn as a single architectural section
  line, with the name set in a light serif.

Recommendation: **A (Arvand Partners)**. Consulting gives the most natural
set of pages (services, case studies, team, blog), the navy/teal palette works
in light and dark, and it keeps real contrast for Persian text.

## 2. Page list (static export, `/en/...` and `/fa/...`)

| Route | Content |
| --- | --- |
| `/` | Redirect to `/en` (static page, no middleware) |
| `/{locale}` | Home: hero, key numbers, services preview, case studies preview, testimonials, blog preview, CTA |
| `/{locale}/services` | Services list |
| `/{locale}/services/[slug]` | Service detail (3 to 4 services) |
| `/{locale}/projects` | Case studies list with filter |
| `/{locale}/projects/[slug]` | Case study detail (4 to 6 projects) |
| `/{locale}/about` | Story, values, timeline |
| `/{locale}/team` | Team grid (fictional people, generated avatars) |
| `/{locale}/blog` | Post list |
| `/{locale}/blog/[slug]` | MDX post (3 posts per language) |
| `/{locale}/contact` | Form to `form-builder` (mailto fallback), map-free address block |
| `404` | Localized not-found |

Also: `sitemap.xml`, `robots.txt`, `hreflang`, Organization JSON-LD, OG images.
Nova sections not kept: pricing, integrations, FAQ (maybe one FAQ on contact).

## 3. FSD layout

Next.js needs a root `app/` for routing; the FSD `app` layer lives in `src/`.
Route files only import from `src/pages` and contain no logic.

```
app/                         Next routes (thin): [locale]/..., layout, sitemap
src/
  app/                       providers, global styles, i18n setup, fonts
  pages/                     home, services, service-detail, projects,
                             project-detail, about, team, blog, post, contact
  widgets/                   header, footer, hero, services-grid,
                             projects-grid, team-grid, testimonials, cta
  features/                  language-switcher, theme-toggle, contact-form,
                             projects-filter, mobile-menu
  entities/                  service, project, person, post, testimonial
  shared/                    ui (button, section, container...), lib, config,
                             i18n, seo, assets
content/                     MDX posts and structured data per locale
messages/                    en.json, fa.json
```

Rules enforced with Steiger (layers import only downward, public API through
`index.ts`). Template components map as: `Reveal`, `GradientButton`,
`SectionHeader` to `shared/ui`; `Header`, `Footer` to `widgets`;
`LocaleSwitcher` to `features/language-switcher`; the home sections are
rewritten, not ported.

## 4. Technical decisions to confirm

1. Replace Arabic with Persian (`fa`), Vazirmatn, Persian digits in `fa`.
2. Drop middleware; static root redirect; `images.unoptimized`.
3. Tailwind: the template is on v3.4, the brief says v4. Proposal: move to
   v4 in the tooling PR (CSS-first config, simpler theme tokens).
4. Theme: Nova is dark only in practice. Proposal: light by default with an
   optional dark mode (`next-themes` already present).
5. Next 16 upgrade in PR 1 together with pnpm, ESLint flat config, Prettier.
