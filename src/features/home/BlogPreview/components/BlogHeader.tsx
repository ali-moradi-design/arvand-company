import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { OutlineButton } from "@/components/OutlineButton";

export function BlogHeader() {
  const t = useTranslations("blog");

  return (
    <Reveal
      inView
      className="mb-8 flex flex-col justify-between sm:mb-12 md:flex-row md:items-end"
    >
      <div>
        <h2 id="blog-heading" className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-2xl text-base text-white/70 sm:text-lg">{t("subtitle")}</p>
      </div>
      <div className="mt-6 md:mt-0">
        <OutlineButton
          className="text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-hidden sm:text-base"
          aria-label={t("viewAllLabel")}
        >
          {t("viewAll")}
          <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </OutlineButton>
      </div>
    </Reveal>
  );
}
