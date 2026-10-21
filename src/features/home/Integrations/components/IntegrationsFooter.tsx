import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function IntegrationsFooter() {
  const t = useTranslations("integrations");

  return (
    <Reveal inView delay={0.3} className="mt-6 text-center sm:mt-8">
      <p className="text-xs text-white/70 sm:text-sm">
        {t("ctaText")}{" "}
        <a
          href="#contact"
          className="text-amber-400 underline underline-offset-2 hover:text-amber-300 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black focus:outline-hidden"
          aria-label={t("ctaAriaLabel")}
        >
          {t("ctaLink")}
        </a>
      </p>
    </Reveal>
  );
}
