import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function FaqFooter() {
  const t = useTranslations("faq");

  return (
    <Reveal inView delay={0.5} className="mt-8 text-center sm:mt-10 md:mt-12">
      <p className="text-sm text-white/70 sm:text-base">
        {t("contactText")}{" "}
        <a
          href="#contact"
          className="text-amber-400 underline underline-offset-2 hover:text-amber-300"
        >
          {t("contactLink")}
        </a>
      </p>
    </Reveal>
  );
}
