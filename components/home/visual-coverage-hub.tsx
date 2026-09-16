import React from "react";
import { ArrowRight, MapPin, Navigation, Compass } from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";

interface VisualCoverageHubProps {
  locale: Locale;
}

export function VisualCoverageHub({ locale }: VisualCoverageHubProps) {
  const isFrench = locale === "fr";

  const regions = [
    {
      number: "01",
      icon: Navigation,
      image: "/media/area-north-shore.jpg",
      imageAlt: isFrench
        ? "Territoire Rive-Nord et Laval desservi par Éclipse Électrique"
        : "North Shore and Laval territory served by Éclipse Électrique",
      nameFr: "Rive-Nord & Laval",
      nameEn: "North Shore & Laval",
      kickerFr: "LAVAL & COURONNE NORD",
      kickerEn: "LAVAL & NORTH SHORE",
      citiesFr:
        "Laval, Blainville, Terrebonne, Rosemère, Saint-Jérôme, Repentigny, Mirabel, Boisbriand.",
      citiesEn:
        "Laval, Blainville, Terrebonne, Rosemere, Saint-Jerome, Repentigny, Mirabel, Boisbriand.",
      highlightsFr: [
        "Unités locales en patrouille active",
        "Délai d'intervention rapide garanti",
        "Conformité Hydro-Québec locale",
      ],
      highlightsEn: [
        "Dedicated local patrol units",
        "Fast emergency response time",
        "Local Hydro-Québec coordination",
      ],
      ctaFr: "Vérifier la Rive-Nord",
      ctaEn: "Check North Shore",
    },
    {
      number: "02",
      icon: Compass,
      image: "/media/area-montreal.jpg",
      imageAlt: isFrench
        ? "Territoire de l'Île de Montréal desservi par Éclipse Électrique"
        : "Montreal Island territory served by Éclipse Électrique",
      nameFr: "Île de Montréal",
      nameEn: "Montreal Island",
      kickerFr: "CŒUR OPÉRATIONNEL MÉTRO",
      kickerEn: "METRO OPERATIONS HUB",
      citiesFr:
        "Centre-Ville, Westmount, Mont-Royal, Rosemont, Ahuntsic, Saint-Laurent, Vaudreuil.",
      citiesEn:
        "Downtown, Westmount, Mount-Royal, Rosemont, Ahuntsic, Saint-Laurent, Vaudreuil.",
      highlightsFr: [
        "Équipe d'astreinte centrale 24/7",
        "Résidentiel haut de gamme & bureaux",
        "Dépannage rapide en zone urbaine",
      ],
      highlightsEn: [
        "24/7 central emergency crew",
        "High-end residential & corporate",
        "Rapid dispatch in metro areas",
      ],
      ctaFr: "Vérifier Montréal",
      ctaEn: "Check Montreal",
    },
    {
      number: "03",
      icon: MapPin,
      image: "/media/area-south-shore.jpg",
      imageAlt: isFrench
        ? "Territoire Rive-Sud et Montérégie desservi par Éclipse Électrique"
        : "South Shore and Monteregie territory served by Éclipse Électrique",
      nameFr: "Rive-Sud & Montérégie",
      nameEn: "South Shore & Montérégie",
      kickerFr: "MONTÉRÉGIE & COURONNE SUD",
      kickerEn: "MONTEREGIE & SOUTH SHORE",
      citiesFr:
        "Longueuil, Brossard, Boucherville, Saint-Lambert, Saint-Bruno, Chambly, Candiac.",
      citiesEn:
        "Longueuil, Brossard, Boucherville, Saint-Lambert, Saint-Bruno, Chambly, Candiac.",
      highlightsFr: [
        "Couverture complète des banlieues",
        "Spécialistes bornes VÉ & 200A",
        "Disponibilité d'urgence jour et nuit",
      ],
      highlightsEn: [
        "Complete suburban coverage",
        "EV charger & 200A specialists",
        "Day and night emergency service",
      ],
      ctaFr: "Vérifier la Rive-Sud",
      ctaEn: "Check South Shore",
    },
  ];

  return (
    <section className="coverage-hub-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#08090b]">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "COUVERTURE RÉGIONALE" : "REGIONAL COVERAGE"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench
              ? "Grand Montréal, Rive-Nord & Rive-Sud"
              : "Greater Montreal, North Shore & South Shore"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">
            {isFrench
              ? "Plus de 50 municipalités desservies avec des unités de service équipées pour un déploiement rapide."
              : "50+ municipalities served with fully equipped mobile units for prompt dispatch."}
          </p>
        </div>

        {/* 3 Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 pt-4 mb-8">
          {regions.map((reg) => {
            const IconComponent = reg.icon;
            return (
              <a
                key={reg.number}
                href={pathFor("serviceArea", locale)}
                className="region-card group relative block mt-6"
              >
                {/* Outside Centered Crest Icon Badge (unclipped) */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 border-amber-400/65 bg-[#0a101d] text-amber-400 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 z-30 group-hover:scale-110 group-hover:border-amber-400 group-hover:shadow-[0_0_37.5px_rgba(245,158,11,0.5625)]">
                  <IconComponent className="w-6 h-6" strokeWidth={1.9} />
                </div>

                {/* Ultra-Glossy Glass Shell */}
                <div className="relative flex flex-col justify-between rounded-[26px] overflow-hidden bg-[#0a101d]/80 backdrop-blur-2xl border border-white/20 transition-all duration-300 group-hover:-translate-y-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] group-hover:border-amber-400/60 group-hover:shadow-[0_32px_80px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.35),inset_0_2px_1px_rgba(255,255,255,0.55)] h-full">
                  {/* Diagonal Glass Sheen */}
                  <div className="absolute inset-0 pointer-events-none z-10 rounded-[26px] bg-gradient-to-br from-white/[0.16] via-white/[0.04] via-25% to-transparent" />

                  {/* Top Gloss Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-white/[0.12] to-transparent" />

                  {/* Card Top Image Header: 25% shorter (h-44 = 176px) */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={reg.image}
                      alt={reg.imageAlt}
                      decoding="async"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[1.04] saturate-[1.05] group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out"
                    />
                    {/* Smooth delicate fade into glass body */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#0a101d]/90 pointer-events-none" />

                    {/* Corner Number */}
                    <span className="absolute top-3 right-4 font-mono font-black text-2xl sm:text-3xl text-white/40 select-none tracking-tight group-hover:text-white/60 transition-colors z-10">
                      {reg.number}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 pt-2.5 flex flex-col flex-1 justify-between relative z-10">
                    <div>
                      {/* Centered Kicker */}
                      <div className="flex justify-center mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full inline-block text-amber-400 bg-amber-500/15 border border-amber-500/25">
                          {isFrench ? reg.kickerFr : reg.kickerEn}
                        </span>
                      </div>

                      {/* Centered Headline */}
                      <h3 className="text-lg font-extrabold text-white text-center tracking-tight leading-snug mb-1.5 group-hover:text-amber-300 transition-colors min-h-[2.5rem] flex items-center justify-center">
                        {isFrench ? reg.nameFr : reg.nameEn}
                      </h3>

                      {/* Centered Cities */}
                      <p className="text-slate-300 text-xs leading-normal mb-3 text-center line-clamp-2">
                        {isFrench ? reg.citiesFr : reg.citiesEn}
                      </p>
                    </div>

                    <div>
                      {/* Highlights with Translucent Frosted Glass Cardlets */}
                      <ul className="space-y-1.5 mb-3">
                        {(isFrench ? reg.highlightsFr : reg.highlightsEn).map((highlight) => (
                          <li
                            key={highlight}
                            className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-slate-200 flex items-center gap-2 shadow-sm group-hover:border-white/20 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] shrink-0" />
                            <span className="font-medium leading-tight">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Centered Bottom Link */}
                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-center text-xs font-bold tracking-wide">
                        <span className="inline-flex items-center gap-1.5 text-amber-400 group-hover:text-amber-300 group-hover:underline">
                          <span>{isFrench ? reg.ctaFr : reg.ctaEn}</span>
                          <span className="text-sm font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Quick Hub Footer Banner */}
        <div className="relative overflow-hidden bg-[#0a101d]/85 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),inset_0_1px_0.5px_rgba(255,255,255,0.3)]">
          <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-r from-white/[0.08] via-transparent to-transparent" />
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-200 relative z-10">
            <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isFrench
                ? "50+ municipalités desservies · Équipes mobiles prêtes au départ · Urgence 24/7"
                : "50+ municipalities covered · GPS-equipped mobile fleet · 24/7 Emergency"}
            </span>
          </div>

          <a
            href={pathFor("serviceArea", locale)}
            className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 relative z-10"
          >
            <span>{isFrench ? "Consulter toutes les municipalités" : "Check all municipalities"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
