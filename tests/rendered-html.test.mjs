import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function fetchPage(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function extractJsonLd(html) {
  const source = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(source, "localized pages should emit JSON-LD");
  return JSON.parse(source);
}

test("redirects the root to French and renders both locale homes", async () => {
  const worker = await loadWorker();
  const rootResponse = await fetchPage(worker, "/");

  assert.ok([307, 308].includes(rootResponse.status));
  assert.equal(
    new URL(rootResponse.headers.get("location"), "http://localhost").pathname,
    "/fr",
  );

  for (const pathname of ["/fr", "/en"]) {
    const response = await fetchPage(worker, pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Éclipse électrique inc\./);
    assert.match(html, /data-theme="dark"/);
    assert.match(html, /eclipse-logo\.jpg/);
    assert.match(html, /data-theme-toggle/);
    assert.match(html, /eclipse-electrical-ambient\.mp4/);
    assert.match(html, /class="header-dropdown"/);
    assert.match(html, /(?:territoire-desservi|service-area)\/brossard/);
  }
});

test("renders reciprocal locale SEO and verified bilingual LocalBusiness JSON-LD", async () => {
  const worker = await loadWorker();
  const frenchResponse = await fetchPage(
    worker,
    "/fr/services/electricien-residentiel",
  );
  const englishResponse = await fetchPage(
    worker,
    "/en/services/residential-electrician",
  );
  const frenchHtml = await frenchResponse.text();
  const englishHtml = await englishResponse.text();
  const frenchSchema = extractJsonLd(frenchHtml);
  const englishSchema = extractJsonLd(englishHtml);

  assert.equal(frenchResponse.status, 200);
  assert.equal(englishResponse.status, 200);
  assert.match(frenchHtml, /<html[^>]+lang="fr-CA"/);
  assert.match(
    frenchHtml,
    /rel="canonical"[^>]+href="https:\/\/eclipse-electrique\.samielarab9997\.chatgpt\.site\/fr\/services\/electricien-residentiel"/,
  );
  assert.match(
    frenchHtml,
    /hrefLang="en-CA"[^>]+href="https:\/\/eclipse-electrique\.samielarab9997\.chatgpt\.site\/en\/services\/residential-electrician"/,
  );
  assert.match(frenchHtml, /name="twitter:card" content="summary"/);
  assert.match(frenchHtml, /name="twitter:title" content="Électricien résidentiel à Montréal/);
  assert.match(frenchHtml, /property="og:locale" content="fr_CA"/);
  assert.match(englishHtml, /property="og:locale" content="en_CA"/);

  assert.deepEqual(frenchSchema["@type"], ["Electrician", "LocalBusiness"]);
  assert.equal(frenchSchema.name, "Éclipse électrique");
  assert.equal(frenchSchema.legalName, "Éclipse électrique inc.");
  assert.equal(frenchSchema.telephone, "+1-514-510-1112");
  assert.equal(frenchSchema.email, "yasser@eclipseelectrique.com");
  assert.deepEqual(frenchSchema.address, {
    "@type": "PostalAddress",
    streetAddress: "3893 Bd Saint-Jean-Baptiste",
    addressLocality: "Montréal",
    addressRegion: "QC",
    postalCode: "H1B 5V4",
    addressCountry: "CA",
  });
  assert.equal(frenchSchema.openingHours, "Mo-Su 00:00-24:00");
  assert.equal(frenchSchema.priceRange, "$$");
  assert.ok(
    frenchSchema.identifier.some(
      (identifier) => identifier.name === "RBQ" && identifier.value === "5582-0096-01",
    ),
  );
  assert.deepEqual(
    frenchSchema.contactPoint.map((contact) => contact.telephone),
    ["+1-514-510-1112", "+1-514-717-9277"],
  );
  assert.deepEqual(
    frenchSchema.areaServed.map((area) => area.name),
    ["Grand Montréal", "Montréal", "Laval", "Longueuil", "Rive-Nord", "Rive-Sud"],
  );
  assert.deepEqual(
    frenchSchema.hasOfferCatalog.itemListElement.map(
      (offer) => offer.itemOffered.name,
    ),
    [
      "Services électriques résidentiels",
      "Services électriques commerciaux et industriels",
      "Thermographie infrarouge",
      "Systèmes d’alarme et d’incendie",
    ],
  );
  assert.deepEqual(
    englishSchema.hasOfferCatalog.itemListElement.map(
      (offer) => offer.itemOffered.name,
    ),
    [
      "Residential electrical services",
      "Commercial and industrial electrical services",
      "Infrared thermography",
      "Alarm and fire systems",
    ],
  );
  assert.doesNotMatch(`${frenchHtml}\n${englishHtml}`, /aggregateRating/);
});

test("serves the public sitemap and robots metadata", async () => {
  const worker = await loadWorker();
  const sitemap = await fetchPage(worker, "/sitemap.xml");
  const robots = await fetchPage(worker, "/robots.txt");

  assert.equal(sitemap.status, 200);
  const sitemapText = await sitemap.text();
  assert.match(sitemapText, /<urlset/);
  assert.match(sitemapText, /\/fr\/services\/electricien-residentiel/);
  assert.match(sitemapText, /\/en\/services\/residential-electrician/);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/eclipse-electrique\.samielarab9997\.chatgpt\.site\/sitemap\.xml/);
});

test("serves every registered public route with one localized H1", async () => {
  const worker = await loadWorker();
  const publicPaths = [
    "/fr",
    "/en",
    "/fr/services",
    "/en/services",
    "/fr/services/electricien-residentiel",
    "/en/services/residential-electrician",
    "/fr/services/electricien-commercial",
    "/en/services/commercial-electrician",
    "/fr/services/electricien-industriel",
    "/en/services/industrial-electrician",
    "/fr/services/maintenance-et-urgence",
    "/en/services/maintenance-and-emergency",
    "/fr/services/generatrices",
    "/en/services/generators",
    "/fr/services/thermographie-infrarouge",
    "/en/services/infrared-thermography",
    "/fr/services/alarme-et-securite",
    "/en/services/fire-and-security",
    "/fr/territoire-desservi",
    "/en/service-area",
    "/fr/territoire-desservi/brossard",
    "/en/service-area/brossard",
    "/fr/a-propos",
    "/en/about",
    "/fr/faq",
    "/en/faq",
    "/fr/contact",
    "/en/contact",
    "/fr/confidentialite",
    "/en/privacy",
  ];

  for (const pathname of publicPaths) {
    const response = await fetchPage(worker, pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, pathname);
    assert.doesNotMatch(html, /Starter Project|Lorem ipsum|elcipseelectrique/i);
  }
});
