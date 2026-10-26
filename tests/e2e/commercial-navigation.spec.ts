import {test,expect} from "@playwright/test";
import {commercialServices,commercialServicePath} from "../../content/commercial-services";

test("one combined category opens its service submenu and dedicated pages",async({page})=>{
 await page.goto("/en");
 await expect(page.locator('.context-selector-section a[href="/en/services/commercial-electrician"]')).toHaveCount(1);
 await expect(page.locator('a[href="/en/services/industrial-electrician"]')).toHaveCount(0);
 await expect(page.locator('.site-footer a[href="/en/services/commercial-electrician"]')).toHaveCount(1);
 if(await page.locator(".desktop-nav").isVisible()) {
  await page.locator(".header-dropdown-services > summary").hover();
  await page.locator(".commercial-category-row").hover();
  await expect(page.locator("#commercial-flyout")).toBeVisible();
  await expect(page.locator("#commercial-flyout a")).toHaveCount(11);
  await page.locator('#commercial-flyout a[href$="/renovations"]').click();
 }else{
  await page.locator(".mobile-menu > summary").click();
  const services=page.locator(".mobile-nav-accordion").first();
  if(!await services.evaluate(e=>(e as HTMLDetailsElement).open))await services.locator(":scope > summary").click();
  await page.locator(".mobile-commercial-group > summary").click();
  await expect(page.locator(".mobile-commercial-group a")).toHaveCount(11);
  await page.locator('.mobile-commercial-group a[href$="/renovations"]').click();
 }
 await expect(page).toHaveURL(/commercial-electrician\/renovations$/);
 await expect(page.locator("h1")).toHaveText("Commercial and industrial renovations and remodeling");
 await expect(page.locator(".language-toggle").first()).toHaveAttribute("href","/fr/services/electricien-commercial/renovations-reamenagements");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});

test("22 localized pages work and old Industrial URLs redirect to the combined overview",async({request})=>{
 for(const locale of ["fr","en"] as const){
  const old=locale==="fr"?"/fr/services/electricien-industriel":"/en/services/industrial-electrician";
  const combined=locale==="fr"?"/fr/services/electricien-commercial":"/en/services/commercial-electrician";
  const redirect=await request.get(old,{maxRedirects:0});expect(redirect.status()).toBe(308);expect(redirect.headers().location).toBe(combined);
  const overview=await request.get(combined);const html=await overview.text();expect((html.match(/class="residential-overview-card"/g)||[]).length).toBe(11);
  for(const item of commercialServices){const response=await request.get(commercialServicePath(locale,item.id));expect(response.status()).toBe(200);expect(await response.text()).toContain(item.image);}
 }
});
