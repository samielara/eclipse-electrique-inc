# Éclipse électrique Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and privately publish a complete, responsive, French-first bilingual website for Éclipse électrique inc. using only verified public facts.

**Architecture:** Use the supported Vinext App Router starter on Cloudflare Workers. A typed page registry maps logical page IDs to localized URLs and content; one catch-all server route renders crawlable HTML for both locales, while a small client form prepares an email request without pretending that server delivery occurred.

**Tech Stack:** React 19, Next-compatible App Router, Vinext, TypeScript, Tailwind CSS 4, selected Lucide icons, native HTML controls, Node test runner, Vite SSR loader, Cloudflare Workers.

**Spec:** `docs/superpowers/specs/2026-09-08-eclipse-electrique-website-design.md`

## Global Constraints

- French is the default and `/` redirects to `/fr`.
- Every indexable page has distinct French and English URLs from the spec’s route table.
- Public copy uses only the verified name, RBQ/NEQ, licence history, phones, email, service groups, and broad service territory listed in the spec.
- Do not publish a street address, price, warranty, response-time guarantee, manufacturer authorization, client logo, invented review, or other unverified claim.
- No remote fonts, analytics, maps, autoplay, carousel, or new dependency is added.
- No generic template code, demo media, or uncertain third-party asset is copied.
- The emergency path is always a direct `tel:` link and never depends on a form.
- The private deployment may prepare an email request but must never report that a server submission was delivered.
- All interactive controls remain keyboard accessible, show focus, meet 44 by 44 pixel touch targets where primary, and honor reduced-motion settings.
- All public pages include localized titles, descriptions, self-canonicals, reciprocal alternates, and valid structured data containing verified facts only.

---

## File structure

- `lib/site.ts`: immutable verified company constants and deployment origin.
- `lib/routes.ts`: `Locale`, `PageId`, route registry, lookup, alternate, and navigation helpers.
- `content/site-content.ts`: complete Canadian French and English page content keyed by `PageId`.
- `components/brand-mark.tsx`: accessible text-led brand lockup.
- `components/site-header.tsx`: desktop/mobile navigation, language link, quote, office, and emergency actions.
- `components/site-footer.tsx`: verified identity, navigation, credentials, and privacy links.
- `components/service-card.tsx`: reusable service summary link.
- `components/quote-email-form.tsx`: minimal client-side email composer with accessible validation.
- `components/page-renderer.tsx`: server-rendered page layouts selected by logical page ID.
- `app/page.tsx`: default-language redirect.
- `app/[locale]/[[...segments]]/page.tsx`: locale validation, page lookup, localized metadata, and rendering.
- `app/layout.tsx`: global metadata, viewport, and application shell boundary.
- `app/not-found.tsx`: real bilingual-safe not-found page.
- `app/sitemap.ts`: both canonical versions of every public page.
- `app/robots.ts`: production crawl rules and sitemap location.
- `app/globals.css`: visual tokens, responsive layout, typography, focus, and reduced-motion behavior.
- `public/eclipse-electrical-grid.webp`: original non-documentary hero asset.
- `public/favicon.svg`: simple original brand favicon.
- `tests/routes-and-content.test.mjs`: route pairing and bilingual completeness.
- `tests/rendered-html.test.mjs`: built Worker responses, metadata, structured data, redirect, and not-found behavior.
- `THIRD_PARTY_NOTICES.md`: dependency/source provenance notes.

### Task 1: Route and verified-content contracts

**Files:**
- Create: `lib/site.ts`
- Create: `lib/routes.ts`
- Create: `content/site-content.ts`
- Create: `tests/routes-and-content.test.mjs`

**Interfaces:**
- Produces: `type Locale = "fr" | "en"`, `type PageId`, `routes`, `locales`, `pathFor(pageId, locale)`, `resolvePage(locale, segments)`, `alternatePath(pageId, locale)`, `site`, and `content`.
- Consumes: no application interface.

- [ ] **Step 1: Write route and content contract tests**

