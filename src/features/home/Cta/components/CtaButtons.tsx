import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";

export function CtaButtons() {
  const t = useTranslations("cta");

  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <GradientButton className="h-10 px-6 text-sm sm:h-12 sm:px-8 sm:text-base">
        {t("primaryCta")}
        <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
      </GradientButton>
      <OutlineButton className="h-10 px-6 text-sm sm:h-12 sm:px-8 sm:text-base">
        {t("secondaryCta")}
      </OutlineButton>
    </div>
  );
}
