"use client";

import { motion } from "framer-motion";
import { GlowFrame } from "@/components/GlowFrame";
import { FADE_ITEM_ANIMATION } from "../constants";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <motion.div className="h-full text-center" variants={FADE_ITEM_ANIMATION}>
      <GlowFrame
        className="group h-full"
        glowClassName="-inset-0.5 rounded-lg blur-sm opacity-30 group-hover:opacity-60 transition duration-300"
        frameClassName="bg-black/70 rounded-lg p-4 sm:p-6 h-full flex flex-col justify-center"
      >
        <div
          className="mb-1 truncate bg-linear-to-r from-red-400 to-amber-400 bg-clip-text text-2xl font-bold text-transparent sm:mb-2 sm:text-3xl md:text-4xl"
          aria-hidden="true"
        >
          {value}
        </div>
        <p
          className="truncate text-sm text-white/70 sm:text-base"
          aria-label={`${value} ${label}`}
        >
          {label}
        </p>
      </GlowFrame>
    </motion.div>
  );
}
