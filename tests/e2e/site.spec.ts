import { expect, test } from "@playwright/test";

test.describe("languages and layout", () => {
  test("root redirects to the English home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/$/);
  });

  test("English page is ltr with Latin digits", async ({ page }) => {
    await page.goto("/en/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "en");
    await expect(html).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "We guide complex projects",
    );
    await expect(page.getByText("140+")).toBeVisible();
  });

  test("Persian page is rtl with Persian digits and Vazirmatn", async ({ page }) => {
    await page.goto("/fa/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "fa");
    await expect(html).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "پروژه‌های پیچیده",
    );
    await expect(page.getByText("۱۴۰+")).toBeVisible();
    const family = await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family.toLowerCase()).toContain("vazirmatn");
  });

  test("the logo sits at the start edge: left in English, right in Persian", async ({
    page,
  }) => {
    const viewport = page.viewportSize()!;
    await page.goto("/en/");
    const en = await page
      .getByRole("link", { name: "Arvand Partners" })
      .first()
      .boundingBox();
    expect(en!.x + en!.width / 2).toBeLessThan(viewport.width / 2);

    await page.goto("/fa/");
    const fa = await page
      .getByRole("link", { name: "آروند پارتنرز" })
      .first()
      .boundingBox();
    expect(fa!.x + fa!.width / 2).toBeGreaterThan(viewport.width / 2);
  });

  test("the language switcher keeps the current page", async ({ page }) => {
    await page.goto("/en/services/");
    await page.getByRole("link", { name: "Switch language to فارسی" }).click();
    await expect(page).toHaveURL(/\/fa\/services\/$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await page
      .getByRole("link", { name: /Switch language to English|تغییر زبان به English/ })
      .click();
    await expect(page).toHaveURL(/\/en\/services\/$/);
  });

  test("the page does not scroll sideways in either language", async ({ page }) => {
    for (const path of ["/en/", "/fa/", "/en/projects/", "/fa/contact/"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });

  test("unknown URLs show the 404 page", async ({ request }) => {
    const response = await request.get("/en/does-not-exist/");
    expect(response.status()).toBe(404);
  });
});

test.describe("navigation", () => {
  test("navigates to a project and back", async ({ page, isMobile }) => {
    await page.goto("/en/");
    if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Projects", exact: true }).first().click();
    await expect(page).toHaveURL(/\/en\/projects\/$/);
    await page.getByRole("link", { name: "Marmara Logistics Hub" }).click();
    await expect(page).toHaveURL(/marmara-logistics-hub\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Marmara Logistics Hub",
    );
    await page.getByRole("link", { name: /All projects/ }).click();
    await expect(page).toHaveURL(/\/en\/projects\/$/);
  });

  test("the mobile menu opens, marks the current page and closes", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/en/about/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("the project filter narrows the list", async ({ page }) => {
    await page.goto("/en/projects/");
    await expect(page.getByRole("status")).toHaveText("6 projects shown");
    await page.getByRole("button", { name: "Real estate" }).click();
    await expect(page.getByRole("status")).toHaveText("3 projects shown");
    await expect(page.getByRole("button", { name: "Real estate" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await page.getByRole("button", { name: "All" }).click();
    await expect(page.getByRole("status")).toHaveText("6 projects shown");
  });

  test("the Persian project filter shows Persian digits", async ({ page }) => {
    await page.goto("/fa/projects/");
    await expect(page.getByRole("status")).toContainText("۶ پروژه");
  });

  test("the blog renders MDX posts in both languages", async ({ page }) => {
    await page.goto("/en/blog/project-delays-start-early/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "decided in the first month",
    );
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
    await page.goto("/fa/blog/project-delays-start-early/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ماه اول");
  });
});

test.describe("theme", () => {
  test("light is the default and the toggle switches to dark", async ({ page }) => {
    await page.goto("/en/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(html).toHaveClass(/dark/);
    await expect(
      page.getByRole("button", { name: "Switch to light theme" }),
    ).toBeVisible();
  });
});

test.describe("contact form", () => {
  test("requires the mandatory fields", async ({ page }) => {
    await page.goto("/en/contact/");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByLabel("Full name")).toBeFocused();
  });

  test("falls back to mailto while no endpoint is configured", async ({ page }) => {
    await page.goto("/en/contact/");
    await page.getByLabel("Full name").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Topic").selectOption("Engineering review");
    await page.getByLabel("How can we help?").fill("We need a design review.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toContainText("email app should open");
  });

  test("the Persian form has Persian labels", async ({ page }) => {
    await page.goto("/fa/contact/");
    await expect(page.getByLabel("نام و نام خانوادگی")).toBeVisible();
    await expect(page.getByRole("button", { name: "ارسال پیام" })).toBeVisible();
  });
});

test.describe("SEO", () => {
  test("home has hreflang alternates, canonical and JSON-LD", async ({ page }) => {
    await page.goto("/en/services/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/en\/services\/$/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="fa"]')).toHaveAttribute(
      "href",
      /\/fa\/services\/$/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(
      1,
    );
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(JSON.parse(jsonLd!)["@type"]).toBe("Organization");
  });

  test("sitemap and robots are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const xml = await sitemap.text();
    expect(xml).toContain("/fa/projects/marmara-logistics-hub/");
    expect(xml).toContain("hreflang");
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Sitemap:");
  });
});

test.describe("keyboard", () => {
  test("the skip link is the first tab stop and jumps to the content", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard only");
    await page.goto("/en/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("a focused project card shows a visible outline", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard only");
    await page.goto("/en/projects/");
    await page.keyboard.press("Tab");
    const link = page.getByRole("link", { name: "Marmara Logistics Hub" });
    await link.focus();
    const outline = await page
      .locator("article", { has: link })
      .evaluate((el) => getComputedStyle(el).outlineWidth);
    expect(parseFloat(outline)).toBeGreaterThan(0);
  });
});
