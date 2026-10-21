"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, type FormEvent } from "react";
import { CONTACT, FORM_ENDPOINT, FORM_TIMEOUT_MS } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { buildMailto, type ContactMessage } from "../lib/mailto";
import {
  FIELD_NAMES,
  submitContact,
  type FieldName,
  type SubmitResult,
} from "../lib/submit";

type Status =
  "idle" | "sending" | "success" | "mailto" | Exclude<SubmitResult["status"], "success">;
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldClass =
  "bg-surface mt-1.5 block w-full rounded-md border px-3 py-2.5 text-base focus-visible:outline-2 aria-[invalid=true]:border-copper";

const ERROR_KEYS = {
  invalid: "errorValidation",
  "rate-limited": "errorRateLimit",
  "server-error": "errorServer",
  "network-error": "errorNetwork",
  timeout: "errorTimeout",
} as const;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const sending = useRef(false);
  const topics = t.raw("topics") as string[];

  const errorId = (field: FieldName) => `error-${field}`;
  const fieldProps = (field: FieldName) => ({
    name: field,
    "aria-invalid": fieldErrors[field] !== undefined ? true : undefined,
    "aria-describedby": fieldErrors[field] !== undefined ? errorId(field) : undefined,
  });
  const fieldError = (field: FieldName) =>
    fieldErrors[field] !== undefined ? (
      <span id={errorId(field)} className="text-copper mt-1 block text-sm">
        {fieldErrors[field] || t("errorFieldFallback")}
      </span>
    ) : null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;

    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("website")) return; // honeypot

    const data: ContactMessage = {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      company: String(values.get("company") ?? ""),
      topic: String(values.get("topic") ?? ""),
      message: String(values.get("message") ?? ""),
    };
    setFieldErrors({});

    if (!FORM_ENDPOINT) {
      window.location.href = buildMailto(CONTACT.email, data);
      setStatus("mailto");
      return;
    }

    sending.current = true;
    setStatus("sending");
    const result = await submitContact({
      endpoint: FORM_ENDPOINT,
      data,
      locale,
      timeoutMs: FORM_TIMEOUT_MS,
    });
    sending.current = false;

    if (result.status === "success") {
      form.reset();
      setStatus("success");
      return;
    }
    if (result.status === "invalid") {
      setFieldErrors(result.fieldErrors);
      const first = FIELD_NAMES.find((field) => result.fieldErrors[field] !== undefined);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
    setStatus(result.status);
  }

  const message =
    status === "success"
      ? t("success")
      : status === "mailto"
        ? t("successMailto")
        : status in ERROR_KEYS
          ? t(ERROR_KEYS[status as keyof typeof ERROR_KEYS])
          : null;
  const isError = status in ERROR_KEYS;

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t("name")}
          <input
            {...fieldProps("name")}
            required
            autoComplete="name"
            dir="auto"
            className={fieldClass}
          />
          {fieldError("name")}
        </label>
        <label className="block text-sm font-medium">
          {t("email")}
          <input
            {...fieldProps("email")}
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            className={fieldClass}
          />
          {fieldError("email")}
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t("company")}
          <input
            {...fieldProps("company")}
            autoComplete="organization"
            dir="auto"
            className={fieldClass}
          />
          {fieldError("company")}
        </label>
        <label className="block text-sm font-medium">
          {t("topic")}
          <select
            {...fieldProps("topic")}
            required
            className={fieldClass}
            defaultValue=""
          >
            <option value="" disabled>
              {t("topicPlaceholder")}
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {fieldError("topic")}
        </label>
      </div>
      <label className="block text-sm font-medium">
        {t("message")}
        <textarea
          {...fieldProps("message")}
          required
          rows={6}
          dir="auto"
          className={fieldClass}
        />
        {fieldError("message")}
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="text-muted-foreground text-sm">{t("privacy")}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("send")}
        </Button>
        <p
          id="form-status"
          role="status"
          className={cn("text-sm", isError && "text-copper font-medium")}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
