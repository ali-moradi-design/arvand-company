import { useTranslations } from "next-intl";

export function PricingFooter() {
  const t = useTranslations("pricing");

  return (
    <div className="mt-10 text-center sm:mt-16">
      <p className="text-sm text-white/70 sm:text-base">{t("trialInfo")}</p>
    </div>
  );
}
