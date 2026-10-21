import type { ComponentProps } from "react";
import { cn } from "../lib";
import { Container } from "./Container";

type SectionProps = ComponentProps<"section"> & { tone?: "default" | "muted" | "dark" };

const TONES = {
  default: "bg-background",
  muted: "bg-muted",
  dark: "bg-primary text-primary-foreground dark:bg-sand dark:text-foreground",
} as const;

export function Section({
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", TONES[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
