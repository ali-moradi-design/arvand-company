import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { inter, ThemeProvider, vazirmatn } from "@/app";
import "@/app/styles/globals.css";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { getDirection, routing } from "@/shared/i18n";
import { organizationJsonLd } from "@/shared/seo";

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode }> & LocaleParams) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const jsonLd = organizationJsonLd({
    name: t("brand.name"),
    description: t("metadata.description"),
  });

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${inter.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <ThemeProvider>
            <a
              href="#main"
              className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
            >
              {t("common.skipToContent")}
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
