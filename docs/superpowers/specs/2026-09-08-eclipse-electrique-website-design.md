# Éclipse électrique bilingual website design

Date: 2026-09-08

## Goal

Create a production-oriented, French-first public website for Éclipse électrique inc. that converts visitors into phone or email enquiries, presents the company’s verified electrical services clearly, and gives search engines a complete bilingual structure. The experience must work across mobile, tablet, and desktop without separate native applications.

The first deployment is private. Public launch and custom-domain migration remain blocked until the company confirms its canonical address, privacy officer, form-delivery destination, logo and image rights.

## Audiences and primary actions

- Homeowners seeking residential electrical work or urgent help.
- Commercial property owners, tenants, managers, and operators.
- Industrial organizations seeking installation, connection, maintenance, or troubleshooting.
- Visitors researching generator installation or repair.

Primary conversion actions:

1. Request a quote or service consultation.
2. Call the emergency line for urgent electrical help.
3. Call the office or send an email for general enquiries.

The emergency path remains a direct telephone action and never depends on a web form.

## Verified content boundary

Public copy may use these facts:

- Legal/public name: Éclipse électrique inc.
- RBQ licence: 5582-0096-01.
- NEQ: 1165326209.
- Licence history beginning in 2008.
- Office telephone: 514-510-1112.
- Emergency telephone: 514-717-9277.
- Email: info@eclipseelectrique.com.
- Residential, commercial, industrial, maintenance/emergency, and generator services.
- Greater Montréal, North Shore, and South Shore coverage.

The site must not publish a street address, Generac authorization, insurance limits, free-estimate promise, price, financing, warranty, response-time guarantee, project count, team size, named clients, or affiliation with Acrobat Management until first-party confirmation exists. It must not use self-serving aggregate-rating structured data or invented testimonials.

## Architecture decision

Use the supported Next-compatible Vinext/React starter and Cloudflare Worker output. Keep the public site static-first and server-rendered, with minimal client components only where interaction is required. This preserves crawlable HTML and strong performance while leaving a controlled path for a validated quote endpoint later.

Use only dependencies already supplied by the starter unless a demonstrated requirement cannot be met:

- Tailwind CSS for an original responsive visual system.
- Selected shadcn/Base UI primitives for accessible menus, dialogs, and disclosure controls.
- Named Lucide imports for icons.
- Zod for shared validation when the enquiry endpoint is activated.
- Native HTML controls for the initial short enquiry flow.

Do not add an animation framework, carousel, analytics SDK, map embed, remote font, or external form service to the baseline. CSS transitions must honor reduced-motion preferences. A responsive grid is preferred to a carousel when approved project photography becomes available.

GitHub templates such as AstroWind and ScrewFast are design and bilingual-routing references only. No generic electrician theme, demo asset, sample testimonial, manufacturer logo, or unverified component registry will be copied. The implementation uses original markup, composition, copy, and styles.

## Bilingual route contract

French is the default public language. The root route redirects permanently to `/fr`. Every indexable page has a distinct, crawlable French and English URL. A visible `Français | English` link maps visitors to the equivalent logical page rather than merely swapping strings in place.

| Page ID | French | English |
| --- | --- | --- |
| home | `/fr` | `/en` |
| services | `/fr/services` | `/en/services` |
| residential | `/fr/services/electricien-residentiel` | `/en/services/residential-electrician` |
| commercial | `/fr/services/electricien-commercial` | `/en/services/commercial-electrician` |
| industrial | `/fr/services/electricien-industriel` | `/en/services/industrial-electrician` |
| maintenance | `/fr/services/maintenance-et-urgence` | `/en/services/maintenance-and-emergency` |
| generators | `/fr/services/generatrices` | `/en/services/generators` |
| service-area | `/fr/territoire-desservi` | `/en/service-area` |
| about | `/fr/a-propos` | `/en/about` |
| faq | `/fr/faq` | `/en/faq` |
| contact | `/fr/contact` | `/en/contact` |
| privacy | `/fr/confidentialite` | `/en/privacy` |

A single typed route registry is the source for navigation, alternate-language links, canonicals, `hreflang`, sitemap generation, and not-found validation.

## Page experience

### Global shell

- Skip link, semantic landmarks, visible keyboard focus, and high-contrast controls.
- Desktop header with services navigation, territory, about, contact, language link, quote CTA, and distinct emergency call action.
- Compact mobile navigation with direct access to emergency and quote actions.
- Footer with verified contact details, service links, RBQ/NEQ, language switch, and privacy link.
- No disputed address or hours.

### Home

The first viewport identifies the company as a residential, commercial, and industrial electrical contractor serving Greater Montréal. It surfaces quote and emergency actions immediately, followed by a factual trust row: operating since 2008, RBQ licence, Greater Montréal service, and dedicated emergency line.

The rest of the page introduces the five service groups, explains a simple contact-to-intervention process without promising timelines, summarizes the three service regions, and routes visitors to relevant service pages and FAQ content.

