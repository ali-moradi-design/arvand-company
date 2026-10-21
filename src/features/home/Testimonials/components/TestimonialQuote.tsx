import { useTranslations } from "next-intl";

interface TestimonialQuoteProps {
  quote: string;
}

export function TestimonialQuote({ quote }: TestimonialQuoteProps) {
  const t = useTranslations("testimonials");

  return (
    <div className="w-full md:w-2/3">
      <p className="mb-4 text-center text-base italic sm:mb-6 sm:text-lg md:text-start md:text-xl">
        {t("quoted", { quote })}
      </p>
      <div
        className="mx-auto h-px w-16 bg-linear-to-r from-red-500 to-amber-500 md:mx-0"
        aria-hidden="true"
      ></div>
    </div>
  );
}
