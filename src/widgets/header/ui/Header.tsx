import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/features/language-switcher";
import { MobileMenu } from "@/features/mobile-menu";
import { ThemeToggle } from "@/features/theme-toggle";
import { Link } from "@/shared/i18n";
import { ButtonLink, Container, Logo } from "@/shared/ui";
import { NAV_ITEMS } from "../model/nav";
import { NavLinks } from "./NavLinks";

export function Header() {
  const t = useTranslations();

  const items = NAV_ITEMS.map((item) => ({ ...item, label: t(`nav.${item.key}`) }));

  return (
    <header className="bg-background/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={t("brand.name")} className="rounded-md">
          <Logo name={t("brand.name")} />
        </Link>
        <NavLinks />
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink href="/contact/" size="sm" className="hidden sm:inline-flex">
            {t("common.getInTouch")}
          </ButtonLink>
          <MobileMenu items={items} />
        </div>
      </Container>
    </header>
  );
}
