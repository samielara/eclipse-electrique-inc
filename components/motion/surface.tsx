"use client";

import { m, useAnimationControls } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useExperienceMotion } from "./provider";
import { cinematicTransition, cinematicVariants } from "./tokens";

export function startMotionSurfaceEntrance(
  controls: ReturnType<typeof useAnimationControls>,
  reducedMotion: boolean,
  requestFrame: typeof requestAnimationFrame = requestAnimationFrame,
) {
  if (reducedMotion) {
    controls.set(cinematicVariants.visible);
    return undefined;
  }

  controls.set(cinematicVariants.hidden);
  return requestFrame(() => {
    void controls.start(cinematicVariants.visible, cinematicTransition);
  });
}

/** SSR content stays visible; normal motion is a client-side enhancement after mount. */
export function MotionSurface({ children, className }: { children: ReactNode; className?: string }) {
  const { reducedMotion } = useExperienceMotion();
  const controls = useAnimationControls();

  useEffect(() => {
    if (reducedMotion === null) return;

    const frame = startMotionSurfaceEntrance(controls, reducedMotion);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [controls, reducedMotion]);

  return (
    <m.div
      className={className}
      initial={false}
      animate={controls}
    >
      {children}
    </m.div>
  );
}
