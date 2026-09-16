# Service Work Explorer Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace each service page's context panel and static work list with the same image-led, selectable service-work explorer used by Residential.

**Architecture:** Convert the residential-only client component into a generic explorer that receives typed localized service data. Keep all page-specific categories, descriptions, highlights, and media paths in a content module; `ServiceDetailPage` selects that data by service page id. The component owns tabs, arrow controls, wraparound state, image/copy synchronization, and responsive UI.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind/CSS, Lucide, Playwright, built-in image generation.

**Spec:** `docs/superpowers/specs/2026-09-15-service-work-explorer-design.md`

## Global Constraints

- Keep all copy bilingual and consistent with the published service scope in `content/site-content.ts`.
- Generate one distinct, logo-free, text-free landscape image for every listed category; retain the three existing matching security images only for the matching security categories.
- Use the same tab rail, image layout, circular left/right controls, amber hover treatment, and mobile behavior as Residential.
- Maintain accessible tab semantics, meaningful alt text, arrow button labels, reduced-motion support, and no horizontal mobile overflow.
- Do not alter routes, SEO metadata, service heroes, navigation, contact behavior, or non-service pages.
- Do not commit, push, or open a pull request.

---

## File structure

- Create: `content/service-work-explorer.ts` — typed bilingual explorer data for all seven service pages.
- Rename/modify: `components/residential-work-explorer.tsx` → `components/service-work-explorer.tsx` — reusable interactive UI and arrow state.
- Modify: `components/page-renderer.tsx` — select the explorer for each service page and remove the old visual/list treatment from those routes.
- Modify: `app/globals.css` — rename residential-only explorer selectors to shared selectors without changing visual behavior.
- Modify: `tests/e2e/service-card-interaction.spec.ts` — shared route coverage for explorer tabs, arrows, images, and responsive overflow.
- Create: `public/media/service-*.png` — 31 new, category-specific generated media assets.

## Task 1: Define reusable data and component interfaces

**Files:**
- Create: `content/service-work-explorer.ts`
- Rename/modify: `components/residential-work-explorer.tsx` → `components/service-work-explorer.tsx`
- Test: `tests/e2e/service-card-interaction.spec.ts`

**Interfaces:**
- Produces `ServiceWorkItem`, `ServiceWorkExplorerData`, and `serviceWorkExplorerData` keyed by `ServicePageId`.
- Produces `ServiceWorkExplorer({ locale, serviceId })`.

- [ ] **Step 1: Write the failing test**

```ts
test("commercial route renders the shared work explorer", async ({ page }) => {
  await page.goto("/en/services/commercial-electrician");
  await expect(page.getByTestId("service-work-explorer")).toBeVisible();
  await expect(page.getByTestId("service-work-explorer").getByRole("tab")).toHaveCount(8);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "commercial route renders" --workers=1`

Expected: FAIL because Commercial still renders `service-visual-section`, not `service-work-explorer`.

- [ ] **Step 3: Define the reusable TypeScript contract**

```ts
export type LocalizedText = { en: string; fr: string };

export type ServiceWorkItem = {
  id: string;
  number: string;
  image: string;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  highlights: { en: readonly [string, string, string]; fr: readonly [string, string, string] };
};

export type ServiceWorkExplorerData = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  items: readonly ServiceWorkItem[];
};
```

- [ ] **Step 4: Move Residential data into the content module and rename the component**

```tsx
export function ServiceWorkExplorer({ locale, serviceId }: { locale: Locale; serviceId: ServicePageId }) {
  const data = serviceWorkExplorerData[serviceId];
  const [activeId, setActiveId] = useState(data.items[0].id);
  // Preserve tab and arrow behavior from the existing residential implementation.
}
```

- [ ] **Step 5: Run the original Residential explorer test**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "residential service replaces" --workers=1`

Expected: PASS with nine tabs, working arrows, and the first existing Residential image.

## Task 2: Generate commercial and industrial category media

**Files:**
- Create: `public/media/service-commercial-*.png` (8)
- Create: `public/media/service-industrial-*.png` (6)
- Modify: `content/service-work-explorer.ts`

**Interfaces:**
- Consumes `ServiceWorkExplorerData` from Task 1.
- Produces 14 commercial/industrial data entries with final media paths.

- [ ] **Step 1: Add failing image assertions**

```ts
for (const route of ["/en/services/commercial-electrician", "/en/services/industrial-electrician"]) {
  test(`${route} exposes one non-empty image for each explorer tab`, async ({ page }) => {
    await page.goto(route);
    const explorer = page.getByTestId("service-work-explorer");
    const tabs = explorer.getByRole("tab");
    for (let index = 0; index < await tabs.count(); index += 1) {
      await tabs.nth(index).click();
      await expect(explorer.getByTestId("service-work-image")).toHaveAttribute("src", /\/media\/service-/);
    }
  });
}
```

- [ ] **Step 2: Run the image assertions to verify failure**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "non-empty image" --workers=1`

