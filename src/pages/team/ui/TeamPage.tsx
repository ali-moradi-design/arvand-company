import { useTranslations } from "next-intl";
import { CtaBand } from "@/widgets/cta-band";
import { PageHero } from "@/widgets/page-hero";
import { TeamGrid } from "@/widgets/team-grid";
import { Section } from "@/shared/ui";

export function TeamPage() {
  const t = useTranslations("team");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Section>
        <TeamGrid />
      </Section>
      <CtaBand />
    </>
  );
}
