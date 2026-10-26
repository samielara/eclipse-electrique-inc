import {test,expect} from "@playwright/test";

test("the active website presents Solar instead of infrared",async({page})=>{
 for(const locale of ["en","fr"] as const){
  const paths=locale==="en"?["/en","/en/services","/en/services/solar-energy","/en/faq","/en/about","/en/contact","/en/service-area","/en/service-area/brossard"]:["/fr","/fr/services","/fr/services/energie-solaire","/fr/faq","/fr/a-propos","/fr/contact","/fr/territoire-desservi","/fr/territoire-desservi/brossard"];
  for(const path of paths){
   await page.goto(path);
   await expect(page.locator(".site-footer")).toBeAttached();
   expect(await page.locator("body").innerText(),path).not.toMatch(/infrared|thermograph|infrarouge|\bFLIR\b/i);
   expect(await page.locator('a[href*="infrared-thermography"],a[href*="thermographie-infrarouge"]').count()).toBe(0);
  }
  await page.goto(locale==="en"?"/en/contact":"/fr/contact");
  await expect(page.locator('input[name="quote-service"][value="solar"]')).toHaveCount(1);
  await expect(page.locator('input[name="quote-service"][value="thermography"]')).toHaveCount(0);
 }
});

test("solar metadata and retired infrared URLs are handled correctly",async({request})=>{
 for(const locale of ["en","fr"] as const){
  const old=locale==="en"?"/en/services/infrared-thermography":"/fr/services/thermographie-infrarouge";
  const response=await request.get(old,{maxRedirects:0});
  expect(response.status()).toBe(308);expect(response.headers().location).toBe(`/${locale}/services`);
  const page=await request.get(locale==="en"?"/en/services/solar-energy":"/fr/services/energie-solaire");
  expect(page.status()).toBe(200);
  const html=await page.text();expect(html).toContain('rel="canonical"');
  expect(html).toContain(locale==="en"?"/fr/services/energie-solaire":"/en/services/solar-energy");
 }
});
