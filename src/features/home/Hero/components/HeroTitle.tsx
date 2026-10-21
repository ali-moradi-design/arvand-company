import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function HeroTitle() {
  const t = useTranslations("hero.title");

  return (
    <Reveal delay={0.1}>
      <h1 className="mb-4 text-3xl leading-tight font-bold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        <span className="block">{t("line1")}</span>
        <span className="bg-linear-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
          {t("line2")}
        </span>
      </h1>
    </Reveal>
  );
}
