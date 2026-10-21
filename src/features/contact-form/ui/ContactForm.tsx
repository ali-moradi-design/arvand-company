"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { CONTACT, FORM_ENDPOINT } from "@/shared/config";
import { Button } from "@/shared/ui";
import { buildMailto, type ContactMessage } from "../lib/mailto";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "bg-surface mt-1.5 block w-full rounded-md border px-3 py-2.5 text-base focus-visible:outline-2";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const topics = t.raw("topics") as string[];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

    if (!FORM_ENDPOINT) {
      window.location.href = buildMailto(CONTACT.email, data);
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t("name")}
          <input
            name="name"
            required
            autoComplete="name"
            dir="auto"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium">
          {t("email")}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            className={fieldClass}
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t("company")}
          <input
            name="company"
            autoComplete="organization"
            dir="auto"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium">
          {t("topic")}
          <select name="topic" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              {t("topicPlaceholder")}
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">
        {t("message")}
        <textarea name="message" required rows={6} dir="auto" className={fieldClass} />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("send")}
        </Button>
        <p id="form-status" role="status" className="text-sm">
          {status === "success" ? t(FORM_ENDPOINT ? "success" : "successMailto") : null}
          {status === "error" ? <span className="text-copper">{t("error")}</span> : null}
        </p>
      </div>
    </form>
  );
}
