"use client";

import React, { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Cpu, Layers, ShieldCheck, Thermometer, Zap } from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";

interface TechnicalExpertiseTabsProps {
  locale: Locale;
}

interface TechTab {
  id: string;
  number: string;
  icon: React.ElementType;
  tabLabelFr: string;
  tabLabelEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  highlightsFr: string[];
  highlightsEn: string[];
  image: string;
  href: string;
}

const TECH_TABS: TechTab[] = [
  {
    id: "distribution",
    number: "01",
    icon: Zap,
    tabLabelFr: "Distribution",
    tabLabelEn: "Distribution",
    titleFr: "Distribution 3-Phases & Transformateurs",
    titleEn: "3-Phase Distribution & Transformers",
    descFr:
      "Calculs de charge, ingénierie et raccordement de transformateurs 600V/120-208V, panneaux de distribution maîtres et canalisations lourdes.",
    descEn:
      "Design, load calculations, and installation of 600V/120-208V step-down transformers, master distribution switchboards, and heavy-gauge conduit raceways.",
    highlightsFr: [
      "Études d'arc électrique (arc-flash) et coordination sélective",
      "Équilibrage rigoureux des phases et correction du facteur de puissance",
      "Raccordement de charges inductives lourdes sans affaissement de tension",
    ],
    highlightsEn: [
      "Arc-flash studies and selective breaker coordination",
      "Rigorous phase balancing and power-factor correction",
      "Heavy inductive motor load connections with zero voltage dip",
    ],
    image: "/media/service-industrial-01.png",
    href: "/services/industriel",
  },
  {
    id: "diagnostics",
    number: "02",
    icon: Cpu,
    tabLabelFr: "Diagnostics",
    tabLabelEn: "Diagnostics",
    titleFr: "Diagnostics & Analyse de Qualité d'Onde",
    titleEn: "Diagnostics & Power Quality Analysis",
    descFr:
      "Dépannage d'anomalies intermittentes, détection d'harmoniques et enregistrement des creux de tension pour protéger vos équipements sensibles.",
    descEn:
      "Troubleshooting intermittent faults, harmonic detection, and transient voltage recording to safeguard sensitive automated production lines.",
    highlightsFr: [
      "Analyseurs de réseau Fluke classe A haute précision",
      "Identification des harmoniques responsables de surchauffe",
      "Rapport d'ingénierie certifié avec recommandations correctives",
    ],
    highlightsEn: [
      "High-precision Class-A Fluke power network analyzers",
      "Identification of triplen harmonics causing neutral overheating",
      "Certified engineering report with prioritized corrective actions",
    ],
    image: "/media/service-maintenance-03.png",
    href: "/services/maintenance",
  },
  {
    id: "thermographie",
    number: "03",
    icon: Thermometer,
    tabLabelFr: "Thermographie",
    tabLabelEn: "Thermography",
    titleFr: "Thermographie Infrarouge Prédictive",
    titleEn: "Predictive Infrared Thermography",
    descFr:
      "Inspection thermographique non destructive certifiée niveau II pour repérer les points chauds et défauts de serrage avant toute défaillance.",
    descEn:
      "Non-destructive certified Level II infrared inspections detecting loose terminations, unbalanced loads, and overloaded breakers before outages occur.",
    highlightsFr: [
      "Conforme aux exigences des assureurs majeurs du Québec",
      "Rapport complet avec thermogrammes calibrés et matrice de sévérité",
      "Zéro arrêt de production requis durant l'inspection",
    ],
    highlightsEn: [
      "Fully compliant with Quebec commercial underwriter requirements",
      "Comprehensive reports with calibrated thermograms & delta-T analysis",
      "Zero facility downtime required during on-load inspections",
    ],
    image: "/media/service-thermography-01.png",
    href: "/services/thermographie",
  },
  {
    id: "entrees-electriques",
    number: "04",
    icon: ShieldCheck,
    tabLabelFr: "200A / 400A",
    tabLabelEn: "200A / 400A",
    titleFr: "Mises aux Normes & Entrées 200A à 800A",
    titleEn: "Service Entrances: 200A to 800A Upgrades",
    descFr:
      "Remplacement d'entrées électriques désuètes, coordination directe avec Hydro-Québec et pose de mâts d'entrée conformes au Code de l'électricité du Québec.",
    descEn:
      "Complete service entrance replacement, direct Hydro-Québec coordination, and heavy weatherhead masts built strictly to Quebec Electrical Code.",
    highlightsFr: [
      "Prise en charge intégrale des demandes d'autorisation Hydro-Québec",
      "Coupure et rétablissement coordonnés en une seule journée",
      "Mise à la terre rigoureuse et protection parafoudre intégrée",
    ],
    highlightsEn: [
      "Turnkey Hydro-Québec utility disconnect/reconnect coordination",
      "Streamlined single-day turnaround to minimize disruption",
      "Heavy grounding grid & integrated Type 1 surge protective devices",
    ],
    image: "/media/residential-service-entrances-panels.png",
    href: "/services/commercial",
  },
  {
    id: "industriel",
    number: "05",
    icon: Layers,
    tabLabelFr: "Industriel",
    tabLabelEn: "Industrial",
    titleFr: "Automatisation & Contrôle Industriel",
    titleEn: "Industrial Automation & Controls",
    descFr:
      "Câblage de variateurs de fréquence (VFD), automates programmables (PLC), capteurs de sécurité et panneaux de contrôle sur mesure.",
    descEn:
      "Wiring for variable frequency drives (VFDs), PLCs, safety interlocks, motor starters, and custom-built CSA/UL508A control enclosures.",
    highlightsFr: [
      "Boîtiers étanches NEMA 4X / IP66 certifiés pour environnements rudes",
      "Câblage blindé immunisé contre les interférences électromagnétiques",
      "Service d'urgence prioritaire 24/7 pour lignes d'assemblage",
    ],
    highlightsEn: [
      "NEMA 4X / IP66 rated waterproof industrial enclosures",
      "Shielded cabling preventing electromagnetic interference",
      "24/7 priority emergency troubleshooting for factory lines",
    ],
    image: "/media/service-commercial-master.jpg",
    href: "/services/industriel",
  },
];

