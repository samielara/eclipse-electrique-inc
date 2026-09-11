"use client";

import React, { useState, useRef } from "react";
import type { Locale } from "@/lib/routes";
import { pathFor } from "@/lib/routes";
import {
  PhoneCall,
  Camera,
  MapPin,
  ShieldCheck,
  Maximize2,
  X,
  CheckCircle2,
  Zap,
  ArrowRight,
  Radio,
} from "lucide-react";

interface DispatchCoverageConsoleProps {
  locale: Locale;
}

export function DispatchCoverageConsole({ locale }: DispatchCoverageConsoleProps) {
  const isFrench = locale === "fr";
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="dispatch-coverage-hub-container relative w-full my-auto">
      {/* Hidden file input for Panel Assessment */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
        aria-label={isFrench ? "Téléverser une photo du panneau électrique" : "Upload electrical panel photo"}
      />

      {/* Main Luxury Hardware Frame */}
      <div className="dispatch-hub-chassis relative rounded-2xl sm:rounded-3xl bg-[#06090e] border border-amber-500/25 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.12)] overflow-hidden transition-all duration-300">
        
        {/* Hardware Status Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0a0f18] border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
            <span className="text-white font-bold tracking-wider uppercase text-[11px] sm:text-xs">
              ÉCLIPSE ÉLECTRIQUE INC. // {isFrench ? "CENTRE DE COMMANDEMENT" : "DISPATCH COMMAND CENTER"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isFrench ? "FLOTTE ACTIVE · 24/7" : "FLEET ACTIVE · 24/7"}</span>
            </span>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] text-amber-400/80 hover:text-amber-300 transition-colors cursor-pointer"
              title={isFrench ? "Agrandir en plein écran" : "View fullscreen"}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isFrench ? "Plein écran" : "Fullscreen"}</span>
            </button>
          </div>
        </div>

        {/* Central Display: Exact craft-dispatch-hub.jpg with Interactive Hotspot Overlays */}
        <div className="relative group overflow-hidden bg-black flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/craft-dispatch-hub.jpg"
            alt={
              isFrench
                ? "Centre de commandement et de répartition Éclipse Électrique à Saint-Léonard avec cartographie GPS"
                : "Éclipse Électrique Command and Dispatch Center in Saint-Léonard with live GPS map"
            }
            className="w-full h-auto max-h-[44vh] sm:max-h-[48vh] lg:max-h-[50vh] object-contain mx-auto block transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
          />

          {/* INTERACTIVE HOTSPOTS OVERLAY */}
          <div className="absolute inset-0 pointer-events-auto">
            
            {/* 1. Hotspot: 24/7 Emergency Dispatch Button */}
            <a
              href="tel:+15147179277"
              onMouseEnter={() => setActiveHotspot("emergency")}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute cursor-pointer rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
              style={{
                top: "58%",
                left: "6%",
                width: "28%",
                height: "12%",
              }}
              aria-label={isFrench ? "Appeler Urgence 24/7 au (514) 717-9277" : "Call 24/7 Emergency at (514) 717-9277"}
            >
              <span className="sr-only">Call (514) 717-9277</span>
              {/* Subtle hover pulse border */}
              <span className="absolute inset-0 rounded-lg border-2 border-red-500/0 hover:border-red-500/80 hover:bg-red-500/10 transition-all" />
            </a>

            {/* 2. Hotspot: Upload Photo Box */}
            <div
              onClick={triggerUpload}
              onMouseEnter={() => setActiveHotspot("upload")}
              onMouseLeave={() => setActiveHotspot(null)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && triggerUpload()}
              className="absolute cursor-pointer rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
              style={{
                top: "73%",
                left: "6%",
                width: "28%",
                height: "21%",
              }}
              aria-label={isFrench ? "Téléverser photo pour évaluation immédiate" : "Upload photo for instant remote assessment"}
            >
              <span className="sr-only">Upload Photo</span>
              <span className="absolute inset-0 rounded-lg border-2 border-amber-500/0 hover:border-amber-400/80 hover:bg-amber-500/10 transition-all" />
            </div>

            {/* 3. Hotspot: Saint-Léonard HQ Radar Pin */}
            <div
              className="absolute rounded-full transition-all"
              style={{
                top: "31%",
                left: "77%",
                width: "3%",
                height: "5%",
              }}
              title="QG Saint-Léonard : 9005 Rue du Champ-d'Eau"
            >
              <span className="relative flex h-full w-full">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-amber-500" />
              </span>
            </div>

            {/* 4. Hotspot: Brossard & Longueuil (South Shore Route Link) */}
            <a
              href={`/${locale === "fr" ? "fr/territoire-desservi/brossard" : "en/service-area/brossard"}`}
              onMouseEnter={() => setActiveHotspot("brossard")}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute cursor-pointer rounded-lg transition-all"
              style={{
                top: "55%",
                left: "81%",
                width: "15%",
                height: "20%",
              }}
              aria-label={isFrench ? "Explorer Brossard & Rive-Sud" : "Explore Brossard & South Shore"}
              title={isFrench ? "Cliquer pour explorer Brossard & la Rive-Sud" : "Click to explore Brossard & South Shore"}
            >
              <span className="absolute inset-0 rounded-lg border border-amber-400/0 hover:border-amber-400/60 hover:bg-amber-400/10 transition-all" />
            </a>

            {/* 5. Hotspot: Laval (North Shore Route Link) */}
            <a
              href={`/${locale === "fr" ? "fr/territoire-desservi/laval" : "en/service-area/laval"}`}
              onMouseEnter={() => setActiveHotspot("laval")}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute cursor-pointer rounded-lg transition-all"
              style={{
                top: "22%",
                left: "55%",
                width: "14%",
                height: "16%",
              }}
              aria-label={isFrench ? "Explorer Laval & Rive-Nord" : "Explore Laval & North Shore"}
              title={isFrench ? "Cliquer pour explorer Laval & la Rive-Nord" : "Click to explore Laval & North Shore"}
            >
              <span className="absolute inset-0 rounded-lg border border-amber-400/0 hover:border-amber-400/60 hover:bg-amber-400/10 transition-all" />
            </a>

            {/* 6. Hotspot: Montreal Core */}
            <a
              href={pathFor("serviceArea", locale)}
              onMouseEnter={() => setActiveHotspot("montreal")}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute cursor-pointer rounded-lg transition-all"
              style={{
                top: "42%",
                left: "60%",
                width: "18%",
                height: "20%",
              }}
              aria-label={isFrench ? "Explorer l'Île de Montréal" : "Explore Montreal Island"}
              title={isFrench ? "Cliquer pour explorer l'Île de Montréal" : "Click to explore Montreal Island"}
            >
              <span className="absolute inset-0 rounded-lg border border-amber-400/0 hover:border-amber-400/60 hover:bg-amber-400/10 transition-all" />
            </a>
          </div>

          {/* Dynamic Hotspot Floating Notification Hint */}
          {activeHotspot && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1.5 rounded-full bg-black/85 border border-amber-500/50 backdrop-blur-md text-amber-300 text-[11px] font-mono shadow-lg transition-all animate-in fade-in zoom-in-95">
              {activeHotspot === "emergency" && (isFrench ? "🚨 Appel d'urgence 24/7 direct → (514) 717-9277" : "🚨 Direct 24/7 emergency dispatch → (514) 717-9277")}
              {activeHotspot === "upload" && (isFrench ? "📷 Cliquez pour sélectionner la photo de votre panneau" : "📷 Click to upload electrical panel photo")}
              {activeHotspot === "brossard" && (isFrench ? "🗺️ Voir la couverture : Brossard, Longueuil & Rive-Sud →" : "🗺️ View coverage: Brossard, Longueuil & South Shore →")}
              {activeHotspot === "laval" && (isFrench ? "🗺️ Voir la couverture : Laval & Rive-Nord →" : "🗺️ View coverage: Laval & North Shore →")}
              {activeHotspot === "montreal" && (isFrench ? "🗺️ Voir la couverture : Grand Montréal & 50 villes →" : "🗺️ View coverage: Greater Montreal & 50 cities →")}
            </div>
          )}
        </div>

        {/* Upload Receipt Toast (if photo chosen) */}
        {uploadedFileName && (
          <div className="px-4 py-2.5 bg-amber-950/80 border-t border-amber-500/40 text-amber-200 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {isFrench
                  ? `Photo reçue : "${uploadedFileName}" — Transmise aux maîtres électriciens pour analyse.`
                  : `Photo received: "${uploadedFileName}" — Transmitted to master electricians for review.`}
              </span>
            </div>
            <button
              onClick={() => setUploadedFileName(null)}
              className="text-amber-400 hover:text-white text-xs px-2 py-0.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tactical Telemetry & Quick Action Dock */}
        <div className="px-4 sm:px-6 py-3 bg-[#0a0f18] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Telemetry points */}
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5" />
              <span>QG Saint-Léonard : 9005 Rue du Champ-d'Eau</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFrench ? "50 Municipalités couvertes · ETA : 20-35 min" : "50 Municipalities · ETA: 20-35 min"}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>RBQ #5582-0096-01 · CMEQ</span>
            </span>
          </div>

          {/* Quick Action Trigger Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={triggerUpload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 text-xs font-mono transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFrench ? "Évaluer panneau" : "Assess panel"}</span>
            </button>
            <a
              href="tel:+15147179277"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 text-red-200 text-xs font-mono font-semibold transition-all shadow-[0_0_12px_rgba(239,68,68,0.25)]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>(514) 717-9277</span>
            </a>
            <a
              href={`/${locale === "fr" ? "fr/territoire-desservi/brossard" : "en/service-area/brossard"}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            >
              <span>{isFrench ? "Brossard & 50 villes" : "Brossard & 50 cities"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0a0f18] rounded-2xl border border-amber-500/40 p-4 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-amber-400">
              <span className="font-bold uppercase tracking-wider">
                {isFrench ? "Poste de commandement et de répartition — Plein écran" : "Dispatch Command Center — Fullscreen"}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Fullscreen Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/craft-dispatch-hub.jpg"
              alt="Dispatch Hub"
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl block"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-300 font-mono gap-2">
              <span>9005 Rue du Champ-d&apos;Eau, Saint-Léonard · RBQ 5582-0096-01 · CMEQ</span>
              <div className="flex items-center gap-2">
                <a
                  href="/media/craft-dispatch-hub.jpg"
                  download
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs"
                >
                  {isFrench ? "Télécharger" : "Download"}
                </a>
                <a
                  href="tel:+15147179277"
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                >
                  {isFrench ? "Urgence : (514) 717-9277" : "Emergency: (514) 717-9277"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
