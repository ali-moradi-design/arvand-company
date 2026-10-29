import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");
const withMDX = createMDX();

// The site runs as a Next.js server in a container (output: "standalone"),
// behind Nginx on the VPS. Only the build output goes into the image.
const security = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // `/en/about/` style URLs, as before
  trailingSlash: true,
  // Images are pre-sized in `public/images` and still go through `next/image`
  // for lazy loading, `sizes` and no layout shift.
  images: { unoptimized: true },
  poweredByHeader: false,
  // Nginx on the server gzips responses: no second compression in Node
  compress: false,
  // A real HTTP redirect now that there is a server.
  async redirects() {
    return [{ source: "/", destination: "/en/", permanent: false }];
  },
  async headers() {
    return [{ source: "/:path*", headers: security }];
  },
  pageExtensions: ["ts", "tsx"],
};

export default withNextIntl(withMDX(nextConfig));
