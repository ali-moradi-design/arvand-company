import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";

export function HeroButtons() {
  const t = useTranslations("hero");

  return (
    <Reveal
      delay={0.3}
      className="mx-auto flex max-w-[80%] flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
    >
      <GradientButton className="h-10 px-6 text-sm sm:h-12 sm:px-8 sm:text-base">
        {t("primaryCta")}
        <ArrowRight className="ms-2 h-3.5 w-3.5 sm:h-4 sm:w-4 rtl:rotate-180" />
      </GradientButton>
      <OutlineButton className="h-10 px-6 text-sm sm:h-12 sm:px-8 sm:text-base">
        {t("secondaryCta")}
      </OutlineButton>
    </Reveal>
  );
}
