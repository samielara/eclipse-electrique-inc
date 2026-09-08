# Éclipse électrique inc. website

French-first bilingual website for Éclipse électrique inc., a Montréal electrical contractor. The public experience is server-rendered, responsive and static-first, with the owner-selected dark theme by default, an optional light-theme switch, direct phone/email conversion paths, and one localized URL for every indexable page.

## Routes

French is the default language and `/` redirects to `/fr`. Every route below has a matching English URL:

| French | English |
| --- | --- |
| `/fr` | `/en` |
| `/fr/services` | `/en/services` |
| `/fr/services/electricien-residentiel` | `/en/services/residential-electrician` |
| `/fr/services/electricien-commercial` | `/en/services/commercial-electrician` |
| `/fr/services/electricien-industriel` | `/en/services/industrial-electrician` |
| `/fr/services/maintenance-et-urgence` | `/en/services/maintenance-and-emergency` |
| `/fr/services/generatrices` | `/en/services/generators` |
| `/fr/territoire-desservi` | `/en/service-area` |
| `/fr/a-propos` | `/en/about` |
| `/fr/faq` | `/en/faq` |
| `/fr/contact` | `/en/contact` |
| `/fr/confidentialite` | `/en/privacy` |

The service-area dropdown also links to one localized landing page for each of the 50 published cities. French pages use `/fr/territoire-desservi/<city-slug>` and English pages use `/en/service-area/<city-slug>`; each pair has localized metadata and a service overview.

## Verified-content boundary

Visible copy is limited to the public facts verified during research: the legal name, RBQ licence 5582-0096-01, NEQ 1165326209, licence history beginning in 2008, the office and emergency telephone numbers, the public email address, electrical service categories, and broad Greater Montréal / North Shore / South Shore coverage.

The site intentionally omits the disputed street address, unconfirmed business hours, manufacturer authorization, response-time promise, prices, warranty, insurance limits, project counts, client names and unapproved testimonials. Update those only after first-party confirmation.

The contact form prepares a message in the visitor’s own email application. It does not send data to a server or report a successful submission. The emergency path remains a direct call to 514-717-9277.

The owner-supplied Gemini logo is used as the site mark. The landing page includes a short local ambient electrical visual with a still-image fallback. Visitors can switch between dark and light themes from the header; the choice is stored locally in their browser and does not create an account or transmit preference data.

## Local commands

```bash
npm run build
npm test
npm run lint
npm audit --omit=dev
```

The build produces the Vinext/Cloudflare Worker output used by Sites. The existing `.openai/hosting.json` contains the registered Site identity; do not replace it with a new Site registration.

## Before public launch

The private review build is ready for content and design feedback. Public launch and custom-domain work still require the owner to confirm the canonical operating address, official logo/image rights, current service territory, privacy officer and Law 25 notice, form delivery/retention policy, insurance and warranty language, business hours, any manufacturer credentials, and access to the Google Business Profile.
