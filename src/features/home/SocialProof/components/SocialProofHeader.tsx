import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function SocialProofHeader() {
  const t = useTranslations("socialProof");

  return (
    <Reveal inView className="mb-10 text-center sm:mb-16">
      <p className="mb-2 text-base font-medium text-amber-400 sm:text-lg">
        {t("eyebrow")}
      </p>
      <h2
        id="social-proof-heading"
        className="text-xl font-bold text-white sm:text-2xl md:text-3xl"
      >
        {t("title")}
      </h2>
    </Reveal>
  );
}
