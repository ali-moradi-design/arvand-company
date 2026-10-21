import { useTranslations } from "next-intl";

interface TestimonialsDotsProps {
  current: number;
  total: number;
  onDotClick: (index: number) => void;
}

export function TestimonialsDots({ current, total, onDotClick }: TestimonialsDotsProps) {
  const t = useTranslations("testimonials");

  return (
    <div className="mt-4 flex justify-center sm:mt-6">
      {Array.from({ length: total }, (_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onDotClick(idx)}
          className={`mx-1 h-1.5 w-1.5 rounded-full focus:ring-2 focus:ring-white focus:outline-hidden sm:h-2 sm:w-2 ${
            current === idx ? "bg-linear-to-r from-red-500 to-amber-500" : "bg-white/20"
          }`}
          aria-label={t("goTo", { number: idx + 1 })}
          aria-current={current === idx ? "true" : "false"}
        />
      ))}
    </div>
  );
}
