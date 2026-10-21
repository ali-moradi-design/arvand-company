import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FOOTER_LINK_GROUPS } from "../constants";

export function FooterNav() {
  const t = useTranslations("footer.groups");

  return (
    <>
      {FOOTER_LINK_GROUPS.map((group) => (
        <div key={group.id}>
          <h3 className="mb-4 text-lg font-bold">{t(`${group.id}.title`)}</h3>
          <ul className="space-y-3">
            {group.linkKeys.map((key) => (
              <li key={key}>
                <Link
                  href="#"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {t(`${group.id}.links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
