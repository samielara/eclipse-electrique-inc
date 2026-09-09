import { test, expect } from "@playwright/test";

test("an emergency interrupts pending AI routing and ignores its late reply", async ({ page }) => {
  let releaseReply!: () => void;
  const stalledReply = new Promise<void>(resolve => { releaseReply = resolve; });
  let requestStarted!: () => void;
  const pendingRequest = new Promise<void>(resolve => { requestStarted = resolve; });
  // Simulate a transport that completes despite cancellation to exercise the stale guard.
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = (input, init) => originalFetch(input, init?.method === "POST"
      ? { ...init, signal: undefined }
      : init);
  });
  await page.route("**/api/assistant", async route => {
    if (route.request().method() === "GET") {
      await route.fulfill({ json: { enabled: true } });
      return;
    }
    requestStarted();
    await stalledReply;
    await route.fulfill({ json: { reply: { locale: "en", emergency: false, message: "STALE MODEL REPLY" } } });
  });
  await page.goto("/en");
  await page.getByRole("button", { name: "Open the Éclipse assistant", exact: true }).click();
  await expect(page.locator(".ai-assistant-disclaimer")).toContainText("AI routing sends");
  const input = page.getByRole("textbox", { name: "Your message", exact: true });
  await input.fill("I need residential service");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await pendingRequest;
  await input.fill("There are sparks and smoke");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator(".assistant-emergency-card a")).toHaveAttribute("href", "tel:5147179277", { timeout: 1000 });
  await expect(page.locator(".ai-assistant-thinking")).toHaveCount(0);
  const completedReply = page.waitForResponse(response => response.url().endsWith("/api/assistant") && response.request().method() === "POST");
  releaseReply();
  await (await completedReply).finished();
  // Give the late response handler a browser task/frame to settle before asserting.
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(page.getByText("STALE MODEL REPLY", { exact: true })).toHaveCount(0);
  await expect(page.locator('[data-message-role="assistant"]')).toHaveCount(2);
  await expect(page.locator(".assistant-emergency-card a")).toHaveAttribute("href", "tel:5147179277");
});
