import type { ContactMessage } from "./mailto";

export const FIELD_NAMES = ["name", "email", "company", "topic", "message"] as const;
export type FieldName = (typeof FIELD_NAMES)[number];

export type SubmitResult =
  | { status: "success" }
  | { status: "invalid"; fieldErrors: Partial<Record<FieldName, string>> }
  | { status: "rate-limited" }
  | { status: "server-error" }
  | { status: "network-error" }
  | { status: "timeout" };

type SubmitOptions = {
  endpoint: string;
  data: ContactMessage;
  locale: string;
  timeoutMs: number;
  fetchImpl?: typeof fetch;
};

const isFieldName = (value: string): value is FieldName =>
  (FIELD_NAMES as readonly string[]).includes(value);

const firstMessage = (value: unknown): string | undefined => {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.find((item): item is string => typeof item === "string");
  return undefined;
};

// Accepts `{ errors: { email: "msg" | ["msg"] } }` and
// `{ errors: [{ field: "email", message: "msg" }] }`. Unknown fields are ignored; a
// known field without a message gets an empty string (the form shows a default).
export function parseFieldErrors(body: unknown): Partial<Record<FieldName, string>> {
  const errors = (body as { errors?: unknown } | null)?.errors;
  const pairs: [string, string | undefined][] = Array.isArray(errors)
    ? errors.map((item) => [String(item?.field ?? ""), firstMessage(item?.message)])
    : errors && typeof errors === "object"
      ? Object.entries(errors).map(([field, value]) => [field, firstMessage(value)])
      : [];

  const result: Partial<Record<FieldName, string>> = {};
  for (const [field, message] of pairs) {
    if (isFieldName(field) && !(field in result)) result[field] = message ?? "";
  }
  return result;
}

export async function submitContact({
  endpoint,
  data,
  locale,
  timeoutMs,
  fetchImpl = fetch,
}: SubmitOptions): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, locale }),
      signal: controller.signal,
    });

    if (response.ok) return { status: "success" };
    if (response.status === 429) return { status: "rate-limited" };
    if (response.status === 400 || response.status === 422) {
      const body = await response.json().catch(() => null);
      return { status: "invalid", fieldErrors: parseFieldErrors(body) };
    }
    return { status: "server-error" };
  } catch {
    return { status: controller.signal.aborted ? "timeout" : "network-error" };
  } finally {
    clearTimeout(timer);
  }
}
