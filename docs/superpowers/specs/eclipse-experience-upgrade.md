Paste this after the currently running build finishes. It follows the official Codex structure of goal, context, constraints, and completion criteria. [OpenAI Codex guidance](https://learn.chatgpt.com/guides/best-practices)

Act as the Principal Frontend Architect, UX/CRO Lead, AI Integration Engineer, and QA owner for the currently opened Éclipse électrique repository.

# Goal

Complete a production-quality UI, animation, typography, AI-assistant, and automated-testing upgrade using these repositories:

* Motion: [https://github.com/motiondivision/motion](https://github.com/motiondivision/motion)
* Magic UI: [https://github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui)
* Vercel AI SDK: [https://github.com/vercel/ai](https://github.com/vercel/ai)
* Fontsource: [https://github.com/fontsource/fontsource](https://github.com/fontsource/fontsource)
* Playwright: [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
* axe-core: [https://github.com/dequelabs/axe-core](https://github.com/dequelabs/axe-core)

Work autonomously until the implementation, validation, Git commit, branch push, and preview preparation are complete. Do not stop for routine questions. Infer safe implementation details from the repository and existing architecture.

Only stop if credentials, an API key, a destructive operation, or an irreversible production action is required. A missing API key must not block the rest of the work.

# Existing project requirements

Preserve the current:

* Next.js/React architecture and package manager
* Tailwind 4 design-token system
* Shadcn, Radix, Base UI and Lucide components
* Dark-theme default and light-theme toggle
* French and English routes
* Sticky responsive header
* Business logos and current logo-theme behavior
* Background-video hero
* Service matrix and dedicated service pages
* 50 municipal SEO pages
* Quote-intake wizard
* Thermography module
* JSON-LD structured data
* Mobile emergency action bar
* Existing deterministic 24/7 assistant safety behavior
* Verified business information and contact details

Do not reinstall or replace Shadcn, Radix, Tailwind or Lucide.

Do not invent reviews, certifications, manufacturer relationships, response times, warranties, project totals or business claims.

# Autonomy and source-control rules

1. Allow any command currently running to finish.
2. Inspect `AGENTS.md`, repository instructions, `package.json`, lockfile, Git status, current branch, existing changes, hosting configuration, build scripts and current tests.
3. Preserve all existing user changes.
4. If the current logo changes are uncommitted, validate and commit them separately before beginning this upgrade.
5. Create an isolated branch or worktree named `feature/eclipse-experience-upgrade`.
6. Use subagents when available for independent compatibility research, UI implementation, AI integration and testing, while keeping one agent responsible for final integration.
7. Never merge into the production branch.
8. Push the completed feature branch if Git authentication is available.
9. A Vercel preview deployment may run through the repository’s existing automatic preview workflow. Do not trigger or approve a production deployment.
10. If pushing is blocked by authentication, leave a clean local commit and report the exact remaining command.

# Phase 1: Establish a baseline

Before changing dependencies:

* Run the existing lint, tests and production build.
* Record the current build status and significant client-bundle sizes.
* Identify existing animation utilities and avoid duplication.
* Confirm whether the runtime is Vercel, Cloudflare Workers or another environment.
* Verify current compatible package versions from official documentation before installing them.

# Phase 2: Typography

Integrate self-hosted variable fonts through Fontsource:

* Manrope Variable for headings, navigation and prominent conversion copy
* Inter Variable for paragraphs, forms and utility content
* Load only required Latin/Latin Extended assets and useful weights.
* Preserve French accented characters.
* Define fonts through the existing global design tokens.
* Prevent cumulative layout shift and flashes caused by font loading.
* Maintain readable line height, spacing and WCAG AA contrast in both themes.
* Use no more than these two font families.

# Phase 3: Motion system

Install the compatible `motion` package and use `motion/react`.

Create a small reusable motion-token layer with consistent durations, easing and reduced-motion behavior. Prefer `LazyMotion` or the current recommended tree-shakable approach when compatible.

Apply restrained motion to:

* Homepage hero copy and trust badges
* Header state changes
* Service-matrix tab transitions
* Service and city cards
* Thermography proof cards
* Quote-wizard progress and step changes
* AI-assistant opening and closing
* Important CTA hover, focus and press states

Requirements:

* Honor `prefers-reduced-motion`.
* Keep all SEO content server-rendered and immediately available.
* Do not create layout shifts.
* Do not animate every element.
* Avoid autoplay effects that distract from emergency and quote actions.
* Preserve keyboard and touch behavior.

# Phase 4: Selected Magic UI components

Do not clone or install the entire Magic UI repository.

Copy and adapt only:

* Animated Grid Pattern
* Border Beam
* Number Ticker

Store the source in a clearly named local component directory and include any required MIT attribution.

Use them as follows:

* Subtle copper electrical-grid atmosphere in the hero
* Border Beam on one high-value quote or thermography CTA
* Number Ticker for the “Depuis 2008 / Since 2008” proof point

Restyle everything using the existing Éclipse charcoal, slate, copper and amber tokens. Avoid neon, excessive particles, generic SaaS visuals and animation overload.

# Phase 5: AI SDK integration

Install compatible versions of:

* `ai`
* `@ai-sdk/react`
* `@ai-sdk/openai`

Upgrade the existing assistant behind a feature flag and server-side route.

Architecture:

1. The existing deterministic hazard detector runs before every model request.
2. Hazard detection must never depend on an LLM.
3. Active hazards immediately show the verified emergency instructions and `tel:5147179277`.
4. The AI layer must never diagnose electrical faults, instruct users to touch equipment or override emergency guidance.
5. Keep secrets exclusively in server-side environment variables.
6. Sanitize and validate inputs with the existing Zod dependency.
7. Add rate limiting, input-length limits, timeouts and graceful errors.
8. Preserve the complete rule-based assistant whenever the AI feature is disabled, unavailable or missing credentials.

Implement typed tools for:

* `checkServiceArea`
* `matchElectricalService`
* `prefillQuote`
* `emergencyHandoff`

The assistant should:

* Detect French and English
* Answer only from verified Éclipse business facts and site content
* Recommend relevant service pages
* Check the existing 50-city coverage dataset
* Transfer qualified information into the quote wizard
* Avoid unsupported pricing or availability promises

Create `.env.example` entries without secrets. If `OPENAI_API_KEY` is unavailable, finish and test the fallback implementation without blocking.

Do not add OpenAI Agents SDK during this pass unless repository/runtime verification proves it is necessary and fully supported. Prefer one controlled orchestrator with typed tools over unnecessary autonomous agents.

# Phase 6: Automated quality checks

Install and configure Playwright and `@axe-core/playwright` as development dependencies.

Add meaningful end-to-end coverage for:

* French and English navigation
* Dark/light theme persistence
* Desktop hover dropdowns
* Mobile menu behavior
* Service-matrix switching
* Quote-wizard forward/back state retention and validation
* City-selection behavior
* Emergency assistant detection
* Direct emergency telephone link
* AI-disabled fallback behavior
* Keyboard navigation and focus handling

Test representative viewports:

* Mobile: 390×844
* Tablet: 768×1024
* Desktop: 1440×900

Check both themes and both languages. Check for browser console errors, horizontal overflow, overlapping fixed controls, missing focus indicators and accessibility violations.

Do not rewrite large implementation-specific snapshot tests.

# Completion criteria

The task is complete only when:

* Existing behavior is preserved.
* New visual effects match the Éclipse brand.
* French and English routes work.
* Dark and light modes work.
* Reduced-motion mode works.
* Emergency behavior remains deterministic.
* No API secret exists in source control.
* Lint passes.
* Unit tests pass.
* Production build passes.
* Playwright smoke tests pass.
* axe checks pass or any unavoidable limitation is documented.
* Bundle-size changes are measured and unreasonable increases are corrected.
* `git diff --check` passes.
* The final diff receives a focused self-review for regressions, security, accessibility, performance and unsupported business claims.

Create logical commits with clear messages. Push `feature/eclipse-experience-upgrade` and create a pull request when authenticated. Allow only a preview deployment; do not merge or deploy to production.

Return one concise final report containing:

* Completed features
* Branch name
* Commit IDs
* Pull-request or preview URL, if created
* Lint, test, build, Playwright and accessibility results
* Before/after bundle impact
* Required environment-variable names
* Any genuine blocker requiring my action
