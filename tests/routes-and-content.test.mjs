import assert from "node:assert/strict";
import fs from "node:fs";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, ws: false },
});

after(async () => {
  await vite.close();
});

test("every page has unique French and English paths and complete content", async () => {
  const { allLocalizedPaths, routes, pathFor } = await vite.ssrLoadModule("/lib/routes.ts");
  const { cityRoutes } = await vite.ssrLoadModule("/lib/city-routes.ts");
  const { content } = await vite.ssrLoadModule("/content/site-content.ts");
  const expectedPageIds = [
    "home",
    "services",
    "residential",
    "commercial",
    "industrial",
    "maintenance",
    "generators",
    "thermography",
    "security",
    "serviceArea",
    "about",
    "faq",
    "contact",
    "privacy",
  ];

  assert.deepEqual(Object.keys(routes), expectedPageIds);

  const paths = Object.values(routes).flatMap((route) => [
    route.fr,
    route.en,
  ]);
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(cityRoutes.length, 50);
  assert.equal(allLocalizedPaths().length, paths.length + cityRoutes.length * 2);

  for (const pageId of expectedPageIds) {
    assert.ok(content.fr.pages[pageId], `missing French content for ${pageId}`);
    assert.ok(content.en.pages[pageId], `missing English content for ${pageId}`);
    assert.match(pathFor(pageId, "fr"), /^\/fr(?:\/|$)/);
    assert.match(pathFor(pageId, "en"), /^\/en(?:\/|$)/);
    assert.ok(content.fr.pages[pageId].seo.title.length > 20);
    assert.ok(content.en.pages[pageId].seo.title.length > 20);
    assert.ok(content.fr.pages[pageId].seo.description.length > 70);
    assert.ok(content.en.pages[pageId].seo.description.length > 70);
  }
});

test("resolves only exact supported localized routes", async () => {
  const { resolvePage } = await vite.ssrLoadModule("/lib/routes.ts");

  assert.deepEqual(resolvePage("fr", []), { locale: "fr", pageId: "home" });
  assert.deepEqual(
    resolvePage("en", ["services", "residential-electrician"]),
    { locale: "en", pageId: "residential" },
  );
  assert.deepEqual(
    resolvePage("fr", ["territoire-desservi", "brossard"]),
    { locale: "fr", pageId: "serviceArea", citySlug: "brossard" },
  );
  assert.deepEqual(
    resolvePage("en", ["service-area", "brossard"]),
    { locale: "en", pageId: "serviceArea", citySlug: "brossard" },
  );
  assert.equal(resolvePage("es", []), null);
  assert.equal(resolvePage("fr", ["services", "residential-electrician"]), null);
  assert.equal(resolvePage("en", ["unknown"]), null);
});

test("renders emergency, language, dropdown, and skip links", async () => {
  const { SiteHeader } = await vite.ssrLoadModule(
    "/components/site-header.tsx",
  );
  const html = renderToStaticMarkup(
    React.createElement(SiteHeader, { locale: "fr", pageId: "home" }),
  );

  assert.match(html, /href="#contenu"/);
  assert.match(html, /tel:\+15147179277/);
  assert.doesNotMatch(html, /Call the office|Appeler le bureau/);
  assert.doesNotMatch(html, /Master electrician|Maître électricien/);
  assert.match(html, /href="\/en"/);
  assert.match(html, /English/);
  assert.match(html, /eclipse-logo-light\.png/);
  assert.match(html, /eclipse-logo-dark\.png/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /header-dropdown-panel/);
  assert.match(html, /\/fr\/territoire-desservi\/brossard/);
});

test("renders the homepage capability summary in both locales", async () => {
  const { PageRenderer } = await vite.ssrLoadModule(
    "/components/page-renderer.tsx",
  );

  const frenchHtml = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "fr", pageId: "home" }),
  );
  const englishHtml = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "en", pageId: "home" }),
  );

  assert.match(frenchHtml, /capabilities-grid/);
  assert.match(frenchHtml, /Les points qui comptent/);
  assert.match(frenchHtml, /Données, téléphone, audio et vidéo/);
  assert.match(englishHtml, /The points that matter/);
  assert.match(englishHtml, /Data, telephone, audio and video/);
});

