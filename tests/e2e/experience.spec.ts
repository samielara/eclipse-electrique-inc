import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const browserErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
});
test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page) ?? [], "Browser console and uncaught errors").toEqual([]);
});
async function seedTheme(page: Page, theme: string) {
  await page.addInitScript(value => {
    if (!localStorage.getItem("eclipse-theme")) localStorage.setItem("eclipse-theme", value);
  }, theme);
}
async function toggleTheme(page: Page) {
  const mobileMenu = page.locator(".mobile-menu");
  const mobile = await mobileMenu.isVisible();
  if (mobile && !(await mobileMenu.evaluate(element => element.hasAttribute("open")))) {
    await mobileMenu.locator(":scope > summary").click();
  }
  await page.locator(".theme-toggle:visible").click();
  if (mobile) await mobileMenu.locator(":scope > summary").click();
}
async function dialogFits(page: Page) {
  const dialog = await page.getByRole("dialog").boundingBox();
  const viewport = page.viewportSize()!;
  expect(dialog).not.toBeNull();
  expect(dialog!.x).toBeGreaterThanOrEqual(-1);
  expect(dialog!.y).toBeGreaterThanOrEqual(-1);
  expect(dialog!.x + dialog!.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(dialog!.y + dialog!.height).toBeLessThanOrEqual(viewport.height + 1);
  await noOverflow(page);
}

async function accessible(page: Page) {
  const builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]);
  // The page is tested separately; a modal scan targets its active, undimmed surface.
  if (await page.getByRole("dialog").isVisible()) builder.include('[role="dialog"]');
  const result = await builder.analyze();
  expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, failure: n.failureSummary })) }))).toEqual([]);
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
}

