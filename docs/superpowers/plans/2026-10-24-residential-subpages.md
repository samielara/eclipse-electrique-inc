# Residential Subpages Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. Local work only; no commits or deployments.

**Goal:** Add seasonally ordered Residential navigation and eleven bilingual service pages.

**Architecture:** One shared residential catalogue supplies routes, seasonal priorities, existing images and page content. Existing localized catch-all routing renders a shared detail template; the existing header receives server-selected seasonal ordering.

**Tech Stack:** Existing Next.js, React, TypeScript, CSS and Node test runner.

**Spec:** ../specs/2026-10-24-residential-subpages-design.md

## Global Constraints
- Local edits only. Preserve the user's homepage removals.
- Eleven approved services, each available in French and English.
- Reuse existing theme and images; no image generation or new dependencies.
- No changes to other service categories.
- Seasonal order uses America/Toronto, with manual override; stable routes.
- No unsupported compliance, rebate or response guarantees.

## Review Focus
- Date boundaries and invalid overrides: deterministic season selection and complete orders.
- Unknown nested routes: 404 rather than a generic Residential page.
- Locale switching: retain service identity rather than return to overview.
- Short/narrow screens: reachable scrolling submenu with no horizontal overflow.
- Pointer and keyboard transitions: submenu stays reachable, Escape closes it, mobile links close drawer.

## Task 1: Shared catalogue, seasonal ordering and routes
**Files:** Create content/residential-services.ts and tests/residential-services.test.mjs; modify lib/routes.ts and components/residential-work-explorer.tsx.
**Interfaces:** residentialServices, residentialServicePath(locale,id), getResidentialSeason(date,override?), getOrderedResidentialServices(season); ResolvedPage.residentialServiceId.
- [ ] Write tests for eleven unique entries, four complete orders, Toronto month boundaries, exact 22 paths, unknown-path rejection and locale pairing.
- [ ] Run new tests and confirm expected missing-module failures.
- [ ] Extract existing nine residential entries to the shared catalogue; add troubleshooting and inspections using existing maintenance/testing images and conservative localized copy.
- [ ] Implement pure seasonal helpers and exact nested route matching; include paths in allLocalizedPaths for sitemap generation.
- [ ] Run catalogue/routing tests and typecheck.

## Task 2: Shared localized service pages
**Files:** Create components/residential-service-page.tsx; modify app/[locale]/[[...segments]]/page.tsx, components/page-renderer.tsx, app/globals.css and components/residential-work-explorer.tsx.
**Interfaces:** ResidentialServicePage({locale,serviceId}); PageRenderer accepts residentialServiceId and passes it through the global header.
- [ ] Add rendering tests for service-specific H1, existing image, breadcrumbs, useful work scope and localized request link across all entries.
- [ ] Inspect current metadata generation and extend its canonical, alternate and description branches for residential identities.
- [ ] Render shared page with existing inner-page visual language, responsive image, work details and related residential links.
- [ ] Link existing overview entries to service pages without removing the overview.
- [ ] Run rendering/routing tests, verify sitemap inclusion and translated destinations.

## Task 3: Desktop flyout and mobile disclosure
**Files:** Modify components/site-header.tsx and app/globals.css; add tests/e2e/residential-navigation.spec.ts.
- [ ] Add interaction tests for hover-to-flyout movement, keyboard reachability/Escape and mobile expansion/link selection.
- [ ] Pass a single server-chosen seasonal order to the header; use stable service IDs and a separate Residential overview link.
- [ ] Add bounded desktop flyout with hover/focus interaction, independent toggle semantics and viewport-aware placement; mobile uses nested disclosure with one chevron.
- [ ] Check every link destination, light/dark styles, 390px mobile width and short desktop viewport scrolling.

## Task 4: Regression and handoff
**Files:** Update tests/routes-and-content.test.mjs and tests/ui-components.test.mjs for deliberately removed homepage sections.
- [ ] Assert removed sections remain absent while retaining meaningful homepage, navigation and CTA coverage.
- [ ] Run typecheck, production build, route/content tests and targeted browser interactions.
- [ ] Verify eleven services in each seasonal list, all 22 pages, invalid-route 404s and language switching.
- [ ] Self-review against the approved spec and report localhost links, verification and any limitations. Do not commit, push or deploy.
