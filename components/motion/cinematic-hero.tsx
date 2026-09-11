"use client";

import { m, stagger, useAnimate, useScroll, useTransform } from "motion/react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

import { cinematicTransition, cinematicVariants } from "@/components/motion/tokens";

interface CinematicHeroProps {
  actions: ReactNode;
  background?: ReactNode;
  bottomBar?: ReactNode;
  eyebrow?: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  media?: ReactNode;
  mediaCard?: ReactNode;
  signature?: ReactNode;
  sideNote?: ReactNode;
  trustMarkers?: ReactNode;
}

export function CinematicHero({
  actions,
  background,
  bottomBar,
  eyebrow,
  heading,
  intro,
  media,
  mediaCard,
  signature,
  sideNote,
  trustMarkers,
}: CinematicHeroProps) {
  const [scope, animate] = useAnimate();
  const [motionState, setMotionState] = useState<"opening" | "settled">("settled");
  const [motionPreference, setMotionPreference] = useState<"pending" | "normal" | "reduce">("pending");
  const reducedMotion = motionPreference === "reduce";

  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], [0, -25]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let fallback: number | undefined;
    let entrance: ReturnType<typeof animate> | undefined;

    const settleImmediately = () => {
      entrance?.stop();
      setMotionPreference("reduce");
      setMotionState("settled");
      void animate(
        ".cinematic-hero-item",
        cinematicVariants.visible,
        { duration: 0 },
      );
    };

    queueMicrotask(() => {
      if (!active) return;
      if (query.matches) {
        settleImmediately();
        return;
      }

      setMotionPreference("normal");
      setMotionState("opening");
      entrance = animate(
        ".cinematic-hero-item",
        {
          opacity: [1, cinematicVariants.visible.opacity],
          y: [cinematicVariants.hidden.y, cinematicVariants.visible.y],
        },
        {
          ...cinematicTransition,
          delay: stagger(0.09, { startDelay: 0.03 }),
        },
      );
      void entrance.then(() => {
        if (active) setMotionState("settled");
      });
      fallback = window.setTimeout(() => {
        if (active) setMotionState("settled");
      }, 1400);
    });

    const updatePreference = () => {
      if (query.matches) {
        if (fallback !== undefined) window.clearTimeout(fallback);
        settleImmediately();
      } else {
        setMotionPreference("normal");
      }
    };

    query.addEventListener("change", updatePreference);
    return () => {
      active = false;
      entrance?.stop();
      if (fallback !== undefined) window.clearTimeout(fallback);
      query.removeEventListener("change", updatePreference);
    };
  }, [animate]);

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
      ref={scope}
      className="home-hero"
      data-cinematic-hero="true"
      data-motion-state={motionState}
      data-reduced-motion={motionPreference === "pending" ? "pending" : reducedMotion ? "true" : "false"}
      onPointerLeave={resetPointerDepth}
      onPointerMove={handlePointerMove}
      style={{ "--hero-depth-x": "0px", "--hero-depth-y": "0px" } as CSSProperties}
    >
      {background ? (
        <div className="hero-video-deferred-holder" aria-hidden="true">
          {background}
        </div>
      ) : null}
      <div className="unified-hero-container">
        <m.div
          className="unified-hero-banner"
          style={reducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          {/* Main Upper Zone: Image spans right & background with fade starting at subtitle, copy on left */}
          <div className="banner-main">
            <m.div className="cinematic-hero-item banner-image-layer" initial={false}>
              {media || mediaCard}
            </m.div>

            <div className="banner-copy">
              {eyebrow ? <m.div className="cinematic-hero-item" initial={false}>{eyebrow}</m.div> : null}
              <m.div className="cinematic-hero-item" initial={false}>{heading}</m.div>
              <m.div className="cinematic-hero-item" initial={false}>{intro}</m.div>
              {signature ? <m.div className="cinematic-hero-item" initial={false}>{signature}</m.div> : null}
              <m.div className="cinematic-hero-item" initial={false}>{actions}</m.div>
            </div>
          </div>

          {/* Integrated Bottom Credential Bar (Acadia style) */}
          {bottomBar ? (
            <div className="banner-bottom-bar">
              {bottomBar}
            </div>
          ) : trustMarkers ? (
            <div className="banner-bottom-bar">
              {trustMarkers}
            </div>
          ) : null}
        </m.div>
      </div>
      {sideNote ? sideNote : null}
    </m.section>
  );
}
