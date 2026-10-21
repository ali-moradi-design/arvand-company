import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PROJECTS, type ProjectSlug } from "@/entities/project";
import { CtaBand } from "@/widgets/cta-band";
import { PageHero } from "@/widgets/page-hero";
import { Link, formatNumber } from "@/shared/i18n";
import { Section } from "@/shared/ui";

export function ProjectDetailPage({ slug }: { slug: ProjectSlug }) {
  const locale = useLocale();
  const t = useTranslations(`projects.items.${slug}`);
  const labels = useTranslations("projects.labels");
  const sectors = useTranslations("projects.sectors");
  const common = useTranslations("common");
  const project = PROJECTS.find((item) => item.slug === slug)!;

  const facts = [
    { label: labels("location"), value: t("location") },
    { label: labels("sector"), value: sectors(project.sector) },
    { label: labels("year"), value: formatNumber(locale, project.year) },
    { label: labels("scope"), value: t("scope") },
  ];
  const sections = [
    { label: labels("challenge"), text: t("challenge") },
    { label: labels("approach"), text: t("approach") },
    { label: labels("result"), text: t("result") },
  ];

  return (
    <>
      <PageHero
        eyebrow={sectors(project.sector)}
        title={t("title")}
        description={t("summary")}
      />
      <Section>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border">
          <Image
            src={project.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </div>
        <dl className="bg-surface mt-8 grid gap-6 rounded-lg border p-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid max-w-3xl gap-10">
          {sections.map((section) => (
            <div key={section.label}>
              <h2 className="text-2xl font-bold">{section.label}</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-12">
          <Link href="/projects/" className="text-teal font-semibold">
            <span
              aria-hidden="true"
              className="inline-block ltr:me-1 rtl:ms-1 rtl:rotate-180"
            >
              ←
            </span>
            {common("allProjects")}
          </Link>
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
