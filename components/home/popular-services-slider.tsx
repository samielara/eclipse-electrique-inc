"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";

interface PopularServicesSliderProps {
  locale: Locale;
}

interface ServiceSlide {
  id: string;
  number: string;
  tagFr: string;
  tagEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  benefitsFr: string[];
  benefitsEn: string[];
  image: string;
  href: string;
}

const SLIDES: ServiceSlide[] = [
  {
    id: "panneau",
    number: "01",
    tagFr: "Mise à niveau essentielle",
    tagEn: "Essential Upgrade",
    titleFr: "Panneau électrique 200A",
    titleEn: "200A Electrical Panel",
    descFr:
      "Augmentation de puissance à 200A, remplacement de boîte à fusibles ou panneau désuet, et conformité rigoureuse au Code de l'électricité du Québec.",
    descEn:
      "Upgrade to 200A service, obsolete fuse-box or breaker panel replacement, and strict Hydro-Québec / Canadian Electrical Code compliance.",
    benefitsFr: [
      "Alimente sans contrainte borne VÉ, thermopompe et spa",
      "Conformité requise par les assureurs habitation",
      "Disjoncteurs anti-arcs (AFCI) de protection incendie",
    ],
    benefitsEn: [
      "Power EV chargers, heat pumps, and spas without tripping",
      "Full compliance required by home insurance providers",
      "State-of-the-art AFCI fire-prevention circuit breakers",
    ],
    image: "/media/style-lock-master.jpg",
    href: "/services/residentiel",
  },
  {
    id: "borne-ve",
    number: "02",
    tagFr: "Énergie verte & recharge",
    tagEn: "EV Home Charging",
    titleFr: "Borne de recharge VÉ",
    titleEn: "EV Charging Station",
    descFr:
      "Installation certifiée de bornes de niveau 2 (Tesla, Flo, Grizzl-E, ChargePoint) pour une recharge rapide, pratique et sécuritaire à votre domicile.",
    descEn:
      "Certified Level 2 EV charging station installation (Tesla, Flo, Grizzl-E, ChargePoint) for fast, safe overnight charging at home.",
    benefitsFr: [
      "Recharge 5 à 7 fois plus rapide qu'une prise 120V standard",
      "Admissible aux subventions gouvernementales Roulez vert",
      "Calcul de charge résidentielle certifié par maître électricien",
    ],
    benefitsEn: [
      "5 to 7 times faster charging than a standard 120V wall outlet",
      "Eligible for Roulez vert governmental rebates (up to $600)",
      "Certified residential load calculation by master electrician",
    ],
    image: "/media/service-residential-master.jpg",
    href: "/services/residentiel",
  },
  {
    id: "eclairage",
    number: "03",
    tagFr: "Ambiance & confort",
    tagEn: "Ambiance & Comfort",
    titleFr: "Éclairage architectural & encastrés",
    titleEn: "Architectural & Recessed Lighting",
    descFr:
      "Modernisation de vos pièces avec des encastrés DEL haute performance, gradateurs intelligents et éclairage d'ambiance sur mesure sans scintillement.",
    descEn:
      "Transform your interior with high-efficiency LED recessed pot lights, smart dimming systems, and custom glare-free ambient lighting.",
    benefitsFr: [
      "Consommation d'énergie réduite jusqu'à 80% grâce au DEL",
      "Intégration domotique (Lutron Caséta, commandes intelligentes)",
      "Finition soignée sans dommage au gypse ni câblage apparent",
    ],
    benefitsEn: [
      "Reduce lighting energy consumption by up to 80% with LED",
      "Smart home integration (Lutron Caséta, app & voice control)",
      "Clean installation with zero drywall damage or visible wires",
    ],
    image: "/media/landing-hero-exterior.jpg",
    href: "/services/residentiel",
  },
  {
    id: "prises-circuits",
    number: "04",
    tagFr: "Sécurité & alimentation",
    tagEn: "Safety & Circuits",
    titleFr: "Prises, circuits dédiés & DDFT",
    titleEn: "Outlets, Dedicated Circuits & GFCI",
    descFr:
      "Alimentation dédiée pour gros appareils ménagers (four, thermopompe, spa) et protection vitale contre les chocs électriques (DDFT) et surcharges.",
    descEn:
      "Dedicated high-amperage lines for major appliances (ovens, heat pumps, hot tubs) and essential GFCI/AFCI protection against shocks and overloads.",
    benefitsFr: [
      "Fin des disjoncteurs qui sautent lors de l'utilisation simultanée",
      "Protection étanche obligatoire pour salles de bain et extérieur",
      "Vérification complète de la mise à la terre de la propriété",
    ],
    benefitsEn: [
      "End nuisance breaker tripping during heavy appliance usage",
      "Code-mandated water-resistant protection in kitchens & outdoor",
      "Full grounding verification for complete household protection",
    ],
    image: "/media/electrical-testing.webp",
    href: "/services/residentiel",
  },
  {
    id: "generatrice",
    number: "05",
    tagFr: "Continuité de puissance",
    tagEn: "Backup Power",
    titleFr: "Génératrice & commutateur automatique",
    titleEn: "Generators & Transfer Switches",
    descFr:
      "Alimentation de secours fiable lors des pannes d'Hydro-Québec et verglas. Commutateur de transfert manuel ou automatique (ATS) sécurisé.",
    descEn:
      "Dependable backup electricity during Hydro-Québec outages and ice storms. Manual or automatic transfer switches (ATS) installed to code.",
    benefitsFr: [
      "Maintien continu du chauffage, frigos et pompes de puisard",
      "Protection contre les retours de courant dangereux sur le réseau",
      "Options pour génératrices portatives ou génératrices fixes au gaz",
    ],
    benefitsEn: [
      "Keep heating, refrigerators, and sump pumps operating during storms",
      "Complete interlock protection preventing dangerous backfeeding",
      "Tailored solutions for portable or automatic whole-home units",
    ],
    image: "/media/service-generators-master-patched.png",
    href: "/services/generatrices",
  },
  {
    id: "urgence",
    number: "06",
    tagFr: "Intervention rapide 24/7",
    tagEn: "Rapid Dispatch 24/7",
    titleFr: "Urgence électrique 24/7",
    titleEn: "24/7 Emergency Service",
    descFr:
      "Équipe d'intervention prioritaire disponible jour et nuit dans le Grand Montréal pour pannes critiques, odeurs suspectes ou dangers électriques.",
    descEn:
      "Priority dispatch available day and night across Greater Montreal for sudden outages, burning smells, or dangerous electrical failures.",
    benefitsFr: [
      "Ligne d'urgence directe avec réponse humaine 24h/24",
      "Camions équipés de pièces pour dépannage sur le coup",
      "Diagnostic sécuritaire et remise sous tension immédiate",
    ],
    benefitsEn: [
      "Direct emergency phone line with immediate live response 24/7",
      "Fully stocked service vans carrying essential replacement parts",
      "Immediate hazard isolation and rapid, safe power restoration",
    ],
    image: "/media/service-emergency-master.jpg",
    href: "/contact",
  },
];

