# Service Work Explorer Rollout

## Purpose

Give every service-detail page the same visual, interactive work explorer now used on the residential page. Each explorer lets a visitor select a published work category through a numbered tab, image arrows, or keyboard-accessible buttons, then see an image and concise explanation for that category.

The result must keep the site visually consistent while preserving the actual scope and terminology of each service page in English and French.

## Scope

The following service pages will use the explorer in place of their current `ServiceVisualPanel` and static published-work list:

| Service page | Published categories | Image inventory |
| --- | ---: | ---: |
| Residential | 9 | Complete; retain current assets |
| Commercial | 8 | 8 new images |
| Industrial | 6 | 6 new images |
| Maintenance and emergency | 6 | 6 new images |
| Generators | 4 | 4 new images |
| Infrared thermography | 5 | 5 new images |
| Fire and security | 5 | 2 new images plus 3 existing dedicated security images |

Every category has one distinct image. Images will be photorealistic, landscape, logo-free, and show the actual category context. They must not contain in-image copy, invented company marks, or unsafe electrical work.

## Component architecture

`ResidentialWorkExplorer` will become a generic `ServiceWorkExplorer` client component with a small, explicit input contract:

- locale;
- service eyebrow, title, and introductory text;
- a list of localized work items, each with id, number, image path, tab label, title, description, and three practical highlights.

Page-specific data will live in a dedicated content module, not inside the component. This keeps the interaction, controls, animations, accessibility semantics, and responsive CSS in one place while making each service’s business logic easy to review.

`ServiceDetailPage` will select the explorer data for the seven service routes. Non-service pages are unchanged.

## Interaction and visual behavior

The explorer will match the residential implementation:

- centered section heading and explanatory lead;
- scrollable numbered tab rail, with the selected tab in amber;
- large 16:10 image on the left and concise explanation with three check-mark highlights on the right;
- circular left/right controls beside the image, with the same dark navy glass treatment, thin border, amber hover, and wraparound behavior as the homepage slider;
- selected tab, image, title, description, and highlights update together;
- desktop arrows remain fully visible outside the media frame; mobile arrows move inside the media edges for reliable touch targets;
- tablist, tabs, tabpanel, selected state, button labels, image alt text, keyboard focus, and reduced-motion behavior remain accessible.

## Content rules

Descriptions will state the published service scope without claims that are not present in the supplied content. French and English copy will describe the same work. Existing security images remain only for the matching categories: intrusion alarms, fire detection, and surveillance connections. The two additional security images cover intercom/access/emergency lighting and electrical compatibility review.

## Failure handling

The component uses the first valid work item as its safe fallback if an unknown active id is encountered. A page cannot render the explorer with an empty item list; content typing and tests will enforce this.

## Verification

Tests will verify, for every service route:

- the former context panel is absent;
- the explorer is visible and has one tab for each published category;
- every explorer image has a meaningful alt attribute;
- next and previous controls change the selected item and wrap around;
- outer desktop arrow targets remain clickable;
- mobile layout does not create horizontal page overflow.

The final verification includes production build, desktop and mobile focused browser tests, and local visual screenshots for representative short, medium, and long category sets.

## Out of scope

- No changes to routes, SEO metadata, navigation, contact behavior, or service-page hero cards.
- No commits, pushes, or pull requests as part of this rollout.
