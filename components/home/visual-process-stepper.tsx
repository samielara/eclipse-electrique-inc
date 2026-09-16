import React from "react";
import { PhoneCall, Camera, CalendarCheck } from "lucide-react";
import { quotePath, type Locale } from "@/lib/routes";

interface VisualProcessStepperProps {
  locale: Locale;
}

export function VisualProcessStepper({ locale }: VisualProcessStepperProps) {
  const isFrench = locale === "fr";

  const steps = [
    {
      step: "01",
      icon: PhoneCall,
      image: "/media/contact-master-dispatch.jpg",
      imageAlt: isFrench
        ? "Prise de contact et répartition d'urgence Éclipse Électrique"
        : "Customer intake and emergency dispatch Éclipse Électrique",
      kickerFr: "ÉTAPE 01 · CONTACT DIRECT",
      kickerEn: "STEP 01 · DIRECT CONTACT",
      titleFr: "Parlez-nous de votre projet",
      titleEn: "Tell us about your project",
      descFr:
        "Communiquez avec nous par téléphone, via notre formulaire en ligne ou par notre assistant 24/7 pour exprimer vos besoins.",
      descEn:
        "Contact us by phone, online intake form, or 24/7 assistant to describe your electrical requirements.",
      highlightsFr: [
        "Prise de contact rapide sans attente",
        "Écoute attentive de vos besoins réels",
        "Ligne d'urgence directe disponible 24/7",
      ],
      highlightsEn: [
        "Quick contact with zero waiting time",
        "Attentive consultation for your project",
        "Direct 24/7 emergency line available",
      ],
      actionFr: "Commencer en ligne",
      actionEn: "Start online",
      href: quotePath(locale),
    },
    {
      step: "02",
      icon: Camera,
      image: "/media/faq-master-consultation.jpg",
      imageAlt: isFrench
        ? "Électricien Éclipse expliquant le système électrique et évaluant les détails"
        : "Éclipse electrician reviewing electrical details and photos with homeowner",
      kickerFr: "ÉTAPE 02 · ÉVALUATION PRÉCISE",
      kickerEn: "STEP 02 · ACCURATE ASSESSMENT",
      titleFr: "Envoyez vos photos & détails",
      titleEn: "Send details and photos",
      descFr:
        "Partagez des photos de votre panneau électrique, compteur ou emplacement pour obtenir une estimation claire et sans surprise.",
      descEn:
        "Share photos of your electrical panel, meter, or space to receive an upfront, accurate estimate with zero surprises.",
      highlightsFr: [
        "Transmission simple de photos par cellulaire",
        "Analyse technique par maître électricien",
        "Estimation transparente sans frais cachés",
      ],
      highlightsEn: [
        "Easy photo transmission via mobile or web",
        "Technical analysis by a master electrician",
        "Clear, upfront quote with zero hidden fees",
      ],
      actionFr: "Transmettre vos photos",
      actionEn: "Send your photos",
      href: quotePath(locale),
    },
    {
      step: "03",
      icon: CalendarCheck,
      image: "/media/about-craft-master.jpg",
      imageAlt: isFrench
        ? "Maître électricien Éclipse sur place avec panneau électrique et conformité"
        : "Certified master electrician on site executing code-compliant installation",
      kickerFr: "ÉTAPE 03 · INTERVENTION CERTIFIÉE",
      kickerEn: "STEP 03 · CERTIFIED SERVICE",
      titleFr: "Planifiez l'intervention de l'équipe",
      titleEn: "Schedule master electrician visit",
      descFr:
        "Nous confirmons une plage horaire précise. Nos maîtres électriciens arrivent équipés pour exécuter les travaux aux normes CCQ.",
      descEn:
        "We lock in a punctual appointment. Our certified master electricians arrive fully equipped to execute work to CCQ code.",
      highlightsFr: [
        "Plage horaire ponctuelle confirmée",
        "Camion-atelier approvisionné sur place",
        "Attestation de conformité CCQ & CMEQ",
      ],
      highlightsEn: [
        "Confirmed punctual arrival window",
        "Fully stocked mobile service van on-site",
        "Full CCQ & CMEQ code compliance sign-off",
      ],
      actionFr: "Planifier l'intervention",
      actionEn: "Schedule service",
      href: quotePath(locale),
    },
  ];

  return (
    <section className="process-stepper-section py-10 md:py-14 px-4 md:px-8 border-b border-white/5 relative z-10 bg-[#08090b]">
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
            {isFrench ? "COMMENT ÇA FONCTIONNE" : "HOW IT WORKS"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            {isFrench ? "Un processus simple en 3 étapes" : "A straightforward 3-step process"}
          </h2>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 pt-4">
            {steps.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.step}
                  href={item.href}
                  className="process-step-card group relative block mt-6"
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
                        {item.step}
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
                          {isFrench ? item.descFr : item.descEn}
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

                        {/* Centered Bottom Link */}
                        <div className="pt-2.5 border-t border-white/10 flex items-center justify-center text-xs font-bold tracking-wide">
                          <span className="inline-flex items-center gap-1.5 text-amber-400 group-hover:text-amber-300 group-hover:underline">
                            <span>{isFrench ? item.actionFr : item.actionEn}</span>
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
        </div>
      </div>
    </section>
  );
}
