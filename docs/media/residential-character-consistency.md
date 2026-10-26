# Residential service character consistency

Date: 2026-10-25
Method: built-in ImageGen edits, followed by WebP compression for the website.
Identity reference: `public/media/service-residential-master.jpg` (Troubleshooting & repairs, sixth card in the autumn order).

The original image assets are preserved. Edited assets are stored in `public/media/residential-consistent/`. Both languages share the catalogue image paths, and the detail-page template uses the same catalogue.

## Final prompt set

Common identity instruction used for every edit:

> Use case: identity-preserve. Image 1 is the edit target. Image 2 is the recurring character reference. Replace the technician with precisely the same mature male Éclipse electrician from image 2: matching facial proportions, swept-back silver-gray hair, short salt-and-pepper beard, build, and black short-sleeve Éclipse polo with a small embroidered chest logo where visible. Preserve the service-specific work, tools, hand positions, background, framing, photographic realism and original lighting. Change only the technician and clothing as specified. No extra people, captions or overlays. Return one standalone landscape edited photograph.

Scene instructions:

- **Inspections:** Keep the kneeling inspection action, open panel, wiring, basement, gloves and safety glasses; replace the original worker with the reference man in the black polo. Show conventional panel inspection, not a thermal camera.
- **Heating:** Keep the kneeling heated-floor installation, red heating cable grid, multimeter, thermostat and bathroom. Replace the young brown-haired worker with the reference man in the black polo and work trousers.
- **Construction:** Keep the kneeling wiring task, blue boxes, timber framing, gloves, hard hat and safety glasses. Match the reference man's visible gray hair and bearded side profile; replace the hoodie with the black polo.
- **Generators:** Preserve the foreground generator, outdoor cabinet, stone facade, landscaping and distant skyline. Match the standing worker to the reference man without changing his position or scale; remove the cap to reveal his gray hair.
- **Entrances & panels:** Keep the open panel, multimeter, conduits, garage, posture, gloves, white hard hat and safety glasses. Match the reference man's gray hair, beard and black polo instead of the hoodie.
- **Security:** Keep the raised hands fitting the ceiling camera, entryway, wooden door, smoke alarm and furnishings. Replace the cap-wearing worker with the reference man, gray hair visible and a matching slight bearded side profile.
- **Cabling:** Preserve the network cabinet, bundled blue and white cables, connecting hands, kneeling pose, tool belt and living room. Match the reference man, gray hair, beard and black polo.
- **Smart home:** Preserve the prominent touchscreen and switches, living room, window view and distant kneeling worker's scale. Match that worker to the reference man, including silver-gray hair, bearded profile and black polo.
- **Outdoors:** Preserve the swimming pool, spa, lakeside landscape, dusk light, cabinet, wiring action and kneeling pose. Match the reference man in the black polo; remove the cap to reveal gray hair and the matching bearded profile.

## Final assets

- `/media/residential-consistent/inspections.webp`
- `/media/residential-consistent/heating.webp`
- `/media/residential-consistent/new-construction.webp`
- `/media/residential-consistent/generators.webp`
- `/media/residential-consistent/service-entrances.webp`
- `/media/residential-consistent/security.webp`
- `/media/residential-consistent/cabling.webp`
- `/media/residential-consistent/smart-home.webp`
- `/media/residential-consistent/outdoor.webp`

The original troubleshooting image remains the identity reference; the lighting image contains no technician and is unchanged.
