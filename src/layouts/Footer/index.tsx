import { useTranslations } from "next-intl";
import { FooterLogo, SocialLinks, FooterNav, FooterLegal } from "./components";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/10 bg-black px-3 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
          <div>
            <FooterLogo />
            <p className="mb-6 text-white/70">{t("description")}</p>
            <SocialLinks />
          </div>

          <FooterNav />
        </div>

        <FooterLegal />
      </div>
    </footer>
  );
}
