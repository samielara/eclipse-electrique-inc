import { test, expect } from "@playwright/test";

test.describe("Service card accessibility and motion", () => {
  for (const route of ["/fr", "/en"]) {
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
