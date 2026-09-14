"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/routes";

export interface HeroSlideItem {
  src: string;
  alt: string;
  label?: string;
  id?: string;
  objectPosition?: string;
}

interface HeroMediaTransitionProps {
  primarySrc?: string;
  primaryAlt?: string;
  secondarySrc?: string;
  secondaryAlt?: string;
  items?: HeroSlideItem[];
  locale?: Locale;
  intervalMs?: number;
  transitionDelayMs?: number;
  className?: string;
  showIndicators?: boolean;
}

export function HeroMediaTransition({
  primarySrc,
  primaryAlt,
  secondarySrc,
  secondaryAlt,
  items,
  locale = "fr",
  intervalMs = 4000,
  transitionDelayMs,
  className = "",
  showIndicators = true,
}: HeroMediaTransitionProps) {
  const isFrench = locale === "fr";

  // Build resolved slide items
  const resolvedItems: HeroSlideItem[] =
    items && items.length > 0
      ? items
      : [
          {
            src: primarySrc || "/media/eclipse-team-fleet-hero.jpg",
            alt: primaryAlt || "Éclipse Électrique Équipe et Flotte",
            label: isFrench ? "01 Flotte" : "01 Fleet",
            id: "fleet",
            objectPosition: "46% 75%",
          },
          ...(secondarySrc
            ? [
                {
                  src: secondarySrc,
                  alt: secondaryAlt || "Carte de couverture",
                  label: isFrench ? "02 Carte" : "02 Coverage Map",
                  id: "map",
                  objectPosition: "center center",
                },
              ]
            : []),
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const cycleDuration = intervalMs ?? transitionDelayMs ?? 4000;

  // Continuous infinite rotation loop every 2 to 3 seconds with timer reset on slide change
  useEffect(() => {
    if (resolvedItems.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % resolvedItems.length);
    }, cycleDuration);

    return () => window.clearInterval(timer);
  }, [resolvedItems.length, cycleDuration, activeIndex]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div
      className={`hero-media-rotator relative w-full h-full overflow-hidden ${className}`}
      data-testid="hero-media-rotator"
      data-active-index={activeIndex}
    >
      {/* Rotated Media Items */}
      {resolvedItems.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={item.src + index}
            alt={item.alt}
            className={`banner-media-img banner-rotator-item absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
            height="1080"
            loading="eager"
            src={item.src}
            style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
            width="1920"
          />
        );
      })}

      {/* Sleek Minimal Switcher Pills */}
      {showIndicators && resolvedItems.length > 1 && (
        <div
          className="hero-media-indicators absolute bottom-4 right-6 z-20 flex items-center gap-2 pointer-events-auto"
          aria-label={isFrench ? "Sélecteur de vue visuelle" : "Visual view selector"}
        >
          {resolvedItems.map((item, index) => {
            const isSelected = index === activeIndex;
            const fallbackLabel = `0${index + 1}`;
            return (
              <button
                key={item.src + index + "-btn"}
                type="button"
                onClick={() => handleSelect(index)}
                className={`hero-indicator-btn px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                    : "bg-slate-900/70 text-slate-300 hover:text-white backdrop-blur-md border border-white/10"
                }`}
                aria-pressed={isSelected}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>{item.label || fallbackLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
