# Service detail layout refresh

Design read: service detail pages for homeowners and facility owners; preserve the established dark and amber identity, existing photography and navigation.

Design dials: DESIGN_VARIANCE 4, MOTION_INTENSITY 2, VISUAL_DENSITY 4.

## Audit

- Existing brand: black canvas, deep navy surfaces, amber actions, Manrope headings and Inter body copy, rounded photography and pill actions.
- Existing architecture: shared residential and commercial nested-service template, localized stable URLs, category breadcrumbs, quote-intake and office-phone links, scope highlights and related services.
- Current problems: generic section padding creates a large empty opening; a boxed split hero adds large internal padding; an image with forced minimum height and contain sizing leaves letterboxing; the headline dominates and actions fall below the first viewport.
- Preserve all routes, page metadata, current service copy, the approved character photography, quote links, office phone and site header/footer.

## Layout

- Short breadcrumb row directly beneath the header.
- Unboxed split hero with balanced content and media widths, restrained heading scale, a clear request action and office phone.
- Full uncropped photo in its own thin bordered frame, no text overlay and no forced empty image height.
- A simple license and territory line beneath the hero.
- Plain scope checklist paired with a small planning note; no repeated large cards.
- Related services as concise links; category navigation remains in the breadcrumb.
- Mobile: text and request action first, then the uncropped photo; stacked supporting content and touch-sized related links.

Implementation is local only. No new images or packages are required.
