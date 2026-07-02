"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { brandAssets } from "@/lib/assets";
import { getPageContext, navigationLinks } from "@/lib/navigation";
import { useI18n } from "@/components/layout/I18nProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const { theme } = useI18n();
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const logo = theme === "dark" ? brandAssets.logoLight : brandAssets.logoDark;
  const pageContext = getPageContext(pathname, searchParams);

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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Ouvrir la navigation"
          className="ml-auto shrink-0 border border-border-soft bg-cream/78 shadow-sm xl:hidden"
          size="icon"
          variant="ghost"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-dvh overflow-y-auto">
        <SheetTitle className="sr-only">Navigation SPIRALIS</SheetTitle>
        <SheetDescription className="sr-only">
          Accédez aux pages principales du site SPIRALIS.
        </SheetDescription>
        <div className="mt-4">
          <Image
            src={logo}
            alt="Logo SPIRALIS"
            width={170}
            height={70}
            className="h-auto w-36"
            priority
          />
        </div>
        <div className="mt-6 rounded-[22px] border border-border-soft bg-cream/80 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-bamboo">
            En ce moment
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-deep-olive">
            {pageContext.label}
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-dark/68">{pageContext.summary}</p>
        </div>
        <nav className="mt-8 flex flex-col gap-2 sm:mt-12" aria-label="Navigation mobile">
          {navigationLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-base font-semibold text-deep-olive transition hover:bg-pale-green/50",
                  pathname === link.href && "bg-pale-green/65 shadow-sm",
                )}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-8 grid gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-bamboo">
            Acces rapide
          </p>
          <div className="grid grid-cols-2 gap-3">
            <SheetClose asChild>
              <Link
                href={pageContext.nextHref}
                className="rounded-2xl border border-deep-olive bg-deep-olive px-4 py-3 text-sm font-semibold text-white"
              >
                {pageContext.nextLabel}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/experience-3d"
                className="rounded-2xl border border-border-soft bg-background px-4 py-3 text-sm font-semibold text-deep-olive"
              >
                Experience 3D
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
