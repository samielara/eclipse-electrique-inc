import { test, expect } from "@playwright/test";
import { residentialServices, residentialServicePath } from "../../content/residential-services";

test("residential flyout and mobile disclosure reach individual service pages", async ({page})=>{
  await page.goto("/en");
  if(await page.locator(".desktop-nav").isVisible()) {
    await page.locator(".header-dropdown-services > summary").hover();
    await page.locator(".residential-category-row").hover();
    const flyout=page.locator("#residential-flyout");
    await expect(flyout).toBeVisible();
    await expect(flyout.locator("a")).toHaveCount(11);
    await expect(flyout.locator(".residential-service-icon")).toHaveCount(11);
    expect(await flyout.evaluate(e=>e.scrollHeight<=e.clientHeight)).toBeTruthy();
    await flyout.locator('a[href$="/heating"]').hover();
    await expect(flyout).toBeVisible();
    await flyout.locator('a[href$="/heating"]').focus();
    await page.keyboard.press("Escape");
    await expect(flyout).toBeHidden();
    await page.locator(".header-dropdown-services > summary").hover();
    await page.locator(".residential-category-row").hover();
    await flyout.locator('a[href$="/heating"]').click();
  } else {
    await page.locator(".mobile-menu > summary").click();
    const services=page.locator(".mobile-nav-accordion").first();
    if(!await services.evaluate(e=>(e as HTMLDetailsElement).open)) await services.locator(":scope > summary").click();
    await page.locator(".mobile-residential-group > summary").click();
    await expect(page.locator(".mobile-residential-group .mobile-residential-links a")).toHaveCount(11);
    await page.locator('.mobile-residential-group .mobile-residential-links a[href$="/heating"]').click();
    await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open","");
  }
  await expect(page).toHaveURL(/residential-electrician\/heating$/);
  await expect(page.locator("h1")).toHaveText("Electric heating and heated floors");
  await expect(page.locator('.language-toggle').first()).toHaveAttribute("href","/fr/services/electricien-residentiel/chauffage-planchers-chauffants");
  const image=page.locator(".residential-detail-media img");
  await expect(image).toBeVisible();
  expect(await image.evaluate(e=>(e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
});

test("nested residential paths reject unknown service names",async({request})=>{
  const response=await request.get("/en/services/residential-electrician/not-a-service");
  expect(response.status()).toBe(404);
});

test("keyboard Escape closes both nested levels and short windows retain scroll access",async({page})=>{
  await page.setViewportSize({width:1440,height:500});
  await page.goto("/en");
  const services=page.locator(".header-dropdown-services");
  await services.locator(":scope > summary").focus();
  await page.keyboard.press("Enter");
  await page.locator(".residential-category-row > a").focus();
  await expect(page.locator("#residential-flyout")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#residential-flyout")).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(services).not.toHaveAttribute("open","");
  await services.locator(":scope > summary").focus();
  await page.keyboard.press("Enter");
  await page.locator(".residential-category-row > a").focus();
  const panel=page.locator(".services-dropdown-panel");
  expect(await panel.evaluate(e=>getComputedStyle(e).overflowY)).toBe("auto");
  const last=panel.locator(".dropdown-view-all");
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport();
});

test("all bilingual residential pages expose unique content and translated metadata",async({request})=>{
  for(const item of residentialServices) for(const locale of ["fr","en"] as const) {
    const path=residentialServicePath(locale,item.id);
    const response=await request.get(path);
    expect(response.status()).toBe(200);
    const html=await response.text();
    expect((html.match(/<h1>/g)||[]).length).toBe(1);
    expect(html).toContain(item.image);
    expect(html).toContain('rel="canonical"');
    expect(html).toContain(residentialServicePath(locale==="fr"?"en":"fr",item.id));
  }
});
