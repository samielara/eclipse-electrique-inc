import React from "react";
import { ShieldCheck, MapPin, PhoneCall, Award } from "lucide-react";
import { site } from "@/lib/site";
import { type Locale, quotePath } from "@/lib/routes";

interface TrustProofBandProps {
  locale: Locale;
}

export function TrustProofBand({ locale }: TrustProofBandProps) {
  const isFrench = locale === "fr";

  const proofs = [
    {
      number: "01",
      icon: ShieldCheck,
      image: "/media/craft-engineering-cad.jpg",
      imageAlt: isFrench
        ? "Plans électriques certifiés et conformité CMEQ / CCQ Éclipse"
        : "Certified electrical plans and CMEQ / CCQ compliance Éclipse",
      kickerFr: "CONFORMITÉ CCQ & CMEQ",
      kickerEn: "CCQ & CMEQ COMPLIANCE",
      titleFr: "Certifié RBQ / CMEQ",
      titleEn: "RBQ & CMEQ Certified",
      detailFr:
        "Licence RBQ 5582-0096-01. Travaux d'ingénierie et d'installation strictement exécutés par des maîtres électriciens.",
      detailEn:
        "RBQ License 5582-0096-01. All electrical installations strictly performed by certified CMEQ master electricians.",
      highlightsFr: [
        "Licence RBQ 5582-0096-01 active",
        "Conformité Code de construction 100%",
        "Approuvé par tous les assureurs",
      ],
      highlightsEn: [
        "Active RBQ License 5582-0096-01",
        "100% Construction Code compliance",
        "Recognized by all Quebec insurers",
      ],
      bottomFr: "Normes québécoises garanties",
      bottomEn: "Guaranteed Quebec standards",
    },
    {
      number: "02",
      icon: MapPin,
      image: "/media/service-area-montreal-fleet.jpg",
      imageAlt: isFrench
        ? "Flotte de camions de service Éclipse dans le Grand Montréal"
        : "Éclipse service van fleet deployed across Greater Montreal",
      kickerFr: "TERRITOIRE DÉPLOYÉ",
      kickerEn: "REGIONAL FLEET",
      titleFr: "Grand Montréal & Régions",
      titleEn: "Greater Montreal & Regions",
      detailFr:
        "Montréal, Laval, Rive-Nord et Rive-Sud. Plus de 50 municipalités desservies avec des unités mobiles équipées.",
      detailEn:
        "Montreal, Laval, North Shore, and South Shore. Over 50 municipalities served by mobile service units.",
      highlightsFr: [
        "50+ municipalités desservies",
        "Camions de service géolocalisés",
        "Arrivée ponctuelle avec pièces en stock",
      ],
      highlightsEn: [
        "50+ municipalities served",
        "GPS-dispatched mobile fleet",
        "Punctual arrival with stocked components",
      ],
      bottomFr: "Déploiement métropolitain",
      bottomEn: "Metropolitan deployment",
    },
    {
      number: "03",
      icon: PhoneCall,
      image: "/media/service-night-dispatch.jpg",
      imageAlt: isFrench
        ? "Répartition d'urgence électrique Éclipse de nuit et jour"
        : "Éclipse 24/7 electrical emergency dispatch line",
      kickerFr: "DISPONIBILITÉ RÉELLE",
      kickerEn: "LIVE AVAILABILITY",
      titleFr: "Ligne d'urgence 24/7",
      titleEn: "24/7 Emergency Line",
      detailFr: `Ligne directe ${site.emergencyPhoneDisplay}. Réponse humaine garantie jour et nuit, fins de semaine et fériés inclus.`,
      detailEn: `Direct line ${site.emergencyPhoneDisplay}. Guaranteed live human answer 24/7, including weekends and holidays.`,
      highlightsFr: [
        "Réponse téléphonique humaine 24/7",
        "Dépannage d'urgence prioritaire",
        "Équipe d'astreinte prête au départ",
      ],
      highlightsEn: [
        "Live human call answering 24/7",
        "Priority emergency troubleshooting",
        "On-call certified crew ready to roll",
      ],
      bottomFr: "Intervention rapide prioritaire",
      bottomEn: "Priority rapid dispatch",
    },
    {
      number: "04",
      icon: Award,
      image: "/media/services-overview-master.jpg",
      imageAlt: isFrench
        ? "Vue d'ensemble des services électriques Éclipse résidentiels et commerciaux"
        : "Overview of residential and commercial electrical expertise Éclipse",
      kickerFr: "POLYVALENCE MAÎTRISÉE",
      kickerEn: "COMPREHENSIVE SKILLS",
      titleFr: "Résidentiel & Industriel",
      titleEn: "Residential & Industrial",
      detailFr:
        "Du panneau résidentiel 200A aux infrastructures triphasées industrielles et thermographie de pointe.",
      detailEn:
        "From residential 200A panel upgrades to heavy commercial 3-phase infrastructure and infrared thermography.",
      highlightsFr: [
        "Résidentiel moderne, VÉ & 200A",
        "Commerces, bureaux & réseaux",
        "Industriel 600V & thermographie",
      ],
      highlightsEn: [
        "Modern residential, EV & 200A",
        "Commercial, office & networks",
        "Industrial 600V & thermography",
      ],
      bottomFr: "Garantie de travail décennale",
      bottomEn: "10-year workmanship guarantee",
    },
  ];

  return (
    <section className="why-eclipse-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 overflow-hidden bg-[#08090b]">
      {/* Subtle Fleet Silhouette Background with Dark Gradient */}
      <div className="absolute inset-0 opacity-15 pointer-events-none -z-0">
        <img
          src="/media/eclipse-team-fleet-hero.jpg"
          alt="Éclipse Électrique Fleet"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950" />
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "POURQUOI CHOISIR ÉCLIPSE" : "WHY CHOOSE ECLIPSE"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench
              ? "Quatre piliers de confiance et de rigueur"
              : "Four pillars of trust and rigorous standards"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">
            {isFrench
              ? "Des garanties concrètes pour protéger vos investissements, votre sécurité et vos assurances."
              : "Tangible guarantees to protect your investments, electrical safety, and insurance coverage."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 pt-4">
          {proofs.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="proof-card group relative block mt-6"
              >
                {/* Outside Centered Crest Icon Badge (unclipped) */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 border-amber-400/65 bg-[#0a101d] text-amber-400 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 z-30 group-hover:scale-110 group-hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.45)]">
                  <IconComponent className="w-6 h-6" strokeWidth={1.9} />
                </div>

                {/* Ultra-Glossy Glass Shell */}
                <div className="relative flex flex-col justify-between rounded-[26px] overflow-hidden bg-[#0a101d]/80 backdrop-blur-2xl border border-white/20 transition-all duration-300 group-hover:-translate-y-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] group-hover:border-amber-400/60 group-hover:shadow-[0_32px_80px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.28),inset_0_2px_1px_rgba(255,255,255,0.55)] h-full">
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

                    {/* Corner Number */}
                    <span className="absolute top-3 right-4 font-mono font-black text-2xl sm:text-3xl text-white/40 select-none tracking-tight group-hover:text-white/60 transition-colors z-10">
                      {item.number}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 pt-2.5 flex flex-col flex-1 justify-between relative z-10">
                    <div>
                      {/* Centered Kicker */}
                      <div className="flex justify-center mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full inline-block text-amber-400 bg-amber-500/15 border border-amber-500/25">
                          {isFrench ? item.kickerFr : item.kickerEn}
                        </span>
                      </div>

                      {/* Centered Headline */}
                      <h3 className="text-lg font-extrabold text-white text-center tracking-tight leading-snug mb-1.5 group-hover:text-amber-300 transition-colors min-h-[2.5rem] flex items-center justify-center">
                        {isFrench ? item.titleFr : item.titleEn}
                      </h3>

                      {/* Centered Description */}
                      <p className="text-slate-300 text-xs leading-normal mb-3 text-center line-clamp-2">
                        {isFrench ? item.detailFr : item.detailEn}
                      </p>
                    </div>

                    <div>
                      {/* Highlights with Translucent Frosted Glass Cardlets */}
                      <ul className="space-y-1.5 mb-3">
                        {(isFrench ? item.highlightsFr : item.highlightsEn).map((highlight) => (
                          <li
                            key={highlight}
                            className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-slate-200 flex items-center gap-2 shadow-sm group-hover:border-white/20 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] shrink-0" />
                            <span className="font-medium leading-tight">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom Highlight */}
                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                        <span>✓ {isFrench ? item.bottomFr : item.bottomEn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
