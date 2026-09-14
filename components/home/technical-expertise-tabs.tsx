"use client";

import React, { useState } from "react";
import { ArrowRight, Cpu, Layers, ShieldCheck, Thermometer, Zap } from "lucide-react";
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
    icon: Layers,
    tabLabelFr: "Distribution",
    tabLabelEn: "Distribution",
    titleFr: "Distribution triphasée & transformateurs",
    titleEn: "3-Phase Distribution & Transformers",
    descFr:
      "Conception, calculs de charge et installation de transformateurs 600V/120-208V, panneaux de distribution maîtres et canalisations électriques industrielles.",
    descEn:
      "Design, load calculations, and installation of 600V/120-208V step-down transformers, master distribution switchboards, and heavy-gauge conduit raceways.",
    highlightsFr: [
      "Études d'arc flash et coordination sélective des protections",
      "Équilibrage rigoureux des phases et correction du facteur de puissance",
      "Raccordement de charges motrices lourdes sans fluctuation",
    ],
    highlightsEn: [
      "Arc-flash studies and selective breaker coordination",
      "Rigorous phase balancing and power-factor correction",
      "Heavy inductive motor load connections with zero voltage dip",
    ],
    image: "/media/service-industrial-master.jpg",
    href: "/services/industriel",
  },
  {
    id: "diagnostic",
    number: "02",
    icon: Cpu,
    tabLabelFr: "Diagnostic",
    tabLabelEn: "Diagnostics",
    titleFr: "Diagnostic haute précision & qualité d'onde",
    titleEn: "High-Precision Diagnostics & Power Quality",
    descFr:
      "Analyse approfondie avec multimètres industriels étalonnés, détection de transitoires, harmoniques, déséquilibres et fuites à la terre intermittentes.",
    descEn:
      "In-depth analysis using calibrated industrial multimeters, recording transients, harmonic distortion, voltage unbalances, and intermittent ground faults.",
    highlightsFr: [
      "Enregistreurs de charge triphasés et analyse de tension continue",
      "Localisation rapide des courts-circuits cachés et câblages altérés",
      "Rapports d'ingénierie détaillés signés par maître électricien CMEQ",
    ],
    highlightsEn: [
      "3-phase load loggers and continuous voltage monitoring",
      "Rapid localization of hidden short circuits and compromised wiring",
      "Comprehensive diagnostic reports certified by CMEQ master electrician",
    ],
    image: "/media/craft-diagnostics-console.jpg",
    href: "/services/maintenance",
  },
  {
    id: "thermographie",
    number: "03",
    icon: Thermometer,
    tabLabelFr: "Thermographie",
    tabLabelEn: "Thermography",
    titleFr: "Thermographie infrarouge préventive certifiée",
    titleEn: "Certified Preventive Infrared Thermography",
    descFr:
      "Inspection radiométrique sous pleine charge sans aucune interruption d'activité pour déceler les connexions desserrées et surchauffes avant tout sinistre.",
    descEn:
      "Radiometric thermal scanning under full operational load with zero downtime, identifying loose connections, load imbalances, and hotspots before failure.",
    highlightsFr: [
      "Rapport thermique certifié exigé par les assureurs d'entreprise",
      "Caméras infrarouges haute sensibilité étalonnées",
      "Prévention proactive des arrêts de production et risques d'incendie",
    ],
    highlightsEn: [
      "Certified thermal audit reports required by commercial insurers",
      "High-sensitivity calibrated industrial radiometric cameras",
      "Proactive prevention of costly production halts and electrical fires",
    ],
    image: "/media/service-thermography-master.jpg",
    href: "/services/thermographie",
  },
  {
    id: "200a",
    number: "04",
    icon: Zap,
    tabLabelFr: "200A / 400A",
    tabLabelEn: "200A / 400A",
    titleFr: "Mise aux normes 200A & 400A Hydro-Québec",
    titleEn: "200A & 400A Hydro-Québec Code Upgrades",
    descFr:
      "Remplacement complet de mât d'entrée électrique, nouveau compteur, mise à la terre aux normes 2024 et basculement planifié avec Hydro-Québec.",
    descEn:
      "Complete service mast replacement, new meter base, 2024 code-compliant grounding electrodes, and coordinated disconnect/reconnect with Hydro-Québec.",
    highlightsFr: [
      "Prise en charge intégrale des permis et demandes Hydro-Québec",
      "Remplacement en une seule journée pour minimiser la coupure",
      "Garantie décennale sur l'installation et conformité d'assurance",
    ],
    highlightsEn: [
      "Full management of municipal permits and Hydro-Québec liaison",
      "Completed in a single day to minimize household power downtime",
      "10-year workmanship guarantee and complete insurance approval",
    ],
    image: "/media/style-lock-master.jpg",
    href: "/services/residentiel",
  },
  {
    id: "industriel",
    number: "05",
    icon: ShieldCheck,
    tabLabelFr: "Industriel",
    tabLabelEn: "Industrial",
    titleFr: "Automates, variateurs (VFD) & centres MCC",
    titleEn: "PLCs, VFD Motor Drives & MCC Centers",
    descFr:
      "Câblage de commande industrielle, centres de contrôle de moteurs (MCC), variateurs de vitesse et raccordement de machinerie automatisée complexe.",
    descEn:
      "Industrial control wiring, motor control centers (MCC), variable frequency drives (VFD), and electrical automation for manufacturing equipment.",
    highlightsFr: [
      "Armoires de commande étanches NEMA 4X / IP66",
      "Blindage électromagnétique contre les parasites et harmoniques",
      "Assistance de dépannage industriel 24/7 en usine",
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
  const [activeTabId, setActiveTabId] = useState("distribution");

  const currentTab = TECH_TABS.find((t) => t.id === activeTabId) || TECH_TABS[0];

  return (
    <section
      id="expertise-technique"
      className="technical-expertise-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#0d0e10]"
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
          {TECH_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
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

        {/* Tab Content Display */}
        <div className="relative bg-[#0a101d]/85 backdrop-blur-2xl border border-white/20 rounded-[28px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] p-6 md:p-10 hover:border-amber-400/40 transition-all duration-300">
          {/* Diagonal Glass Sheen */}
          <div className="absolute inset-0 pointer-events-none z-10 rounded-[28px] bg-gradient-to-br from-white/[0.12] via-white/[0.03] via-25% to-transparent" />

          {/* Top Gloss Highlight */}
          <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-white/[0.08] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: High-Res Technical Asset */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl aspect-[16/10] bg-[#0a101d] border border-white/15 relative shadow-inner">
              <img
                key={currentTab.id + "-tech-img"}
                src={currentTab.image}
                alt={isFrench ? currentTab.titleFr : currentTab.titleEn}
                className="w-full h-full object-cover select-none filter brightness-[1.04] saturate-[1.05] animate-fade-in-up"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-mono text-amber-400 shadow-md">
                {isFrench ? "Norme CCQ / CMEQ" : "CCQ / CMEQ Standard"} · {currentTab.number}
              </div>
            </div>

            {/* Right: Technical Explanation & Highlights */}
            <div
              key={currentTab.id + "-tech-content"}
              className="lg:col-span-6 flex flex-col justify-between animate-fade-in-up"
            >
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                  {isFrench ? currentTab.tabLabelFr : currentTab.tabLabelEn}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1 mb-4">
                  {isFrench ? currentTab.titleFr : currentTab.titleEn}
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  {isFrench ? currentTab.descFr : currentTab.descEn}
                </p>

                {/* Signature Glowing Bullet Pills */}
                <div className="space-y-2.5 mb-8">
                  {(isFrench ? currentTab.highlightsFr : currentTab.highlightsEn).map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-200 flex items-center gap-3 shadow-sm hover:border-white/20 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.85)] shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={currentTab.href}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>{isFrench ? "Consulter la fiche technique" : "View technical details"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
