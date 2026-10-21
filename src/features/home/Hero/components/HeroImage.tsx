"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { GlowFrame } from "@/components/GlowFrame";
import { Reveal } from "@/components/Reveal";
import { HERO_IMAGE } from "../constants";
import { useParallax } from "../hooks";
import { HeroStatusBadge } from "./HeroStatusBadge";

export function HeroImage() {
  const t = useTranslations("hero");
  const parallaxRef = useParallax<HTMLDivElement>();

  return (
    <div className="relative mx-auto mt-8 max-w-[90%] flex-1 sm:max-w-[80%] md:max-w-[70%] lg:mt-0 lg:max-w-full">
      <Reveal delay={0.2} duration={0.7} y={0} scale={0.9} className="relative z-10">
        <GlowFrame frameRef={parallaxRef} frameClassName="overflow-hidden">
          <Image
            src={HERO_IMAGE.src}
            alt={t("imageAlt")}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            className="h-auto w-full rounded-lg"
          />

          <HeroStatusBadge
            label={t("status.online")}
            delay={0.6}
            className="end-2 top-2 sm:end-4 sm:top-4"
            dotClassName="w-2 h-2 sm:w-3 sm:h-3 bg-green-500"
            labelClassName="text-xs sm:text-sm font-medium"
          />
          <HeroStatusBadge
            label={t("status.processing")}
            delay={0.8}
            className="start-2 bottom-2 sm:start-4 sm:bottom-4"
            dotClassName="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 animate-pulse"
            labelClassName="text-xs"
          />
        </GlowFrame>
      </Reveal>

      <div className="absolute -end-5 -top-5 hidden h-10 w-10 rounded-full border border-white/10 sm:-end-10 sm:-top-10 sm:block sm:h-20 sm:w-20"></div>
      <div className="absolute -start-3 -bottom-3 hidden h-6 w-6 rounded-full border border-white/10 sm:-start-5 sm:-bottom-5 sm:block sm:h-10 sm:w-10"></div>
    </div>
  );
}
