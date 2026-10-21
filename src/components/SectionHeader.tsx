import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  titleId?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  titleId,
  className,
  titleClassName,
  subtitleClassName,
  children,
}: SectionHeaderProps) {
  return (
    <Reveal inView className={cn("text-center", className)}>
      <h2
        id={titleId}
        className={cn("mb-3 text-2xl font-bold sm:text-3xl md:text-4xl", titleClassName)}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mx-auto max-w-2xl text-base text-white/70 sm:text-lg",
          subtitleClassName,
        )}
      >
        {subtitle}
      </p>
      {children}
    </Reveal>
  );
}
