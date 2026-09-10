import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
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

test("assistant knowledge prioritizes active hazards in French and English", async () => {
  const { getAssistantReply } = await vite.ssrLoadModule(
    "/lib/knowledge-base.ts",
  );

  for (const hazard of [
    "sparks",
    "burning smell",
    "smoke",
    "sizzling panel",
    "buzzing breaker",
    "water near wiring",
    "active outage",
  ]) {
    const reply = getAssistantReply(hazard, "fr");
    assert.equal(reply.intent, "emergency", hazard);
    assert.equal(reply.action.href, "tel:5147179277", hazard);
  }

  for (const hazard of [
    "étincelles",
    "odeur de brûlé",
    "panne active",
  ]) {
    const reply = getAssistantReply(hazard, "en");
    assert.equal(reply.intent, "emergency", hazard);
    assert.equal(reply.locale, "fr", hazard);
  }

  const english = getAssistantReply(
    "There are sparks, smoke and a burning smell at the panel",
    "fr",
  );
  const french = getAssistantReply(
    "Il y a une odeur de brûlé et des étincelles près du panneau",
    "en",
  );

  assert.equal(english.intent, "emergency");
  assert.equal(english.locale, "en");
  assert.equal(english.emergency, true);
  assert.match(english.message, /^⚠️ Dangerous situation: do not touch any equipment\./);
  assert.deepEqual(english.action, {
    kind: "emergency",
    label: "Call emergency dispatch · 514-717-9277",
    href: "tel:5147179277",
  });

  assert.equal(french.intent, "emergency");
  assert.equal(french.locale, "fr");
  assert.equal(french.emergency, true);
  assert.match(
    french.message,
    /^⚠️ Situation dangereuse : ne touchez à aucun équipement\./,
  );
  assert.equal(french.action.href, "tel:5147179277");
});

test("assistant knowledge uses the real city catalogue and qualification actions", async () => {
  const {
    assistantBusinessFacts,
    findCoveredCity,
    getAssistantQuickReplies,
    getAssistantReply,
  } = await vite.ssrLoadModule("/lib/knowledge-base.ts");

  assert.equal(assistantBusinessFacts.coveredCityCount, 50);
  assert.equal(findCoveredCity("Je suis à Saint Leonard")?.slug, "saint-leonard");
  assert.equal(findCoveredCity("Do you cover Mount Royal?")?.slug, "mont-royal");
  assert.equal(findCoveredCity("Québec") ?? null, null);

  const coverage = getAssistantReply(
    "Pouvez-vous vérifier ma ville, Saint-Léonard?",
    "fr",
  );
  assert.equal(coverage.intent, "coverage");
  assert.equal(coverage.action.kind, "city");
  assert.equal(
    coverage.action.href,
    "/fr/territoire-desservi/saint-leonard",
  );

  const englishCoverage = getAssistantReply("Do you serve Westmount?", "fr");
  assert.equal(englishCoverage.locale, "en");
  assert.equal(englishCoverage.intent, "coverage");
  assert.equal(englishCoverage.action.href, "/en/service-area/westmount");

  const englishQuote = getAssistantReply("I would like to get a quote", "fr");
  assert.equal(englishQuote.locale, "en");
  assert.equal(englishQuote.intent, "quote");
  assert.equal(englishQuote.action.href, "/en/contact#quote-intake");

  const licence = getAssistantReply("Quel est votre numéro de licence RBQ?", "fr");
  assert.equal(licence.intent, "licence");
  assert.match(licence.message, /5582-0096-01/);
  assert.match(licence.message, /2008/);
  assert.match(licence.message, /CMEQ/);

  assert.deepEqual(
    getAssistantQuickReplies("fr").map((reply) => reply.label),
    [
      "🚨 Urgence électrique 24/7",
      "⚡ Remplacement de panneau / Borne VE",
      "🔍 Thermographie infrarouge",
      "📍 Vérifier ma ville",
      "📋 Obtenir une soumission",
    ],
  );
});

test("assistant widget renders its accessible floating entry point", async () => {
  const { AiAssistant } = await vite.ssrLoadModule(
    "/components/ai-assistant.tsx",
  );
  const html = renderToStaticMarkup(
    React.createElement(AiAssistant, { locale: "fr" }),
  );

  assert.match(html, /data-assistant-launcher="true"/);
  assert.match(html, /aria-label="Ouvrir l’assistant Éclipse"/);
  assert.match(html, /Assistant 24\/7/);
  assert.match(html, /data-assistant-unread="true"/);
});

test("assistant emergency card renders the direct dispatch action", async () => {
  const { AssistantReplyCard } = await vite.ssrLoadModule(
    "/components/ai-assistant.tsx",
  );
  const { getAssistantReply } = await vite.ssrLoadModule(
    "/lib/knowledge-base.ts",
  );
  const reply = getAssistantReply("Le panneau fait des étincelles", "fr");
  const html = renderToStaticMarkup(
    React.createElement(AssistantReplyCard, { reply }),
  );

  assert.match(html, /role="alert"/);
  assert.match(html, /Situation dangereuse/);
  assert.match(html, /href="tel:5147179277"/);
  assert.match(html, /514-717-9277/);
});

test("assistant visibility state opens and closes predictably", async () => {
  const { assistantVisibilityReducer } = await vite.ssrLoadModule(
    "/components/ai-assistant.tsx",
  );

  assert.equal(assistantVisibilityReducer(false, { type: "open" }), true);
  assert.equal(assistantVisibilityReducer(true, { type: "close" }), false);
});

