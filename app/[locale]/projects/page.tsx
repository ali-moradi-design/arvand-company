import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsPage } from "@/pages/projects";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return pageMetadata({
    locale,
    path: "/projects/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsPage />;
}
