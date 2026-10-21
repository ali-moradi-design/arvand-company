import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesPage } from "@/pages/services";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({
    locale,
    path: "/services/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesPage />;
}
