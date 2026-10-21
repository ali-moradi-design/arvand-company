import Image from "next/image";
import { useTranslations } from "next-intl";
import { SERVICES, type ServiceSlug } from "@/entities/service";
import { CtaBand } from "@/widgets/cta-band";
import { PageHero } from "@/widgets/page-hero";
import { Link } from "@/shared/i18n";
import { Section } from "@/shared/ui";

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const t = useTranslations(`services.items.${slug}`);
  const common = useTranslations("common");
  const services = useTranslations("services");
  const service = SERVICES.find((item) => item.slug === slug)!;
  const deliverables = t.raw("deliverables") as string[];

  return (
    <>
      <PageHero
        eyebrow={services("eyebrow")}
        title={t("title")}
        description={t("summary")}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed">{t("intro")}</p>
            <h2 className="mt-10 text-2xl font-bold">{services("deliverables")}</h2>
            <ul className="mt-4 grid gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-teal mt-2 size-2 shrink-0 rounded-full"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl font-bold">{services("outcome")}</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">{t("outcome")}</p>
          </div>
          <div className="relative aspect-[4/3] self-start overflow-hidden rounded-lg border">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <p className="mt-12">
          <Link href="/services/" className="text-teal font-semibold">
            <span
              aria-hidden="true"
              className="inline-block ltr:me-1 rtl:ms-1 rtl:rotate-180"
            >
              ←
            </span>
            {common("allServices")}
          </Link>
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
