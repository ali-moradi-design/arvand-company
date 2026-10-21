import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface HeroStatusBadgeProps {
  label: string;
  delay: number;
  className: string;
  dotClassName: string;
  labelClassName: string;
}

export function HeroStatusBadge({
  label,
  delay,
  className,
  dotClassName,
  labelClassName,
}: HeroStatusBadgeProps) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "xs:flex absolute hidden rounded-lg border border-white/10 bg-black/50 p-2 shadow-lg backdrop-blur-md sm:p-3",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <div className={cn("rounded-full", dotClassName)}></div>
        <span className={labelClassName}>{label}</span>
      </div>
    </Reveal>
  );
}