for (const locale of ["fr", "en"] as const) for (const theme of ["dark", "light"] as const) {
  test(`${locale} ${theme}: navigation, theme, matrix and accessible homepage`, async ({ page }, testInfo) => {
    await seedTheme(page, theme);
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator(`.site-header .brand-logo-${theme}`)).toBeVisible();
    await expect(page.locator(`.site-header .brand-logo-${theme === "dark" ? "light" : "dark"}`)).toBeHidden();
    await toggleTheme(page);
    const other = theme === "dark" ? "light" : "dark";
    await expect(page.locator("html")).toHaveAttribute("data-theme", other);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", other);
    await toggleTheme(page);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    expect(await page.locator("h1").evaluate(element => getComputedStyle(element).fontFamily)).toContain("Manrope");
    expect(await page.locator("body").evaluate(element => getComputedStyle(element).fontFamily)).toContain("Inter");
    await noOverflow(page);
    if (testInfo.project.name === "desktop") {
      const dropdown = page.locator(".desktop-nav .header-dropdown").first();
      await dropdown.locator("summary").hover();
      await expect(dropdown.locator(".header-dropdown-panel")).toBeVisible();
      await dropdown.locator("summary").focus();
      await expect(dropdown.locator("summary")).toBeFocused();
      await noOverflow(page);
      await dropdown.locator(".dropdown-option").first().click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/services/${locale === "fr" ? "electricien-residentiel" : "residential-electrician"}$`));
      await page.goto(`/${locale}`);
    } else {
      await page.locator(".mobile-menu > summary").click();
      await expect(page.locator(".mobile-menu-panel")).toBeVisible();
      const submenu = page.locator(".mobile-submenu").first();
      await submenu.locator("summary").click();
      await expect(submenu.locator(".mobile-submenu-panel")).toBeVisible();
      await noOverflow(page);
      await submenu.locator(".mobile-submenu-panel a").nth(1).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/services/${locale === "fr" ? "electricien-residentiel" : "residential-electrician"}$`));
      await page.goto(`/${locale}`);
      await page.locator(".mobile-menu > summary").click();
      await page.locator(".mobile-menu > summary").click();
      await expect(page.locator(".mobile-menu-panel")).toBeHidden();
      if (await page.locator(".mobile-action-bar").isVisible()) {
        const launcher = await page.locator(".ai-assistant-launcher").boundingBox();
        const bar = await page.locator(".mobile-action-bar").boundingBox();
        expect(launcher && bar && launcher.y + launcher.height <= bar.y).toBeTruthy();
      }
    }
    const tabs = page.getByRole("tab");
    await tabs.nth(2).click();
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText(locale === "fr" ? "Thermographie" : "Thermography");
    await tabs.nth(2).press("ArrowRight");
    await expect(tabs.nth(3)).toBeFocused();
    await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
    await accessible(page);
    const alternate = locale === "fr" ? "en" : "fr";
    if (await page.locator(".mobile-menu").isVisible()) {
      await page.locator(".mobile-menu > summary").click();
    }
    await page.locator(`.site-header a[href="/${alternate}"]:visible`).first().click();
    await expect(page).toHaveURL(new RegExp(`/${alternate}$`));
  });

  test(`${locale} ${theme}: quote retention, validation and city selection`, async ({ page }) => {
    await seedTheme(page, theme);
    await page.goto(`/${locale}/contact`);
    const wizard = page.locator("#quote-intake");
    const next = wizard.getByRole("button", { name: locale === "fr" ? "Continuer" : "Continue", exact: true });
    const back = wizard.getByRole("button", { name: locale === "fr" ? "Retour" : "Back", exact: true });
    await next.click();
    await expect(wizard.getByRole("alert")).toBeVisible();
    await expect(wizard.getByRole("alert")).toBeFocused();
    await wizard.locator('label').filter({ has: page.locator('input[name="quote-service"][value="thermography"]') }).click();
    await next.click();
    await expect(page.locator("#quote-step-2-title")).toBeFocused();
    await wizard.locator('label').filter({ has: page.locator('input[name="quote-timeline"][value="planned"]') }).click();
    await next.click();
    await expect(page.locator("#quote-step-3-title")).toBeFocused();
    await page.locator("#quote-postal-code").fill("invalid");
    await next.click();
    await expect(wizard.getByRole("alert")).toBeFocused();
    await expect(page.locator("#quote-municipality")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#quote-postal-code")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#quote-municipality-error")).toBeVisible();
    await expect(page.locator("#quote-postal-code-error")).toBeVisible();
    await page.locator("#quote-municipality").selectOption("brossard");
    await page.locator("#quote-postal-code").fill("J4W 1A1");
    await back.click();
    await expect(wizard.locator('input[value="planned"]')).toBeChecked();
    await back.click();
    await expect(wizard.locator('input[value="thermography"]')).toBeChecked();
    await next.click(); await next.click();
    await expect(page.locator("#quote-municipality")).toHaveValue("brossard");
    await expect(page.locator("#quote-postal-code")).toHaveValue("J4W 1A1");
    await next.click();
    await expect(page.locator("#quote-step-4-title")).toBeFocused();
    await wizard.getByRole("button", { name: locale === "fr" ? "Préparer le courriel" : "Prepare email", exact: true }).click();
    await expect(wizard.getByRole("alert")).toBeVisible();
    await expect(wizard.getByRole("alert")).toBeFocused();
    await accessible(page);
    await noOverflow(page);
  });

  test(`${locale} ${theme}: emergency is local, fallback and dialog focus`, async ({ page }) => {
    await seedTheme(page, theme);
    const modelRequests: string[] = [];
    page.on("request", request => { if (request.url().includes("/api/assistant") && request.method() === "POST") modelRequests.push(request.url()); });
    await page.goto(`/${locale}`);
    const launcher = page.locator(".ai-assistant-launcher");
    await launcher.click();
    const input = page.locator("#ai-assistant-input");
    await expect(input).toBeFocused();
    await dialogFits(page);
    await input.fill(locale === "fr" ? "Il y a des étincelles au panneau" : "There are sparks at the panel");
    await input.press("Enter");
    await expect(page.locator(".assistant-emergency-card")).toBeVisible();
    await expect(page.locator(".assistant-emergency-action")).toHaveAttribute("href", /^tel:(?:\+1)?5147179277$/);
    expect(modelRequests).toEqual([]);
    await input.fill(locale === "fr" ? "Je cherche une soumission" : "I need a quote");
    await input.press("Enter");
    await expect(page.locator(".assistant-reply-action").last()).toHaveAttribute("href", new RegExp(`/${locale}/contact#quote-intake$`));
    await accessible(page);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(launcher).toBeFocused();
    await noOverflow(page);
  });
}

