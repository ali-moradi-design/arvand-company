// Latin digits in English, Persian digits in Persian. Dates are Gregorian in
// both languages (the Persian locale defaults to the Solar Hijri calendar).
const INTL_LOCALE: Record<string, string> = {
  en: "en-US",
  fa: "fa-IR-u-ca-gregory",
};

const intlLocale = (locale: string) => INTL_LOCALE[locale] ?? INTL_LOCALE.en;

export function formatNumber(locale: string, value: number): string {
  return new Intl.NumberFormat(intlLocale(locale), { useGrouping: false }).format(value);
}

export function formatDate(locale: string, isoDate: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
