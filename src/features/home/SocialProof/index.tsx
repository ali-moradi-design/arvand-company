import { SectionBackground } from "@/components/SectionBackground";
import { SocialProofHeader, CompanyLogos, StatsGrid } from "./components";

export default function SocialProof() {
  return (
    <section
      className="relative overflow-hidden bg-black py-12 sm:py-16 md:py-20"
      aria-labelledby="social-proof-heading"
    >
      <SectionBackground redSide="start" size="half" grid className="opacity-50" />

      <div className="relative z-10 container px-4 md:px-8">
        <SocialProofHeader />
        <CompanyLogos />
        <StatsGrid />
      </div>
    </section>
  );
}
