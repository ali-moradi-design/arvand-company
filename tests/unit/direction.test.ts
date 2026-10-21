import { describe, expect, it } from "vitest";
import { getDirection } from "@/shared/i18n/direction";
import { routing } from "@/shared/i18n/routing";

describe("getDirection", () => {
  it("is rtl for Persian and ltr for English", () => {
    expect(getDirection("fa")).toBe("rtl");
    expect(getDirection("en")).toBe("ltr");
  });

  it("covers every configured locale", () => {
    for (const locale of routing.locales) {
      expect(["ltr", "rtl"]).toContain(getDirection(locale));
    }
  });
});
