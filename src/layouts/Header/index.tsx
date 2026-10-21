"use client";

import { cn } from "@/lib/utils";
import { SCROLLED_THRESHOLD_PX } from "./constants";
import { useBodyScrollLock, useMobileMenu, useScrolled } from "./hooks";
import { HeaderLogo, DesktopNav, MobileNav, MenuToggle } from "./components";

export function Header() {
  const { isOpen, toggle } = useMobileMenu();
  const scrolled = useScrolled(SCROLLED_THRESHOLD_PX);
  useBodyScrollLock(isOpen);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-[60px] items-center transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/80 shadow-lg shadow-black/20 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <HeaderLogo />
        <DesktopNav />
        <MenuToggle isOpen={isOpen} onToggle={toggle} />
      </div>

      <MobileNav isOpen={isOpen} />
    </header>
  );
}
