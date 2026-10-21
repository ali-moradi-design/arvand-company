import { describe, expect, it } from "vitest";
import { formatDate, formatNumber } from "@/shared/i18n/format";

describe("formatNumber", () => {
  it("uses Latin digits in English", () => {
    expect(formatNumber("en", 2025)).toBe("2025");
    expect(formatNumber("en", 140)).toBe("140");
  });

  it("uses Persian digits in Persian, without grouping", () => {
    expect(formatNumber("fa", 2025)).toBe("۲۰۲۵");
    expect(formatNumber("fa", 140)).toBe("۱۴۰");
  });

  it("falls back to English for unknown locales", () => {
    expect(formatNumber("xx", 7)).toBe("7");
  });
});

describe("formatDate", () => {
  it("formats Gregorian dates in English", () => {
    expect(formatDate("en", "2026-09-18")).toBe("September 18, 2026");
  });

  it("formats Gregorian dates with Persian digits in Persian", () => {
    const text = formatDate("fa", "2026-09-18");
    expect(text).toContain("۲۰۲۶");
    expect(text).toContain("۱۸");
    expect(text).not.toMatch(/[0-9]/);
  });
});
