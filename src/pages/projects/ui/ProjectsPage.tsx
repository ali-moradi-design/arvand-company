import { useTranslations } from "next-intl";
import { ProjectsFilter } from "@/features/projects-filter";
import { CtaBand } from "@/widgets/cta-band";
import { PageHero } from "@/widgets/page-hero";
import { Section } from "@/shared/ui";

export function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Section>
        <ProjectsFilter />
      </Section>
      <CtaBand />
    </>
  );
}
