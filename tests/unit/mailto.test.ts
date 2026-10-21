import { describe, expect, it } from "vitest";
import { buildMailto } from "@/features/contact-form/lib/mailto";

describe("buildMailto", () => {
  const data = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    company: "Analytical Ltd",
    topic: "Engineering review",
    message: "Hello & welcome?\nSecond line",
  };

  it("targets the recipient and encodes subject and body", () => {
    const url = buildMailto("hello@arvand-partners.example", data);
    expect(url.startsWith("mailto:hello@arvand-partners.example?subject=")).toBe(true);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Engineering review — Ada Lovelace");
    expect(params.get("body")).toContain("Hello & welcome?\nSecond line");
    expect(params.get("body")).toContain("Ada Lovelace, Analytical Ltd");
    expect(params.get("body")).toContain("ada@example.com");
  });

  it("omits the company when empty", () => {
    const url = buildMailto("a@b.example", { ...data, company: "" });
    const body = new URLSearchParams(url.split("?")[1]).get("body");
    expect(body).toContain("\nAda Lovelace\n");
  });
});
