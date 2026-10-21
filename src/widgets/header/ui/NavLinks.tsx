"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { NAV_ITEMS } from "../model/nav";

export function NavLinks() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("primary")} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.filter((item) => item.key !== "contact").map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "hover:bg-muted rounded-md px-3 py-2 text-sm font-medium",
                  active && "text-teal",
                )}
              >
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
