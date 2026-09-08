"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { content } from "@/content/site-content";
import type { Locale } from "@/lib/routes";

type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    return window.localStorage.getItem("eclipse-theme") === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark");
  const isFrench = locale === "fr";

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("eclipse-theme", nextTheme);
    } catch {
      // The page remains usable when storage is unavailable.
    }
    window.dispatchEvent(new Event("storage"));
  }

  const label =
    theme === "dark"
      ? isFrench
        ? "Passer au thème clair"
        : "Switch to light theme"
      : isFrench
        ? "Passer au thème sombre"
        : "Switch to dark theme";

  return (
    <button
      aria-label={label}
      aria-pressed={theme === "light"}
      className="theme-toggle"
      data-theme-toggle="true"
      onClick={toggleTheme}
      suppressHydrationWarning
      type="button"
    >
      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span className="sr-only">{content[locale].languageName}: {label}</span>
    </button>
  );
}