```js
import assert from "node:assert/strict";
import test, {after} from "node:test";
import {createServer} from "vite";

const vite = await createServer({appType: "custom", configFile: false, root: process.cwd(), resolve: {alias: {"@": process.cwd()}}, server: {middlewareMode: true}});
after(() => vite.close());

test("every page has unique French and English paths and complete content", async () => {
  const {routes, pathFor} = await vite.ssrLoadModule("/lib/routes.ts");
  const {content} = await vite.ssrLoadModule("/content/site-content.ts");
  const paths = Object.values(routes).flatMap((route) => [route.fr, route.en]);
  assert.equal(new Set(paths).size, paths.length);
  for (const pageId of Object.keys(routes)) {
    assert.ok(content.fr.pages[pageId]);
    assert.ok(content.en.pages[pageId]);
    assert.match(pathFor(pageId, "fr"), /^\/fr(?:\/|$)/);
    assert.match(pathFor(pageId, "en"), /^\/en(?:\/|$)/);
  }
});
```

- [ ] **Step 2: Run the contract test and confirm it fails because the modules do not exist**

Run: `node --test tests/routes-and-content.test.mjs`

Expected: FAIL with a module-resolution error for `/lib/routes.ts`.

- [ ] **Step 3: Implement the immutable company and route contracts**

```ts
export const site = {
  legalName: "Éclipse électrique inc.",
  officePhoneDisplay: "514-510-1112",
  officePhoneHref: "tel:+15145101112",
  emergencyPhoneDisplay: "514-717-9277",
  emergencyPhoneHref: "tel:+15147179277",
  email: "info@eclipseelectrique.com",
  rbq: "5582-0096-01",
  neq: "1165326209",
  licensedSince: 2008,
} as const;
```

Define the exact route pairs from the spec in a `satisfies Record<PageId, Record<Locale, string>>` registry. `resolvePage` must normalize empty segments, reject unsupported locales, and return `{pageId, locale}` only for an exact registry match.

- [ ] **Step 4: Implement complete `fr` and `en` navigation, service, process, FAQ, territory, contact, and privacy content**

Use the approved bilingual copy as the base. Expand only with the verified task lists already documented on the company’s public services page. Keep every claim inside the global content boundary.

- [ ] **Step 5: Run the route/content test**

