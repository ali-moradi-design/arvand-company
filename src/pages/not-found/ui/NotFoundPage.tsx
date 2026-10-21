import { useTranslations } from "next-intl";
import { ButtonLink, Section } from "@/shared/ui";

export function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <Section className="min-h-[60vh]">
      <p className="text-teal text-sm font-semibold">404</p>
      <h1 className="mt-3 text-4xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-lg">{t("text")}</p>
      <ButtonLink href="/" className="mt-8">
        {t("back")}
      </ButtonLink>
    </Section>
  );
}
