"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Building2,
  House,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { SectorId, SectorMatrixCopy } from "@/content/site-content";
import { pathFor, type Locale } from "@/lib/routes";

interface SectorMatrixProps {
  locale: Locale;
  copy: SectorMatrixCopy;
}

const sectorIcons: Record<SectorId, LucideIcon> = {
  residential: House,
  commercialIndustrial: Building2,
  thermography: ScanSearch,
  security: ShieldCheck,
};

export function SectorMatrix({ locale, copy }: SectorMatrixProps) {
  const matrixId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const initialId = copy.tabs[0]?.id ?? "residential";
  const [activeId, setActiveId] = useState<SectorId>(initialId);
  const activeTab = copy.tabs.find((tab) => tab.id === activeId) ?? copy.tabs[0];

  if (!activeTab) return null;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = copy.tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = copy.tabs[nextIndex];
    setActiveId(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      aria-labelledby={`${matrixId}-title`}
      className="sector-matrix-section section-pad"
      id="service-matrix"
    >
      <div className="site-container">
        <div className="section-heading">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id={`${matrixId}-title`}>{copy.title}</h2>
          <p className="section-intro">{copy.intro}</p>
        </div>

        <div className="sector-matrix">
          <div
            aria-label={copy.tablistLabel}
            className="sector-matrix-tabs"
            role="tablist"
          >
            {copy.tabs.map((tab, index) => {
              const Icon = sectorIcons[tab.id];
              const tabId = `${matrixId}-tab-${tab.id}`;

              return (
                <button
                  aria-controls={`${matrixId}-panel-${tab.id}`}
                  aria-selected={activeTab.id === tab.id}
                  className="sector-matrix-tab"
                  id={tabId}
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  role="tab"
                  tabIndex={activeTab.id === tab.id ? 0 : -1}
                  type="button"
                >
                  <span className="sector-matrix-tab-icon" aria-hidden="true">
                    <Icon strokeWidth={1.8} />
                  </span>
                  <span className="sector-matrix-tab-copy">
                    <strong>{tab.label}</strong>
                    <small>{tab.secondaryLabel}</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="sector-matrix-panels">
            {copy.tabs.map((tab, index) => {
              const isActive = tab.id === activeTab.id;
              const tabId = `${matrixId}-tab-${tab.id}`;
              const panelId = `${matrixId}-panel-${tab.id}`;
              const secondaryLabel =
                tab.secondaryRoute === "industrial"
                  ? locale === "fr"
                    ? "Industriel"
                    : "Industrial"
                  : locale === "fr"
                    ? "Commercial"
                    : "Commercial";

              return (
                <div
                  aria-labelledby={tabId}
                  className={`sector-matrix-panel${isActive ? " is-active" : ""}`}
                  hidden={!isActive}
                  id={panelId}
                  key={tab.id}
                  role="tabpanel"
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="sector-matrix-panel-heading">
                    <div>
                      <p className="eyebrow">{tab.secondaryLabel}</p>
                      <h3>{tab.title}</h3>
                    </div>
                    <span className="sector-panel-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="sector-matrix-panel-intro">{tab.intro}</p>
                  <ul className="sector-matrix-list">
                    {tab.items.map((item) => (
                      <li key={item}>
                        <span className="sector-matrix-check" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="sector-matrix-panel-actions">
                    <a className="sector-matrix-link" href={pathFor(tab.route, locale)}>
                      {copy.viewDetails}
                      <ArrowRight aria-hidden="true" />
                    </a>
                    {tab.secondaryRoute && (
                      <a
                        className="sector-matrix-secondary-link"
                        href={pathFor(tab.secondaryRoute, locale)}
                      >
                        {copy.secondaryLinkLabel}: {secondaryLabel}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