Run: `node --test tests/routes-and-content.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit the contracts**

```bash
git add lib content tests/routes-and-content.test.mjs
git commit -m "feat: add bilingual route and content contracts"
```

### Task 2: Brand shell and responsive visual system

**Files:**
- Create: `components/brand-mark.tsx`
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `public/favicon.svg`
- Create: `public/eclipse-electrical-grid.webp`

**Interfaces:**
- Consumes: `Locale`, `PageId`, `pathFor`, `alternatePath`, `site`, and localized common content.
- Produces: `BrandMark`, `SiteHeader`, and `SiteFooter` server components.

- [ ] **Step 1: Add a shell-rendering test**

```js
test("renders labelled office, emergency, language, and skip links", async () => {
  const {SiteHeader} = await vite.ssrLoadModule("/components/site-header.tsx");
  const html = renderToStaticMarkup(React.createElement(SiteHeader, {locale: "fr", pageId: "home"}));
  assert.match(html, /href="#contenu"/);
  assert.match(html, /tel:\+15147179277/);
  assert.match(html, /tel:\+15145101112/);
  assert.match(html, /href="\/en"/);
  assert.match(html, /English/);
});
```

- [ ] **Step 2: Run the focused shell test and confirm it fails**

Run: `node --test tests/routes-and-content.test.mjs --test-name-pattern="renders labelled"`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Build the global shell**

Use semantic `header`, `nav`, `main`, and `footer` elements. Use named Lucide imports only. Implement mobile navigation with native disclosure semantics, direct office/emergency links, a page-preserving language link, and the quote CTA.

- [ ] **Step 4: Apply the visual thesis through shared tokens first**

Set graphite/navy backgrounds, white content surfaces, steel borders, amber CTA/focus accents, and restrained blue technical accents in `:root`. Use a system font stack and CSS grid/conduit motifs. Add `:focus-visible`, responsive breakpoints, 44-pixel action targets, and `@media (prefers-reduced-motion: reduce)` rules before component-specific polish.

- [ ] **Step 5: Integrate the original hero asset and favicon**

Copy the inspected generated asset to `public/eclipse-electrical-grid.webp`. Give it explicit dimensions, useful empty alt text because it is decorative, and no claim that it represents company work.

- [ ] **Step 6: Run tests and build**

Run: `node --test tests/routes-and-content.test.mjs`

Run: `npm run build`

Expected: both PASS.

- [ ] **Step 7: Commit the shell**

```bash
git add app/layout.tsx app/globals.css components public tests/routes-and-content.test.mjs
git commit -m "feat: create responsive Eclipse brand shell"
```

### Task 3: Server-rendered bilingual pages

**Files:**
- Modify: `app/page.tsx`
- Create: `app/[locale]/[[...segments]]/page.tsx`
- Create: `components/service-card.tsx`
- Create: `components/page-renderer.tsx`
- Create: `app/not-found.tsx`

**Interfaces:**
- Consumes: the Task 1 registries and Task 2 shell components.
- Produces: `PageRenderer({locale, pageId})` and working responses for every route pair.

- [ ] **Step 1: Replace the starter Worker test with route behavior tests**

```js
test("redirects the root to French and renders both locale homes", async () => {
  const worker = await loadWorker();
  const root = await fetchPage(worker, "/");
  assert.ok([307, 308].includes(root.status));
  assert.equal(root.headers.get("location"), "/fr");
  for (const path of ["/fr", "/en"]) {
    const response = await fetchPage(worker, path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /Éclipse électrique inc\./);
  }
});
```

- [ ] **Step 2: Run the Worker test and confirm it fails against starter content**

Run: `npm run test -- --test-name-pattern="redirects the root"`

Expected: FAIL because `/` still returns the starter page.

- [ ] **Step 3: Implement the redirect, resolver route, and not-found response**

`app/page.tsx` calls `redirect("/fr")`. The catch-all route validates locale and segments with `resolvePage`; it calls `notFound()` for any unsupported path and passes the resolved page to `PageRenderer`.

- [ ] **Step 4: Implement all page compositions**

Render home, services hub, five service detail pages, territory, about, FAQ, contact, and privacy. Keep one H1 per page; provide contextual internal links and repeated quote/emergency actions without duplicating whole paragraphs.

- [ ] **Step 5: Run the full build/test cycle**

Run: `npm test`

Expected: PASS.

- [ ] **Step 6: Commit the page layer**

```bash
git add app components tests/rendered-html.test.mjs
git commit -m "feat: render bilingual service website"
```

### Task 4: Honest email enquiry composer

**Files:**
- Create: `components/quote-email-form.tsx`
- Modify: `components/page-renderer.tsx`
- Modify: `tests/routes-and-content.test.mjs`

**Interfaces:**
- Consumes: `Locale`, localized form labels, `site.email`, and service options.
- Produces: `buildMailtoUrl(values, locale): string` and `QuoteEmailForm({locale})`.

- [ ] **Step 1: Write URL-composer tests**

```js
test("encodes a bilingual quote email without claiming submission", async () => {
  const {buildMailtoUrl} = await vite.ssrLoadModule("/components/quote-email-form.tsx");
  const url = buildMailtoUrl({name: "Sam", phone: "514 555 0101", email: "sam@example.ca", service: "residential", location: "Montréal", message: "Panel review"}, "en");
  assert.match(url, /^mailto:info@eclipseelectrique\.com\?/);
  assert.match(decodeURIComponent(url), /Panel review/);
  assert.doesNotMatch(decodeURIComponent(url), /submitted|sent successfully/i);
});
```

- [ ] **Step 2: Run the focused form test and confirm it fails**

Run: `node --test tests/routes-and-content.test.mjs --test-name-pattern="encodes a bilingual"`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the composer and accessible client form**

Validate required name, one reply channel, service, location, and message. Associate errors with fields, focus the error summary after invalid submission, construct an encoded localized subject/body, and open the user’s email client. Label the button `Préparer le courriel` / `Prepare email request`; state explicitly that the visitor must review and send the email in their email application.

- [ ] **Step 4: Add non-JavaScript contact fallbacks**

Keep office, emergency, and direct email links above the form. Keep the emergency notice before the first input.

- [ ] **Step 5: Run tests and build**

Run: `node --test tests/routes-and-content.test.mjs`

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit the enquiry flow**

```bash
git add components tests/routes-and-content.test.mjs
git commit -m "feat: add honest bilingual email enquiry flow"
```

### Task 5: Localized SEO and structured data

**Files:**
- Modify: `app/[locale]/[[...segments]]/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: page routes, localized SEO content, verified site constants, and the registered Site origin.
- Produces: localized `Metadata`, sitemap response, robots response, and `Electrician` JSON-LD.

- [ ] **Step 1: Add rendered metadata assertions**

