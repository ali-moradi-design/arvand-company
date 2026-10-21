import { useLocale, useTranslations } from "next-intl";
import { formatNumber } from "@/shared/i18n";
import { Container } from "@/shared/ui";

const STATS = [
  { key: "projects", value: 140, suffix: "+" },
  { key: "countries", value: 9, suffix: "" },
  { key: "years", value: 18, suffix: "" },
  { key: "specialists", value: 65, suffix: "+" },
] as const;

export function Stats() {
  const t = useTranslations("home.stats");
  const locale = useLocale();

  return (
    <section aria-label={t("label")} className="bg-surface border-b">
      <Container>
        <dl className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.key} className="text-center">
              <dd className="text-primary text-3xl font-bold sm:text-4xl">
                <bdi>
                  {formatNumber(locale, stat.value)}
                  {stat.suffix}
                </bdi>
              </dd>
              <dt className="text-muted-foreground mt-1 text-sm">{t(stat.key)}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
