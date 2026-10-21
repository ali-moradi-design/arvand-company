import { useTranslations } from "next-intl";

export function PopularBadge() {
  const t = useTranslations("pricing");

  return (
    <div className="absolute inset-x-0 -top-3 flex justify-center">
      <div className="z-50 rounded-full bg-linear-to-r from-red-500 to-amber-500 px-3 py-1 text-xs font-bold text-white">
        {t("mostPopular")}
      </div>
    </div>
  );
}
