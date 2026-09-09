"use client";

// Adapted from Magic UI (MIT); see THIRD_PARTY_NOTICES.md.
import { useId } from "react";

/** Deterministic SVG preserves hydration and avoids resize observers/random rerenders. */
export function AnimatedGridPattern() {
  const id = useId();
  return <svg aria-hidden="true" className="electrical-grid" width="100%" height="100%">
    <defs><pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse"><path d="M.5 64V.5H64" fill="none" /></pattern></defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
    {[ [1, 2], [4, 1], [7, 4], [10, 2], [14, 5], [18, 1] ].map(([x, y], index) => <rect className="electrical-grid-cell" key={`${x}-${y}`} x={x * 64 + 1} y={y * 64 + 1} width="63" height="63" style={{ animationDelay: `${index * 0.12}s` }} />)}
  </svg>;
}
