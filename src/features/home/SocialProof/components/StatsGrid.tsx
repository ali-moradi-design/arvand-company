"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { STAGGER_ANIMATION, STATS } from "../constants";
import { StatCard } from "./StatCard";

export function StatsGrid() {
  const t = useTranslations("socialProof");

  return (
    <motion.div
      className="xs:grid-cols-2 grid auto-rows-fr grid-cols-1 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8"
      variants={STAGGER_ANIMATION}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label={t("statsLabel")}
    >
      {STATS.map((stat) => (
        <StatCard key={stat.id} value={stat.value} label={t(`stats.${stat.id}`)} />
      ))}
    </motion.div>
  );
}
