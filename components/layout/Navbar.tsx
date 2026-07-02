"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/lib/assets";
import { getPageContext, navigationLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/MobileNav";
import { useI18n } from "@/components/layout/I18nProvider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const { theme } = useI18n();
  const pathname = usePathname();
  const desktopLinks = navigationLinks.slice(1);
  const leftLinks = desktopLinks.slice(0, 3);
  const rightLinks = desktopLinks.slice(3);
  const logo = theme === "dark" ? brandAssets.logoLight : brandAssets.logoDark;
  const pageContext = getPageContext(pathname, searchParams);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncSearch = () => setSearchParams(new URLSearchParams(window.location.search));
    syncSearch();
    window.addEventListener("popstate", syncSearch);
    window.addEventListener("locationchange", syncSearch);
    return () => {
      window.removeEventListener("popstate", syncSearch);
      window.removeEventListener("locationchange", syncSearch);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-deep-olive">
        <div className="container-shell flex min-h-10 items-center gap-3 py-2 text-white">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-white sm:text-xs sm:tracking-[0.16em]">
              <span className="hidden shrink-0 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-white/88 sm:inline-flex">
                {pageContext.label}
              </span>
              <span className="hidden shrink-0 text-cream/30 sm:inline">•</span>
              <p className="truncate text-white">{pageContext.banner}</p>
            </div>
          </div>
          <Link
            href={pageContext.nextHref}
            className="hidden shrink-0 rounded-full border border-white/70 bg-white px-3 py-1 text-[0.68rem] font-semibold text-[#173a2a] shadow-sm transition hover:bg-white/92 hover:text-[#173a2a] lg:inline-flex lg:text-xs"
          >
            {pageContext.nextLabel}
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "border-b border-border-soft/70 bg-background/88 transition-all duration-300",
          scrolled && "bg-background/78 shadow-sm backdrop-blur-xl",
        )}
      >
        <div className="container-shell relative flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
          <Link href="/" aria-label="Accueil SPIRALIS" className="shrink-0 lg:hidden">
            <Image
              src={logo}
              alt="Logo SPIRALIS"
              width={180}
              height={80}
              className="h-auto w-28 min-[380px]:w-32 sm:w-40"
              priority
            />
          </Link>

          <NavigationMenu className="hidden min-w-0 flex-1 justify-start xl:flex">
            <NavigationMenuList>
              {leftLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-2.5 py-2 text-sm font-semibold text-deep-olive/74 transition hover:bg-cream hover:text-deep-olive",
                        pathname === link.href && "bg-cream text-deep-olive shadow-sm",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="absolute left-1/2 hidden -translate-x-1/2 2xl:flex 2xl:flex-col 2xl:items-center 2xl:gap-2">
            <Link href="/" aria-label="Accueil SPIRALIS">
              <Image
                src={logo}
                alt="Logo SPIRALIS"
                width={220}
                height={92}
                className="h-auto w-40 2xl:w-44"
                priority
              />
            </Link>
            <div className="rounded-full border border-border-soft bg-cream/78 px-3 py-1 text-[0.72rem] font-semibold text-deep-olive/88 shadow-sm backdrop-blur">
              {pageContext.summary}
            </div>
          </div>

          <NavigationMenu className="hidden min-w-0 flex-1 justify-end xl:flex">
            <NavigationMenuList>
              {rightLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-2.5 py-2 text-sm font-semibold text-deep-olive/74 transition hover:bg-cream hover:text-deep-olive",
                        pathname === link.href && "bg-cream text-deep-olive shadow-sm",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
