"use client";

import React, { useState } from "react";
import { customerFaq, homeFaqIds } from "@/content/customer-faq";
import { ArrowRight, ChevronDown } from "lucide-react";
import { pathFor, type Locale } from "@/lib/routes";

interface HomeFaqTeaserProps {
  locale: Locale;
}

export function HomeFaqTeaser({ locale }: HomeFaqTeaserProps) {
  const isFrench = locale === "fr";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = homeFaqIds.map((id) => customerFaq[locale].find((item) => item.id === id)!);

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
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {(
                  <div hidden={!isOpen} className="px-6 pb-6 pt-1 text-slate-300 text-sm md:text-base leading-relaxed border-t border-white/10 relative z-10 animate-fade-in-up">
                    <p>{item.answer}</p>
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
