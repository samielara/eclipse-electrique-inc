"use client";

import { m, useReducedMotion } from "motion/react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

import { ElectricTrace } from "@/components/motion/electric-trace";
import { cinematicTransition, cinematicVariants } from "@/components/motion/tokens";

interface CinematicHeroProps {
  actions: ReactNode;
  background: ReactNode;
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  sideNote?: ReactNode;
  trustMarkers: ReactNode;
}

const readableInitial = { ...cinematicVariants.hidden, opacity: 1 };

export function CinematicHero({
  actions,
  background,
  eyebrow,
  heading,
  intro,
  sideNote,
  trustMarkers,
}: CinematicHeroProps) {
  const motionReduced = useReducedMotion();
  const [mediaReduced, setMediaReduced] = useState(false);
  // Start from the same visible state on the server and first client render,
  // then apply the user's media preference without a stale hydration attribute.
  const reducedMotion = mediaReduced;
  const [settled, setSettled] = useState(false);
  const motionState = reducedMotion || settled ? "settled" : "opening";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMediaReduced(Boolean(motionReduced || query.matches));
    const frame = window.requestAnimationFrame(updatePreference);
    query.addEventListener("change", updatePreference);
    return () => {
      window.cancelAnimationFrame(frame);
      query.removeEventListener("change", updatePreference);
    };
  }, [motionReduced]);

  useEffect(() => {
    if (reducedMotion) return;

    const fallback = window.setTimeout(() => setSettled(true), 1400);
    return () => window.clearTimeout(fallback);
  }, [reducedMotion]);

  function itemMotion(index: number) {
    return {
      initial: reducedMotion ? false : readableInitial,
      animate: cinematicVariants.visible,
      transition: reducedMotion
        ? { duration: 0 }
        : { ...cinematicTransition, delay: 0.04 + index * 0.11 },
    } as const;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (
      reducedMotion ||
      !window.matchMedia("(pointer: fine)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, ((event.clientX - bounds.left) / bounds.width - 0.5) * 16));
    const y = Math.max(-8, Math.min(8, ((event.clientY - bounds.top) / bounds.height - 0.5) * 16));
    event.currentTarget.style.setProperty("--hero-depth-x", `${x.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-depth-y", `${y.toFixed(2)}px`);
  }

  function resetPointerDepth(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--hero-depth-x", "0px");
    event.currentTarget.style.setProperty("--hero-depth-y", "0px");
  }

  return (
    <m.section
      className="home-hero"
      data-cinematic-hero="true"
      data-motion-state={motionState}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      onPointerLeave={resetPointerDepth}
      onPointerMove={handlePointerMove}
      style={{ "--hero-depth-x": "0px", "--hero-depth-y": "0px" } as CSSProperties}
    >
      <div className="cinematic-depth-layer" aria-hidden="true">
        {background}
      </div>
      <div className="site-container home-hero-inner">
        <div className="home-hero-copy">
          <m.div className="cinematic-hero-item" {...itemMotion(0)}>{eyebrow}</m.div>
          <m.div className="cinematic-hero-item" {...itemMotion(1)}>{heading}</m.div>
          <m.div className="cinematic-hero-item" {...itemMotion(2)}>{intro}</m.div>
          <m.div className="cinematic-hero-item" {...itemMotion(3)}>{trustMarkers}</m.div>
          <m.div
            className="cinematic-hero-item"
            {...itemMotion(4)}
            onAnimationComplete={() => setSettled(true)}
          >
            {actions}
          </m.div>
          <ElectricTrace className="cinematic-hero-trace" />
        </div>
        {sideNote}
      </div>
    </m.section>
  );
}
