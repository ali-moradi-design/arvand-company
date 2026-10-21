import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function HeroDescription() {
  const t = useTranslations("hero");

  return (
    <Reveal delay={0.2}>
      <p className="mx-auto mb-6 max-w-xl text-base text-white/70 sm:mb-8 sm:text-lg lg:mx-0 lg:text-xl">
        {t("description")}
      </p>
    </Reveal>
  );
}
