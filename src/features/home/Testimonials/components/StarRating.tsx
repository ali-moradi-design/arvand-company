import { useTranslations } from "next-intl";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const t = useTranslations("testimonials");

  return (
    <div className="mt-2 flex justify-center" aria-label={t("rating", { rating })}>
      {Array.from({ length: rating }, (_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-current text-amber-400 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
