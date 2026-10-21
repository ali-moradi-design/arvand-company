import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface BillingToggleProps {
  annual: boolean;
  onChange: (annual: boolean) => void;
}

const OPTION_CLASS =
  "relative z-10 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-white";

export function BillingToggle({ annual, onChange }: BillingToggleProps) {
  const t = useTranslations("pricing");

  return (
    <div className="relative mt-6 flex items-center justify-center sm:mt-8">
      <fieldset className="rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xs">
        <legend className="sr-only">{t("billingFrequency")}</legend>
        <div className="relative flex">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={cn(OPTION_CLASS, annual ? "text-white" : "text-white/70")}
            aria-pressed={annual}
            aria-label={t("annualBilling")}
          >
            {t("annual")}
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={cn(OPTION_CLASS, !annual ? "text-white" : "text-white/70")}
            aria-pressed={!annual}
            aria-label={t("monthlyBilling")}
          >
            {t("monthly")}
          </button>
          <div
            className={cn(
              "absolute start-1 top-1 h-[calc(100%-8px)] rounded-full bg-linear-to-r from-red-500 to-amber-500 transition-transform duration-300",
              annual
                ? "w-[calc(50%-12px)] translate-x-0"
                : "w-[calc(50%-3px)] translate-x-full rtl:-translate-x-full",
            )}
            aria-hidden="true"
          ></div>
        </div>
      </fieldset>

      {annual && (
        <div className="absolute -bottom-8 ms-3 rounded-full bg-linear-to-r from-red-500 to-amber-500 px-2 py-1 text-xs font-bold text-white sm:relative sm:bottom-auto">
          {t("save")}
        </div>
      )}
    </div>
  );
}
