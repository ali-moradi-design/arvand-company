"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { COMPANIES, FADE_ITEM_ANIMATION, STAGGER_ANIMATION } from "../constants";

export function CompanyLogos() {
  const t = useTranslations("socialProof");

  return (
    <motion.div
      className="mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mb-16 sm:gap-x-8 md:gap-x-12"
      variants={STAGGER_ANIMATION}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label={t("logosLabel")}
    >
      {COMPANIES.map((company) => (
        <motion.div
          key={company.name}
          className="opacity-60 transition-all duration-300 hover:opacity-100"
          variants={FADE_ITEM_ANIMATION}
        >
          <div className="flex h-[30px] w-[30px] items-center justify-center sm:h-[80px] sm:w-[80px] md:h-[40px]">
            <Image
              src={company.logo}
              alt={t("logoAlt", { name: company.name })}
              width={60}
              height={60}
              className="object-contain brightness-0 invert filter"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
