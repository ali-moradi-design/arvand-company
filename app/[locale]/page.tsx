import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/pages/home";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    path: "/",
    title: t("metadata.title", { brand: t("brand.name") }),
    description: t("metadata.description"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
