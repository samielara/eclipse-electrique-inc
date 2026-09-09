# Éclipse Électrique Cinematic Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, validate, and publish a cinematic but usable Éclipse Électrique experience that expresses controlled electrical energy across the hero, navigation, service discovery, proof, quote, and assistant flows.

**Architecture:** Extend the existing shared Motion layer with named cinematic variants and focused client components. Preserve the server-rendered page structure and data, using client islands only for pointer depth, entrance orchestration, and interaction feedback. Document the desktop/mobile compositions and timing in a Figma design file, then keep code behavior aligned with those annotations.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion 13, existing Magic UI adaptations, Playwright 1.63, axe-core, Figma MCP.

**Spec:** `docs/superpowers/specs/2026-09-09-cinematic-motion-design.md`

## Global Constraints

- Preserve French and English routes, server-rendered content, dark default, owner-approved light/dark logos, verified business facts, emergency telephone behavior, quote state, assistant safety gate, structured data, and all municipal routes.
- Reuse `motion/react` and the existing local Magic UI components; add no second animation framework.
- Functional motion is 120–220 ms, component motion 240–420 ms, section reveals 500–750 ms, and the hero sequence is at most 1,400 ms.
- `prefers-reduced-motion` removes parallax, scanning, stagger, and ambient loops without hiding or delaying content.
- Avoid scroll-jacking, layout-affecting transforms, large-area animated blur, and long-running decorative loops.
- Production publication occurs only after preview verification and a green validation suite.

---

### Task 1: Figma cinematic experience file

**Files:**
- Reference: `docs/superpowers/specs/2026-09-09-cinematic-motion-design.md`
- Reference: `components/page-renderer.tsx`
- Reference: `app/globals.css`

**Interfaces:**
- Consumes: current deployed page, owner logos, Manrope/Inter type system, copper/amber/charcoal/slate tokens.
- Produces: Figma `fileKey`, shareable `fileUrl`, desktop/mobile compositions, and motion annotations used by Tasks 2–4.

- [ ] **Step 1: Create the Figma design file**

Create a design file named `Éclipse Électrique — Cinematic Experience` in the connected user's available Figma plan.

- [ ] **Step 2: Capture the current application**

Capture the current English homepage into the new file at 1440×900 and 390×844 so the design work starts from the implemented content and spacing.

- [ ] **Step 3: Build cinematic frames and states**

Create desktop and mobile dark hero frames, a light hero state, service-card hover/focus state, theme transition, quote transition, assistant-open state, and emergency-handoff state. Add timing labels using the exact Global Constraints.

- [ ] **Step 4: Add reduced-motion annotations**

Annotate that parallax, scanning, stagger, and ambient loops resolve immediately to their stable final states when reduced motion is requested.

- [ ] **Step 5: Record the artifact**

Add the Figma URL and node references to `docs/validation/cinematic-motion.md` under `## Figma`.

### Task 2: Shared cinematic motion primitives

**Files:**
- Modify: `components/motion/tokens.ts`
- Modify: `components/motion/surface.tsx`
- Create: `components/motion/electric-trace.tsx`
- Test: `tests/ui-components.test.mjs`

**Interfaces:**
- Consumes: `useReducedMotion`, existing `MotionSurface` API, copper design tokens.
- Produces: `cinematicVariants`, `cinematicTransition`, `ElectricTrace`, and stable reduced-motion states used by Tasks 3–4.

- [ ] **Step 1: Write failing source-contract tests**

Add assertions that the motion layer exports `cinematicVariants` and `ElectricTrace`, uses `useReducedMotion`, and never declares scroll-jacking handlers or infinite hero animation.

```js
assert.match(tokensSource, /export const cinematicVariants/)
assert.match(traceSource, /useReducedMotion/)
assert.doesNotMatch(traceSource, /repeat:\s*Infinity/)
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="cinematic motion" tests/ui-components.test.mjs`

Expected: FAIL because the cinematic exports do not exist.

- [ ] **Step 3: Implement shared variants and trace**

Add stable hidden/visible variants with opacity and bounded translate values, plus a decorative trace component that renders its final state immediately for reduced motion.

```ts
export const cinematicVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
} as const

export const cinematicTransition = {
  duration: 0.64,
  ease: [0.22, 1, 0.36, 1],
} as const
```

- [ ] **Step 4: Run focused tests**

Run: `node --test --test-name-pattern="cinematic motion" tests/ui-components.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/motion tests/ui-components.test.mjs
git commit -m "feat: add cinematic electrical motion primitives"
```

### Task 3: Cinematic hero and header

**Files:**
- Create: `components/motion/cinematic-hero.tsx`
- Modify: `components/page-renderer.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/brand-mark.tsx`
- Modify: `app/globals.css`
- Test: `tests/e2e/experience.spec.ts`

**Interfaces:**
- Consumes: `cinematicVariants`, `cinematicTransition`, `ElectricTrace`, existing hero copy/video, `BrandMark` theme behavior.
- Produces: `CinematicHero`, coordinated first-load sequence, bounded pointer depth, sticky-header transition, and theme-logo crossfade.

- [ ] **Step 1: Write failing browser assertions**

Assert that the hero reaches `data-motion-state="settled"`, keyboard navigation remains usable during the sequence, and reduced-motion mode settles without waiting for stagger or parallax.

```ts
await expect(page.locator('[data-cinematic-hero]')).toHaveAttribute('data-motion-state', 'settled')
await page.emulateMedia({ reducedMotion: 'reduce' })
await expect(page.locator('[data-cinematic-hero]')).toHaveAttribute('data-reduced-motion', 'true')
```

