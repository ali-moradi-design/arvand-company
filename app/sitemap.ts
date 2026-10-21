import type { MetadataRoute } from "next";
import { POSTS } from "@/entities/post";
import { PROJECTS } from "@/entities/project";
import { SERVICES } from "@/entities/service";
import { SITE_URL } from "@/shared/config";
import { routing } from "@/shared/i18n";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "/",
  "/services/",
  "/projects/",
  "/about/",
  "/team/",
  "/blog/",
  "/contact/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...SERVICES.map((item) => `/services/${item.slug}/`),
    ...PROJECTS.map((item) => `/projects/${item.slug}/`),
    ...POSTS.map((item) => `/blog/${item.slug}/`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
