import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { HERO_AVATAR_COUNT, HERO_RATING, HERO_TRUSTED_BY_COUNT } from "../constants";

export function HeroSocialProof() {
  const t = useTranslations("hero");

  return (
    <Reveal
      delay={0.4}
      y={0}
      className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:flex-nowrap sm:gap-4 lg:justify-start"
    >
      <div className="flex -space-x-2 rtl:space-x-reverse">
        {Array.from({ length: HERO_AVATAR_COUNT }, (_, i) => (
          <div
            key={i}
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-gray-800 text-xs sm:h-8 sm:w-8"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="text-xs text-white/70 sm:text-sm">
        {t.rich("trustedBy", {
          count: HERO_TRUSTED_BY_COUNT,
          strong: (chunks) => <span className="font-bold text-white">{chunks}</span>,
        })}
      </div>
      <div className="flex items-center gap-0.5 sm:gap-1">
        {Array.from({ length: HERO_RATING }, (_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" />
        ))}
      </div>
    </Reveal>
  );
}
