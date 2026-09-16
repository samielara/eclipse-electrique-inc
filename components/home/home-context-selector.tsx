import React from "react";
import { Building2, Factory, Home, ShieldAlert } from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

interface HomeContextSelectorProps {
  locale: Locale;
}

export function HomeContextSelector({ locale }: HomeContextSelectorProps) {
  const isFrench = locale === "fr";

  const choices = [
    {
      id: "residential",
      number: "01",
      icon: Home,
      image: "/media/service-residential.jpg",
      imageAlt: isFrench
        ? "Installation domotique et électricien résidentiel moderne Éclipse"
        : "Modern residential electrician and smart home installation Éclipse",
      kicker: isFrench ? "RÉSIDENTIEL" : "RESIDENTIAL",
      title: isFrench ? "Maison & Rénovations" : "Home & Renovations",
      description: isFrench
        ? "Propriété unifamiliale, condo, agrandissement, borne VÉ ou mise aux normes 200A avec un maître électricien certifié."
        : "Single-family home, condo, addition, EV charger, or 200A panel upgrade with a certified master electrician.",
      highlights: isFrench
        ? [
            "Panneaux 200A & mise aux normes RBQ",
            "Bornes de recharge VÉ (Niveau 2)",
            "Rénovation, éclairage & domotique",
          ]
        : [
            "200A panel upgrades & RBQ compliance",
            "Level 2 EV charger installation",
            "Renovation, lighting & smart home",
          ],
      href: pathFor("residential", locale),
      cta: isFrench ? "En savoir plus" : "Learn more",
      isEmergency: false,
    },
    {
      id: "commercial",
      number: "02",
      icon: Building2,
      image: "/media/service-commercial.jpg",
      imageAlt: isFrench
        ? "Câblage structuré et éclairage architectural commercial Éclipse"
        : "Commercial structured cabling and architectural lighting Éclipse",
      kicker: isFrench ? "COMMERCIAL" : "COMMERCIAL",
      title: isFrench ? "Commerce & Bureaux" : "Commercial & Offices",
      description: isFrench
        ? "Boutiques, bureaux, restaurants, éclairage architectural et maintenance préventive pour vos espaces d'affaires."
        : "Retail, offices, restaurants, architectural lighting, and preventive maintenance for your business spaces.",
      highlights: isFrench
        ? [
            "Éclairage architectural & DEL",
            "Câblage structuré & réseaux",
            "Entretien préventif & conformité",
          ]
        : [
            "Architectural & LED lighting",
            "Structured cabling & networks",
            "Preventive maintenance & safety",
          ],
      href: pathFor("commercial", locale),
      cta: isFrench ? "En savoir plus" : "Learn more",
      isEmergency: false,
    },
    {
      id: "industrial",
      number: "03",
      icon: Factory,
      image: "/media/service-industrial.jpg",
      imageAlt: isFrench
        ? "Distribution haute tension et machinerie industrielle Éclipse"
        : "High-voltage distribution and industrial machinery Éclipse",
      kicker: isFrench ? "INDUSTRIEL" : "INDUSTRIAL",
      title: isFrench ? "Milieux Industriels" : "Industrial Environments",
      description: isFrench
        ? "Installations manufacturières, machinerie lourde, distribution triphasée 600V et interventions planifiées."
        : "Manufacturing plants, heavy machinery hookups, 600V three-phase distribution, and planned maintenance.",
      highlights: isFrench
        ? [
            "Entrées & distribution triphasée",
            "Raccordement de machinerie lourde",
            "Diagnostic & arrêts planifiés",
          ]
        : [
            "Service entrances & 3-phase power",
            "Heavy machinery hookups & controls",
            "Diagnosis & planned shutdowns",
          ],
      href: pathFor("industrial", locale),
      cta: isFrench ? "En savoir plus" : "Learn more",
      isEmergency: false,
    },
    {
      id: "emergency",
      number: "04",
      icon: ShieldAlert,
      image: "/media/service-emergency.jpg",
      imageAlt: isFrench
        ? "Camion d'intervention officiel Éclipse et électricien d'urgence 24/7"
        : "Official Eclipse emergency service van and 24/7 electrician",
      kicker: isFrench ? "LIGNE D'URGENCE 24/7" : "24/7 EMERGENCY LINE",
      title: isFrench ? "Urgence électrique ? Appelez directement." : "Electrical emergency?",
      description: isFrench
        ? "Pour une demande urgente, appelez Éclipse électrique inc. au 514-717-9277. Nous recueillons les détails pour coordonner l'intervention immédiate."
        : "For an urgent request, call Éclipse électrique inc. at 514-717-9277. We will collect the information needed to coordinate the next steps based on the situation.",
      highlights: isFrench
        ? [
            "Inspection et évaluation d'état",
            "Diagnostic et dépannage d'urgence",
            "Réparations électriques sécuritaires",
          ]
        : [
            "Inspection and condition assessment",
            "Diagnosis and troubleshooting",
            "Electrical repairs",
          ],
      href: site.emergencyPhoneHref,
      cta: isFrench ? "En savoir plus" : "Learn more",
      isEmergency: true,
    },
  ];

  return (
    <section className="context-selector-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "VOTRE SITUATION" : "YOUR SITUATION"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">
            {isFrench
              ? "Sélectionnez votre type de propriété ou besoin pour un accompagnement sur mesure sans jargon technique."
              : "Select your property type or immediate need for tailored guidance without technical jargon."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 pt-4">
          {choices.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className="group relative block mt-6"
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
                  className={`relative flex flex-col justify-between rounded-[26px] overflow-hidden bg-[#0a101d]/80 backdrop-blur-2xl border transition-all duration-300 group-hover:-translate-y-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] ${
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

                    {/* Corner Number */}
                    <span className="absolute top-3 right-4 font-mono font-black text-2xl sm:text-3xl text-white/40 select-none tracking-tight group-hover:text-white/60 transition-colors z-10">
                      {item.number}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 pt-2.5 flex flex-col flex-1 justify-between relative z-10">
                    <div>
                      {/* Kicker / Eyebrow (Centered) */}
                      <div className="flex justify-center mb-1.5">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full inline-block ${
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
                        <span className="inline-flex items-center gap-1.5 text-amber-400 group-hover:text-amber-300 group-hover:underline">
                          {item.cta}
                          <span className="text-sm font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                          </span>
                        </span>

                        {item.isEmergency && (
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full text-red-400 bg-red-500/15 border border-red-500/30 flex items-center gap-1.5 absolute right-0">
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
