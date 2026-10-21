import { useTranslations } from "next-intl";
import { SectionBackground } from "@/components/SectionBackground";
import { SectionHeader } from "@/components/SectionHeader";
import { IntegrationsGrid, IntegrationsFooter } from "./components";

export default function Integrations() {
  const t = useTranslations("integrations");

  return (
    <section
      className="relative overflow-hidden bg-black py-12 sm:py-16 md:py-24"
      aria-labelledby="integrations-heading"
    >
      <SectionBackground redSide="start" />

      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader
          titleId="integrations-heading"
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-8 sm:mb-10 md:mb-16"
          titleClassName="sm:mb-4"
        />
        <IntegrationsGrid />
        <IntegrationsFooter />
      </div>
    </section>
  );
}
