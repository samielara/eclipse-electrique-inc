# Task 1 Report — Figma cinematic experience

## Status

Blocked after artifact setup. The required Figma design file was created, but the connected Figma Starter plan reached its MCP tool-call limit before any cinematic composition, state, or annotation could be added.

## Artifact

- File name: `Éclipse Électrique — Cinematic Experience`
- File key: `i09KfDvnO5jnWWpGFPSN79`
- URL: https://www.figma.com/design/i09KfDvnO5jnWWpGFPSN79
- Existing page node: `0:1` (`Page 1`)

## Preparation completed

- Read the authoritative cinematic-motion specification, Task 1 brief, page renderer, theme/header components, site copy, and CSS tokens.
- Confirmed the product uses Manrope for headings and Inter for body content.
- Confirmed the dark-default charcoal/slate/amber/copper direction and owner-supplied light/dark logo assets.
- Checked for Code Connect files: none exist for the needed site components.
- Inspected the new Figma file: no existing screens, instances, local variables, or styles; the available community libraries do not represent the product system.
- Resolved the production representation requirement: the canonical target is `https://eclipse-electrique-inc.vercel.app/`, with both `/fr` and `/en` retained and root redirect behavior preserved.

## Blockers

1. Figma reported: `You've reached the Figma MCP tool call limit on the Starter plan.` A subsequent `whoami` confirmed the only connected plan is Starter.
2. A homepage capture ID was initialized (`003fcc92-1f13-4a4f-a2dc-de949cbef1f9`) but could not be submitted. External capture requires Playwright MCP, which is unavailable. Local capture was not attempted because it requires a temporary source edit and local-server flow.

## Required follow-up after Figma quota access is restored

1. Submit a fresh capture for the current English homepage at 1440×900 and 390×844.
2. Create dark desktop/mobile hero, light hero, service hover/focus, theme transition, quote transition, assistant-open, and emergency-handoff frames.
3. Add the exact timing constraints and reduced-motion annotations from `docs/superpowers/specs/2026-09-09-cinematic-motion-design.md`.
4. Record every created Figma node ID under `## Figma` in `docs/validation/cinematic-motion.md`.
