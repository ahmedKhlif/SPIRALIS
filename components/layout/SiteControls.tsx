"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Check, ChevronDown, Moon, SunMedium } from "lucide-react";
import { FR, TN, US } from "country-flag-icons/react/3x2";
import { useI18n } from "@/components/layout/I18nProvider";
import { languages, type LanguageCode } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const themeLabel = {
  light: "Mode sombre",
  dark: "Mode clair",
};

const flagByCountry = {
  FR,
  US,
  TN,
};

function AnimatedFlag({
  countryCode,
  className,
}: {
  countryCode: (typeof languages)[number]["countryCode"];
  className?: string;
}) {
  const Flag = flagByCountry[countryCode];

  return (
    <span aria-hidden="true" className={cn("spiralis-flag", className)}>
      <Flag title="" className="h-full w-full rounded-[inherit]" />
    </span>
  );
}

export function SiteControls() {
  const { language, setLanguage, theme, toggleTheme } = useI18n();
  const [showTopButton, setShowTopButton] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeLanguage = useMemo(
    () => languages.find((item) => item.code === language) ?? languages[0],
    [language],
  );

  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const chooseLanguage = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    setLanguageMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.9rem)] left-1/2 z-[70] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1.5 rounded-full border border-border-soft bg-background/92 p-1 shadow-card backdrop-blur-xl sm:bottom-auto sm:left-auto sm:right-4 sm:top-36 sm:translate-x-0 sm:gap-2 sm:p-1.5 md:right-6 md:top-40">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={languageMenuOpen}
            aria-label={`Language ${activeLanguage.label}`}
            onClick={() => setLanguageMenuOpen((open) => !open)}
            className="flex h-10 min-w-[84px] items-center justify-center gap-2 rounded-full px-2.5 text-sm font-bold text-deep-olive transition hover:bg-pale-green/60 sm:min-w-[102px] sm:px-3.5"
          >
            <AnimatedFlag
              countryCode={activeLanguage.countryCode}
              className="h-[1rem] w-6 shrink-0 rounded-[5px]"
            />
            <span className="text-sm">{activeLanguage.shortLabel}</span>
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 transition", languageMenuOpen && "rotate-180")}
              strokeWidth={1.5}
            />
          </button>

          <div
            role="menu"
            className={cn(
              "absolute bottom-[calc(100%+0.7rem)] left-1/2 w-[min(16rem,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-[24px] border border-border-soft bg-background/96 p-2.5 shadow-card backdrop-blur-xl transition duration-200 sm:bottom-auto sm:left-auto sm:right-0 sm:top-[calc(100%+0.7rem)] sm:w-[min(17rem,calc(100vw-1.5rem))] sm:translate-x-0",
              languageMenuOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0",
            )}
          >
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                role="menuitemradio"
                aria-checked={language === item.code}
                aria-label={item.label}
                onClick={() => chooseLanguage(item.code as LanguageCode)}
                className={cn(
                  "grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] px-3 py-3 text-left text-sm font-semibold text-deep-olive transition hover:bg-pale-green/60",
                  language === item.code && "bg-pale-green/70",
                )}
              >
                <AnimatedFlag
                  countryCode={item.countryCode}
                  className="h-[1rem] w-6 shrink-0 rounded-[5px]"
                />
                <span className="min-w-0 truncate text-[1.05rem]">{item.label}</span>
                {language === item.code ? (
                  <Check className="h-4 w-4 text-sage" strokeWidth={1.9} />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <span className="h-6 w-px bg-border-soft sm:h-7" aria-hidden="true" />

        <button
          type="button"
          aria-label={themeLabel[theme]}
          title={themeLabel[theme]}
          onClick={toggleTheme}
          className="flex h-9 w-[64px] items-center rounded-full border border-border-soft bg-cream p-1 text-deep-olive transition hover:border-deep-olive/35 sm:h-10 sm:w-[74px]"
        >
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full bg-deep-olive text-white shadow-sm transition sm:h-8 sm:w-8",
              theme === "dark" && "translate-x-7 sm:translate-x-8",
            )}
          >
            {theme === "dark" ? (
              <SunMedium className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.5} />
            )}
          </span>
        </button>
      </div>

      <button
        type="button"
        aria-label="Retour en haut"
        title="Retour en haut"
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-[calc(env(safe-area-inset-bottom)+4.7rem)] right-3 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-deep-olive text-white shadow-card transition duration-300 hover:-translate-y-1 hover:bg-bottle-green sm:bottom-[calc(env(safe-area-inset-bottom)+1rem)] sm:right-4 sm:h-12 sm:w-12 md:bottom-6 md:right-6",
          showTopButton ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </>
  );
}
