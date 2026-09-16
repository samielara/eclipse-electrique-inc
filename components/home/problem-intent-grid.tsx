import React from "react";
import {
  AlertTriangle,
  Car,
  Flame,
  Hammer,
  Sliders,
  Store,
} from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

interface ProblemIntentGridProps {
  locale: Locale;
}

export function ProblemIntentGrid({ locale }: ProblemIntentGridProps) {
  const isFrench = locale === "fr";

  const intents = [
    {
      id: "power-issue",
      number: "01",
      icon: AlertTriangle,
      image: "/media/electrical-testing.webp",
      imageAlt: isFrench ? "Test et diagnostic électrique Éclipse" : "Electrical diagnostics Éclipse",
      kicker: isFrench ? "DIAGNOSTIC & PANNE" : "DIAGNOSIS & OUTAGE",
      title: isFrench ? "J'ai un problème électrique" : "My power keeps cutting out",
      description: isFrench
        ? "Panne partielle, lumière qui vacille ou disjoncteur qui saute sans explication."
        : "Partial outage, flickering lights, or a breaker that keeps tripping for no reason.",
      highlights: isFrench
        ? [
            "Diagnostic précis sur place",
            "Recherche de fuite à la terre",
            "Remise en service immédiate",
          ]
        : [
            "On-site precision diagnostics",
            "Ground fault investigation",
            "Immediate power restoration",
          ],
      cta: isFrench ? "Demander un diagnostic" : "Request diagnosis",
      href: pathFor("contact", locale) + "#quote-intake",
      isEmergency: false,
    },
    {
      id: "renovation",
      number: "02",
      icon: Hammer,
      image: "/media/landing-hero-exterior.jpg",
      imageAlt: isFrench ? "Rénovation électrique résidentielle Éclipse" : "Residential electrical renovation Éclipse",
      kicker: isFrench ? "RÉNOVATION & EXPANSION" : "RENOVATION & EXPANSION",
      title: isFrench ? "Je rénove ma propriété" : "I'm renovating my property",
      description: isFrench
        ? "Rénovation de cuisine, salle de bain, sous-sol ou remise à neuf du câblage complet."
        : "Kitchen, bathroom, basement remodel, or full electrical rewiring to modern code.",
      highlights: isFrench
        ? [
            "Câblage dissimulé soigné",
            "Éclairage encastré & gradateurs",
            "Conformité d'assurance garantie",
          ]
        : [
            "Clean concealed wiring",
            "Recessed lighting & smart dimming",
            "Guaranteed insurance compliance",
          ],
      cta: isFrench ? "Planifier vos travaux" : "Plan your project",
      href: pathFor("residential", locale),
      isEmergency: false,
    },
    {
      id: "ev-charger",
      number: "03",
      icon: Car,
      image: "/media/service-residential-master.jpg",
      imageAlt: isFrench ? "Installation de borne VÉ Éclipse" : "EV charger installation Éclipse",
      kicker: isFrench ? "BORNES DE RECHARGE VÉ" : "EV CHARGER INSTALLATION",
      title: isFrench ? "Installer une borne VÉ" : "I bought an electric vehicle",
      description: isFrench
        ? "Recharge rapide de niveau 2 à domicile certifiée avec accès aux subventions québécoises."
        : "Certified Level 2 home charging installation with Quebec government rebate support.",
      highlights: isFrench
        ? [
            "Calcul de charge certifié",
            "Bornes toutes marques compatibles",
            "Subvention Roulez vert (jusqu'à 600$)",
          ]
        : [
            "Certified load calculation",
            "All major EV brands supported",
            "Roulez vert rebate (up to $600)",
          ],
      cta: isFrench ? "Choisir votre borne" : "Select your charger",
      href: pathFor("residential", locale),
      isEmergency: false,
    },
    {
      id: "panel-upgrade",
      number: "04",
      icon: Sliders,
      image: "/media/style-lock-master.jpg",
      imageAlt: isFrench ? "Panneau 200A certifié Éclipse" : "200A certified electrical panel Éclipse",
      kicker: isFrench ? "PANNEAU & PUISSANCE" : "PANEL & POWER UPGRADE",
      title: isFrench ? "Mettre le panneau à niveau" : "I need more electrical power",
      description: isFrench
        ? "Remplacement d'une boîte à fusibles désuète ou passage à 200A pour vos nouveaux appareils."
        : "Replacing an outdated fuse box or upgrading to 200A for modern home power needs.",
      highlights: isFrench
        ? [
            "Augmentation à 200A / 400A",
            "Coordination Hydro-Québec",
            "Protection anti-arcs (AFCI)",
          ]
        : [
            "200A / 400A service upgrade",
            "Hydro-Québec coordination",
            "AFCI arc-fault protection",
          ],
      cta: isFrench ? "Mise aux normes 200A" : "200A panel upgrade",
      href: pathFor("residential", locale),
      isEmergency: false,
    },
    {
      id: "commercial-work",
      number: "05",
      icon: Store,
      image: "/media/service-commercial.jpg",
      imageAlt: isFrench ? "Installation commerciale Éclipse" : "Commercial electrical work Éclipse",
      kicker: isFrench ? "ESPACES COMMERCIAUX" : "COMMERCIAL FACILITIES",
      title: isFrench ? "Projet commercial ou bureau" : "My business needs electrical work",
      description: isFrench
        ? "Aménagement de commerces, bureaux, éclairage architectural et maintenance préventive."
        : "Retail fit-outs, offices, architectural LED lighting, and preventive maintenance.",
      highlights: isFrench
        ? [
            "Éclairage DEL écoénergétique",
            "Câblage réseau & sécurité",
            "Entretien et conformité RBQ",
          ]
        : [
            "Energy-efficient LED lighting",
            "Network & structured cabling",
            "RBQ safety compliance",
          ],
      cta: isFrench ? "Services commerciaux" : "Commercial services",
      href: pathFor("commercial", locale),
      isEmergency: false,
    },
    {
      id: "emergency-burn",
      number: "06",
      icon: Flame,
      image: "/media/service-emergency.jpg",
      imageAlt: isFrench ? "Camion d'urgence électrique 24/7 Éclipse" : "24/7 emergency service fleet Éclipse",
      kicker: isFrench ? "DANGER & ODEUR DE BRÛLÉ" : "EMERGENCY HAZARD & BURNING",
      title: isFrench ? "Urgence électrique immédiate" : "Something smells burnt / emergency",
      description: isFrench
        ? "Odeur de surchauffe, grésillement suspect, étincelles ou danger immédiat d'incendie."
        : "Burning smell, buzzing sounds, sparking, or immediate electrical fire hazard.",
      highlights: isFrench
        ? [
            "Réponse humaine 24h/24",
            "Camions équipés de pièces",
            "Isolation du danger immédiate",
          ]
        : [
            "Live human response 24/7",
            "Fully stocked service fleet",
            "Immediate hazard isolation",
          ],
      cta: isFrench ? "Ligne directe : " + site.emergencyPhoneDisplay : "Direct line: " + site.emergencyPhoneDisplay,
      href: site.emergencyPhoneHref,
      isEmergency: true,
    },
  ];

  return (
    <section className="problem-intent-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#0b0c0e]">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "VOS BESOINS CONCRETS" : "WHAT ARE YOU TRYING TO DO?"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench ? "Quelle est votre situation ?" : "What is your situation?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 pt-4">
          {intents.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className="problem-card group relative block mt-6"
              >
                {/* Centered Floating Crest Badge (unclipped) */}
                <div
                  className={`absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 z-30 group-hover:scale-110 ${
                    item.isEmergency
                      ? "bg-[#0a101d] border-red-500/60 text-red-400 group-hover:border-red-400 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.45)]"
                      : "bg-[#0a101d] border-amber-400/65 text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_37.5px_rgba(245,158,11,0.5625)]"
                  }`}
                >
                  <IconComponent className="w-6 h-6" strokeWidth={1.9} />
                </div>

                {/* Ultra-Glossy Glass Shell */}
                <div
                  className={`relative flex flex-col justify-between rounded-[26px] overflow-hidden bg-[#0a101d]/80 backdrop-blur-2xl border transition-all duration-300 group-hover:-translate-y-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] h-full ${
                    item.isEmergency
                      ? "border-red-500/30 group-hover:border-red-500/70 group-hover:shadow-[0_32px_80px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(239,68,68,0.3),inset_0_2px_1px_rgba(255,255,255,0.55)]"
                      : "border-white/20 group-hover:border-amber-400/60 group-hover:shadow-[0_32px_80px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.35),inset_0_2px_1px_rgba(255,255,255,0.55)]"
                  }`}
                >
                  {/* Diagonal Glass Sheen */}
                  <div className="absolute inset-0 pointer-events-none z-10 rounded-[26px] bg-gradient-to-br from-white/[0.16] via-white/[0.04] via-25% to-transparent" />

                  {/* Top Gloss Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-white/[0.12] to-transparent" />

                  {/* Card Top Image Header: 25% shorter (h-44 = 176px) */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      decoding="async"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[1.04] saturate-[1.05] group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out"
                    />
                    {/* Smooth delicate fade into glass body */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#0a101d]/90 pointer-events-none" />

                    {/* Top-Right Number */}
                    <span className="absolute top-3 right-4 font-mono font-black text-2xl sm:text-3xl text-white/40 select-none tracking-tight group-hover:text-white/60 transition-colors z-10">
                      {item.number}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 pt-2.5 flex flex-col flex-1 justify-between relative z-10">
                    <div>
                      {/* Kicker / Eyebrow (Centered) */}
                      <div className="flex justify-center mb-2">
                        <span
                          className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full inline-block ${
                            item.isEmergency
                              ? "text-red-400 bg-red-500/15 border border-red-500/30"
                              : "text-amber-400 bg-amber-500/15 border border-amber-500/25"
                          }`}
                        >
                          {item.kicker}
                        </span>
                      </div>

                      {/* Headline (Centered) */}
                      <h3 className="text-lg font-extrabold text-white text-center tracking-tight leading-snug mb-1.5 group-hover:text-amber-300 transition-colors min-h-[2.5rem] flex items-center justify-center">
                        {item.title}
                      </h3>

                      {/* Description (Centered) */}
                      <p className="text-slate-300 text-xs leading-normal mb-3 text-center line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div>
                      {/* Highlights with Translucent Frosted Glass Cardlets */}
                      <ul className="space-y-1.5 mb-3">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-slate-200 flex items-center gap-2 shadow-sm group-hover:border-white/20 transition-colors"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                item.isEmergency
                                  ? "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                                  : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                              }`}
                            />
                            <span className="font-medium leading-tight">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom Link CTA (Centered) */}
                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-center relative text-xs font-bold tracking-wide">
                        <span
                          className={`inline-flex items-center gap-1.5 group-hover:underline ${
                            item.isEmergency
                              ? "text-red-400 group-hover:text-red-300"
                              : "text-amber-400 group-hover:text-amber-300"
                          }`}
                        >
                          {item.cta}
                          <span className="text-sm font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                          </span>
                        </span>

                        {item.isEmergency && (
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full text-red-400 bg-red-500/20 border border-red-500/40 flex items-center gap-1.5 absolute right-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                            24/7
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
