# Éclipse Experience Upgrade Implementation Plan

> Execution: use superpowers:subagent-driven-development; root integrates, reviews, and publishes the feature branch only.

**Goal:** Upgrade typography, restrained motion, and the optional assistant while preserving all verified content and deterministic electrical-safety guidance.

**Architecture:** Preserve Next.js server-rendered routes and existing UI; add small client animation boundaries. Keep the rule-based assistant as the authoritative safety and fallback layer; put optional model orchestration in a validated server route with bounded typed tools.

**Stack:** Next.js 16, React 19, Tailwind 4, npm, Motion, selected local MIT Magic UI adaptations, Fontsource, AI SDK, Playwright, axe.

**Spec:** `../specs/eclipse-experience-upgrade.md` (user-authored requirements).

## Global constraints and decisions

- Branch `feature/eclipse-experience-upgrade`; no production merge/deployment. Push and PR authorized.
- Preserve logo commit a1b6f40 and unrelated original-checkout lockfile changes.
- Keep dark default, bilingual routes, all city pages, verified facts, emergency actions and quote wizard.
- No model key required to complete. No secrets in source; no diagnoses or unverified model claims.
- User requests autonomous execution and subagents; no design approval pause is necessary.
- Current production is Vercel/Next.js. Preserve legacy Sites metadata and Vinext test compatibility; do not publish via Sites.

## 1. Baseline and dependencies (root)
- [x] Record lint/tests/build and compressed JS/CSS sizes before dependency edits.
- [x] Verify official package peers/versions, install exact compatible packages once in the isolated worktree.
- [x] Make lint cross-platform and update only two stale logo assertions to the approved current branding.
- [x] Record reproducible bundle measurement script and before report.

## 2. UI and typography (UI worker)
Files: `app/globals.css`, `app/layout.tsx`, `components/page-renderer.tsx`, service matrix, thermography and quote wizard, new `components/motion/*`, `components/magicui/*`.
- [x] Preserve SSR content with visible initial state; create shared LazyMotion/reduced-motion tokens.
- [x] Self-host Manrope/Inter Latin and Latin Extended through global tokens, font-display optional to avoid late fallback swaps.
- [x] Add restrained hero/header/card/tab/wizard/CTA motion and three local Magic UI adaptations with MIT attribution.
- [x] Number Ticker uses the verified year 2008, with accessible stable final text; effects stop under reduced motion.
- [x] Review semantics, focus, navigation, mobile controls and cumulative layout shifts.

## 3. Guarded optional AI (AI worker)
Files: `components/ai-assistant.tsx`, new `app/api/assistant/route.ts`, `lib/assistant/*`, `.env.example`, focused safety tests.
- [x] Test deterministic hazard priority, malformed/oversize input, rate limit, timeout, absent key/disabled fallback.
- [x] Validate requests with Zod. Hazard gate precedes every model request; retain full deterministic response on any error.
- [x] Add typed `checkServiceArea`, `matchElectricalService`, `prefillQuote`, `emergencyHandoff` using existing datasets and quote schema.
- [x] Permit only verified business responses; safe structured tool selection rather than unbounded advice.
- [x] Keep API key server-only; feature disabled by default; document process-local rate-limit scope and bounded provider requests.
- [x] Preserve accessible assistant focus/open/close and apply shared motion tokens if available.

## 4. E2E and accessibility (QA worker)
Files: `playwright.config.ts`, `tests/e2e/*`; root owns package scripts.
- [x] Real browser tests for both languages/themes across 390x844, 768x1024 and 1440x900.
- [x] Cover navigation/dropdowns/menu, service matrix, wizard validation/back state/city selection, emergency and fallback, keyboard focus.
- [x] Assert no unexpected console errors, horizontal overflow or overlapping fixed controls.
- [x] axe WCAG AA scans in both themes/locales, including open assistant and quote form.
- [x] Reduced-motion and persisted-theme checks; no implementation-specific large snapshots.

## 5. Integration and release (root)
- [x] Run lint, unit tests, both required build paths, TypeScript and Playwright/axe; fix regressions.
- [x] Compare before/after compressed bundles and correct disproportionate increases.
- [x] Focused independent review plus root self-review: safety/security, performance, unsupported claims, accessibility.
- [ ] `git diff --check`; logical commits; push feature branch; create PR with structured description.
- [ ] Verify preview workflow without production deployment; document any authentication blocker.
- [ ] Final report: features, branch/commits, PR/preview, all checks, bundles, environment names, limitations.
