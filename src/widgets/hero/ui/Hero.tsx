import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonLink, Container } from "@/shared/ui";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate overflow-hidden bg-[hsl(212_64%_12%)] text-white">
      <Image
        src="/images/hero/hero.webp"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[hsl(212_64%_12%)] via-[hsl(212_64%_12%/0.85)] to-transparent rtl:bg-gradient-to-l"
      />
      <Container className="py-24 sm:py-32 lg:py-40">
        <p className="text-sm font-semibold tracking-wide text-[hsl(40_41%_85%)] uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact/" size="lg" variant="primary">
            {t("primaryCta")}
          </ButtonLink>
          <ButtonLink
            href="/projects/"
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10"
          >
            {t("secondaryCta")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
