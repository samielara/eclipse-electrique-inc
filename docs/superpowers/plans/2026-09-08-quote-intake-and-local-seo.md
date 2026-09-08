# Quote Intake and Local SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a bilingual four-step quote-intake wizard and complete localized `Electrician` / `LocalBusiness` structured data without adding a backend or publishing the site.

**Architecture:** Pure helpers in `lib/quote-intake.ts` define validation and the email-handoff contract, while `QuoteIntakeWizard` handles client-only interaction. A locale-aware `SchemaOrg` component replaces inline JSON-LD, and a centralized `quotePath` helper connects every conversion CTA to the intake anchor.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind-compatible project CSS, lucide-react, Node test runner, Vite SSR test loading.

**Spec:** `docs/superpowers/specs/2026-09-08-quote-intake-and-local-seo-design.md`

## Global Constraints

- Keep dark mode as the default and preserve the light-mode toggle.
- Use only verified facts: RBQ `5582-0096-01`, active since 2008, the supplied address and contact details, and bilingual service.
- Do not invent reviews, ratings, certifications, manufacturer relationships, warranties, or response guarantees.
- Treat file selection as a local placeholder; do not upload or persist user files.
- Do not publish during this implementation pass.

---

### Task 1: Quote intake domain contract

**Files:**
- Create: `lib/quote-intake.ts`
- Modify: `tests/routes-and-content.test.mjs`

**Interfaces:**
- Consumes: `Locale`, `cityRoutes`, `content`, and `site`.
- Produces: `QuoteIntakeValues`, `QuoteIntakeStep`, `QuoteIntakeErrors`, `emptyQuoteIntakeValues`, `validateQuoteIntakeStep(values, step, locale)`, and `buildQuoteIntakeMailtoUrl(values, locale)`.

- [ ] **Step 1: Write failing validation tests**

Add table-driven assertions showing that step 1 requires a service, step 2 requires a timeline, step 3 requires a supported municipality and valid Canadian postal code, and step 4 requires valid name, phone, email, address, and description.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test --test-name-pattern="validates each quote wizard step" tests/routes-and-content.test.mjs`

Expected: FAIL because `/lib/quote-intake.ts` does not exist.

- [ ] **Step 3: Implement the typed validation contract**

Create the exact value shape:

```ts
export interface QuoteIntakeValues {
  service: "" | "residential" | "commercialIndustrial" | "thermography" | "security" | "other";
  timeline: "" | "emergency" | "soon" | "planned";
  municipality: string;
  postalCode: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  fileNames: string[];
}
```

Return localized field messages keyed by the invalid field and reject municipality values that do not match an existing `cityRoutes.slug`.

- [ ] **Step 4: Run the focused validation test and verify GREEN**

Run: `node --test --test-name-pattern="validates each quote wizard step" tests/routes-and-content.test.mjs`

Expected: PASS.

- [ ] **Step 5: Write a failing email-handoff test**

Assert that a complete English request produces a URL beginning with `mailto:yasser@eclipseelectrique.com?`, includes independently derived labels and values for all four steps, lists selected filenames, and does not claim that the request or files were submitted.

- [ ] **Step 6: Run the focused email test and verify RED**

Run: `node --test --test-name-pattern="builds the complete bilingual quote handoff" tests/routes-and-content.test.mjs`

Expected: FAIL because the mailto builder has not been implemented.

- [ ] **Step 7: Implement minimal deterministic mailto generation**

Resolve service/timeline/municipality labels for the active locale, encode a localized subject and line-based body, and add an explicit manual-attachment instruction only when filenames exist.

- [ ] **Step 8: Run the focused quote tests and verify GREEN**

Run: `node --test --test-name-pattern="quote" tests/routes-and-content.test.mjs`

Expected: all quote tests PASS.

### Task 2: Accessible wizard and conversion wiring

**Files:**
- Create: `components/quote-intake-wizard.tsx`
- Modify: `components/page-renderer.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/thermography-proof.tsx`
- Modify: `lib/routes.ts`
- Modify: `tests/routes-and-content.test.mjs`
- Delete: `components/quote-email-form.tsx`

**Interfaces:**
- Consumes: the Task 1 contract and `cityRoutes`.
- Produces: `QuoteIntakeWizard({ locale })` and `quotePath(locale)`.

- [ ] **Step 1: Write a failing static-render test**

Render the contact page and assert `id="quote-intake"`, a progress value of 1/4, polite live status, the initial service radio group, bilingual step copy, and the 50-city data source exposed by the wizard module.

- [ ] **Step 2: Run the focused component test and verify RED**

Run: `node --test --test-name-pattern="renders the accessible quote wizard" tests/routes-and-content.test.mjs`

Expected: FAIL because the contact page still renders `QuoteEmailForm`.

- [ ] **Step 3: Implement the minimal four-step client component**

Use one `useState<QuoteIntakeValues>` value object, one numeric step state, localized copy maps, labeled native controls, a native `<progress max={4}>`, a focusable step heading, a focusable alert summary, back/next actions, and a final submit that navigates to `buildQuoteIntakeMailtoUrl`.

- [ ] **Step 4: Wire the contact page and quote links**

Replace `QuoteEmailForm` with `QuoteIntakeWizard`. Add `quotePath(locale)` returning `${pathFor("contact", locale)}#quote-intake`, then use it in `ActionPair`, desktop/mobile header quotes, and the thermography CTA.

