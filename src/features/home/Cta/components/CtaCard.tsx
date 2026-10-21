import { useTranslations } from "next-intl";
import { GlowFrame } from "@/components/GlowFrame";
import { Reveal } from "@/components/Reveal";
import { useBrandName } from "@/hooks";
import { CtaButtons } from "./CtaButtons";

export function CtaCard() {
  const t = useTranslations("cta");
  const brand = useBrandName();

  return (
    <Reveal inView className="mx-auto max-w-4xl">
      <GlowFrame frameClassName="p-5 sm:p-8 md:p-12 text-center">
        <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-base text-white/70 sm:mb-8 sm:text-lg md:text-xl">
          {t("description", { brand })}
        </p>

        <CtaButtons />

        <p className="mt-4 text-xs text-white/50 sm:mt-6 sm:text-sm">{t("note")}</p>
      </GlowFrame>
    </Reveal>
  );
}
