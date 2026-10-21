"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { GlowFrame } from "@/components/GlowFrame";
import { Reveal } from "@/components/Reveal";
import type { Step } from "../types";
import { StepBadge } from "./StepBadge";

interface StepCardProps {
  step: Step;
  index: number;
  isLast: boolean;
}

export function StepCard({ step, index, isLast }: StepCardProps) {
  const t = useTranslations("howItWorks.steps");
  const title = t(`${step.id}.title`);

  return (
    <Reveal inView delay={index * 0.1} className="h-full">
      <GlowFrame
        className="group h-full"
        glowClassName="rounded-xl blur-xs group-hover:opacity-100 transition-opacity duration-300"
        frameClassName="rounded-lg overflow-hidden h-full flex flex-col"
      >
        <div className="relative h-40 overflow-hidden sm:h-48">
          <Image
            src={step.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <StepBadge
            number={step.number}
            className="start-4 top-4 h-10 w-10 text-lg sm:h-12 sm:w-12 sm:text-xl"
          />
        </div>

        <div className="flex grow flex-col p-4 sm:p-6">
          <h3 className="mb-2 text-lg font-bold sm:text-xl">{title}</h3>
          <p className="mb-4 grow text-sm text-white/70 sm:text-base">
            {t(`${step.id}.description`)}
          </p>

          {!isLast && (
            <div className="mt-auto hidden items-center justify-end text-amber-400 lg:flex">
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </div>
          )}
        </div>
      </GlowFrame>
    </Reveal>
  );
}
