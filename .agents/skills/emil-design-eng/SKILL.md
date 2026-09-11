---
name: emil-design-eng
description: Emil Kowalski animations.dev and design engineering philosophy on UI polish, micro-interactions, spring physics, origin-aware transitions, and sub-300ms responsiveness.
---

# Emil Kowalski Design Engineering & Animations Standards

Distilled from Emil Kowalski's (animations.dev, Sonner, Linear/Vercel) design engineering philosophy.

## The Ten Non-Negotiable Standards

1. **Justified motion**: Every animation must answer "why does this animate?" (Feedback, Spatial consistency, State indication, Explanation, Preventing jarring changes).
2. **Frequency-appropriate**:
   - 100+ times/day (keyboard shortcuts, toggles): No animation. Ever.
   - Tens of times/day (hover, lists): Fast and subtle (under 160ms) or nothing.
   - Occasional (modals, drawers, cards): Standard animation (180-300ms).
   - Rare/first-time (hero entrance, celebration): Delight budget.
3. **Responsive easing**: Entering elements decelerate with strong custom ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`). **Never use ease-in for UI entrances.**
4. **Sub-300ms UI**: All micro-interactions and UI state transitions must stay under 300ms (100-160ms for button press feedback, 150-250ms for dropdowns/popovers).
5. **Physical correctness**: Never animate from `scale(0)`. Start from `scale(0.95-0.98)` + `opacity: 0`. Popovers scale from their trigger (`transform-origin`).
6. **Interruptibility**: Rapidly triggered animations must be interruptible (CSS transitions or springs that retarget from current state, not keyframes that restart).
7. **GPU-only properties**: Animate `transform` and `opacity` only.
8. **Accessibility & Hover gating**: Honor `prefers-reduced-motion` (reduce distance, keep opacity/color). Gate hover transitions behind `@media (hover: hover) and (pointer: fine)`.
9. **Asymmetric enter/exit**: Press/exit is snappy; entrance is smooth. Add `transform: scale(0.97)` on `:active` with 160ms ease-out.
10. **Layered depth & Tabular figures**: Frosted glass with specular 1px border highlight (`inset 0 1px 0 rgba(255,255,255,0.12)`), multi-stop soft shadows, tabular numbers for telemetry/metrics (`font-variant-numeric: tabular-nums`).
