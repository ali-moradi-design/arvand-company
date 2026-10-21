import { useTranslations } from "next-intl";
import { useBrandName } from "@/hooks";
import { Link } from "@/i18n/navigation";
import { LEGAL_LINK_KEYS } from "../constants";

export function FooterLegal() {
  const t = useTranslations("footer");
  const brand = useBrandName();

  return (
    <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
      <p className="mb-4 text-sm text-white/50 md:mb-0">
        {t("copyright", { year: new Date().getFullYear(), brand })}
      </p>
      <div className="flex gap-6">
        {LEGAL_LINK_KEYS.map((key) => (
          <Link
            key={key}
            href="#"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            {t(`legal.${key}`)}
          </Link>
        ))}
      </div>
    </div>
  );
}
