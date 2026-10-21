import { useTranslations } from "next-intl";
import { CtaBand } from "@/widgets/cta-band";
import { Hero } from "@/widgets/hero";
import { ProcessSteps } from "@/widgets/process-steps";
import { ProjectsPreview } from "@/widgets/projects-preview";
import { ServicesGrid } from "@/widgets/services-grid";
import { Stats } from "@/widgets/stats";
import { TestimonialsList } from "@/widgets/testimonials-section";
import { ButtonLink, Section, SectionHeading } from "@/shared/ui";

export function HomePage() {
  const t = useTranslations("home");
  const steps = t.raw("approach.steps") as { title: string; text: string }[];

  return (
    <>
      <Hero />
      <Stats />
      <Section>
        <SectionHeading
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          description={t("services.description")}
        />
        <div className="mt-10">
          <ServicesGrid />
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading
          eyebrow={t("approach.eyebrow")}
          title={t("approach.title")}
          description={t("approach.description")}
        />
        <div className="mt-10">
          <ProcessSteps steps={steps} />
        </div>
      </Section>
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
            description={t("projects.description")}
          />
          <ButtonLink href="/projects/" variant="outline">
            {t("projects.viewAll")}
          </ButtonLink>
        </div>
        <div className="mt-10">
          <ProjectsPreview />
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />
        <div className="mt-10">
          <TestimonialsList />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
