"use client";

import { domAnimation, LazyMotion, MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "./tokens";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}

export function useExperienceMotion() {
  const reducedMotion = useReducedMotion();
  return {
    reducedMotion,
    transition: { duration: reducedMotion ? 0 : motionTokens.duration.standard, ease: motionTokens.ease },
  };
}
