import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import fa from "../../messages/fa.json";

type Json = string | number | Json[] | { [key: string]: Json };

function paths(value: Json, prefix = ""): string[] {
  if (Array.isArray(value))
    return [
      `${prefix}[${value.length}]`,
      ...value.flatMap((v, i) => paths(v, `${prefix}[${i}]`)),
    ];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, v]) =>
      paths(v, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function strings(value: Json): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("messages", () => {
  it("English and Persian have exactly the same keys", () => {
    expect(paths(fa).sort()).toEqual(paths(en).sort());
  });

  it("has no empty strings", () => {
    for (const text of [...strings(en), ...strings(fa)]) expect(text.trim()).not.toBe("");
  });

  it("uses Persian digits, not Latin digits, in Persian text", () => {
    const offenders = strings(fa).filter((text) =>
      /[0-9]/.test(text.replace(/\{[^}]*\}/g, "")),
    );
    expect(offenders).toEqual([]);
  });
});
