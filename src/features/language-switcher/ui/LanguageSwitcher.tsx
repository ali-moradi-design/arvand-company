"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, routing, usePathname } from "@/shared/i18n";

const LABELS: Record<string, string> = { en: "English", fa: "فارسی" };

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");
  const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <Link
      href={pathname}
      locale={other}
      lang={other}
      hrefLang={other}
      aria-label={t("switchLanguage", { language: LABELS[other] })}
      className="hover:bg-muted inline-flex h-10 items-center rounded-md px-3 text-sm font-medium"
    >
      {LABELS[other]}
    </Link>
  );
}
