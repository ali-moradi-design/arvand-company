import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PROJECTS, type ProjectSlug } from "@/entities/project";
import { ProjectDetailPage } from "@/pages/project-detail";
import { routing } from "@/shared/i18n";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `projects.items.${slug}` });
  const project = PROJECTS.find((item) => item.slug === slug);
  return pageMetadata({
    locale,
    path: `/projects/${slug}/`,
    title: t("title"),
    description: t("summary"),
    image: project?.image,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!PROJECTS.some((item) => item.slug === slug)) notFound();
  setRequestLocale(locale);
  return <ProjectDetailPage slug={slug as ProjectSlug} />;
}
