import { describe, expect, it } from "vitest";
import { pageMetadata } from "@/shared/seo/metadata";

describe("pageMetadata", () => {
  const meta = pageMetadata({
    locale: "fa",
    path: "/services/",
    title: "خدمات",
    description: "توضیح",
  });

  it("sets a locale-prefixed canonical URL", () => {
    expect(meta.alternates?.canonical).toBe("/fa/services/");
  });

  it("lists every language plus x-default for hreflang", () => {
    expect(meta.alternates?.languages).toEqual({
      en: "/en/services/",
      fa: "/fa/services/",
      "x-default": "/en/services/",
    });
  });

  it("uses the per-language Open Graph image by default", () => {
    expect(meta.openGraph?.images).toEqual([
      { url: "/og-fa.png", width: 1200, height: 630, alt: "خدمات" },
    ]);
  });

  it("maps the home path to the locale root", () => {
    const home = pageMetadata({ locale: "en", path: "/", title: "t", description: "d" });
    expect(home.alternates?.canonical).toBe("/en/");
  });
});
