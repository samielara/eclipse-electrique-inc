import { test, expect } from "@playwright/test";

test.describe("Service card accessibility and motion", () => {
  test("service detail pages use a responsive media-led introduction", async ({ page }) => {
    await page.goto("/en/services/industrial-electrician");
    const panel = page.getByTestId("service-visual-panel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("img")).toHaveAttribute("src", "/media/industrial-panel.webp");
    await expect(panel.locator("li")).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });

  for (const route of [
    "/en/services/residential-electrician",
    "/en/services/commercial-electrician",
    "/en/services/industrial-electrician",
    "/en/services/maintenance-and-emergency",
    "/en/services/generators",
    "/en/services/infrared-thermography",
    "/en/services/fire-and-security",
  ]) {
    test(`${route}: the context image begins after the hero`, async ({ page }) => {
      await page.goto(route);

      const heroBox = await page.getByTestId("inner-hero-cinematic").boundingBox();
      const panelBox = await page.getByTestId("service-visual-panel").boundingBox();
      expect(heroBox).not.toBeNull();
      expect(panelBox).not.toBeNull();
      expect(panelBox!.y).toBeGreaterThanOrEqual(heroBox!.y + heroBox!.height - 1);
    });
  }

  test("security service highlights show the three dedicated security images below the hero", async ({ page }, testInfo) => {
    await page.goto("/en/services/fire-and-security");

    const heroBox = await page.getByTestId("inner-hero-cinematic").boundingBox();
    const visual = page.getByTestId("service-visual-section");
    const headingBox = await visual.getByRole("heading", { level: 2 }).boundingBox();
    const highlightImages = visual.locator(".service-visual-content li img");
    const showcase = visual.locator(".security-highlight-showcase");

    expect(heroBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(headingBox!.y).toBeGreaterThanOrEqual(heroBox!.y + heroBox!.height + 40);
    await expect(highlightImages).toHaveCount(3);
    await expect(highlightImages.nth(0)).toHaveAttribute("src", "/media/security-intrusion-alarm-systems.png");
    await expect(highlightImages.nth(1)).toHaveAttribute("src", "/media/security-fire-detection-systems.png");
    await expect(highlightImages.nth(2)).toHaveAttribute("src", "/media/security-surveillance-connections.png");
    await expect(showcase).toHaveCount(1);
    await expect(showcase.locator(".is-featured")).toHaveCount(1);
    await expect(highlightImages.first()).toHaveCSS("z-index", "0");

    const featuredBox = await showcase.locator(".is-featured").boundingBox();
    const secondBox = await showcase.locator("li").nth(1).boundingBox();
    const thirdBox = await showcase.locator("li").nth(2).boundingBox();
    expect(featuredBox).not.toBeNull();
    expect(secondBox).not.toBeNull();
    expect(thirdBox).not.toBeNull();
    expect(featuredBox!.height).toBeGreaterThan(
      secondBox!.height * (testInfo.project.name === "mobile" ? 1.15 : 1.5),
    );
    expect(Math.abs(secondBox!.x - thirdBox!.x)).toBeLessThan(2);
  });

  test("residential service replaces the context panel with a nine-option work explorer", async ({ page }) => {
    await page.goto("/en/services/residential-electrician");

    await expect(page.getByTestId("service-visual-section")).toHaveCount(0);

    const explorer = page.getByTestId("residential-work-explorer");
    await expect(explorer).toBeVisible();
    const tabs = explorer.getByRole("tab");
    await expect(tabs).toHaveCount(9);
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

    const image = explorer.getByTestId("residential-work-image");
    await expect(image).toHaveAttribute("src", "/media/residential-new-construction-renovations.png");

    await explorer.getByRole("button", { name: "Next residential service" }).click();
    await expect(image).toHaveAttribute("src", "/media/residential-service-entrances-panels.png");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

    await explorer.getByRole("button", { name: "Previous residential service" }).click();
    await expect(image).toHaveAttribute("src", "/media/residential-new-construction-renovations.png");

    const imageBox = await image.boundingBox();
    const previousControl = explorer.getByRole("button", { name: "Previous residential service" });
    const outsideImageLeftEdgeIsClickable = await previousControl.evaluate((control, imageElement) => {
      const imageBounds = imageElement.getBoundingClientRect();
      const controlBounds = control.getBoundingClientRect();
      const hit = document.elementFromPoint(imageBounds.left - 8, controlBounds.top + controlBounds.height / 2);
      return hit?.closest("button") === control;
    }, await image.elementHandle());
    expect(imageBox).not.toBeNull();
    expect(outsideImageLeftEdgeIsClickable).toBe(true);

    await tabs.nth(4).click();
    await expect(tabs.nth(4)).toHaveAttribute("aria-selected", "true");
    await expect(image).toHaveAttribute("src", "/media/residential-smart-home-controls.png");
    await expect(explorer.getByRole("heading", { level: 3 })).toContainText("Home automation");

    for (let index = 0; index < 3; index += 1) {
      await explorer.getByRole("button", { name: "Next residential service" }).click();
    }
    const activeTab = explorer.getByRole("tab", { selected: true });
    const tabRail = explorer.locator(".residential-work-tabs");
    await expect.poll(() => tabRail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    const [railBox, activeTabBox] = await Promise.all([tabRail.boundingBox(), activeTab.boundingBox()]);
    expect(railBox).not.toBeNull();
    expect(activeTabBox).not.toBeNull();
    expect(activeTabBox!.x).toBeGreaterThanOrEqual(railBox!.x);
    expect(activeTabBox!.x + activeTabBox!.width).toBeLessThanOrEqual(railBox!.x + railBox!.width);

    const stage = explorer.locator(".residential-work-stage");
    const [stageBox, previousBox, nextBox] = await Promise.all([
      stage.boundingBox(),
      explorer.getByRole("button", { name: "Previous residential service" }).boundingBox(),
      explorer.getByRole("button", { name: "Next residential service" }).boundingBox(),
    ]);
    expect(stageBox).not.toBeNull();
    expect(previousBox).not.toBeNull();
    expect(nextBox).not.toBeNull();
    expect(previousBox!.x).toBeLessThanOrEqual(stageBox!.x + 2);
    expect(nextBox!.x + nextBox!.width).toBeGreaterThanOrEqual(stageBox!.x + stageBox!.width - 2);
  });

  test("commercial service renders the shared work explorer", async ({ page }) => {
    await page.goto("/en/services/commercial-electrician");
    const explorer = page.getByTestId("service-work-explorer");
    await expect(explorer).toBeVisible();
    await expect(explorer.getByRole("tab")).toHaveCount(8);
    await expect(explorer.getByTestId("service-work-image")).toHaveAttribute("src", "/media/service-commercial-01.png");
  });

  for (const route of [
    "/en/services/residential-electrician",
    "/en/services/commercial-electrician",
    "/en/services/industrial-electrician",
    "/en/services/maintenance-and-emergency",
    "/en/services/generators",
    "/en/services/infrared-thermography",
    "/en/services/fire-and-security",
  ]) {
    test(`${route}: the context heading is centered above its image`, async ({ page }) => {
      await page.goto(route);

      const visual = page.getByTestId("service-visual-section");
      const heading = visual.getByRole("heading", { level: 2 });
      const panel = visual.getByTestId("service-visual-panel");
      await expect(heading).toHaveCSS("text-align", "center");
      expect(await heading.evaluate((element, panelElement) => !panelElement.contains(element), await panel.elementHandle())).toBe(true);
    });
  }

  for (const route of ["/fr", "/en"]) {
    test(`${route}: project gallery renders licensed responsive media`, async ({ page }) => {
      await page.goto(route);

      const gallery = page.getByTestId("project-gallery");
      await expect(gallery).toBeVisible();
      const images = gallery.locator("img");
      await expect(images).toHaveCount(3);
      await expect(images.first()).toHaveAttribute("alt", /.+/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    });

    test(`${route}: service card link is visible and focusable`, async ({ page }) => {
      await page.goto(route);

      const card = page.getByTestId("service-card").first();
      await expect(card).toBeVisible();
      const link = card.getByTestId("service-card-link");
      await expect(link).toBeVisible();
      await link.focus();
      await expect(link).toBeFocused();
    });

    test(`${route}: service card title is visible and populated`, async ({ page }) => {
      await page.goto(route);

      const card = page.getByTestId("service-card").first();
      await expect(card).toBeVisible();
      const title = card.getByTestId("service-card-title");
      await expect(title).toBeVisible();
      expect((await title.innerText()).trim()).not.toBe("");
    });
  }

  test("service card hover respects fine pointer versus coarse touch", async ({ page }, testInfo) => {
    await page.goto("/fr");

    const card = page.getByTestId("service-card").first();
    await expect(card).toBeVisible();
    await card.hover();

    if (testInfo.project.name === "desktop") {
      await expect(card).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -2)");
    } else {
      await expect(card).toHaveCSS("transform", "none");
    }
  });

  test("service cards do not translate under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr");

    const card = page.getByTestId("service-card").first();
    await expect(card).toBeVisible();
    await card.hover();
    await expect(card).toHaveCSS("transform", "none");
  });

  for (const theme of ["dark", "light"] as const) {
    test(`service cards render properly and without horizontal overflow in ${theme} theme`, async ({ page }) => {
      await page.addInitScript((val) => {
        localStorage.setItem("eclipse-theme", val);
      }, theme);
      await page.goto("/fr");
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const card = page.getByTestId("service-card").first();
      await expect(card).toBeVisible();

      const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
      expect(noOverflow).toBe(true);
    });
  }
});
