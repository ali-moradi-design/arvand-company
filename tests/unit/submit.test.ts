import { describe, expect, it, vi } from "vitest";
import { parseFieldErrors, submitContact } from "@/features/contact-form/lib/submit";

const data = {
  name: "Ada",
  email: "ada@example.com",
  company: "",
  topic: "Engineering review",
  message: "Hello",
};

const respond = (status: number, body?: unknown) =>
  vi.fn(
    async () =>
      new Response(body === undefined ? null : JSON.stringify(body), { status }),
  );

const run = (fetchImpl: typeof fetch, timeoutMs = 1000) =>
  submitContact({
    endpoint: "https://forms.example.test/r",
    data,
    locale: "fa",
    timeoutMs,
    fetchImpl,
  });

describe("submitContact", () => {
  it("posts JSON with the locale and reports success", async () => {
    const fetchImpl = respond(201, { id: "1" });
    expect(await run(fetchImpl as unknown as typeof fetch)).toEqual({
      status: "success",
    });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://forms.example.test/r");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ ...data, locale: "fa" });
  });

  it("maps 422 field errors", async () => {
    const result = await run(
      respond(422, { errors: { email: "Looks invalid" } }) as unknown as typeof fetch,
    );
    expect(result).toEqual({
      status: "invalid",
      fieldErrors: { email: "Looks invalid" },
    });
  });

  it("treats 400 without details as invalid with no field errors", async () => {
    const result = await run(respond(400) as unknown as typeof fetch);
    expect(result).toEqual({ status: "invalid", fieldErrors: {} });
  });

  it("maps 429 to rate-limited and other failures to server-error", async () => {
    expect(await run(respond(429) as unknown as typeof fetch)).toEqual({
      status: "rate-limited",
    });
    expect(await run(respond(500) as unknown as typeof fetch)).toEqual({
      status: "server-error",
    });
    expect(await run(respond(404) as unknown as typeof fetch)).toEqual({
      status: "server-error",
    });
  });

  it("reports a network error when fetch rejects", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });
    expect(await run(fetchImpl as unknown as typeof fetch)).toEqual({
      status: "network-error",
    });
  });

  it("reports a timeout when the request is aborted by the timer", async () => {
    const fetchImpl = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );
    expect(await run(fetchImpl as unknown as typeof fetch, 20)).toEqual({
      status: "timeout",
    });
  });
});

describe("parseFieldErrors", () => {
  it("accepts an object of strings or arrays", () => {
    expect(
      parseFieldErrors({
        errors: { name: ["Required", "Too short"], message: "Too long" },
      }),
    ).toEqual({
      name: "Required",
      message: "Too long",
    });
  });

  it("accepts an array of { field, message }", () => {
    expect(
      parseFieldErrors({ errors: [{ field: "topic", message: "Pick one" }] }),
    ).toEqual({ topic: "Pick one" });
  });

  it("ignores unknown fields and keeps an empty message for known ones", () => {
    expect(parseFieldErrors({ errors: { password: "x", company: 42 } })).toEqual({
      company: "",
    });
  });

  it("returns nothing for malformed bodies", () => {
    expect(parseFieldErrors(null)).toEqual({});
    expect(parseFieldErrors("oops")).toEqual({});
    expect(parseFieldErrors({ errors: "nope" })).toEqual({});
  });
});
