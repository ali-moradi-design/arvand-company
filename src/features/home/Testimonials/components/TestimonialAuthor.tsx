import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Testimonial } from "../types";
import { StarRating } from "./StarRating";

interface TestimonialAuthorProps {
  testimonial: Testimonial;
}

export function TestimonialAuthor({ testimonial }: TestimonialAuthorProps) {
  const t = useTranslations("testimonials.items");
  const author = t(`${testimonial.id}.author`);

  return (
    <div className="w-full md:w-1/3">
      <div className="relative mx-auto max-w-[160px]">
        <div
          className="absolute -inset-1 rounded-full bg-linear-to-r from-red-500 to-amber-500 blur-xs"
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto h-20 w-20 sm:h-24 sm:w-24">
          <Image
            src={testimonial.avatar}
            alt={t(`${testimonial.id}.portraitAlt`, { author })}
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <h4 className="font-bold">{author}</h4>
        <p className="text-sm text-white/70">{t(`${testimonial.id}.role`)}</p>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
}