- [ ] **Step 5: Run focused component and route tests and verify GREEN**

Run: `node --test --test-name-pattern="quote wizard|quote anchor" tests/routes-and-content.test.mjs`

Expected: PASS.

- [ ] **Step 6: Remove the superseded form**

Delete `components/quote-email-form.tsx` only after no imports remain, then rerun `node --test tests/routes-and-content.test.mjs`.

### Task 3: Localized structured data and social metadata

**Files:**
- Create: `components/schema-org.tsx`
- Modify: `app/[locale]/[[...segments]]/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `lib/site.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `site`, `pathFor`, and `Locale`.
- Produces: `buildLocalBusinessSchema(locale)` and `SchemaOrg({ locale })`.

- [ ] **Step 1: Write failing rendered-HTML schema assertions**

Require both schema types, localized service names, street/locality/postal/country fields, exact office and emergency E.164 numbers, yasser email, `Mo-Su 00:00-24:00`, `$$`, `hasOfferCatalog`, and continued absence of `aggregateRating`.

- [ ] **Step 2: Write failing metadata assertions**

Require the existing canonical and reciprocal `fr-CA` / `en-CA` links plus `twitter:card`, localized Twitter title, and localized OpenGraph values.

- [ ] **Step 3: Run the focused rendered test and verify RED**

Run: `node --test --test-name-pattern="reciprocal locale SEO" tests/rendered-html.test.mjs`

Expected: FAIL on missing address, catalog, price range, LocalBusiness type, and Twitter metadata.

- [ ] **Step 4: Implement the schema builder and renderer**

Return one locale-aware schema object with `@type: ["Electrician", "LocalBusiness"]`, verified identifiers/address/contact points, six key service areas, bilingual language support, 24/7 emergency-dispatch availability, price range, and four `Offer` / `Service` entries with localized names and URLs. Escape `<` before injecting serialized JSON.

- [ ] **Step 5: Integrate metadata and verified contact values**

Replace the inline JSON-LD function with `<SchemaOrg locale={resolved.locale} />`, add route-specific Twitter metadata alongside existing OpenGraph and alternates, and update `site.email` / `site.emailHref` to `yasser@eclipseelectrique.com`.

- [ ] **Step 6: Run the focused rendered test and verify GREEN**

Run: `npm run build && node --test --test-name-pattern="reciprocal locale SEO" tests/rendered-html.test.mjs`

Expected: PASS.

### Task 4: Responsive theme styling and release verification

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/routes-and-content.test.mjs`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: wizard class names and existing theme tokens.
- Produces: responsive light/dark presentation and release evidence.

- [ ] **Step 1: Add a failing style-contract assertion**

Require wizard progress, selected option, emergency banner, action row, upload control, dark-theme overrides, mobile one-column layout, and a `scroll-margin-top` rule for `#quote-intake`.

- [ ] **Step 2: Run the focused style test and verify RED**

Run: `node --test --test-name-pattern="styles the quote wizard" tests/routes-and-content.test.mjs`

Expected: FAIL because the new class rules do not exist.

- [ ] **Step 3: Implement responsive light/dark styles**

Add copper/amber active states, high-contrast slate cards, `:focus-visible` rings, reduced-motion-safe transitions, a desktop two-column choice grid, and a single-column layout below the existing mobile breakpoint.

- [ ] **Step 4: Run focused style tests and verify GREEN**

Run: `node --test --test-name-pattern="styles the quote wizard" tests/routes-and-content.test.mjs`

Expected: PASS.

- [ ] **Step 5: Run final verification**

Run: `npm run lint`

Run: `npm test`

Run: `git diff --check`

Expected: all commands exit 0, with no test failures or whitespace errors.

- [ ] **Step 6: Commit the completed feature without publishing**

```bash
git add app components lib tests docs/superpowers
git commit -m "feat: add quote intake and local business schema"
git status --short
```

Expected: commit succeeds and the final status output is empty.
