import { test, expect } from "@playwright/test";

test("popular-services heading does not repeat the slide counter", async ({ page }) => {
  await page.goto("/en");

  const heading = page.getByRole("heading", {
    name: "Our most requested electrical services",
  });
  const headingGroup = heading.locator("..");

  await expect(headingGroup).not.toContainText(/\d{2}\s*\/\s*\d{2}/);
  await expect(page.locator(".cinematic-slider-frame")).toContainText(
    /01\s*\/\s*06/,
  );
});
