import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markClassName?: string;
  innerClassName?: string;
  nameClassName?: string;
  hoverScale?: boolean;
}

export function Logo({
  className,
  markClassName,
  innerClassName,
  nameClassName,
  hoverScale = false,
}: LogoProps) {
  const t = useTranslations("brand");
  const name = t("name");

  return (
    <Link href="/" className={cn("flex items-center", hoverScale && "group", className)}>
      <div className={cn("relative h-10 w-10", markClassName)}>
        <div
          className={cn(
            "absolute inset-0 origin-center rotate-45 transform rounded-lg bg-linear-to-tr from-red-500 to-amber-500",
            hoverScale && "transition-transform group-hover:scale-105",
          )}
        ></div>
        <div
          className={cn(
            "absolute inset-[3px] flex items-center justify-center rounded-lg bg-black font-bold text-white",
            innerClassName,
          )}
        >
          {name.charAt(0)}
        </div>
      </div>
      <span
        className={cn(
          "bg-linear-to-r from-red-500 to-amber-500 bg-clip-text text-2xl font-bold text-transparent",
          nameClassName,
        )}
      >
        {name}
      </span>
    </Link>
  );
}
