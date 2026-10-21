import { cn } from "../lib";

// Two converging flow lines form an "A"; the copper dot is the source.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
      fill="none"
    >
      <path
        d="M6 35C13 26 16.5 18 20 11M34 35C27 26 23.5 18 20 11"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M13 29.5Q20 25 27 29.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="7" r="3.6" className="fill-copper" />
    </svg>
  );
}

export function Logo({ name, className }: { name: string; className?: string }) {
  const [first, ...rest] = name.split(" ");
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="text-primary" />
      <span className="text-lg leading-none font-bold tracking-tight">
        {first}
        {rest.length ? (
          <span className="text-muted-foreground ms-1 font-medium">{rest.join(" ")}</span>
        ) : null}
      </span>
    </span>
  );
}
