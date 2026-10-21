import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SERVICES, type ServiceSlug } from "@/entities/service";
import { ServiceDetailPage } from "@/pages/service-detail";
import { routing } from "@/shared/i18n";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `services.items.${slug}` });
  const service = SERVICES.find((item) => item.slug === slug);
  return pageMetadata({
    locale,
    path: `/services/${slug}/`,
    title: t("title"),
    description: t("summary"),
    image: service?.image,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!SERVICES.some((item) => item.slug === slug)) notFound();
  setRequestLocale(locale);
  return <ServiceDetailPage slug={slug as ServiceSlug} />;
}
