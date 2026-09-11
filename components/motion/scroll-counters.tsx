"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/routes";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  sub: string;
}

export function ScrollCounters({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const isFrench = locale === "fr";
  const stats: StatItem[] = isFrench
    ? [
        { target: 16, suffix: "+", label: "Années d'excellence", sub: "Fondée à Montréal" },
        { target: 50, suffix: "+", label: "Secteurs desservis", sub: "Montréal, Rive-Sud, Rive-Nord" },
        { target: 24, suffix: "/7", label: "Équipe d'urgence", sub: "Déplacement rapide" },
        { target: 100, suffix: "%", label: "Conformité CMEQ", sub: "Garantie aux normes" },
      ]
    : [
        { target: 16, suffix: "+", label: "Years of Excellence", sub: "Established in Montreal" },
        { target: 50, suffix: "+", label: "Municipalities Covered", sub: "Montreal, South & North Shore" },
        { target: 24, suffix: "/7", label: "Active Emergency Crew", sub: "Rapid on-site dispatch" },
        { target: 100, suffix: "%", label: "CMEQ Code Compliant", sub: "Guaranteed approvals" },
      ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1200;
          const steps = 30;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(stats.map((s) => Math.round(s.target * easeOut)));

            if (step >= steps) {
              clearInterval(timer);
              setCounts(stats.map((s) => s.target));
            }
          }, stepTime);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <div className="site-container" ref={containerRef}>
      <div className="scroll-counter-grid" aria-label={isFrench ? "Chiffres clés" : "Key metrics"}>
        {stats.map((stat, i) => (
          <div className="scroll-counter-card" key={stat.label}>
            <div className="scroll-counter-number">
              {hasAnimated ? counts[i] : 0}
              <span className="text-amber-400">{stat.suffix}</span>
            </div>
            <div className="scroll-counter-label">{stat.label}</div>
            <div className="scroll-counter-sub">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
