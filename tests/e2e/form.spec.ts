import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type Route } from "@playwright/test";

// These tests run against out-form/, built with
// NEXT_PUBLIC_FORM_ENDPOINT=https://forms.example.test/api/forms/contact/responses
// and a 1.5 s timeout. The endpoint is mocked with page.route.
const ENDPOINT = "https://forms.example.test/**";
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, accept",
  "access-control-allow-methods": "POST, OPTIONS",
};

async function mock(
  page: Page,
  handler: (route: Route, body: Record<string, unknown>) => unknown,
) {
  const requests: Record<string, unknown>[] = [];
  await page.route(ENDPOINT, async (route) => {
    if (route.request().method() === "OPTIONS") {
      return route.fulfill({ status: 204, headers: CORS });
    }
    const body = route.request().postDataJSON();
    requests.push(body);
    return handler(route, body);
  });
  return requests;
}

const json = (route: Route, status: number, body?: unknown) =>
  route.fulfill({
    status,
    headers: { ...CORS, "content-type": "application/json" },
    body: body === undefined ? "" : JSON.stringify(body),
  });

async function fill(page: Page, locale: "en" | "fa" = "en") {
  const l =
    locale === "en"
      ? {
          name: "Full name",
          email: "Email",
          topic: "Topic",
          message: "How can we help?",
          send: "Send message",
        }
      : {
          name: "نام و نام خانوادگی",
          email: "ایمیل",
          topic: "موضوع",
          message: "چگونه می‌توانیم کمک کنیم؟",
          send: "ارسال پیام",
        };
  await page.getByLabel(l.name).fill("Ada Lovelace");
  await page.getByLabel(l.email).fill("ada@example.com");
  await page.getByLabel(l.topic).selectOption({ index: 2 });
  await page.getByLabel(l.message).fill("We need a design review.");
  return page.getByRole("button", { name: l.send });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/en/contact/");
});

test("sends JSON to the endpoint, shows success and resets the form", async ({
  page,
}) => {
  const requests = await mock(page, (route) => json(route, 201, { id: "r1" }));
  const send = await fill(page);
  await send.click();

  await expect(page.getByRole("status")).toContainText("We received your message");
  await expect(page.getByLabel("Full name")).toHaveValue("");
  expect(requests).toHaveLength(1);
  expect(requests[0]).toMatchObject({
    values: {
      name: "Ada Lovelace",
      email: "ada@example.com",
      topic: "Engineering review",
      message: "We need a design review.",
    },
    locale: "en",
  });
});

test("shows the Persian success message and sends the locale", async ({ page }) => {
  await page.goto("/fa/contact/");
  const requests = await mock(page, (route) => json(route, 200));
  const send = await fill(page, "fa");
  await send.click();
  await expect(page.getByRole("status")).toContainText("پیام شما رسید");
  expect(requests[0].locale).toBe("fa");
});

test("shows field errors from a 422 response and focuses the first one", async ({
  page,
}) => {
  await mock(page, (route) =>
    json(route, 422, {
      errors: { email: "This address looks invalid", message: ["Too short"] },
    }),
  );
  const send = await fill(page);
  await send.click();

  const email = page.getByLabel("Email");
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("This address looks invalid")).toBeVisible();
  await expect(page.getByText("Too short")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("check the highlighted fields");
  // Errors disappear on the next attempt.
  await page.unroute(ENDPOINT);
  await mock(page, (route) => json(route, 201));
  await send.click();
  await expect(page.getByText("This address looks invalid")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("We received your message");
});

test("explains a rate limit", async ({ page }) => {
  await mock(page, (route) => json(route, 429));
  await (await fill(page)).click();
  await expect(page.getByRole("status")).toContainText("Too many messages");
});

test("keeps the form and allows a retry after a server error", async ({ page }) => {
  let calls = 0;
  const requests = await mock(page, (route) =>
    ++calls === 1 ? json(route, 500) : json(route, 201),
  );
  const send = await fill(page);
  await send.click();
  await expect(page.getByRole("status")).toContainText(
    "something went wrong on our side",
  );
  await expect(page.getByLabel("Full name")).toHaveValue("Ada Lovelace");
  await expect(send).toBeEnabled();

  await send.click();
  await expect(page.getByRole("status")).toContainText("We received your message");
  expect(requests).toHaveLength(2);
});

test("reports a network failure", async ({ page }) => {
  await page.route(ENDPOINT, (route) =>
    route.request().method() === "OPTIONS"
      ? route.fulfill({ status: 204, headers: CORS })
      : route.abort("failed"),
  );
  await (await fill(page)).click();
  await expect(page.getByRole("status")).toContainText("could not reach the server");
});

test("reports a timeout when the endpoint never answers", async ({ page }) => {
  await page.route(ENDPOINT, (route) =>
    route.request().method() === "OPTIONS"
      ? route.fulfill({ status: 204, headers: CORS })
      : new Promise(() => {}),
  );
  const send = await fill(page);
  await send.click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("took too long", {
    timeout: 6000,
  });
  await expect(send).toBeEnabled();
});

test("sends only one request when the button is pressed twice quickly", async ({
  page,
}) => {
  const requests = await mock(page, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return json(route, 201);
  });
  const send = await fill(page);
  await send.dblclick();
  await expect(page.getByRole("status")).toContainText("We received your message");
  expect(requests).toHaveLength(1);
});

test("does not send anything when the hidden honeypot field is filled", async ({
  page,
}) => {
  const requests = await mock(page, (route) => json(route, 201));
  const send = await fill(page);
  await page.evaluate(() => {
    (document.querySelector('input[name="website"]') as HTMLInputElement).value = "spam";
  });
  await send.click();
  await page.waitForTimeout(300);
  expect(requests).toHaveLength(0);
});

test("the error state has no accessibility violations", async ({ page }) => {
  await mock(page, (route) =>
    json(route, 422, { errors: { email: "This address looks invalid" } }),
  );
  await (await fill(page)).click();
  await expect(page.getByText("This address looks invalid")).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