test("renders the four-sector matrix and thermography proof module with deep links", async () => {
  const { PageRenderer } = await vite.ssrLoadModule(
    "/components/page-renderer.tsx",
  );

  const frenchHtml = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "fr", pageId: "home" }),
  );
  const englishHtml = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "en", pageId: "home" }),
  );

  assert.match(frenchHtml, /sector-matrix/);
  assert.match(frenchHtml, /Résidentiel/);
  assert.match(frenchHtml, /Commercial &amp; Industriel/);
  assert.match(frenchHtml, /Thermographie Infrarouge/);
  assert.match(frenchHtml, /Systèmes d’Alarme &amp; Sécurité/);
  assert.match(frenchHtml, /\/fr\/services\/thermographie-infrarouge/);
  assert.match(frenchHtml, /\/fr\/services\/alarme-et-securite/);
  assert.match(frenchHtml, /\/fr\/services\/electricien-commercial/);
  assert.match(frenchHtml, /\/fr\/services\/electricien-industriel/);
  assert.match(frenchHtml, /thermography-proof/);
  assert.match(frenchHtml, /Inspection par thermographie infrarouge/);
  assert.match(frenchHtml, /Planifier une inspection thermique/);
  assert.match(englishHtml, /Infrared Thermography/);
  assert.match(englishHtml, /Fire &amp; Alarm Systems/);
  assert.match(englishHtml, /Plan an infrared inspection/);
});

test("renders verified hero badges and mobile call actions", async () => {
  const { PageRenderer } = await vite.ssrLoadModule(
    "/components/page-renderer.tsx",
  );

  const frenchHtml = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "fr", pageId: "home" }),
  );

  assert.match(frenchHtml, /hero-trust-badges/);
  assert.match(frenchHtml, /Maître électricien/);
  assert.match(frenchHtml, /RBQ 5582-0096-01/);
  assert.match(frenchHtml, /Service d’urgence/);
  assert.match(frenchHtml, /mobile-action-bar/);
  assert.match(frenchHtml, /Actions rapides/);
  assert.match(frenchHtml, /tel:\+15145101112/);
  assert.match(frenchHtml, /514-510-1112/);
  assert.match(frenchHtml, /tel:\+15147179277/);
});

test("styles desktop dropdowns for hover and focus, with theme-aware owner logos", () => {
  const css = fs.readFileSync(
    fileURLToPath(new URL("../app/globals.css", import.meta.url)),
    "utf8",
  );
  const logoRule = css.match(/\.brand-logo-frame\s*\{[^}]+\}/s)?.[0];

  assert.ok(logoRule, "logo frame styles should exist");
  assert.match(logoRule, /overflow:\s*hidden/);
  assert.match(css, /\[data-theme="dark"\] \.brand-logo-light/);
  assert.match(css, /\[data-theme="dark"\] \.brand-logo-dark/);
  assert.match(css, /\.header-dropdown:hover\s*>\s*\.header-dropdown-panel/);
  assert.match(css, /\.header-dropdown:focus-within\s*>\s*\.header-dropdown-panel/);
  assert.match(css, /\.header-dropdown::before\s*\{[^}]*height:\s*0\.85rem/s);
  assert.match(css, /\.sector-matrix-tab\[aria-selected="true"\]/);
  assert.match(css, /\.thermography-proof-section/);
});