test("assistant is mounted in the bilingual global page shell", async () => {
  const { PageRenderer } = await vite.ssrLoadModule(
    "/components/page-renderer.tsx",
  );
  const french = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "fr", pageId: "home" }),
  );
  const english = renderToStaticMarkup(
    React.createElement(PageRenderer, { locale: "en", pageId: "about" }),
  );

  assert.match(french, /aria-label="Ouvrir l’assistant Éclipse"/);
  assert.match(english, /aria-label="Open the Éclipse assistant"/);
  assert.equal((french.match(/data-assistant-launcher="true"/g) ?? []).length, 1);
  assert.equal((english.match(/data-assistant-launcher="true"/g) ?? []).length, 1);
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("emits the catalog's animation and scrolling utilities", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /--tw-enter-opacity/);
  assert.match(css, /scrollbar-width:\s*thin/);
  assert.match(css, /scrollbar-width:\s*none/);
  assert.match(css, /scrollbar-gutter:\s*stable/);
  assert.match(css, /scroll-fade-reveal-b/);
  assert.match(css, /mask-image:/);
  assert.match(css, /tw-shimmer/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("emits assistant styling above the mobile action bar in both themes", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /\.ai-assistant-launcher/);
  assert.match(css, /\.ai-assistant-panel/);
  assert.match(
    css,
    /bottom:\s*calc\(5\.6rem \+ env\(safe-area-inset-bottom\)\)/,
  );
  assert.match(css, /\[data-theme=light\] \.ai-assistant-panel/);
  assert.match(css, /@keyframes ai-assistant-enter/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});

test("hero video defers its source so the cinematic still is the initial payload", async () => {
  const { HeroVideo } = await vite.ssrLoadModule(
    "/components/motion/hero-video.tsx",
  );
  const html = renderToStaticMarkup(React.createElement(HeroVideo));

  assert.match(html, /poster="\/media\/eclipse-hero-electrician-v2\.png"/);
  assert.doesNotMatch(html, /eclipse-electrical-ambient\.mp4/);
});

test("cinematic motion primitives keep decorative motion bounded and optional", async () => {
  const [tokensSource, traceSource, surfaceSource] = await Promise.all([
    readFile(path.join(root, "components/motion/tokens.ts"), "utf8"),
    readFile(path.join(root, "components/motion/electric-trace.tsx"), "utf8"),
    readFile(path.join(root, "components/motion/surface.tsx"), "utf8"),
  ]);

  assert.match(tokensSource, /export const cinematicVariants/);
  assert.match(tokensSource, /export const cinematicTransition/);
  assert.match(tokensSource, /hidden:\s*\{ opacity: 0, y: 24 \}/);
  assert.match(tokensSource, /visible:\s*\{ opacity: 1, y: 0 \}/);
  assert.match(
    tokensSource,
    /cinematicTransition = \{\s+duration: 0\.64,\s+ease: \[0\.22, 1, 0\.36, 1\] as const,\s+\} as const;/s,
  );
  assert.match(traceSource, /export function ElectricTrace/);
  assert.match(traceSource, /useReducedMotion/);
  assert.doesNotMatch(traceSource, /repeat:\s*Infinity/);
  assert.doesNotMatch(`${traceSource}\n${surfaceSource}`, /on(?:Wheel|Scroll|TouchMove)=/);
});

test("cinematic trace enters from hidden while reduced motion is immediately final", async () => {
  const {
    cinematicMotionProps,
    cinematicTransition,
    cinematicVariants,
  } = await vite.ssrLoadModule("/components/motion/tokens.ts");

  assert.deepEqual(cinematicMotionProps(false), {
    initial: cinematicVariants.hidden,
    animate: cinematicVariants.visible,
    transition: cinematicTransition,
  });
  assert.deepEqual(cinematicMotionProps(true), {
    initial: false,
    animate: cinematicVariants.visible,
    transition: { duration: 0 },
  });

  const { MotionSurface } = await vite.ssrLoadModule(
    "/components/motion/surface.tsx",
  );
  const { ElectricTrace } = await vite.ssrLoadModule(
    "/components/motion/electric-trace.tsx",
  );
  const surfaceHtml = renderToStaticMarkup(
    React.createElement(MotionSurface, null, "Visible content"),
  );
  const traceHtml = renderToStaticMarkup(React.createElement(ElectricTrace));

  assert.match(traceHtml, /style="opacity:0;transform:translateY\(24px\)"/);
  assert.match(surfaceHtml, /Visible content/);
});

test("MotionSurface stays visible across SSR and hydration", async () => {
  const { MotionSurface } = await vite.ssrLoadModule(
    "/components/motion/surface.tsx",
  );
  const surfaceSource = await readFile(
    path.join(root, "components/motion/surface.tsx"),
    "utf8",
  );
  const surfaceHtml = renderToStaticMarkup(
    React.createElement(MotionSurface, null, "Visible content"),
  );

  assert.match(surfaceHtml, /Visible content/);
  assert.doesNotMatch(surfaceHtml, /opacity:0/);
  assert.match(surfaceSource, /initial=\{false\}/);
  assert.doesNotMatch(surfaceSource, /use(?:Effect|AnimationControls)|startMotionSurfaceEntrance/);
});
