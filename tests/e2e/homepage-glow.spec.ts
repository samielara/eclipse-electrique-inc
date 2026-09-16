import { test, expect } from "@playwright/test";

const glowingCardSections = [
  ".context-selector-section",
  ".problem-intent-section",
  ".process-stepper-section",
  ".why-eclipse-section",
  ".coverage-hub-section",
];

test("homepage cards use the strengthened amber hover glow", async ({ page }) => {
  await page.goto("/en");

  for (const sectionSelector of glowingCardSections) {
    const card = page.locator(`${sectionSelector} .group`).first();
    const iconBadge = card.locator(":scope > div").nth(0);
    const cardShell = card.locator(":scope > div").nth(1);

    await card.hover();

    await expect(iconBadge).toHaveCSS(
      "box-shadow",
      /rgba\(245, 158, 11, 0\.56\) 0px 0px 37\.5px/,
    );
    await expect(cardShell).toHaveCSS(
      "box-shadow",
      /rgba\(245, 158, 11, 0\.35\) 0px 0px 50px/,
    );
  }
});
