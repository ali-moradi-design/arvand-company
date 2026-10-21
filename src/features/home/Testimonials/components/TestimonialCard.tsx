"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useBrandName, useTextDirection } from "@/hooks";
import type { Testimonial } from "../types";
import { TestimonialAuthor } from "./TestimonialAuthor";
import { TestimonialQuote } from "./TestimonialQuote";

interface TestimonialCardProps {
  testimonial: Testimonial;
  current: number;
  total: number;
}

export function TestimonialCard({ testimonial, current, total }: TestimonialCardProps) {
  const t = useTranslations("testimonials");
  const { sign } = useTextDirection();
  const brand = useBrandName();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 100 * sign }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 * sign }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs sm:p-8 md:p-12"
        aria-live="polite"
        role="group"
        aria-roledescription={t("slide")}
        aria-label={t("slideLabel", { current: current + 1, total })}
      >
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          <TestimonialAuthor testimonial={testimonial} />
          <TestimonialQuote quote={t(`items.${testimonial.id}.quote`, { brand })} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
