"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getTranslation,
  languages,
  normalizeText,
  type LanguageCode,
} from "@/lib/i18n";

type ThemeMode = "light" | "dark";

type I18nContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_LANGUAGE = "spiralis-language";
const STORAGE_THEME = "spiralis-theme";

const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION"]);

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_THEME);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return "fr";
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_LANGUAGE);
  if (storedLanguage === "fr" || storedLanguage === "en" || storedLanguage === "ar") {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("ar")) {
    return "ar";
  }
  if (browserLanguage.startsWith("en")) {
    return "en";
  }

  return "fr";
}

function applyDocumentChrome(language: LanguageCode, theme: ThemeMode) {
  const languageConfig = languages.find((item) => item.code === language) ?? languages[0];
  document.documentElement.lang = language;
  document.documentElement.dir = languageConfig.dir;
  document.documentElement.dataset.theme = theme;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>("fr");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const sourceTextByNode = useRef(new WeakMap<Text, string>());
  const hasLoadedPreferences = useRef(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextLanguage = getInitialLanguage();
      const nextTheme = getInitialTheme();
      hasLoadedPreferences.current = true;
      setLanguageState(nextLanguage);
      setTheme(nextTheme);
      applyDocumentChrome(nextLanguage, nextTheme);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasLoadedPreferences.current) {
      applyDocumentChrome(language, theme);
      return;
    }

    applyDocumentChrome(language, theme);
    window.localStorage.setItem(STORAGE_LANGUAGE, language);
    window.localStorage.setItem(STORAGE_THEME, theme);
  }, [language, theme]);

  useEffect(() => {
    const translateTextNode = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || ignoredTags.has(parent.tagName)) {
        return;
      }

      const currentValue = node.nodeValue ?? "";
      if (!normalizeText(currentValue)) {
        return;
      }

      const source = sourceTextByNode.current.get(node) ?? normalizeText(currentValue);
      sourceTextByNode.current.set(node, source);

      const translated = getTranslation(source, language);
      if (!translated) {
        return;
      }

      const leading = currentValue.match(/^\s*/)?.[0] ?? "";
      const trailing = currentValue.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    };

    const translateTree = (root: ParentNode) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();

      while (node) {
        translateTextNode(node as Text);
        node = walker.nextNode();
      }
    };

    translateTree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node as Text);
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            translateTree(node as Element);
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language, pathname]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [language, theme],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
