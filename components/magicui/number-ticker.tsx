"use client";

// Adapted from Magic UI (MIT); see THIRD_PARTY_NOTICES.md.
import { useRef } from "react";
import { useInView } from "motion/react";
import * as m from "motion/react-m";
import { useExperienceMotion } from "@/components/motion/provider";

/** Roll between identical copies: no intermediate year can imply an unsupported fact. */
export function NumberTicker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const { reducedMotion } = useExperienceMotion();
  return <span className="number-ticker">
    <span className="sr-only">{value}</span>
    <span ref={ref} aria-hidden="true" style={{ display: "inline-block", height: "1em", overflow: "hidden", verticalAlign: "-0.1em", lineHeight: 1 }}>
      <m.span style={{ display: "block" }} initial={false} animate={{ y: inView && reducedMotion === false ? ["0%", "-50%"] : "0%" }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}>
        <span style={{ display: "block" }}>{value}</span>
        <span style={{ display: "block" }}>{value}</span>
      </m.span>
    </span>
  </span>;
}
