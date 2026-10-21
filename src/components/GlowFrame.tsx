import { cn } from "@/lib/utils";

interface GlowFrameProps {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
  frameClassName?: string;
  frameRef?: React.Ref<HTMLDivElement>;
}

/** A dark panel sitting on a blurred gradient halo. */
export function GlowFrame({
  children,
  className,
  glowClassName,
  frameClassName,
  frameRef,
}: GlowFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute -inset-1 rounded-2xl bg-linear-to-r from-red-500 to-amber-500 opacity-70 blur-lg",
          glowClassName,
        )}
      ></div>
      <div
        ref={frameRef}
        className={cn(
          "relative rounded-xl border border-white/10 bg-black/80 backdrop-blur-xs",
          frameClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
