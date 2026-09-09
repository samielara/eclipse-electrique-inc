"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { useExperienceMotion } from "./provider";

/** SSR content starts visible. Transform-only motion does not move surrounding layout. */
export function MotionSurface({ children, className }: { children: ReactNode; className?: string }) {
  const { reducedMotion, transition } = useExperienceMotion();
  return <m.div className={className} initial={false} animate={{ y: reducedMotion === false ? [6, 0] : 0 }} transition={transition}>{children}</m.div>;
}
