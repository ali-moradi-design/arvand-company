import { getTranslations, setRequestLocale } from "next-intl/server";
import { TeamPage } from "@/pages/team";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return pageMetadata({
    locale,
    path: "/team/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TeamPage />;
}
