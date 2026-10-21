import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CtaBand } from "@/widgets/cta-band";
import { PageHero } from "@/widgets/page-hero";
import { formatNumber } from "@/shared/i18n";
import { Section, SectionHeading } from "@/shared/ui";

export function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const paragraphs = t.raw("story.paragraphs") as string[];
  const values = t.raw("values.items") as { title: string; text: string }[];
  const timeline = t.raw("timeline.items") as { year: number; text: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">{t("story.title")}</h2>
            <div className="text-muted-foreground mt-5 grid gap-4 leading-relaxed">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
            <Image
              src="/images/about/boardroom.webp"
              alt={t("story.imageAlt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading title={t("values.title")} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <li key={value.title} className="bg-surface rounded-lg border p-6">
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {value.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <SectionHeading title={t("timeline.title")} />
        <ol className="mt-10 grid max-w-3xl gap-0 border-s">
          {timeline.map((item) => (
            <li key={item.year} className="relative ps-8 pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className="bg-copper absolute -start-[7px] top-1.5 size-3 rounded-full"
              />
              <p className="text-teal font-bold">{formatNumber(locale, item.year)}</p>
              <p className="text-muted-foreground mt-1">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand />
    </>
  );
}
