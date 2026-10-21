import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogPage } from "@/pages/blog";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return pageMetadata({
    locale,
    path: "/blog/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogPage locale={locale} />;
}
