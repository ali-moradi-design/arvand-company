import { defineConfig, devices } from "@playwright/test";

// Tests run against the static build (`pnpm build`) served from `out/`.
// Set PW_CHROMIUM_PATH to use an already installed Chromium instead of the
// one downloaded by `playwright install`.
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;
const launchOptions = { executablePath, args: ["--no-sandbox"] };

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL: "http://localhost:3100", trace: "retain-on-failure" },
  // `out/` is the normal build; `out-form/` is built with a form endpoint
  // (`pnpm build:e2e` makes both) and is only used by tests/e2e/form.spec.ts.
  webServer: [
    {
      command: "pnpm preview",
      url: "http://localhost:3100/en/",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "pnpm preview:form",
      url: "http://localhost:3101/en/",
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    {
      name: "desktop",
      testIgnore: /form\.spec/,
      use: { ...devices["Desktop Chrome"], launchOptions },
    },
    {
      name: "mobile",
      testIgnore: /form\.spec/,
      use: { ...devices["Pixel 7"], launchOptions },
    },
    {
      name: "form",
      testMatch: /form\.spec/,
      use: {
        ...devices["Desktop Chrome"],
        launchOptions,
        baseURL: "http://localhost:3101",
      },
    },
  ],
});