export function PopularServicesSlider({ locale }: PopularServicesSliderProps) {
  const isFrench = locale === "fr";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Swipe & Drag State
  const dragStartX = useRef<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number, dir?: "next" | "prev") => {
      if (isTransitioning || index === currentIndex) return;
      const computedDir = dir || (index > currentIndex ? "next" : "prev");
      setDirection(computedDir);
      setIsTransitioning(true);
      setCurrentIndex(index);

      // Reset transition state after 600ms
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    },
    [currentIndex, isTransitioning]
  );

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % SLIDES.length;
    goToSlide(nextIndex, "next");
  }, [currentIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
    goToSlide(prevIndex, "prev");
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const container = sliderContainerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (container) {
        container.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleNext, handlePrev]);

  // Touch and Mouse Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    dragStartX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    dragStartX.current = null;
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      id="services-populaires"
      className="popular-services-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#08090b]"
      aria-label={isFrench ? "Services électriques populaires" : "Popular electrical services"}
    >
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        {/* Header with Centered Eyebrow and Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "SERVICES POPULAIRES" : "POPULAR SERVICES"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench
              ? "Nos interventions les plus demandées"
              : "Our most requested electrical services"}
          </h2>
        </div>

        {/* Relative Slider Wrapper with Left & Right Arrows at Center Level */}
        <div className="relative">
          {/* Left Arrow at Center Level on Left Side */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isTransitioning}
            aria-label={isFrench ? "Service précédent" : "Previous service"}
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-slate-900/90 backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow at Center Level on Right Side */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label={isFrench ? "Service suivant" : "Next service"}
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-slate-900/90 backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Cinematic Split Slide Container */}
          <div
            ref={sliderContainerRef}
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="cinematic-slider-frame relative bg-[#0a101d]/85 backdrop-blur-2xl border border-white/20 rounded-[28px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] p-6 md:p-10 cursor-grab active:cursor-grabbing outline-none focus:border-amber-400/50"
          >
            {/* Diagonal Glass Sheen */}
            <div className="absolute inset-0 pointer-events-none z-10 rounded-[28px] bg-gradient-to-br from-white/[0.12] via-white/[0.03] via-25% to-transparent" />

            {/* Top Gloss Highlight */}
            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-white/[0.08] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left: Large Cinematic Image */}
              <div className="lg:col-span-7 overflow-hidden rounded-2xl relative aspect-[16/10] bg-[#0a101d] border border-white/15 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={currentSlide.id + "-img"}
                  src={currentSlide.image}
                  alt={isFrench ? currentSlide.titleFr : currentSlide.titleEn}
                  className={`w-full h-full object-cover select-none filter brightness-[1.04] saturate-[1.05] transition-all duration-600 ease-out ${
                    direction === "next"
                      ? "animate-slide-in-right"
                      : "animate-slide-in-left"
                  }`}
                  loading="eager"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-mono text-amber-400 shadow-md">
                  {isFrench ? currentSlide.tagFr : currentSlide.tagEn}
                </div>
              </div>

              {/* Right: Explanatory Content & Bulleted Benefits */}
              <div
                key={currentSlide.id + "-content"}
                className={`lg:col-span-5 flex flex-col justify-between transition-all duration-500 ease-out delay-100 ${
                  direction === "next" ? "animate-fade-in-up" : "animate-fade-in-up"
                }`}
              >
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {isFrench ? "Option certifiée" : "Certified Option"} · {currentSlide.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1 mb-4">
                    {isFrench ? currentSlide.titleFr : currentSlide.titleEn}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    {isFrench ? currentSlide.descFr : currentSlide.descEn}
                  </p>

                  {/* Benefits Checklist with Amber Checkmarks */}
                  <div className="space-y-2.5 mb-8">
                    {(isFrench ? currentSlide.benefitsFr : currentSlide.benefitsEn).map(
                      (benefit, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-200 flex items-center gap-3 shadow-sm hover:border-white/20 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                          <span className="font-medium leading-tight">
                            {benefit}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={currentSlide.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>{isFrench ? "Voir le service" : "View service details"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                    {isFrench ? "Glissez ou utilisez les flèches" : "Drag or use arrows"}
                  </span>
                </div>
              </div>
            </div>

            {/* Clickable Progress Dots Bar with Centered 05/06 and View All Link */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {/* Progress Dots */}
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label={isFrench ? "Sélecteur de diapositives" : "Slide selector"}
              >
                {SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Slide ${idx + 1}`}
                      onClick={() => goToSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 bg-amber-400"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Centered Counter Pill */}
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <strong className="text-amber-400 text-sm font-bold">{currentSlide.number}</strong>
                <span className="text-slate-600">/</span>
                <span>0{SLIDES.length}</span>
              </div>

              {/* View All Services CTA */}
              <a
                href={pathFor("services", locale)}
                className="text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>{isFrench ? "Voir tous les services" : "View all services"}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