test("styles the quote wizard for selection, emergency, upload, themes, and mobile", () => {
  const css = fs.readFileSync(
    fileURLToPath(new URL("../app/globals.css", import.meta.url)),
    "utf8",
  );

  assert.match(css, /#quote-intake\s*\{[^}]*scroll-margin-top:/s);
  assert.match(css, /\.quote-wizard-progress\s*\{/);
  assert.match(css, /\.quote-choice\[data-selected="true"\]\s*\{/);
  assert.match(css, /\.quote-emergency-banner\s*\{/);
  assert.match(css, /\.quote-upload-control\s*\{/);
  assert.match(css, /\.quote-wizard-actions\s*\{/);
  assert.match(css, /\[data-theme="dark"\] \.quote-choice\s*\{/);
  assert.match(
    css,
    /@media \(max-width: 38rem\)[\s\S]*?\.quote-choice-grid\s*\{[^}]*grid-template-columns:\s*1fr/s,
  );
});

test("validates each quote wizard step before advancing", async () => {
  let quoteIntake = {};
  try {
    quoteIntake = await vite.ssrLoadModule("/lib/quote-intake.ts");
  } catch {
    // The assertion below reports the missing production contract as a test failure.
  }

  assert.equal(typeof quoteIntake.validateQuoteIntakeStep, "function");

  const validValues = {
    service: "residential",
    timeline: "planned",
    municipality: "brossard",
    postalCode: "H1B 5V4",
    fullName: "Sam Tremblay",
    phone: "514-555-0101",
    email: "sam@example.ca",
    address: "100 rue Principale",
    description: "Inspection du panneau principal",
    fileNames: ["panneau.jpg"],
  };

  assert.deepEqual(
    quoteIntake.validateQuoteIntakeStep({ ...validValues, service: "" }, 1, "fr"),
    { service: "Choisissez un type de service." },
  );
  assert.deepEqual(
    quoteIntake.validateQuoteIntakeStep({ ...validValues, timeline: "" }, 2, "en"),
    { timeline: "Choose an intervention timeline." },
  );
  assert.deepEqual(
    quoteIntake.validateQuoteIntakeStep(
      { ...validValues, municipality: "outside-area", postalCode: "123" },
      3,
      "en",
    ),
    {
      municipality: "Choose a municipality from the service area.",
      postalCode: "Enter a valid Canadian postal code.",
    },
  );
  assert.deepEqual(
    quoteIntake.validateQuoteIntakeStep(
      {
        ...validValues,
        fullName: "",
        phone: "123",
        email: "not-an-email",
        address: "",
        description: "",
      },
      4,
      "en",
    ),
    {
      fullName: "Enter your full name.",
      phone: "Enter a valid phone number.",
      email: "Enter a valid email address.",
      address: "Enter the work address.",
      description: "Briefly describe the project or issue.",
    },
  );
  assert.deepEqual(quoteIntake.validateQuoteIntakeStep(validValues, 1, "fr"), {});
  assert.deepEqual(quoteIntake.validateQuoteIntakeStep(validValues, 2, "fr"), {});
  assert.deepEqual(quoteIntake.validateQuoteIntakeStep(validValues, 3, "fr"), {});
  assert.deepEqual(quoteIntake.validateQuoteIntakeStep(validValues, 4, "fr"), {});
});

test("renders the accessible four-step quote wizard with all 50 service cities", async () => {
  const { PageRenderer } = await vite.ssrLoadModule(
    "/components/page-renderer.tsx",
  );
  const french = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "fr", pageId: "contact" }),
  );
  const english = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "en", pageId: "contact" }),
  );

  assert.match(french, /id="quote-intake"/);
  assert.match(french, /<progress[^>]+max="4"[^>]+value="1"/);
  assert.match(french, /aria-live="polite"/);
  assert.match(french, /Étape 1 sur 4/);
  assert.match(french, /role="radiogroup"/);
  assert.match(french, /name="quote-service"/);
  assert.match(french, /Résidentiel/);
  assert.match(french, /Commercial \/ Industriel/);
  assert.match(french, /Thermographie infrarouge/);
  assert.match(french, /Alarme &amp; incendie/);
  assert.match(english, /Step 1 of 4/);
  assert.match(english, /Select service/);
  assert.match(english, /Residential/);
  assert.equal((french.match(/<option value=/g) ?? []).length, 51);
  assert.match(french, /value="saint-jean-sur-richelieu"/);
  assert.match(english, /Saint-Hubert and Old Longueuil/);
});

test("routes homepage and header quote actions to the localized wizard anchor", async () => {
  const { PageRenderer } = await vite.ssrLoadModule(
    "/components/page-renderer.tsx",
  );
  const french = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "fr", pageId: "home" }),
  );
  const english = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "en", pageId: "home" }),
  );

  assert.ok(
    (french.match(/href="\/fr\/contact#quote-intake"/g) ?? []).length >= 4,
    "French conversion actions should target the intake wizard",
  );
  assert.ok(
    (english.match(/href="\/en\/contact#quote-intake"/g) ?? []).length >= 4,
    "English conversion actions should target the intake wizard",
  );
});

test("builds the complete bilingual quote handoff without claiming submission", async () => {
  const quoteIntake = await vite.ssrLoadModule("/lib/quote-intake.ts");

  assert.equal(typeof quoteIntake.buildQuoteIntakeMailtoUrl, "function");

  const values = {
    service: "thermography",
    timeline: "soon",
    municipality: "brossard",
    postalCode: "H1B 5V4",
    fullName: "Sam Tremblay",
    phone: "514 555 0101",
    email: "sam@example.ca",
    address: "100 rue Principale",
    description: "Panel review under normal load",
    fileNames: ["panel.jpg", "floor-plan.pdf"],
  };

  const englishUrl = quoteIntake.buildQuoteIntakeMailtoUrl(values, "en");
  const frenchUrl = quoteIntake.buildQuoteIntakeMailtoUrl(values, "fr");
  const english = decodeURIComponent(englishUrl);
  const french = decodeURIComponent(frenchUrl);

  assert.match(englishUrl, /^mailto:yasser@eclipseelectrique\.com\?/);
  assert.match(english, /Infrared thermography/);
  assert.match(english, /Within 24 to 48 hours/);
  assert.match(english, /Brossard/);
  assert.match(english, /H1B 5V4/);
  assert.match(english, /Sam Tremblay/);
  assert.match(english, /514 555 0101/);
  assert.match(english, /sam@example\.ca/);
  assert.match(english, /100 rue Principale/);
  assert.match(english, /Panel review under normal load/);
  assert.match(english, /panel\.jpg/);
  assert.match(english, /floor-plan\.pdf/);
  assert.match(english, /attach the selected files manually/i);
  assert.match(french, /Thermographie infrarouge/);
  assert.match(french, /Dans les 24 à 48 heures/);
  assert.match(french, /Ajoutez manuellement les fichiers sélectionnés/i);
  assert.doesNotMatch(`${english}\n${french}`, /submitted|sent successfully|transmis avec succès/i);
});