Expected: FAIL because the commercial and industrial explorer data and image paths do not yet exist.

- [ ] **Step 3: Generate and inspect commercial images**

Generate one 16:10, photorealistic, logo-free image for each commercial category: new installations/reconfiguration; service entrances/panels; interior/exterior/controlled lighting; energy-efficiency measures; structured cabling; emergency lighting/fire/intercom/access; security/surveillance; UPS/generators. Save final inspected artifacts as `service-commercial-01.png` through `service-commercial-08.png`.

- [ ] **Step 4: Generate and inspect industrial images**

Generate one matching image for electrical entrances/distribution; panels/lighting/controls; machinery installation/connections; structured cabling/building systems; UPS/generators; diagnosis/repair/maintenance. Save as `service-industrial-01.png` through `service-industrial-06.png`.

- [ ] **Step 5: Add the corresponding bilingual data entries**

For each category, use the English and French published item text as the title; write a one-sentence scope description and exactly three practical highlights that do not add unsupported claims.

- [ ] **Step 6: Run the image assertions to verify they pass**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "non-empty image" --workers=1`

Expected: PASS for every commercial and industrial category.

## Task 3: Generate maintenance, generator, and thermography category media

**Files:**
- Create: `public/media/service-maintenance-*.png` (6)
- Create: `public/media/service-generators-*.png` (4)
- Create: `public/media/service-thermography-*.png` (5)
- Modify: `content/service-work-explorer.ts`

**Interfaces:**
- Consumes reusable data types from Task 1.
- Produces 15 data entries and assets for maintenance, generators, and thermography.

- [ ] **Step 1: Add failing route/count tests**

```ts
const expectedExplorerTabCounts = {
  "/en/services/maintenance-and-emergency": 6,
  "/en/services/generators": 4,
  "/en/services/infrared-thermography": 5,
};

for (const [route, count] of Object.entries(expectedExplorerTabCounts)) {
  test(`${route} renders its complete explorer category set`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId("service-work-explorer").getByRole("tab")).toHaveCount(count);
  });
}
```

- [ ] **Step 2: Run the tests to verify failure**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "complete explorer category set" --workers=1`

Expected: FAIL because those pages still use the old visual and static list sections.

- [ ] **Step 3: Generate and inspect the 15 assets**

Generate unique, credible scenes for the published maintenance categories (assessment, diagnosis, repairs, multi-property maintenance, lighting/energy analysis, property/equipment-fit); generator categories (standby/portable, transfer/connections, diagnosis/maintenance/repair, commercial backup); and thermography categories (hot-spot detection, panel under load, insurance reporting, overload/connection/phase review, prioritized risk checks). Save under the exact media prefixes listed above.

- [ ] **Step 4: Add bilingual data**

Map every generated asset to a single published category. Keep emergency copy informational and not diagnostic advice; keep thermography copy non-destructive and scope-confirmation based.

- [ ] **Step 5: Run the category-set tests**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "complete explorer category set" --workers=1`

Expected: PASS with counts 6, 4, and 5.

## Task 4: Complete fire-and-security media and explorer data

**Files:**
- Create: `public/media/service-security-04.png`
- Create: `public/media/service-security-05.png`
- Modify: `content/service-work-explorer.ts`

**Interfaces:**
- Consumes existing three image paths: `security-intrusion-alarm-systems.png`, `security-fire-detection-systems.png`, `security-surveillance-connections.png`.
- Produces five security work items.

- [ ] **Step 1: Add the failing five-category test**

```ts
test("security explorer preserves all five published categories", async ({ page }) => {
  await page.goto("/en/services/fire-and-security");
  const explorer = page.getByTestId("service-work-explorer");
  await expect(explorer.getByRole("tab")).toHaveCount(5);
  await expect(explorer.getByTestId("service-work-image")).toHaveAttribute("src", "/media/security-intrusion-alarm-systems.png");
});
```

- [ ] **Step 2: Run it to verify failure**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "security explorer preserves" --workers=1`

Expected: FAIL because Security still uses the old special image showcase.

- [ ] **Step 3: Generate the two missing security scenes**

Create an intercom/access-control/emergency-lighting scene and an electrical compatibility review scene. Keep both as calm, building-appropriate, logo-free technical photography. Save them as `service-security-04.png` and `service-security-05.png`.

- [ ] **Step 4: Add five bilingual security items and remove its old special showcase path**

Use the three existing category images in positions 01–03. Map the two new assets to the two remaining published categories. Do not remove the existing media files.

