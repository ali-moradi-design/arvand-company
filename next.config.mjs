import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site: `pnpm build` writes the deployable files to `out/`.
  output: "export",
  // Each page becomes `<route>/index.html`, which Nginx serves without rewrites.
  trailingSlash: true,
  // The image optimizer needs a server. Images are pre-sized in `public/images`
  // and still go through `next/image` for lazy loading, `sizes` and no layout shift.
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx"],
};

export default withNextIntl(withMDX(nextConfig));
