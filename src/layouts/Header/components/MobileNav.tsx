"use client";

import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { cn } from "@/lib/utils";
import { useActiveDropdown, useNavItems } from "../hooks";
import { AuthButtons } from "./AuthButtons";
import { NavDropdown } from "./NavDropdown";

interface MobileNavProps {
  isOpen: boolean;
}

export function MobileNav({ isOpen }: MobileNavProps) {
  const { dropdowns, links } = useNavItems();
  const { activeId, open, close, toggle } = useActiveDropdown();

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[60px] overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-lg transition-all duration-300 md:hidden",
        isOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <div
        className={cn(
          "container mx-auto flex flex-col gap-2 overflow-y-auto px-3 py-4 transition-all duration-300",
          isOpen ? "translate-y-0" : "-translate-y-4",
        )}
      >
        {dropdowns.map((group) => (
          <NavDropdown
            key={group.id}
            group={group}
            isMobile
            isOpen={activeId === group.id}
            onOpen={() => open(group.id)}
            onClose={close}
            onToggle={() => toggle(group.id)}
          />
        ))}

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md border-b border-white/10 px-2 py-2 transition-colors hover:bg-white/5 active:bg-white/10"
          >
            {link.label}
          </Link>
        ))}

        <LocaleSwitcher className="self-start" />

        <AuthButtons
          className="flex flex-col gap-2 pt-3"
          loginVariant="outline"
          loginClassName="border-white/20 text-white hover:bg-white/10 h-10 active:bg-white/20"
          signUpClassName="h-10 active:opacity-90"
        />
      </div>
    </div>
  );
}
