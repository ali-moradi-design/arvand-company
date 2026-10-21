import { useTranslations } from "next-intl";
import { ButtonLink, Section } from "@/shared/ui";

export function CtaBand() {
  const t = useTranslations("home.cta");

  return (
    <Section tone="dark">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-balance sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-lg opacity-85">{t("description")}</p>
        </div>
        <ButtonLink href="/contact/" size="lg">
          {t("button")}
        </ButtonLink>
      </div>
    </Section>
  );
}
