import { test, expect } from "@playwright/test";

for (const locale of ["en", "fr"] as const) {
  test(`${locale}: homepage hero selector overlay is mobile-only hidden`, async ({ page }, testInfo) => {
    await page.goto(`/${locale}`);

    const overlay = page.locator(".hero-media-indicators");
    await expect(overlay).toHaveCount(1);

    if (testInfo.project.name === "mobile") {
      await expect(overlay).toBeHidden();
      await expect(page.locator(".hero-media-rotator")).toBeVisible();
    } else {
      await expect(overlay).toBeVisible();
      await expect(overlay.getByRole("button")).toHaveCount(5);
    }
  });
}
