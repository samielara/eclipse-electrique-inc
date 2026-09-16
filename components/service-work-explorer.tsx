"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/routes";
import type { ServiceWorkExplorerData } from "@/content/service-work-explorer";

interface ServiceWorkExplorerProps {
  locale: Locale;
  data: ServiceWorkExplorerData;
}

export function ServiceWorkExplorer({ locale, data }: ServiceWorkExplorerProps) {
  const { items } = data;
  const [activeId, setActiveId] = useState(items[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const shouldFollowActiveTab = useRef(false);
  const isFrench = locale === "fr";

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const activeItem = items[activeIndex] ?? items[0];

  const selectRelativeItem = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + items.length) % items.length;
    shouldFollowActiveTab.current = true;
    setActiveId(items[nextIndex].id);
  };

  useEffect(() => {
    if (!shouldFollowActiveTab.current) return;
    tabRefs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    shouldFollowActiveTab.current = false;
  }, [activeId]);

  // Reset to first item when data changes (route navigation)
  useEffect(() => {
    setActiveId(items[0].id);
  }, [data.serviceId, items]);

  return (
    <section className="service-work-explorer" data-testid="service-work-explorer">
      <div className="site-container">
        <header className="service-work-explorer-heading">
          <p className="eyebrow">{data.eyebrow[locale]}</p>
          <h2>{data.heading[locale]}</h2>
          <p>{data.lead[locale]}</p>
        </header>

        <div
          className="service-work-tabs"
          role="tablist"
          aria-label={isFrench ? "Travaux offerts" : "Available work"}
        >
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <button
                ref={(element) => { tabRefs.current[item.id] = element; }}
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="service-work-panel"
                onClick={() => setActiveId(item.id)}
                className={active ? "is-active" : undefined}
              >
                <span>{item.number}</span>
                <strong>{item.label[locale]}</strong>
              </button>
            );
          })}
        </div>

        <div className="service-work-stage" id="service-work-panel" role="tabpanel">
          <div className="service-work-image-shell">
            <div className="service-work-image-wrap">
              <img
                key={activeItem.id}
                data-testid="service-work-image"
                src={activeItem.image}
                alt={activeItem.title[locale]}
              />
            </div>
          </div>

          <div className="service-work-copy" key={`${activeItem.id}-copy`}>
            <p className="eyebrow">{activeItem.label[locale]}</p>
            <h3>{activeItem.title[locale]}</h3>
            <p>{activeItem.description[locale]}</p>
            <ul>
              {activeItem.highlights[locale].map((highlight) => (
                <li key={highlight}>
                  <Check aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
            <a href="#quote-intake">
              {isFrench ? "Demander ce service" : "Request this service"}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <button
            className="service-work-control is-previous"
            type="button"
            onClick={() => selectRelativeItem(-1)}
            aria-label={isFrench ? "Service précédent" : "Previous service"}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            className="service-work-control is-next"
            type="button"
            onClick={() => selectRelativeItem(1)}
            aria-label={isFrench ? "Service suivant" : "Next service"}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
