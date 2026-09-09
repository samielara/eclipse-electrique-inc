# Éclipse Électrique Cinematic Motion Design

## Purpose

Modernize the current Éclipse Électrique experience with cinematic motion that communicates electrical energy, technical precision, and dependable service. The experience must remain simple to use, keep emergency actions immediate, and preserve the existing bilingual content, SEO routes, light/dark logos, quote flow, and verified business facts.

## Direction

The visual language is "controlled current": copper and amber light moves through charcoal and slate surfaces in deliberate paths. Motion should feel engineered rather than decorative. Large transitions are reserved for the homepage hero and major section entrances; navigation, forms, and emergency controls use shorter functional feedback.

The existing Manrope and Inter typography, dark-theme default, responsive structure, and owner-approved logos remain the foundation. Figma will document desktop and mobile compositions plus motion states before the code implementation is expanded.

## Experience

### Hero sequence

- Keep useful hero content rendered and readable immediately.
- Animate a restrained copper light sweep through the background grid after first paint.
- Reveal the eyebrow, headline, supporting copy, trust markers, and primary actions in a coordinated sequence.
- Give the logo a brief edge illumination without distorting or redrawing the supplied artwork.
- Use pointer-responsive depth only on devices that support precise pointing, with small movement bounds.
- Stop decorative looping after the opening sequence; the background may retain a very slow ambient drift.

### Navigation and theme

- Transition the sticky header between transparent and solid states without layout movement.
- Use a short directional indicator for active navigation and service menus.
- Crossfade between the light and dark owner-approved logos during theme changes.
- Keep mobile navigation, keyboard focus, and emergency access visually dominant and immediately operable.

### Service storytelling

- Introduce service sections with alternating directional reveals that follow the page flow.
- Give service cards a controlled light-trace response on hover and keyboard focus.
- Transition the service matrix with shared layout motion while preserving stable dimensions.
- Use imagery and gradients as depth layers, never as obstacles to reading or interaction.

### Proof and conversion

- Animate verified numbers once when they enter the viewport.
- Use a single copper border-beam treatment on the principal quote call to action.
- Reveal thermography evidence with a scan-line metaphor that does not imply unverified diagnostic results.
- Animate quote-wizard progress and step changes with clear direction and no loss of entered data.
- Keep assistant and emergency transitions short, deterministic, and independent of decorative timelines.

## Motion system

Use the existing Motion integration and shared tokens. Add named cinematic sequences rather than per-component arbitrary timing:

- Functional response: 120–220 ms.
- Component transition: 240–420 ms.
- Section reveal: 500–750 ms.
- Hero sequence: up to 1,400 ms total.
- Ambient motion: slow, low-amplitude, and compositor-friendly.

Animate opacity and transforms where possible. Avoid scroll-jacking, long blocking transitions, continuous large-area blur, and layout-affecting animation. Each sequence must have a stable initial and final state.

## Accessibility and performance

- `prefers-reduced-motion` removes parallax, scan effects, staggered reveals, and ambient loops while retaining immediate state changes.
- All content and controls remain available without animation or JavaScript timing.
- Focus styles receive the same visual priority as hover states.
- Motion must not obscure emergency information or delay telephone and quote actions.
- Large-screen effects must degrade cleanly on mobile and low-power devices.
- Maintain WCAG AA contrast in both themes and prevent horizontal overflow or layout shift.
- Measure JavaScript, CSS, font, image, and video impact against the current feature branch.

## Figma deliverable

Create a Figma design file named **Éclipse Électrique — Cinematic Experience** containing:

- Desktop homepage at 1440×900.
- Mobile homepage at 390×844.
- Light and dark hero states.
- Service-card hover/focus state.
- Theme transition states.
- Quote-wizard transition states.
- Assistant open and emergency-handoff states.
- Motion annotations for timing, easing, sequence order, and reduced-motion behavior.

The design should reuse the site's actual copy, logos, colors, typography, and component structure. It must not invent business claims or alter verified contact details.

## Implementation boundaries

Implement on `feature/eclipse-experience-upgrade` and update pull request #1. Preserve server-rendered content and the deterministic assistant safety gate. Reuse the existing Motion and Magic UI adaptations; do not add another animation framework.

The user's latest instruction authorizes deployment to the production Vercel URL after implementation and all checks pass. Before production deployment, verify the exact branch, commit, preview, checks, and merge state. Production publication must occur through the repository's existing GitHub/Vercel workflow.

## Validation

- Lint, typecheck, production build, unit tests, and existing Playwright/axe suite pass.
- Add focused browser coverage for final hero state, reduced-motion behavior, theme/logo transition, keyboard service-card focus, and quote/assistant usability.
- Visually inspect French and English at 390×844, 768×1024, and 1440×900 in both themes.
- Confirm no console errors, layout shifts, horizontal overflow, or fixed-control overlap.
- Confirm Vercel preview matches the Figma direction before production merge.
- Confirm the production domain serves the merged commit after deployment.

