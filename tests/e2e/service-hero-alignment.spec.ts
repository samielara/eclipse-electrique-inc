import { test, expect } from "@playwright/test";

const servicePaths = {
  en: [
    "/en/services",
    "/en/services/residential-electrician",
    "/en/services/commercial-electrician",
    "/en/services/industrial-electrician",
    "/en/services/maintenance-and-emergency",
    "/en/services/generators",
    "/en/services/infrared-thermography",
    "/en/services/fire-and-security",
  ],
  fr: [
    "/fr/services",
    "/fr/services/electricien-residentiel",
    "/fr/services/electricien-commercial",
    "/fr/services/electricien-industriel",
    "/fr/services/maintenance-et-urgence",
    "/fr/services/generatrices",
    "/fr/services/thermographie-infrarouge",
    "/fr/services/alarme-et-securite",
  ],
};

for (const locale of ["en", "fr"] as const) {
  test(`${locale}: service hero text is centered without a leading dash`, async ({ page }) => {
    for (const path of servicePaths[locale]) {
      await page.goto(path);

      const card = page.locator(".inner-hero-glass-card");
      const eyebrow = card.locator(":scope > .eyebrow");

      for (const selector of [
        ":scope > .eyebrow",
        ":scope > .inner-hero-title",
        ":scope > .inner-hero-intro-text",
      ]) {
        await expect(card.locator(selector)).toHaveCSS("text-align", "center");
      }

      expect(
        await eyebrow.evaluate(element => getComputedStyle(element, "::before").display),
      ).toBe("none");

      const cardBox = await card.boundingBox();
      expect(cardBox).not.toBeNull();
      for (const selector of [":scope > .action-pair", ":scope > .inner-hero-trust-pill"]) {
        const rowBox = await card.locator(selector).boundingBox();
        expect(rowBox).not.toBeNull();
        expect(
          Math.abs(rowBox!.x + rowBox!.width / 2 - (cardBox!.x + cardBox!.width / 2)),
          `${selector} should share the hero card's horizontal center`,
        ).toBeLessThanOrEqual(1);
      }
    }
  });
}

test("standard inner-page heroes use the centered layout", async ({ page }) => {
  await page.goto("/en/about");
  const card = page.locator(".inner-hero-glass-card");
  const eyebrow = card.locator(":scope > .eyebrow");
  await expect(card.locator(":scope > .inner-hero-title")).toHaveCSS("text-align", "center");
  expect(await eyebrow.evaluate(element => getComputedStyle(element, "::before").display)).toBe("none");
});
