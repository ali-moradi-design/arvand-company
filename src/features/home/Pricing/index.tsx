"use client";

import { SectionBackground } from "@/components/SectionBackground";
import { PricingHeader, PricingGrid, PricingFooter } from "./components";
import { usePricingToggle } from "./hooks";

export default function Pricing() {
  const { annual, setAnnual } = usePricingToggle();

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24"
      aria-labelledby="pricing-heading"
    >
      <SectionBackground redSide="end" />

      <div className="relative z-10 container mx-auto px-4">
        <PricingHeader annual={annual} onBillingChange={setAnnual} />
        <PricingGrid annual={annual} />
        <PricingFooter />
      </div>
    </section>
  );
}
