import { cn } from "@/lib/utils";

interface StepBadgeProps {
  number: string;
  className?: string;
}

export function StepBadge({ number, className }: StepBadgeProps) {
  return (
    <div
      className={cn(
        "absolute flex items-center justify-center rounded-lg bg-linear-to-r from-red-500 to-amber-500 font-bold text-white",
        className,
      )}
    >
      {number}
    </div>
  );
}
