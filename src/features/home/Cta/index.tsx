import { CtaBackground, CtaCard } from "./components";

export default function Cta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-3 py-16 pb-20 sm:px-0 sm:py-16 md:py-24"
    >
      <CtaBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <CtaCard />
      </div>
    </section>
  );
}
