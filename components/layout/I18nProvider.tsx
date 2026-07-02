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
const skipTranslationSelector = "[data-no-translate='true']";

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

function shouldSkipTranslation(element: Element | null) {
  if (!element) {
    return false;
  }

  if (element.closest(skipTranslationSelector)) {
    return true;
  }

  return element.tagName.includes("-");
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>("fr");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [locationKey, setLocationKey] = useState("");
  const sourceTextByNode = useRef(new WeakMap<Text, string>());
  const sourceAttributesByElement = useRef(new WeakMap<Element, Map<string, string>>());
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
    const syncLocationKey = () => {
      setLocationKey(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    };

    syncLocationKey();
    window.addEventListener("popstate", syncLocationKey);
    window.addEventListener("hashchange", syncLocationKey);
    window.addEventListener("locationchange", syncLocationKey);

    return () => {
      window.removeEventListener("popstate", syncLocationKey);
      window.removeEventListener("hashchange", syncLocationKey);
      window.removeEventListener("locationchange", syncLocationKey);
    };
  }, []);

  useEffect(() => {
    sourceTextByNode.current = new WeakMap<Text, string>();
    sourceAttributesByElement.current = new WeakMap<Element, Map<string, string>>();
  }, [pathname, locationKey]);

  useEffect(() => {
    const translatableAttributes = ["aria-label", "title", "placeholder", "alt"] as const;

    const translateTextNode = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || ignoredTags.has(parent.tagName) || shouldSkipTranslation(parent)) {
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

    const translateElementAttributes = (element: Element) => {
      if (shouldSkipTranslation(element)) {
        return;
      }

      let sourceAttributes = sourceAttributesByElement.current.get(element);
      if (!sourceAttributes) {
        sourceAttributes = new Map<string, string>();
        sourceAttributesByElement.current.set(element, sourceAttributes);
      }

      for (const attributeName of translatableAttributes) {
        const currentValue = element.getAttribute(attributeName);
        if (!currentValue || !normalizeText(currentValue)) {
          continue;
        }

        const source = sourceAttributes.get(attributeName) ?? normalizeText(currentValue);
        sourceAttributes.set(attributeName, source);

        const translated = getTranslation(source, language);
        if (translated) {
          element.setAttribute(attributeName, translated);
        }
      }
    };

    const translateTree = (root: ParentNode) => {
      if (root instanceof Element) {
        if (shouldSkipTranslation(root)) {
          return;
        }

        translateElementAttributes(root);
        root.querySelectorAll("*").forEach((element) => {
          if (!shouldSkipTranslation(element)) {
            translateElementAttributes(element);
          }
        });
      }

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();

      while (node) {
        translateTextNode(node as Text);
        node = walker.nextNode();
      }
    };

    const frame = window.requestAnimationFrame(() => {
      translateTree(document.body);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [language, pathname, locationKey]);

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
