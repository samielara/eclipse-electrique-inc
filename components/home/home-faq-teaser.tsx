"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";

interface HomeFaqTeaserProps {
  locale: Locale;
}

export function HomeFaqTeaser({ locale }: HomeFaqTeaserProps) {
  const isFrench = locale === "fr";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qFr: "Combien coûte une visite d'évaluation ou d'intervention ?",
      qEn: "How much does an assessment or service visit cost?",
      aFr:
        "Nos tarifs sont transparents et communiqués sans frais cachés. Pour les projets planifiés, nous fournissons une estimation détaillée avant tout engagement. Pour les urgences 24/7, les frais de déplacement et le taux horaire de garde vous sont confirmés en toute transparence dès votre appel initial.",
      aEn:
        "Our pricing is completely transparent with zero hidden fees. For scheduled projects, we provide an itemized quote before starting work. For 24/7 emergencies, standard dispatch fees and hourly rates are clearly confirmed over the phone before our electrician departs.",
    },
    {
      qFr: "Faites-vous les urgences électriques 24 heures sur 24 ?",
      qEn: "Do you handle electrical emergencies 24/7?",
      aFr:
        "Oui, absolument. Notre ligne d'urgence (514-717-9277) est ouverte jour et nuit, fin de semaine et jours fériés, avec une réponse humaine immédiate. Un maître électricien certifié CCQ est dépêché avec un camion entièrement équipé de pièces de rechange.",
      aEn:
        "Yes, absolutely. Our direct emergency line (514-717-9277) is answered live 24/7, including weekends and holidays. A certified CCQ master electrician is dispatched promptly in a service van stocked with replacement breakers and components.",
    },
    {
      qFr: "Comment savoir si je dois remplacer mon panneau électrique ?",
      qEn: "How do I know if I need to replace my electrical panel?",
      aFr:
        "Si votre résidence utilise encore une boîte à fusibles, des disjoncteurs qui sautent fréquemment, ou si vous prévoyez installer une borne de recharge pour véhicule électrique, une thermopompe ou un spa, un passage à 200A est essentiel pour votre sécurité et exigé par les assureurs.",
      aEn:
        "If your home still operates on fuses, experiences frequent breaker trips, or if you plan to install an EV charging station, heat pump, or hot tub, upgrading to a modern 200A breaker panel is essential for safety and required by insurance providers.",
    },
  ];

  return (
    <section className="faq-teaser-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#0b0c0e]">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "QUESTIONS FRÉQUENTES" : "FREQUENTLY ASKED"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench ? "Réponses rapides aux questions courantes" : "Quick answers to common questions"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">
            {isFrench
              ? "Des explications claires pour vous aider à prendre des décisions éclairées sans jargon."
              : "Clear explanations to help you make informed decisions without electrical jargon."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-10">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-teaser-item relative overflow-hidden rounded-2xl transition-all duration-300 backdrop-blur-2xl ${
                  isOpen
                    ? "bg-[#0a101d]/90 border border-amber-400/60 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.2),inset_0_1.5px_0.5px_rgba(255,255,255,0.4)]"
                    : "bg-[#0a101d]/75 border border-white/15 hover:border-white/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7),inset_0_1px_0.5px_rgba(255,255,255,0.2)]"
                }`}
              >
                {/* Diagonal Glass Sheen */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.85)]" />
                    <span className="text-base md:text-lg font-bold text-white">
                      {isFrench ? item.qFr : item.qEn}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm md:text-base leading-relaxed border-t border-white/10 relative z-10 animate-fade-in-up">
                    <p>{isFrench ? item.aFr : item.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={pathFor("faq", locale)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c121e] hover:bg-slate-900 border border-white/10 text-white font-mono text-xs font-bold transition-all shadow-md group hover:border-amber-400/40"
          >
            <span>{isFrench ? "Voir toutes les questions" : "View all FAQ questions"}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