```js
test("renders reciprocal locale SEO and verified Electrician JSON-LD", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/fr/services/electricien-residentiel");
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="fr-CA"/);
  assert.match(html, /rel="canonical"[^>]+\/fr\/services\/electricien-residentiel/);
  assert.match(html, /hreflang="en-CA"[^>]+\/en\/services\/residential-electrician/);
  assert.match(html, /"@type":"Electrician"/);
  assert.match(html, /5582-0096-01/);
  assert.doesNotMatch(html, /streetAddress|aggregateRating|priceRange/);
});
```

- [ ] **Step 2: Run the metadata test and confirm it fails**

Run: `npm run test -- --test-name-pattern="reciprocal locale SEO"`

Expected: FAIL because localized metadata and JSON-LD are absent.

- [ ] **Step 3: Implement localized metadata**

Use `generateMetadata` to set localized title, description, self-canonical, `fr-CA`, `en-CA`, and `x-default` alternates, Open Graph locale/text, and robots indexing. Remove all starter preview metadata.

- [ ] **Step 4: Implement safe JSON-LD**

Render one JSON-LD script with `@type: "Electrician"`, stable `@id`, legal name, URLs, both phones, email, broad service area, and verified identifiers. Serialize with `<` escaped as `\\u003c`. Do not include disputed address, ratings, prices, hours, or brand affiliations.

- [ ] **Step 5: Implement sitemap and robots metadata routes**

The sitemap enumerates both locale paths for every page ID and includes language alternates. Robots allows public crawling and references the absolute sitemap URL.

- [ ] **Step 6: Run all tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 7: Commit SEO**

```bash
git add app tests/rendered-html.test.mjs
git commit -m "feat: add bilingual local business SEO"
```

### Task 6: Provenance, quality gates, and final source state

**Files:**
- Create: `THIRD_PARTY_NOTICES.md`
- Modify: `README.md`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: the completed site.
- Produces: auditable provenance, operating instructions, and regression coverage.

- [ ] **Step 1: Document direct dependencies and asset provenance**

Record that the framework starter supplies MIT/ISC/other dependencies through the lockfile, the site contains original application code, the hero is AI-generated abstract artwork, and no demo theme assets were copied. Link the Next.js, Tailwind, shadcn, Lucide, React Hook Form, and Zod repositories and licences.

- [ ] **Step 2: Replace the starter README**

Document the bilingual route model, verified-content boundary, local build/test commands, private-deployment workflow, and exact launch blockers from the spec.

- [ ] **Step 3: Add a complete public-route smoke test**

```js
test("serves every registered public route", async () => {
  const worker = await loadWorker();
  for (const path of allLocalizedPaths) {
    const response = await fetchPage(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, path);
    assert.doesNotMatch(html, /Starter Project|Lorem ipsum|elcipseelectrique/i);
  }
});
```

- [ ] **Step 4: Run deterministic verification**

Run: `npm test`

Run: `npm run lint`

Run: `npm audit --omit=dev`

Run: `git diff --check`

Expected: tests and lint PASS; audit reports no known production vulnerability; diff check prints no errors.

- [ ] **Step 5: Commit the verified source**

```bash
git add README.md THIRD_PARTY_NOTICES.md tests
git commit -m "docs: add Eclipse website provenance and handoff"
```

### Task 7: Save and privately publish

**Files:**
- Modify: `.openai/hosting.json` only if the registered `project_id` is not already present.

**Interfaces:**
- Consumes: a clean committed source tree and the registered Site source repository.
- Produces: a saved Site version and owner-only production deployment URL.

- [ ] **Step 1: Verify the registration identity and clean source state**

Run: `git status --short --branch`

Expected: the correct branch and no uncommitted application files.

- [ ] **Step 2: Push the exact commit to the Site source repository**

Use the short-lived write credential only for the command; do not persist the token in Git configuration or a remote URL.

- [ ] **Step 3: Build the Sites artifact from the pushed commit**

Run: `node /root/.codex/plugins/cache/openai-curated-remote/sites/0.1.51/scripts/build-site.mjs`

Expected: successful artifact metadata for the current commit.

- [ ] **Step 4: Save a Site version from the exact pushed commit and artifact**

Confirm the saved version response before deployment.

- [ ] **Step 5: Deploy the saved version privately**

Use owner-only private deployment and inspect status until it is terminal.

- [ ] **Step 6: Hand off the private URL and launch blockers**

Report the working private site, completed functionality, and only the first-party facts needed before custom-domain/public launch.
