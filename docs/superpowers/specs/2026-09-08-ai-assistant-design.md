# Éclipse Electrical Assistant Design

**Date:** 2026-09-08
**Status:** Approved by the implementation request

## Purpose

Add a globally available, bilingual electrical concierge that helps visitors identify the right Éclipse électrique service, check published city coverage, and continue to the existing quote intake. The assistant is a deterministic, in-house rules engine. It does not diagnose electrical faults, claim to be a human, or depend on an external AI service.

## Safety contract

Active-hazard language has absolute priority over every other intent. English and French phrases covering sparks, smoke, burning smells, sizzling or buzzing electrical equipment, water near wiring, and an active outage produce an emergency response immediately. The response tells the visitor not to touch equipment and presents a one-tap `tel:5147179277` dispatch action for 514-717-9277. The interface also makes clear that visible fire or smoke requires leaving the area and contacting emergency services.

No response provides repair steps, asks the visitor to inspect energized equipment, or delays the emergency call behind qualification questions.

## Knowledge engine

`lib/knowledge-base.ts` owns all deterministic assistant behavior:

- normalized bilingual phrase matching and language detection;
- emergency, panel/EV, thermography, service-area, quote, licence, and general intents;
- all 50 published city records sourced from `lib/city-routes.ts`;
- verified business facts sourced from `lib/site.ts`;
- localized quick replies, greetings, and response actions.

The route locale controls the initial interface language. A visitor message with clear French or English language signals receives its response in that language; ambiguous input retains the route locale. Since the public default route is French, the product remains French-first.

## Widget experience

`components/ai-assistant.tsx` is a client component mounted once in `PageRenderer`, making it available on every supported French, English, service, and city route. The collapsed launcher includes an initial unread marker. Opening the widget uses the existing dialog primitive, which supplies modal focus containment, focus restoration, and Escape-to-close behavior. A visible close button and an accessible title and description complete the dialog contract.

The chat provides the five requested quick replies, accepts free text, preserves the current conversation while the component remains mounted, exposes a short response-in-progress state, and announces new assistant content through an `aria-live` region. Quote actions link to the localized contact route and `#quote-intake`; when that element is already on the page, the widget closes and scrolls/focuses the intake directly.

The launcher and panel sit at the lower right on desktop. At widths covered by the existing fixed mobile action bar, both move above the bar using safe-area-aware spacing. Dark mode remains the default and light mode reuses the current theme tokens.

## Verified facts and content limits

Assistant content may use only these established claims: Éclipse électrique inc.; RBQ 5582-0096-01; established/licensed since 2008; CMEQ listing; 514-510-1112 office; 514-717-9277 emergency dispatch; and the published Greater Montréal city catalogue. It must not invent reviews, response times, pricing, manufacturer status, inspection certifications, or guaranteed availability.

## Testing and acceptance

The existing Node/Vite server-rendered component suite will cover the rule engine and stable UI output without introducing a browser-test dependency. Tests must demonstrate:

- English and French hazard messages select the emergency branch and exact dispatch link;
- English language intent changes the response language;
- city matching uses the real 50-city catalogue;
- the assistant launcher and an open assistant surface render accessibly;
- visibility state transitions open and close correctly;
- the globally rendered pages contain the widget and localized quote handoff.

The completed change must pass `npm run lint` and `npm test`, including the production build run by the test script. Deployment remains deferred.