### Service hub and service pages

Each service page contains a need-oriented heading, verified scope of work, relevant property/customer contexts, a neutral three-step engagement process, territory link, two or three substantive FAQs, related-service links, and quote/call actions. Content is written independently in idiomatic Canadian French and English, not machine-translated word-for-word.

### Territory

Use one substantive Greater Montréal coverage page split into Montréal, North Shore, and South Shore. Avoid thin municipal doorway pages. The detailed 50-city list may be included only with language corrections and an explicit note that availability depends on the project; no travel radius is invented.

### About

Focus on the licence history, service breadth, and direct contact path. Do not publish an unconfirmed org chart, biographies, workforce count, project count, or client logos.

### FAQ

Group visible questions around sectors served, emergency contact, generator work, territory, preparation for an enquiry, and licence verification. Answers do not invent prices, availability, warranties, or response times. FAQ structured data is omitted unless current Google eligibility and content rules justify it at launch.

### Contact and enquiry flow

Show office, emergency, and email actions prominently. The first private version may collect enquiry details in the browser and prepare a pre-addressed email; it must not claim that a server submission was delivered. A production form endpoint requires a confirmed destination, retention policy, privacy officer, spam controls, server-side validation, failure handling, and explicit consent language.

### Privacy

Publish a clearly marked pre-launch privacy notice that accurately describes the current static site. Before a public form or analytics tool is activated, replace it with owner-approved Law 25 language covering collection purpose, contact details, retention, recipients/processors, cookies, rights, and privacy-officer information.

## SEO contract

Each public page renders:

- Correct `<html lang="fr-CA">` or `<html lang="en-CA">` semantics.
- A unique localized title and meta description.
- An absolute self-referencing canonical.
- Reciprocal `hreflang` links for `fr-CA` and `en-CA` plus an appropriate `x-default`.
- Localized Open Graph text, without adding an unrequested generated social card.
- Crawlable internal links and one H1.

Generate a root sitemap containing both canonical language versions and a production robots file referencing it. Do not use `robots.txt` as a staging-security mechanism.

Publish `Electrician` JSON-LD using one stable `@id`, verified company name, phones, email, URL, licence identifiers, and broad service area. Omit the conflicting address, geo coordinates, ratings, price range, hours, manufacturer relationships, and unsupported claims.

## Visual direction

Use a precise, high-trust electrical-services aesthetic: deep graphite and midnight-navy foundations, safety amber as the controlled action color, clean white content fields, cool steel borders, and restrained electric-blue technical accents. Typography is direct and compact with a system font stack to avoid remote font dependencies.

A distinctive technical line-grid and conduit-path motif gives the site character without pretending that stock or generated photos are company projects. If a raster hero image is added, it must be an original abstract/electrical asset or approved company photography with documented rights. No manufacturer or customer logos are used.

## Accessibility and responsive behavior

- Semantic headings and landmarks, skip navigation, descriptive link text, and labelled controls.
- Keyboard-operable navigation and disclosures with visible focus.
- Minimum 44 by 44 pixel touch targets for primary mobile actions.
- WCAG AA contrast targets and no information conveyed by color alone.
- Main copy at 16 pixels or larger and usable at 200% text zoom.
- Reduced motion support and no autoplay.
- No horizontal overflow at common mobile widths; French wrapping tested independently.
- Explicit office-versus-emergency phone labels.

## Performance targets

- Server-render or pre-render all public content.
- Minimize hydrated client code.
- No third-party analytics, embedded map, autoplay media, or remote fonts in the baseline.
- Explicit dimensions for all future imagery.
- Target field Core Web Vitals at the 75th percentile: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1.

## Error and edge-case behavior

- Unknown locale or route returns a real not-found response.
- Language switch never targets a nonexistent translation.
- Phone and email links remain usable without JavaScript.
- If browser email preparation is unavailable, contact details remain visible for manual use.
- Form validation preserves entered values and associates each error with its field.
- Emergency messaging always directs visitors to the emergency number and never claims guaranteed response.

## Verification

- Production build and existing starter tests.
- Programmatic route inventory for every French/English pair.
- Static checks for one H1, titles, descriptions, canonicals, reciprocal alternates, sitemap membership, and JSON-LD parseability.
- Link and asset checks with no unresolved placeholders or remote demo dependencies.
- Responsive source review and explicit browser QA only if requested.
- Dependency/advisory review and a third-party notice/provenance ledger for copied code or assets.

## Deferred launch decisions

These do not block a private, reviewable build but do block a truthful public launch:

1. Canonical street address and business hours.
2. Current logo and favicon source files with usage rights.
3. Approved project/team photography and releases.
4. Quote-form delivery destination, processor, retention policy, and spam controls.
5. Privacy officer title/contact and approved privacy notice.
6. Confirmed public warranty, estimate, response-time, insurance, affiliations, and manufacturer credentials.
7. Analytics platform and consent decision.
8. Google Business Profile and Search Console access.
