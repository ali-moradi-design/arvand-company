import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { LOCALES, PATHS } from "./routes";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const locale of LOCALES) {
  for (const path of PATHS) {
    test(`axe: /${locale}/${path}`, async ({ page }) => {
      await page.goto(`/${locale}/${path}`);
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      expect(
        results.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`,
        ),
      ).toEqual([]);
    });
  }
}

test("axe: dark theme on the home page and the contact form", async ({ page }) => {
  for (const path of ["/en/", "/fa/contact/"]) {
    await page.goto(path);
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`,
      ),
      path,
    ).toEqual([]);
  }
});
