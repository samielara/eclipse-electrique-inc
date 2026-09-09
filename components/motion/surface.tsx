"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { cinematicVariants } from "./tokens";

/** Meaningful content remains visible through SSR and hydration. */
export function MotionSurface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial={false}
      animate={cinematicVariants.visible}
    >
      {children}
    </m.div>
  );
}
