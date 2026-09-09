# Upgrade typography, motion, assistant safety and browser QA

The current site has owner-approved theme logos and complete bilingual content, but its typography uses system fonts, interactions lack a shared motion policy, and the assistant cannot optionally use bounded model routing. This change self-hosts Manrope for headings/navigation and Inter for body/forms, adds restrained reduced-motion-aware effects, and introduces optional server-side AI routing while preserving the complete deterministic assistant whenever routing is disabled or unavailable.

Emergency messages remain local and deterministic. They bypass model calls, interrupt an ordinary pending request, expose the verified `tel:5147179277` handoff, and reject late stale model responses. Model output is limited to typed routing tools backed by the existing services, municipality catalogue and quote schema. The feature is disabled by default and requires `ECLIPSE_AI_ENABLED=true` plus a server-only `OPENAI_API_KEY`.

The visual layer uses four Fontsource Latin/Latin Extended variable font subsets, one shared Motion feature provider, and local adaptations of Magic UI's Animated Grid Pattern, Border Beam and Number Ticker with complete license notices. Existing SSR content, dark default, light/dark logo switching, 50 municipal pages, quote wizard, thermography module, structured data and mobile emergency controls remain intact.

## Validation

- `npm run lint` — passed
- `npm run typecheck` — passed
- `npm run build` — passed with application TypeScript checking enabled
- `npm test` — Vinext build passed; 35/35 tests passed
- `npm run test:e2e` — 57/57 Playwright and axe cases passed at 390×844, 768×1024 and 1440×900 across French/English and dark/light themes
- `npm ci --dry-run --ignore-scripts --no-audit --no-fund --offline` — passed
- `git diff --check main...HEAD` — passed
- credential-pattern scan — no match

The production static bundle totals changed from 242,868 to 286,495 gzip bytes for JavaScript (+43,627, 18.0%) and from 35,673 to 36,980 gzip bytes for CSS (+1,307, 3.7%). Four self-hosted subset font files total 173,377 gzip bytes; browser unicode ranges limit which subsets are requested. These figures sum individual `.next/static` files and are not a single-route transfer measurement.

No live OpenAI provider request was tested. The documented in-process request budget is not a distributed account-wide rate limit. This PR is intended for a Vercel preview and review; it does not authorize a production merge or deployment.