- [ ] **Step 5: Run the test to verify pass**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "security explorer preserves" --workers=1`

Expected: PASS with five tabs and the existing intrusion image as item 01.

## Task 5: Render the shared explorer on all service pages

**Files:**
- Modify: `components/page-renderer.tsx`
- Modify: `app/globals.css`
- Test: `tests/e2e/service-card-interaction.spec.ts`

**Interfaces:**
- Consumes `ServiceWorkExplorer({ locale, serviceId })` and `serviceWorkExplorerData`.
- Produces the shared service-detail rendering branch for all seven service ids.

- [ ] **Step 1: Add the failing all-service rendering test**

```ts
const serviceRoutes = [
  "/en/services/residential-electrician",
  "/en/services/commercial-electrician",
  "/en/services/industrial-electrician",
  "/en/services/maintenance-and-emergency",
  "/en/services/generators",
  "/en/services/infrared-thermography",
  "/en/services/fire-and-security",
];

for (const route of serviceRoutes) {
  test(`${route} uses the shared explorer instead of the old visual panel`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByTestId("service-work-explorer")).toBeVisible();
    await expect(page.getByTestId("service-visual-section")).toHaveCount(0);
  });
}
```

- [ ] **Step 2: Run it to verify failure**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "uses the shared explorer" --workers=1`

Expected: FAIL for every non-residential route.

- [ ] **Step 3: Replace the service-detail branches**

```tsx
{isServicePageId(pageId) ? (
  <ServiceWorkExplorer locale={locale} serviceId={pageId} />
) : null}
```

Remove the service-only static offered-work list and old service visual wrapper from these routes. Preserve thermography proof, FAQ, related services, and CTA sections after the new explorer.

- [ ] **Step 4: Rename explorer CSS selectors from `residential-*` to `service-work-*`**

Keep layout values unchanged: desktop two-column stage, 16:10 media, visible outer arrows with side clearance, mobile stacked layout with in-frame controls, and reduced-motion opt-out.

- [ ] **Step 5: Run all-service rendering tests**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "uses the shared explorer" --workers=1`

Expected: PASS for all seven routes.

## Task 6: Verify interaction, mobile behavior, and production build

**Files:**
- Modify: `tests/e2e/service-card-interaction.spec.ts`

**Interfaces:**
- Consumes the final shared explorer and all seven route data sets.
- Produces regression coverage for desktop and mobile behavior.

- [ ] **Step 1: Add failing wraparound and mobile-overflow tests**

```ts
for (const route of serviceRoutes) {
  test(`${route} arrows wrap and mobile does not overflow`, async ({ page }) => {
    await page.goto(route);
    const explorer = page.getByTestId("service-work-explorer");
    const tabs = explorer.getByRole("tab");
    const image = explorer.getByTestId("service-work-image");
    const firstSrc = await image.getAttribute("src");
    await explorer.getByRole("button", { name: "Previous residential service" }).click();
    await expect(image).not.toHaveAttribute("src", firstSrc ?? "");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await expect(tabs).toHaveCount(await tabs.count());
  });
}
```

- [ ] **Step 2: Run desktop and mobile tests to verify failure before final labels are generalized**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=mobile --grep "arrows wrap" --workers=1`

Expected: FAIL until the shared arrow labels are changed from residential-only wording to service-explorer wording.

- [ ] **Step 3: Generalize arrow button labels and complete test assertions**

Use `Previous service` / `Next service` and `Service précédent` / `Service suivant` in the reusable component; update the existing Residential test to the new accessible names.

- [ ] **Step 4: Run the focused regression suite**

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=desktop --grep "shared explorer|arrows wrap|residential service replaces" --workers=1`

Run: `npx playwright test tests/e2e/service-card-interaction.spec.ts --project=mobile --grep "shared explorer|arrows wrap|residential service replaces" --workers=1`

Expected: all selected tests PASS.

- [ ] **Step 5: Build and visually inspect representative routes**

Run: `npm run build`

Then start the production preview and capture screenshots for Commercial (8 categories), Generators (4), and Security (5). Confirm each has visible desktop arrows, matching visual hierarchy, correct imagery, and no overlapping sections.

- [ ] **Step 6: Run final source hygiene checks**

Run: `git diff --check`

Expected: no whitespace errors; do not commit, push, or create a PR.

## Plan self-review

- Spec coverage: Tasks 1–5 cover the reusable component, all seven routes, 31 new assets, retained security assets, bilingual data, and preserved downstream sections. Task 6 covers desktop/mobile interaction, build, screenshots, and source hygiene.
- Completeness scan: every step includes its required action and expected verification.
- Type consistency: all tasks use `ServiceWorkItem`, `ServiceWorkExplorerData`, `serviceWorkExplorerData`, and `ServiceWorkExplorer` consistently.
