import { useTranslations } from "next-intl";
import { CONTACT } from "@/shared/config";
import { Link } from "@/shared/i18n";
import { Container, Logo } from "@/shared/ui";

const EXPLORE = ["services", "projects", "about", "team", "blog", "contact"] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-primary text-primary-foreground dark:bg-sand dark:text-foreground">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo
            name={t("brand.name")}
            className="[&_span]:text-current [&_svg]:text-current"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">
            {t("footer.description")}
          </p>
        </div>
        <nav aria-label={t("footer.explore")}>
          <h2 className="text-sm font-semibold tracking-wide uppercase opacity-70">
            {t("footer.explore")}
          </h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {EXPLORE.map((key) => (
              <li key={key}>
                <Link href={`/${key}/`} className="underline-offset-4 hover:underline">
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase opacity-70">
            {t("footer.contact")}
          </h2>
          <address className="mt-4 grid gap-2 text-sm not-italic">
            <span>{t("footer.offices")}</span>
            <a
              href={`mailto:${CONTACT.email}`}
              dir="ltr"
              className="underline-offset-4 hover:underline"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              dir="ltr"
              className="w-fit underline-offset-4 hover:underline"
            >
              {CONTACT.phone}
            </a>
          </address>
        </div>
      </Container>
      <div className="border-t border-current/15">
        <Container className="py-5 text-xs opacity-80">
          <p>{t("footer.fictional")}</p>
          <p className="mt-1">{t("footer.rights", { brand: t("brand.name") })}</p>
        </Container>
      </div>
    </footer>
  );
}
