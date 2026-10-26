"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/routes";

import { residentialServices, residentialServicePath } from "@/content/residential-services";
const RESIDENTIAL_WORK = residentialServices;

export function ResidentialWorkExplorer({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState(RESIDENTIAL_WORK[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const shouldFollowActiveTab = useRef(false);
  const isFrench = locale === "fr";
  const activeIndex = Math.max(0, RESIDENTIAL_WORK.findIndex((item) => item.id === activeId));
  const activeItem = RESIDENTIAL_WORK[activeIndex];
  const selectRelativeItem = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + RESIDENTIAL_WORK.length) % RESIDENTIAL_WORK.length;
    shouldFollowActiveTab.current = true;
    setActiveId(RESIDENTIAL_WORK[nextIndex].id);
  };

  useEffect(() => {
    if (!shouldFollowActiveTab.current) return;
    tabRefs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    shouldFollowActiveTab.current = false;
  }, [activeId]);

  return (
    <section className="residential-work-explorer" data-testid="residential-work-explorer">
      <div className="site-container">
        <header className="residential-work-explorer-heading">
          <p className="eyebrow">{isFrench ? "Travaux offerts dans cette catégorie" : "Published work in this category"}</p>
          <h2>{isFrench ? "Un aperçu des travaux offerts" : "An overview of available work"}</h2>
          <p>{isFrench ? "Décrivez l'installation actuelle, les travaux prévus et l'emplacement. L'équipe pourra discuter de la portée de votre demande et des prochaines étapes." : "Describe the current installation, planned work and location. The team can discuss the scope of your request and the next steps."}</p>
        </header>

        <div className="residential-work-tabs" role="tablist" aria-label={isFrench ? "Travaux résidentiels" : "Residential work"}>
          {RESIDENTIAL_WORK.map((item) => {
            const active = item.id === activeId;
            return (
              <button ref={(element) => { tabRefs.current[item.id] = element; }} key={item.id} type="button" role="tab" aria-selected={active} aria-controls="residential-work-panel" onClick={() => setActiveId(item.id)} className={active ? "is-active" : undefined}>
                <span>{item.number}</span><strong>{item.label[locale]}</strong>
              </button>
            );
          })}
        </div>

        <div className="residential-work-stage" id="residential-work-panel" role="tabpanel">
          <div className="residential-work-image-shell">
            <div className="residential-work-image-wrap">
              <img key={activeItem.id} data-testid="residential-work-image" src={activeItem.image} alt={activeItem.title[locale]} />
            </div>
          </div>
          <div className="residential-work-copy" key={`${activeItem.id}-copy`}>
            <p className="eyebrow">{activeItem.label[locale]}</p>
            <h3>{activeItem.title[locale]}</h3>
            <p>{activeItem.description[locale]}</p>
            <ul>
              {activeItem.highlights[locale].map((highlight) => <li key={highlight}><Check aria-hidden="true" />{highlight}</li>)}
            </ul>
            <a href={residentialServicePath(locale,activeItem.id)}>{isFrench ? "Découvrir ce service" : "Explore this service"}<ArrowRight aria-hidden="true" /></a>
          </div>
          <button className="residential-image-control is-previous" type="button" onClick={() => selectRelativeItem(-1)} aria-label={isFrench ? "Service résidentiel précédent" : "Previous residential service"}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button className="residential-image-control is-next" type="button" onClick={() => selectRelativeItem(1)} aria-label={isFrench ? "Service résidentiel suivant" : "Next residential service"}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <span className="residential-work-counter" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} <i>/</i> {String(RESIDENTIAL_WORK.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