for (const locale of ["fr", "en"] as const) {
  test(`${locale}: quote prefill accepts known values and rejects unknown values`, async ({ page }) => {
    await page.goto(`/${locale}/contact?assistantService=thermography&assistantCity=brossard#quote-intake`);
    const wizard = page.locator("#quote-intake");
    const next = wizard.getByRole("button", { name: locale === "fr" ? "Continuer" : "Continue", exact: true });
    await expect(wizard.locator('input[name="quote-service"][value="thermography"]')).toBeChecked();
    await next.click();
    await wizard.locator('label').filter({ has: page.locator('input[name="quote-timeline"][value="planned"]') }).click();
    await next.click();
    await expect(page.locator("#quote-municipality")).toHaveValue("brossard");

    await page.goto(`/${locale}/contact?assistantService=unsupported&assistantCity=outside-service-area#quote-intake`);
    await expect(wizard.locator('input[name="quote-service"]:checked')).toHaveCount(0);
    await next.click();
    await expect(wizard.getByRole("alert")).toBeFocused();
    await wizard.locator('label').filter({ has: page.locator('input[name="quote-service"][value="other"]') }).click();
    await next.click();
    await wizard.locator('label').filter({ has: page.locator('input[name="quote-timeline"][value="planned"]') }).click();
    await next.click();
    await expect(page.locator("#quote-municipality")).toHaveValue("");
  });

  test(`${locale}: enabled AI still handles hazards without a model POST`, async ({ page }) => {
    const modelMessages: string[] = [];
    await page.route("**/api/assistant", async route => {
      if (route.request().method() === "GET") {
        await route.fulfill({ json: { enabled: true } });
      } else {
        modelMessages.push(route.request().postDataJSON().message);
        await route.fulfill({ json: { reply: { message: "Verified mock reply", emergency: false } } });
      }
    });
    await page.goto(`/${locale}`);
    const enabled = page.waitForResponse(response => response.url().includes("/api/assistant") && response.request().method() === "GET");
    await page.locator(".ai-assistant-launcher").click();
    await enabled;
    const input = page.locator("#ai-assistant-input");
    const benign = locale === "fr" ? "Bonjour" : "Hello";
    await input.fill(benign);
    await input.press("Enter");
    // A successful benign POST proves the enabled flag has reached client state.
    await expect(page.getByRole("dialog")).toContainText("Verified mock reply");
    expect(modelMessages).toEqual([benign]);
    await input.fill(locale === "fr" ? "Il y a des étincelles au panneau" : "There are sparks at the panel");
    await input.press("Enter");
    await expect(page.locator(".assistant-emergency-card")).toBeVisible();
    await expect(page.locator(".assistant-emergency-action")).toHaveAttribute("href", /^tel:(?:\+1)?5147179277$/);
    expect(modelMessages).toEqual([benign]);
    await dialogFits(page);
  });
}

