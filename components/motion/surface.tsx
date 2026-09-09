"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { useExperienceMotion } from "./provider";
import { cinematicTransition, cinematicVariants } from "./tokens";

/** SSR content starts visible. Transform-only motion does not move surrounding layout. */
export function MotionSurface({ children, className }: { children: ReactNode; className?: string }) {
  const { reducedMotion } = useExperienceMotion();
  return (
    <m.div
      className={className}
      initial={false}
      animate={cinematicVariants.visible}
      transition={reducedMotion ? { duration: 0 } : cinematicTransition}
    >
      {children}
    </m.div>
  );
}