- [ ] **Step 2: Run the focused browser case and verify failure**

Run: `npx playwright test tests/e2e/experience.spec.ts --grep "cinematic hero" --project=chromium`

Expected: FAIL because the cinematic hero markers do not exist.

- [ ] **Step 3: Implement the hero sequence**

Wrap existing hero content without changing its text hierarchy. Orchestrate eyebrow, heading, body, trust markers, and CTAs inside the 1,400 ms maximum. Use pointer depth only for `(pointer: fine)` and cap translation at 8 px.

- [ ] **Step 4: Implement header and logo transitions**

Preserve header height while switching its background state. Crossfade the two existing theme logos with an absolute stacking wrapper and keep the active image available to assistive technology.

- [ ] **Step 5: Verify desktop, mobile, theme, and reduced motion**

Run: `npx playwright test tests/e2e/experience.spec.ts --grep "cinematic hero|theme" --project=chromium`

Expected: PASS with no console errors or horizontal overflow.

- [ ] **Step 6: Commit**

```bash
git add components/motion/cinematic-hero.tsx components/page-renderer.tsx components/site-header.tsx components/brand-mark.tsx app/globals.css tests/e2e/experience.spec.ts
git commit -m "feat: create cinematic hero and navigation motion"
```

### Task 4: Service, proof, quote, and assistant choreography

**Files:**
- Modify: `components/service-card.tsx`
- Modify: `components/sector-matrix.tsx`
- Modify: `components/thermography-proof.tsx`
- Modify: `components/quote-intake-wizard.tsx`
- Modify: `components/ai-assistant.tsx`
- Modify: `app/globals.css`
- Test: `tests/e2e/experience.spec.ts`
- Test: `tests/e2e/hazard-interruption.spec.ts`

**Interfaces:**
- Consumes: Task 2 motion primitives and current component state APIs.
- Produces: keyboard-equivalent light traces, stable shared-layout transitions, one-shot proof motion, directional quote steps, and short assistant transitions that do not alter safety logic.

- [ ] **Step 1: Write failing interaction tests**

Cover service-card keyboard focus, matrix panel stability, quote value retention after animated back/forward navigation, assistant open/close, and emergency interruption during motion.

```ts
await card.focus()
await expect(card).toHaveAttribute('data-trace-active', 'true')
await expect(page.getByRole('link', { name: /514.*717.*9277/ })).toBeVisible()
```

- [ ] **Step 2: Run focused tests and verify failure**

Run: `npx playwright test tests/e2e/experience.spec.ts tests/e2e/hazard-interruption.spec.ts --grep "cinematic service|quote motion|hazard" --project=chromium`

Expected: FAIL on the new motion-state assertions while existing safety assertions remain green.

- [ ] **Step 3: Implement service and proof motion**

Add the trace response to hover and `focus-visible`, preserve card dimensions, keep panel containers height-stable, trigger verified number animations once, and use a single thermography scan reveal.

- [ ] **Step 4: Implement quote and assistant transitions**

Animate step direction based on navigation while preserving form state. Keep assistant animation under 320 ms and ensure the deterministic hazard response cancels decorative transitions and remains immediately visible.

- [ ] **Step 5: Run focused tests**

Run: `npx playwright test tests/e2e/experience.spec.ts tests/e2e/hazard-interruption.spec.ts --grep "cinematic service|quote motion|hazard" --project=chromium`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/service-card.tsx components/sector-matrix.tsx components/thermography-proof.tsx components/quote-intake-wizard.tsx components/ai-assistant.tsx app/globals.css tests/e2e
git commit -m "feat: choreograph service and conversion journeys"
```

### Task 5: Validation, pull request update, and production publication

**Files:**
- Create: `docs/validation/cinematic-motion.md`
- Modify: `docs/validation/pull-request.md`

**Interfaces:**
- Consumes: Tasks 1–4, existing bundle reports, GitHub PR #1, automatic Vercel preview.
- Produces: verified commit, updated PR, reviewed preview, merged `main`, and production confirmation at `https://eclipse-electrique-inc.vercel.app/`.

- [ ] **Step 1: Run static verification**

Run: `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, and `git diff --check main...HEAD`.

Expected: every command exits 0.

- [ ] **Step 2: Run full browser and accessibility verification**

Run: `npm run test:e2e`.

Expected: all configured French/English, light/dark, responsive, safety, and axe cases pass.

- [ ] **Step 3: Measure bundle impact**

Run: `npm run measure:bundles` and compare with `docs/validation/bundle-after.json`. Record the delta and correct regressions caused by duplicate animation code or unexpectedly large assets.

- [ ] **Step 4: Perform visual QA**

Inspect `/fr` and `/en` at 390×844, 768×1024, and 1440×900 in light, dark, and reduced-motion modes. Record checked states in `docs/validation/cinematic-motion.md`.

- [ ] **Step 5: Commit and push**

```bash
git add docs/validation/cinematic-motion.md docs/validation/pull-request.md docs/validation/bundle-after.json
git commit -m "docs: validate cinematic motion experience"
git push origin feature/eclipse-experience-upgrade
```

- [ ] **Step 6: Verify preview and merge readiness**

Confirm GitHub checks are green, the Vercel preview serves the exact HEAD commit, and the PR has no conflicts. Inspect the preview before merging.

- [ ] **Step 7: Publish production**

Merge pull request #1 through GitHub, wait for the Vercel production deployment, and verify `https://eclipse-electrique-inc.vercel.app/` serves the merged commit in French and English. Do not report completion until the production deployment is Ready and the live pages render successfully.

