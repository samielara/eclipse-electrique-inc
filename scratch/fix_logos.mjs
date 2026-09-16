import sharp from 'sharp';

async function fixLogos() {
  console.log("Fixing logos on images using official Éclipse logo...");

  const faqMeta = await sharp('public/media/faq-master-consultation.jpg').metadata();
  console.log("FAQ image size:", faqMeta.width, "x", faqMeta.height);

  const { data, info } = await sharp('public/media/original_eclipse_logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a > 50) {
      if (r < 80 && g < 80 && b < 80) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }
    }
  }

  const whiteTextLogo = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).png().toBuffer();

  await sharp(whiteTextLogo).toFile('public/media/eclipse-logo-white-text.png');
  console.log("Created public/media/eclipse-logo-white-text.png");

  // Resize logo for polo chest badge (around 85px width)
  const faqBadge = await sharp(whiteTextLogo)
    .resize({ width: 85 })
    .toBuffer();

  // On FAQ image: chest is around x: 915, y: 470
  const patch = await sharp({
    create: {
      width: 105,
      height: 80,
      channels: 4,
      background: { r: 18, g: 19, b: 22, alpha: 0.96 }
    }
  }).blur(4).png().toBuffer();

  await sharp('public/media/faq-master-consultation.jpg')
    .composite([
      { input: patch, left: 910, top: 465 },
      { input: faqBadge, left: 920, top: 470 }
    ])
    .toFile('public/media/faq-consultation-master.jpg');
  console.log("Updated public/media/faq-consultation-master.jpg");

  // Contact image: contact-master-dispatch.jpg
  const contactBadge = await sharp(whiteTextLogo)
    .resize({ width: 100 })
    .toBuffer();

  const contactPatch = await sharp({
    create: {
      width: 125,
      height: 95,
      channels: 4,
      background: { r: 15, g: 16, b: 18, alpha: 0.97 }
    }
  }).blur(4).png().toBuffer();

  await sharp('public/media/contact-master-dispatch.jpg')
    .composite([
      { input: contactPatch, left: 1180, top: 660 },
      { input: contactBadge, left: 1192, top: 668 }
    ])
    .toFile('public/media/contact-dispatch-master.jpg');
  console.log("Updated public/media/contact-dispatch-master.jpg");
}

fixLogos().catch(console.error);
