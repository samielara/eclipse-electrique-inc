"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { useExperienceMotion } from "./provider";
import { cinematicMotionProps } from "./tokens";

/** Normal motion enters from a stable transform; reduced motion renders its final state. */
export function MotionSurface({ children, className }: { children: ReactNode; className?: string }) {
  const { reducedMotion } = useExperienceMotion();
  const motionProps = cinematicMotionProps(reducedMotion);

  return (
    <m.div
      className={className}
      {...motionProps}
    >
      {children}
    </m.div>
  );
}
