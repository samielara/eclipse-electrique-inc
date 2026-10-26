# Mobile / desktop consistency audit — October 25, 2026

Compared 396px mobile and 1280px desktop browser views of 15 representative routes: home; services overview; residential and commercial category pages; generators; fire/security; solar; maintenance/emergency; Service Area overview and Ahuntsic city page; residential heating; French commercial construction; About; FAQ; and Contact with heating prefill.

Checks: identical H1/H2 content order and service card counts; no horizontal page overflow; no clipped card headings in the catalogue checks; no broken loaded images in the service/area checks; one-page form fields visible; input font sizes at least 16px.

Interaction checks: 11 residential, 11 commercial subservice links; all 50 city links grouped 15/11/24; drawer open/close; quote context prefill; category changes clear stale work selection; incomplete form shows inline errors and focuses its summary. No live email was sent.

Fixed: background page remained scrollable behind the mobile drawer, creating two scrollbars. Added a scoped mobile-only root/body scroll lock while the drawer is open, retained drawer scrolling, and increased submenu rows / close control to at least 44px touch targets. Existing header arrangement and styling preserved.

Fixed bottom action bar is approximately 74px; page bottom padding is approximately 78px at the tested mobile viewport. Desktop unaffected by the mobile-only rules.

Limits: representative shared templates checked, not every city URL individually; no physical-device or tablet emulation in this audit. Existing responsive CSS retains 3/2/1 service card columns. TypeScript check passed. Local changes only.
