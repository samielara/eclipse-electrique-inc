# Residential navigation and service pages

## Intent and scope
Give visitors direct access to residential services through Services → Residential → service page. Keep Commercial and all other categories unchanged. Preserve the existing theme, homepage removals and locally approved changes. No commits, pushes or deployments without a new explicit request.

## Approved service list
1. Construction and renovations
2. Service entrances and electrical panels
3. Interior and exterior lighting
4. Heating and heated floors
5. Smart-home controls
6. Data, telephone, audio and video cabling
7. Security, fire and surveillance systems
8. Pools, spas and outdoor electrical work
9. Generator installation and repair
10. Troubleshooting and repairs
11. Electrical inspections

## Approach
Use a side-opening nested submenu for desktop pointer hover and keyboard focus, and a tap-to-expand residential group within the existing mobile Services menu. Keep a separate Residential overview link available. A flat service list would not provide the requested hierarchy; carousel-only navigation would hide direct access. Reuse shared localized data and a single service-page template rather than eleven duplicated implementations.

## Seasonal order — proposed implementation choices
Choose the season from the current month in America/Toronto: winter December–February; spring March–May; summer June–August; autumn September–November. Compute once on the server and pass the same ordered list to desktop and mobile to avoid hydration differences. Refresh with normal page navigation/reload; no timer needed.

Keep a single editable configuration containing an optional manual season override and the four explicit ordered lists. No analytics-based claim of actual demand: these are editorial priorities, not measured popularity. Never hide services or change stable URLs, headings or page identity by season.

Winter: heating, troubleshooting, generators, panels, renovations, lighting, security, smart home, inspections, cabling, outdoor.
Spring: outdoor, inspections, renovations, lighting, panels, generators, troubleshooting, security, smart home, heating, cabling.
Summer: outdoor, lighting, renovations, panels, generators, troubleshooting, security, inspections, smart home, cabling, heating.
Autumn: heating, generators, inspections, lighting, panels, troubleshooting, renovations, security, smart home, cabling, outdoor.

## Pages and content
Create eleven stable, nested, human-readable routes in both French and English beneath the existing Residential route. Each page includes breadcrumbs, one service-specific H1, an existing image, concise scope and common work, request-service action, and related residential links. Match the established inner-page styling and responsive behavior. Do not claim guaranteed restoration, insurance compliance, rebate amounts or response times.

Extract the nine existing residential image/content entries into reusable shared content. For troubleshooting reuse the existing maintenance image; for inspections reuse the existing electrical testing image after checking asset availability. No generated images. Keep the existing Residential overview; connect its service entries to the new pages where appropriate.

Integrate exact route matching, translated language-switch destinations, page titles/descriptions, canonical/alternate URLs and sitemap entries. Invalid subservice paths return 404. Do not treat a nested residential page as a city page or as a generic residential overview.

## Accessibility and responsive behavior
Desktop: pointer can move from Residential into the submenu without losing it; keyboard users can open it and reach each link; Escape closes it. Mobile: independent disclosure control, no hover dependency, one chevron, and service selection closes the drawer. Constrain flyout height and keep links scrollable on short screens; avoid viewport overflow.

## Verification
Test eleven unique services and all four seasonal orders, ensuring every order contains each service exactly once. Test all 22 exact localized paths, locale switching, metadata and sitemap inclusion. Check desktop hover/focus/Escape, mobile expansion/navigation and narrow-screen overflow. Typecheck and production build; update homepage expectations for deliberately removed sections. Do not send a real customer email.
