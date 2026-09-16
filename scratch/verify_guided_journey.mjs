import pkg from "file:///c:/Users/mouha/Eclipse-Electrique-Inc/node_modules/@playwright/test/index.js";
const { chromium } = pkg;

const outDir = "C:/Users/mouha/.gemini/antigravity/brain/0fdb4dac-a391-49ea-a398-c89e29d425d1";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log("Navigating to http://localhost:3000/fr...");
  await page.goto("http://localhost:3000/fr", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Context Selector screenshot
  const contextSection = page.locator(".context-selector-section");
  await contextSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/verify_journey_1_context.png` });
  console.log("Saved verify_journey_1_context.png");

  // 2. Popular Services Slider screenshot (Slide 1)
  const sliderSection = page.locator("#services-populaires");
  await sliderSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/verify_journey_2_slider_slide1.png` });
  console.log("Saved verify_journey_2_slider_slide1.png");

  // Test Slider Next button
  const nextBtn = sliderSection.locator('button[aria-label*="suivant"], button[aria-label*="Next"]').first();
  if (await nextBtn.count() > 0) {
    await nextBtn.click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${outDir}/verify_journey_2_slider_slide2.png` });
    console.log("Saved verify_journey_2_slider_slide2.png");
  }

  // 3. Problem Intent Grid
  const problemSection = page.locator(".problem-intent-section");
  await problemSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/verify_journey_3_problems.png` });
  console.log("Saved verify_journey_3_problems.png");

  // 4. Process Stepper
  const processSection = page.locator(".process-stepper-section");
  await processSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/verify_journey_4_process.png` });
  console.log("Saved verify_journey_4_process.png");

  // 5. Why Eclipse / Proof
  const whySection = page.locator(".why-eclipse-section");
  await whySection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/verify_journey_5_proof.png` });
  console.log("Saved verify_journey_5_proof.png");

  // 6. Technical Expertise Tabs
  const techSection = page.locator("#expertise-technique");
  await techSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  
  // Click Tab 03 (Thermographie)
  const tab3 = techSection.locator('button[role="tab"]').nth(2);
  if (await tab3.count() > 0) {
    await tab3.click();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: `${outDir}/verify_journey_6_tech_tabs.png` });
  console.log("Saved verify_journey_6_tech_tabs.png");

  // 7. Regional Coverage Hub
  const coverageSection = page.locator(".coverage-hub-section");
  await coverageSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/verify_journey_7_coverage.png` });
  console.log("Saved verify_journey_7_coverage.png");

  // 8. FAQ Teaser
  const faqSection = page.locator(".faq-teaser-section");
  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  // Expand question 2
  const faqBtn2 = faqSection.locator("button").nth(1);
  if (await faqBtn2.count() > 0) {
    await faqBtn2.click();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: `${outDir}/verify_journey_8_faq.png` });
  console.log("Saved verify_journey_8_faq.png");

  // 9. Mobile Viewport Check (375x812)
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto("http://localhost:3000/fr", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: `${outDir}/verify_journey_mobile_hero.png` });
  
  const mobileSlider = mobilePage.locator("#services-populaires");
  await mobileSlider.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: `${outDir}/verify_journey_mobile_slider.png` });

  await browser.close();
  console.log("All journey verifications completed successfully!");
}

run().catch(console.error);