export function TechnicalExpertiseTabs({ locale }: TechnicalExpertiseTabsProps) {
  const isFrench = locale === "fr";
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTab = TECH_TABS[currentIndex] || TECH_TABS[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? TECH_TABS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === TECH_TABS.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <section
      id="expertise-technique"
      className="technical-expertise-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#08090b]"
    >
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "EXPERTISE POINTUE" : "PROGRESSIVE DISCLOSURE"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench ? "Notre expertise technique de pointe" : "Our High-Precision Technical Capabilities"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base mb-5">
            {isFrench
              ? "Pour les gestionnaires d'immeubles, ingénieurs et projets nécessitant des normes industrielles strictes."
              : "For building managers, engineers, and commercial facilities requiring rigorous CCQ & CMEQ standards."}
          </p>

          <a
            href={pathFor("services", locale)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{isFrench ? "Explorer tous les domaines d'intervention" : "Explore all service areas"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Tab Navigation Pill Bar (Centered) */}
        <div
          role="tablist"
          aria-label={isFrench ? "Onglets d'expertise" : "Expertise tabs"}
          className="flex items-center justify-center flex-wrap gap-2.5 pb-4 mb-8"
        >
          {TECH_TABS.map((tab, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setCurrentIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wide transition-all duration-300 flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? "bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105"
                    : "bg-[#0c121e] text-slate-400 border-white/10 hover:text-white hover:border-amber-400/30"
                }`}
              >
                <span>{tab.number}</span>
                <span>{isFrench ? tab.tabLabelFr : tab.tabLabelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Relative Slider Wrapper with Left & Right Arrows at Center Level */}
        <div className="relative">
          {/* Left Arrow at Center Level on Left Side */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={isFrench ? "Domaine précédent" : "Previous capability"}
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-slate-900/90 backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow at Center Level on Right Side */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={isFrench ? "Domaine suivant" : "Next capability"}
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-slate-900/90 backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Tab Content Display - Harmonized Modal Card Look & Feel */}
          <div className="relative bg-[#0a101d]/85 backdrop-blur-2xl border border-white/20 rounded-[28px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] p-6 md:p-10 hover:border-amber-400/40 transition-all duration-300">
            {/* Diagonal Glass Sheen */}
            <div className="absolute inset-0 pointer-events-none z-10 rounded-[28px] bg-gradient-to-br from-white/[0.12] via-white/[0.03] via-25% to-transparent" />

            {/* Top Gloss Highlight */}
            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-white/[0.08] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: High-Res Technical Asset (7 cols split matching Popular Services) */}
            <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-[#0a101d] border border-white/15 relative shadow-inner">
              <img
                key={currentTab.id + "-tech-img"}
                src={currentTab.image}
                alt={isFrench ? currentTab.titleFr : currentTab.titleEn}
                className="w-full h-full object-cover select-none filter brightness-[1.04] saturate-[1.05] animate-fade-in-up"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-mono text-amber-400 shadow-md">
                {isFrench ? "Norme CCQ / CMEQ" : "CCQ / CMEQ Standard"} · {currentTab.number}
              </div>
            </div>

            {/* Right: Technical Explanation & Highlights (5 cols split matching Popular Services) */}
            <div
              key={currentTab.id + "-tech-content"}
              className="lg:col-span-5 flex flex-col justify-between animate-fade-in-up"
            >
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  {isFrench ? "Norme CCQ / CMEQ" : "CCQ / CMEQ Standard"} · {currentTab.number}
                </span>
                <div className="mt-1 mb-1">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    {isFrench ? currentTab.tabLabelFr : currentTab.tabLabelEn}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                  {isFrench ? currentTab.titleFr : currentTab.titleEn}
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  {isFrench ? currentTab.descFr : currentTab.descEn}
                </p>

                {/* Benefits Checklist with Amber CheckCircle2 Icons */}
                <div className="space-y-2.5 mb-8">
                  {(isFrench ? currentTab.highlightsFr : currentTab.highlightsEn).map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-200 flex items-center gap-3 shadow-sm hover:border-white/20 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                        <span className="font-medium leading-tight">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Action Button & Link matching Popular Services */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={currentTab.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>{isFrench ? "Consulter la fiche technique" : "View technical details"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  {isFrench ? "Certifié CMEQ / RBQ" : "RBQ & CMEQ Certified"}
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
