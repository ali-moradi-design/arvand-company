import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { useBrandName } from "@/hooks";

export function HeroBadge() {
  const t = useTranslations("hero");
  const brand = useBrandName();

  return (
    <Reveal className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs backdrop-blur-xs sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
      <Sparkles className="h-3 w-3 text-amber-400 sm:h-4 sm:w-4" />
      <span className="font-medium">{t("badge", { brand })}</span>
    </Reveal>
  );
}
