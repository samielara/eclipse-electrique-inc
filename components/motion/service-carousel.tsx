"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { ServiceCard } from "@/components/service-card";
import type { LocalizedPage } from "@/content/site-content";
import { pathFor, type Locale, type ServicePageId } from "@/lib/routes";

interface ServiceCarouselItem {
  id: ServicePageId;
  page: LocalizedPage;
}

export function ServiceCarousel({
  locale,
  items,
  actionLabel,
  eyebrow,
  title,
  intro,
  variant = "default",
}: {
  locale: Locale;
  items: ServiceCarouselItem[];
  actionLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  variant?: "default" | "city";
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (variant === "city" || paused || reducedMotion || items.length < 2) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % items.length), 5200);
    return () => window.clearInterval(timer);
  }, [items.length, paused, reducedMotion]);

  const select = (index: number) => setActive((index + items.length) % items.length);
  const tabId = (id: ServicePageId) => `service-tab-${id}`;
  const panelId = (id: ServicePageId) => `service-panel-${id}`;
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next = event.key === "ArrowRight" || event.key === "ArrowDown"
      ? (index + 1) % items.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp"
        ? (index - 1 + items.length) % items.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? last
            : index;

    if (next === index && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    setActive(next);
    document.getElementById(tabId(items[next].id))?.focus();
  };
  const item = items[active];
  const setDepth = (x = 0, y = 0) => {
    stageRef.current?.style.setProperty("--service-depth-x", `${x}px`);
    stageRef.current?.style.setProperty("--service-depth-y", `${y}px`);
  };

  return (
    <div
      className={`service-carousel${variant === "city" ? " service-carousel-city" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    >
      <div
        aria-live="polite"
        className="service-carousel-stage service-carousel-stage-3d"
        onPointerLeave={() => setDepth()}
        onPointerMove={(event) => {
          if (reducedMotion || event.pointerType !== "mouse") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          setDepth(
            Math.max(-6, Math.min(6, ((event.clientX - bounds.left) / bounds.width - 0.5) * 12)),
            Math.max(-4, Math.min(4, ((event.clientY - bounds.top) / bounds.height - 0.5) * 8))
          );
        }}
        ref={stageRef}
      >
        <div className="service-carousel-copy">
          <div className="service-context-badge">
            <span className="service-context-dot" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <h2>{title}</h2>
          <p>{intro}</p>

          {variant === "default" && (
            <div className="service-carousel-bar">
              <div className="service-carousel-tabs" role="tablist" aria-label={locale === "fr" ? "Parcours de services" : "Service pathways"}>
                {items.map((entry, index) => (
                  <button
                    aria-controls={panelId(entry.id)}
                    aria-label={`${locale === "fr" ? "Voir" : "View"} ${entry.page.eyebrow}`}
                    aria-selected={index === active}
                    className={`service-tab-pill${index === active ? " is-active" : ""}`}
                    id={tabId(entry.id)}
                    key={entry.id}
                    onClick={() => select(index)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    role="tab"
                    tabIndex={index === active ? 0 : -1}
                    type="button"
                  >
                    <span className="service-tab-index">0{index + 1}</span>
                    <span className="service-carousel-tab-label">{entry.page.eyebrow}</span>
                  </button>
                ))}
              </div>

              <div className="service-carousel-actions">
              <button
                aria-label={locale === "fr" ? "Service précédent" : "Previous service"}
                onClick={() => select(active - 1)}
                type="button"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <span className="service-carousel-counter" aria-live="polite">
                0{active + 1} / 0{items.length}
              </span>
              <button
                aria-label={locale === "fr" ? "Service suivant" : "Next service"}
                onClick={() => select(active + 1)}
                type="button"
              >
                <ChevronRight aria-hidden="true" />
              </button>
              <button
                aria-label={
                  paused
                    ? locale === "fr"
                      ? "Reprendre le diaporama"
                      : "Resume slideshow"
                    : locale === "fr"
                    ? "Mettre le diaporama en pause"
                    : "Pause slideshow"
                }
                onClick={() => setPaused(value => !value)}
                type="button"
              >
                {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              </button>
              </div>
            </div>
          )}
        </div>

        <div className="service-carousel-surface">
          <div
            aria-label={variant === "city" ? item.page.eyebrow : undefined}
            aria-labelledby={variant === "default" ? tabId(item.id) : undefined}
            className="service-carousel-card"
            id={panelId(item.id)}
            key={item.id}
            role="tabpanel"
            tabIndex={0}
          >
            <ServiceCard actionLabel={actionLabel} locale={locale} page={item.page} serviceId={item.id} />
          </div>
          {variant === "city" && (
            <div className="city-service-carousel-arrows">
              <button aria-label={locale === "fr" ? "Service précédent" : "Previous service"} onClick={() => select(active - 1)} type="button">
                <ChevronLeft aria-hidden="true" />
              </button>
              <button aria-label={locale === "fr" ? "Service suivant" : "Next service"} onClick={() => select(active + 1)} type="button">
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {variant === "city" && (
          <span className="city-service-carousel-counter" aria-live="polite">0{active + 1} <i>/</i> 0{items.length}</span>
        )}
      </div>
    </div>
  );
}
