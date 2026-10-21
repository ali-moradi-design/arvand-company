"use client";

import { useTranslations } from "next-intl";
import { SectionBackground } from "@/components/SectionBackground";
import { SectionHeader } from "@/components/SectionHeader";
import { Tabs } from "@/components/ui/tabs";
import { FeaturesTabs, MobileFeatureTitle, FeatureContent } from "./components";
import { useFeaturesTabs } from "./hooks";

export default function Features() {
  const t = useTranslations("features");
  const { activeTab, setActiveTab, mounted } = useFeaturesTabs();

  return (
    <section id="features" className="relative bg-black px-4 py-12 sm:py-16 md:py-24">
      <SectionBackground redSide="end" />

      <div className="relative z-10 container mx-auto">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-8 sm:mb-12"
          subtitleClassName="text-sm sm:text-base md:text-lg"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <FeaturesTabs />
          <MobileFeatureTitle activeTab={activeTab} />
          <FeatureContent mounted={mounted} />
        </Tabs>
      </div>
    </section>
  );
}