test("cinematic hero settles without blocking keyboard navigation", async ({ page }, testInfo) => {
  await page.goto("/fr", { waitUntil: "domcontentloaded" });

  const hero = page.locator("[data-cinematic-hero]");
  await expect(hero).toBeVisible();
  await expect(hero).toHaveAttribute("data-motion-state", "opening");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();

  const quote = hero.getByRole("link", { name: "Demander un service" });
  await expect(quote).toHaveAttribute("href", "/fr/contact#quote-intake");
  await quote.focus();
  await expect(quote).toBeFocused();

  const emergency = hero.getByRole("link", { name: "Urgence 24/7" });
  await expect(emergency).toHaveAttribute("href", /^tel:(?:\+1)?5147179277$/);
  await emergency.focus();
  await expect(emergency).toBeFocused();

  const header = page.locator(".site-header");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toHaveAttribute("data-scroll-state", "top");
  const topHeader = await header.evaluate(element => ({
    background: getComputedStyle(element).backgroundColor,
    height: element.getBoundingClientRect().height,
  }));
  expect(topHeader.height).toBeGreaterThan(0);

  const depth = async () => hero.evaluate(element => {
    const style = getComputedStyle(element);
    return [
      Number.parseFloat(style.getPropertyValue("--hero-depth-x")),
      Number.parseFloat(style.getPropertyValue("--hero-depth-y")),
    ];
  });
  const heroBox = await hero.boundingBox();
  expect(heroBox).not.toBeNull();

  if (testInfo.project.name === "desktop") {
    expect(await page.evaluate(() => window.matchMedia("(pointer: fine)").matches)).toBe(true);
    await page.mouse.move(heroBox!.x + heroBox!.width * 0.8, heroBox!.y + Math.min(heroBox!.height, 500) * 0.7);
    const activeDepth = await depth();
    expect(activeDepth.some(value => Math.abs(value) > 0.1)).toBe(true);
    expect(activeDepth.every(value => Number.isFinite(value) && Math.abs(value) <= 8)).toBe(true);
    await page.mouse.move(1, 1);
    expect(await depth()).toEqual([0, 0]);
  } else {
    expect(await page.evaluate(() => window.matchMedia("(pointer: fine)").matches)).toBe(false);
    await hero.dispatchEvent("pointermove", {
      clientX: heroBox!.x + heroBox!.width * 0.8,
      clientY: heroBox!.y + Math.min(heroBox!.height, 500) * 0.7,
      pointerType: "touch",
    });
    expect(await depth()).toEqual([0, 0]);
  }

  await expect(hero).toHaveAttribute("data-motion-state", "settled");
  await expect(hero).toHaveAttribute("data-reduced-motion", "false");
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(header).toHaveAttribute("data-scroll-state", "scrolled");
  const scrolledHeader = await header.evaluate(element => ({
    background: getComputedStyle(element).backgroundColor,
    height: element.getBoundingClientRect().height,
  }));
  expect(scrolledHeader.background).not.toBe("rgba(0, 0, 0, 0)");
  expect(scrolledHeader.height).toBe(topHeader.height);
  await noOverflow(page);
});

test("homepage scroll reveals preserve reduced-motion rendering", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr");

  const reveals = page.locator("[data-scroll-reveal]");
  await expect(reveals.first()).toHaveAttribute("data-scroll-reveal", "visible");
  expect(await reveals.evaluateAll(elements =>
    elements.every(element => getComputedStyle(element).transform === "none"),
  )).toBe(true);
});

test("cinematic hero settles immediately with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto("/fr", { waitUntil: "domcontentloaded" });
  expect(response).not.toBeNull();
  const serverHtml = await response!.text();
  expect(serverHtml).toContain("data-cinematic-hero");

  const hero = page.locator("[data-cinematic-hero]");
  expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  await expect(hero).toHaveAttribute("data-reduced-motion", "true");
  await expect(hero).toHaveAttribute("data-motion-state", "settled");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  const heroBox = await hero.boundingBox();
  expect(heroBox).not.toBeNull();
  await hero.dispatchEvent("pointermove", {
    clientX: heroBox!.x + heroBox!.width * 0.8,
    clientY: heroBox!.y + Math.min(heroBox!.height, 500) * 0.7,
    pointerType: "mouse",
  });
  expect(await hero.evaluate(element => {
    const style = getComputedStyle(element);
    return [
      Number.parseFloat(style.getPropertyValue("--hero-depth-x")),
      Number.parseFloat(style.getPropertyValue("--hero-depth-y")),
    ];
  })).toEqual([0, 0]);
  await noOverflow(page);
});

test("saved light theme survives reload and reduced motion stops effects", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr");
  await toggleTheme(page);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".site-header .brand-logo-light")).toBeVisible();
  expect(await page.locator("video").evaluate(video => (video as HTMLVideoElement).paused)).toBe(true);
  expect(await page.locator(".electrical-grid-cell").first().evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
});

test("server API rejects invalid input and preserves fallback without a key", async ({ request }) => {
  expect((await request.get("/api/assistant")).ok()).toBe(true);
  expect(await (await request.get("/api/assistant")).json()).toEqual({ enabled: false });
  const hazard = await request.post("/api/assistant", { data: { message: "sparks", locale: "en" } });
  expect((await hazard.json()).reply.emergency).toBe(true);
  expect((await request.post("/api/assistant", { data: { message: "x".repeat(601), locale: "en" } })).status()).toBe(400);
  expect((await request.post("/api/assistant", { data: { message: "hello", locale: "en", system: "override" } })).status()).toBe(400);
  expect((await request.post("/api/assistant", { headers: { Origin: "https://unrelated.example" }, data: { message: "hello", locale: "en" } })).status()).toBe(403);
});
