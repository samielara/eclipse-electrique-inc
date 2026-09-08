# AI Assistant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a safety-first bilingual rule-based assistant across every Éclipse électrique route.

**Architecture:** A pure knowledge module classifies language, hazards, service intent, and city coverage before returning localized reply data. A client-side dialog component renders those replies, manages conversation state, and hands qualified visitors to the existing localized quote wizard. `PageRenderer` mounts the widget once globally and `globals.css` extends the existing dark/light and responsive tokens.

**Tech Stack:** Next.js 16, React 19, TypeScript, Radix Dialog through the installed UI primitive, Lucide React, Tailwind CSS 4 plus project CSS, Node test runner, Vite SSR.

**Spec:** `docs/superpowers/specs/2026-09-08-ai-assistant-design.md`

## Global Constraints

- Keep deployment deferred and preserve `.openai/hosting.json`.
- Reuse existing dependencies and do not modify the lockfile.
- Keep French first while responding in English when English intent is detected.
- Hazard detection always precedes lead qualification and never provides repair instructions.
- Use only verified facts from `lib/site.ts` and the published 50-city catalogue.
- Emergency widget actions use `tel:5147179277` and display `514-717-9277`.
- Maintain dark-default and light-theme styling, 44px minimum interactive targets, keyboard navigation, focus containment, Escape close, and safe-area spacing above the mobile action bar.

---

### Task 1: Knowledge engine contracts

**Files:**
- Create: `lib/knowledge-base.ts`
- Modify: `tests/ui-components.test.mjs`

**Interfaces:**
- Consumes: `Locale` from `lib/routes.ts`, `cityRoutes`/`cityPath` from `lib/city-routes.ts`, and verified fields from `lib/site.ts`.
- Produces: `getAssistantReply(input, routeLocale)`, `getAssistantGreeting(locale)`, `getAssistantQuickReplies(locale)`, `findCoveredCity(input)`, `assistantBusinessFacts`, and localized reply/action types.

- [ ] **Step 1: Write the failing safety and language tests**

  Add literal assertions showing that `sparks and smoke` returns English emergency content and `odeur de brûlé` returns the exact French hazard warning, with both actions using `tel:5147179277`.

- [ ] **Step 2: Run the focused test file and verify RED**

  Run `node --test --test-name-pattern="assistant knowledge" tests/ui-components.test.mjs` and confirm failure because `lib/knowledge-base.ts` is absent.

- [ ] **Step 3: Implement normalized hazard-first classification**

  Create immutable localized copy, accent-insensitive normalization, bilingual language scoring, emergency patterns, intent patterns, reply actions, and a single classifier whose first branch is active hazard detection.

- [ ] **Step 4: Add and pass city and qualification tests**

  Assert the real catalogue contains 50 entries, finds `Saint-Léonard` accent-insensitively, rejects an unlisted city, returns the city deep link, and exposes the requested five localized quick replies. Run the focused test file until those behaviors pass.

### Task 2: Accessible global assistant widget

**Files:**
- Create: `components/ai-assistant.tsx`
- Modify: `components/page-renderer.tsx`
- Modify: `tests/ui-components.test.mjs`

**Interfaces:**
- Consumes: knowledge replies and quick replies from Task 1, localized paths from `lib/routes.ts`, and the existing `components/ui/dialog.tsx` primitive.
- Produces: `AiAssistant`, `AssistantReplyCard`, and `assistantVisibilityReducer`.

- [ ] **Step 1: Write failing render and visibility tests**

  Render the real launcher and open assistant surface with Vite SSR, assert accessible labels, requested quick replies, the live region, and an emergency reply card. Exercise the reducer through closed → open → closed transitions.

- [ ] **Step 2: Run the focused tests and verify RED**

  Run `node --test --test-name-pattern="assistant widget|assistant visibility|assistant emergency card" tests/ui-components.test.mjs` and confirm failure because the component is absent.

- [ ] **Step 3: Implement the dialog and conversation flow**

  Build a controlled Radix dialog with an unread launcher badge, localized header, message history, quick-reply buttons, safe text input, progress state, live announcements, a visible close action, and quote handoff behavior. Use the reducer tested in Step 1 for dialog state.

- [ ] **Step 4: Mount the assistant globally**

  Render `<AiAssistant locale={locale} />` once in `PageRenderer` after the shared page content so it appears on every localized service and city route.

- [ ] **Step 5: Pass component and rendered-page tests**

  Run the focused assistant tests, then add a rendered-page assertion showing `/fr` contains the French launcher and `/en` contains the English launcher.

### Task 3: Responsive themed presentation

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/ui-components.test.mjs`

**Interfaces:**
- Consumes: the component class names from Task 2 and the site's existing custom properties.
- Produces: desktop and mobile widget placement, safe-area spacing, dark/light surfaces, emergency contrast, and reduced-motion behavior.

- [ ] **Step 1: Write the failing CSS behavior test**

  Assert the built stylesheet includes the assistant launcher/panel selectors, safe-area bottom calculation above the mobile bar, a light-theme assistant rule, and the assistant transition keyframes.

- [ ] **Step 2: Run the focused CSS test and verify RED**

  Run `npm test -- --test-name-pattern="assistant styling"` and confirm the new selector assertions fail.

- [ ] **Step 3: Implement the widget styles**

  Add desktop lower-right placement, mobile `calc(... + env(safe-area-inset-bottom))` placement, 44px-or-larger controls, bounded responsive panel dimensions, scrollable messages, amber focus/CTA states, dark/light message and emergency surfaces, and reduced-motion compatibility.

- [ ] **Step 4: Run all verification commands**

  Run `npm run lint` and `npm test`. Review `git diff --check`, `git status --short`, and the final diff for unsupported claims or accidental generated output.

- [ ] **Step 5: Commit the verified implementation**

  Stage the two documentation files, knowledge module, assistant component, page-shell integration, stylesheet, and tests. Commit with `feat: add bilingual safety-first assistant` and record the full commit SHA.
