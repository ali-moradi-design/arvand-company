import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import type { Integration } from "../types";

interface IntegrationCardProps {
  integration: Integration;
  index: number;
}

export function IntegrationCard({ integration, index }: IntegrationCardProps) {
  const t = useTranslations("integrations");
  const category = t(`categories.${integration.category}`);

  return (
    <Reveal inView duration={0.3} delay={index * 0.05} role="listitem">
      <div
        className="flex h-full flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-xs transition-colors focus-within:ring-2 focus-within:ring-white hover:bg-white/10 sm:p-3 md:p-4"
        tabIndex={0}
      >
        <div
          className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-red-500/20 to-amber-500/20 sm:mb-2 sm:h-10 sm:w-10"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={integration.logo}
            alt=""
            className="h-4 w-4 object-contain brightness-0 invert filter sm:h-5 sm:w-5"
          />
        </div>
        <h3 className="text-center text-xs font-medium sm:text-sm">{integration.name}</h3>
        <p
          className="mt-0.5 hidden text-xs text-white/50 sm:block"
          aria-label={t("categoryLabel", { category })}
        >
          {category}
        </p>
      </div>
    </Reveal>
  );
}
