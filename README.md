# company-site

Bilingual (English / Persian) static website for the fictional consulting firm
**Arvand Partners**. A portfolio demo built with Next.js 16 (App Router, static
export), TypeScript, Tailwind CSS v4 and `next-intl`.

Docs: `docs/brief.md` (the original brief), `docs/proposal.md` (approved
proposal), `docs/build-log.md` (what was done, in order).

## Commands

```bash
pnpm install
pnpm dev            # http://localhost:3030
pnpm check          # lint + format check + typecheck + Steiger (FSD)
pnpm build          # static site in out/
pnpm preview        # serve out/ on http://localhost:3100
```

Node 22 (see `.nvmrc`) and pnpm 10.

## Structure

Feature-Sliced Design, checked by Steiger. `app/` holds only Next.js routes;
the layers `app`, `pages`, `widgets`, `features`, `entities` and `shared` live in
`src/`. The empty root `pages/` folder stops Next from treating `src/pages` as
the Pages Router.

Content: UI text in `messages/{en,fa}.json`, blog posts in
`content/blog/{en,fa}/*.mdx`, images in `public/images/`.

## Configuration

| Variable                    | Purpose                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Public URL, used for canonical links, sitemap and Open Graph        |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Where the contact form POSTs JSON. Empty means a `mailto:` fallback |

## Third-party

Based on the MIT-licensed Nova template: `LICENSE-THIRD-PARTY.md`. Photos,
fonts and icons: `CREDITS.md`.
