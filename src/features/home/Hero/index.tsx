import {
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroButtons,
  HeroSocialProof,
  HeroImage,
  HeroBackground,
} from "./components";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-16 sm:pt-20">
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 py-8 sm:py-0 lg:flex-row lg:gap-12">
          <div className="flex-1 text-center lg:text-start">
            <HeroBadge />
            <HeroTitle />
            <HeroDescription />
            <HeroButtons />
            <HeroSocialProof />
          </div>

          <HeroImage />
        </div>
      </div>
    </section>
  );
}
