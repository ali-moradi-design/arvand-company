import { useTranslations } from "next-intl";

interface PriceDisplayProps {
  price: number;
  annual: boolean;
}

export function PriceDisplay({ price, annual }: PriceDisplayProps) {
  const t = useTranslations("pricing");
  const period = t(annual ? "year" : "month");

  return (
    <div
      className="mb-5 flex items-baseline sm:mb-6"
      aria-label={t("priceLabel", { price, period })}
    >
      <span className="text-2xl font-bold sm:text-4xl">{t("price", { price })}</span>
      <span className="ms-2 text-sm text-white/70">{t("per", { period })}</span>
    </div>
  );
}
