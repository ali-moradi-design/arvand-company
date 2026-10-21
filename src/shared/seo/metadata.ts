import type { Metadata } from "next";
import { SITE_URL } from "../config";
import { routing } from "../i18n/routing";

type PageMetadataInput = {
  locale: string;
  /** Path without the locale, e.g. "/services/". Use "/" for the home page. */
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

const withLocale = (locale: string, path: string) =>
  `/${locale}${path === "/" ? "/" : path}`;

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
}: PageMetadataInput): Metadata {
  const ogImage = image ?? `/og-${locale}.png`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: withLocale(locale, path),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, withLocale(l, path)])),
        "x-default": withLocale(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description,
      type,
      url: withLocale(locale, path),
      locale: locale === "fa" ? "fa_IR" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
