# Shared service cards

All service catalogue cards now use `components/service-tile.tsx` and `components/service-tile.module.css`, matching the landing page context cards: floating amber icon, photographic header, dark rounded shell, centered category/title/description, full readable highlight rows and centered amber CTA.

Consumers include category cards, residential and commercial subservice grids, work grids (generators, emergency/maintenance, solar, fire/security), related services, About service cards and the services overview illustration cards. The illustration cards retain their vector illustrations inside the same shell.

Service work slideshows were replaced with two-column grids; mobile uses one column. Existing images and bilingual copy were preserved. Fixed a stale residential category image path.

Validation: TypeScript, residential/commercial catalogue tests, bilingual work-grid rendering and image-file checks; browser checks of generator desktop and French mobile with no horizontal overflow.

Local only; no commit or deployment.
