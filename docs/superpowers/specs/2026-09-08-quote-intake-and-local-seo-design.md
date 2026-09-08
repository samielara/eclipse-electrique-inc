# Quote Intake and Local SEO Design

## Goal

Replace the static quote-email form with a bilingual, accessible four-step intake wizard and replace the minimal organization markup with complete, localized `Electrician` / `LocalBusiness` JSON-LD. Keep the current no-backend email handoff and defer publishing.

## Product decisions

- The wizard remains on the localized contact page. Quote CTAs point to `/{locale}/contact#quote-intake`, including the homepage hero and thermography CTA.
- The wizard has four steps: service, intervention timeline, municipality/postal code, then contact/project details.
- Each step validates before advancing. Going backward retains every value in component state.
- Selecting an active emergency exposes the verified direct number `514-717-9277` as a tap-to-call banner.
- The municipality selector is sourced directly from the existing 50-entry `cityRoutes` catalogue so route and form coverage cannot drift.
- The native file control accepts images and PDF documents and keeps the selected files in local component state. Because the existing handoff uses `mailto:`, the generated email lists the filenames and tells the visitor to add the files in their email application; the website does not upload, store, or claim to transmit files.
- The quote email recipient is the currently verified project contact, `yasser@eclipseelectrique.com`.

## Component and data boundaries

- `lib/quote-intake.ts` owns wizard value types, step validation, localized option labels, postal/phone/email checks, and deterministic `mailto:` generation.
- `components/quote-intake-wizard.tsx` owns only client interaction and rendering: step state, focus movement, error announcements, field updates, selected files, and the final email handoff.
- `components/schema-org.tsx` owns the locale-aware schema builder, safe JSON serialization, and JSON-LD script rendering.
- `lib/routes.ts` exposes one `quotePath(locale)` helper so all quote CTAs target the same intake anchor.
- `app/[locale]/[[...segments]]/page.tsx` keeps page-specific canonical, reciprocal `hreflang`, OpenGraph, and Twitter metadata, while delegating JSON-LD to `SchemaOrg`.

## Schema contract

Each localized page emits a single business entity with:

- `@type`: `Electrician` and `LocalBusiness`
- name and legal name for Éclipse électrique
- RBQ `5582-0096-01` and NEQ `1165326209` identifiers
- postal address `3893 Bd Saint-Jean-Baptiste, Montréal, QC H1B 5V4, Canada`
- office `+1-514-510-1112` and emergency `+1-514-717-9277` contact points
- email `yasser@eclipseelectrique.com`
- Greater Montréal, Montréal, Laval, Longueuil, North Shore, and South Shore service areas
- French and English availability
- `Mo-Su 00:00-24:00`, explicitly described as emergency dispatch availability
- price range `$$`
- a four-offer catalogue for residential, commercial/industrial, infrared thermography, and alarm/fire services, with localized names and service-page URLs

No ratings, reviews, manufacturer authorization, response-time guarantee, or other unsupported claims are added.

## Accessibility and visual behavior

- A native progress element and adjacent `aria-live="polite"` text announce “step N of 4.”
- Each choice group uses labeled radio controls; form errors use `aria-invalid`, `aria-describedby`, and a focusable alert summary.
- On step changes, keyboard focus moves to the new step heading. Back and next targets meet the existing 44px minimum.
- Light and dark treatments reuse the current slate, copper, amber, border, and focus-ring system.

## Verification

- Unit tests exercise real validation and email generation, including malformed postal codes, emergency copy, retained option values, and filename disclosure.
- Static component tests verify the initial accessible progress state, 50-city selector, radio semantics, and intake anchor.
- Built HTML tests verify reciprocal locale metadata, Twitter cards, address/contact/schema fields, localized offers, and the continued absence of aggregate ratings.
- Final checks: `npm run lint`, `npm test`, and a clean git status after a local feature commit. Publishing remains deferred.
