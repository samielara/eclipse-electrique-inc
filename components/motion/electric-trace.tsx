"use client";

import { m, useReducedMotion } from "motion/react";
import { cinematicMotionProps } from "./tokens";

interface ElectricTraceProps {
  className?: string;
}

/** Decorative copper trace that completes once without delaying page content. */
export function ElectricTrace({ className }: ElectricTraceProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = cinematicMotionProps(reducedMotion);

  return (
    <m.svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 240 24"
      {...motionProps}
    >
      <m.path
        d="M0 12h52l12-8 12 16 16-8h52l12-8 12 16 16-8h52"
        fill="none"
        stroke="var(--amber)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={motionProps.transition}
      />
    </m.svg>
  );
}
