import { useTranslations } from "next-intl";
import { CtaBand } from "@/widgets/cta-band";
import { PageHero } from "@/widgets/page-hero";
import { ProcessSteps } from "@/widgets/process-steps";
import { ServicesGrid } from "@/widgets/services-grid";
import { Section, SectionHeading } from "@/shared/ui";

export function ServicesPage() {
  const t = useTranslations("services");
  const steps = t.raw("process.steps") as { title: string; text: string }[];

  return (
    <>
      <PageHero
        title={t("title")}
        description={t("description")}
        eyebrow={t("eyebrow")}
      />
      <Section>
        <ServicesGrid />
      </Section>
      <Section tone="muted">
        <SectionHeading
          title={t("process.title")}
          description={t("process.description")}
        />
        <div className="mt-10">
          <ProcessSteps steps={steps} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
