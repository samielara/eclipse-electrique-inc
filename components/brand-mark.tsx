"use client";

import { useSyncExternalStore } from "react";

import { site } from "@/lib/site";

interface BrandMarkProps {
  inverse?: boolean;
  compact?: boolean;
}

type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    return window.localStorage.getItem("eclipse-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function BrandMark({ inverse = false, compact = false }: BrandMarkProps) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark");
  const activeTheme = inverse ? "dark" : theme;

  return (
    <span className="brand-lockup">
      <span className={`brand-logo-frame${inverse ? " brand-logo-inverse" : ""}`} suppressHydrationWarning>
        {/* Owner-supplied logo assets are stacked so theme changes can crossfade them. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={activeTheme === "light" ? site.legalName : ""}
          aria-hidden={activeTheme !== "light"}
          decoding="async"
          className="brand-logo-light"
          height="1402"
          src="/eclipse-logo-light.png"
          width="1122"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={activeTheme === "dark" ? site.legalName : ""}
          aria-hidden={activeTheme !== "dark"}
          className="brand-logo-dark"
          decoding="async"
          height="1402"
          src="/eclipse-logo-dark.png"
          width="1122"
        />
      </span>
      <span aria-hidden="true" className="brand-wordmark">
        <span className={inverse ? "text-white" : "text-ink"}>ÉCLIPSE</span>
        {!compact && (
          <span className={inverse ? "text-steel-light" : "text-steel"}>
            ÉLECTRIQUE
          </span>
        )}
      </span>
    </span>
  );
}
