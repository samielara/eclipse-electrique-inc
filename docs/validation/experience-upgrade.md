# Experience upgrade validation

## Scope and upstream projects

The feature branch adds Fontsource Manrope headings/navigation and Inter body/forms, shared Motion features, three local Magic UI adaptations, optional guarded AI SDK routing, and Playwright/axe verification. Exact dependency versions are pinned in `package.json` and `package-lock.json`; full upstream repositories are not shipped with the application. Existing owner logos, bilingual content, municipal routes and production hosting are preserved.

Font CSS serves only upright Latin and Latin Extended variable WOFF2 assets. `font-display: optional` prevents a late font swap on a slow first visit; the browser may retain the fallback on that visit. Heading balance and paragraph wrapping improve readability. No numerical CLS score is claimed. Animation is finite and reduced-motion aware; the verified 2008 ticker rolls between identical values.

## Baseline

Baseline commit: `a1b6f40`. Next production build passed while the old configuration ignored TypeScript errors. The original lint script depended on unavailable Bash/WSL; invoking ESLint directly passed. The legacy Vinext test suite passed 25/27 tests, with two stale assertions referring to the superseded logo. Those assertions now target the approved theme assets.

The initial committed lockfile did not support `npm ci`; dependency installation repaired it in this isolated worktree. The original checkout's unrelated lockfile changes were preserved. `npm ci --dry-run --ignore-scripts --no-audit --no-fund --offline` now passes. This validates the lockfile/install plan using cached metadata, not a fresh network download.

## Bundle measurement

`node scripts/measure-bundles.mjs . docs/validation/bundle-after.json` sums individually gzipped files in the production `.next/static` directory. It does not measure a single page's network transfer. The JSON reports retain the complete counts and largest JavaScript chunks.

| Asset | Before gzip bytes | After gzip bytes | Change |
| --- | ---: | ---: | ---: |
| JavaScript | 242,868 | 286,495 | +43,627 (+18.0%) |
| CSS | 35,673 | 36,980 | +1,307 (+3.7%) |
| WOFF2 | 0 | 173,377 | Four new subset files |

WOFF2 files total 173,280 bytes before gzip. Unicode ranges let the browser request only the subsets used by displayed text. The final JS increase was reduced from an initial approximately 83 KB by keeping Zod out of the quote-prefill client module and sharing one Motion feature bundle. Provider SDK imports remain behind the server's deterministic safety and feature gates.

## Checks completed

- `npm run build`: Next.js production build and application TypeScript checking passed.
- `npm run lint`: passed with no warnings or errors.
- `npm test`: legacy Vinext build and 35 tests passed. A nonfatal shared Vite cache rename warning on Windows prompted serializing the Node test files; the subsequent `npm run test:unit` passed all 35 without that warning.
- `npm run test:e2e`: all 57 cases passed, exit 0. French/English, dark/light, all three viewports, axe WCAG AA scans, navigation, persisted themes/logos, wizard state/focus/validation/prefill, assistant fallback, enabled-AI hazard bypass and stalled-request interruption are covered. No browser console errors or horizontal overflow were reported in those journeys.
- The restricted Windows environment could not terminate the local web-server tree during Playwright teardown. Stopping that verified test-server tree with authorized process cleanup let Playwright finish and write its successful report; no test was skipped.
- `git diff --check`: passed.
- Independent review found and resolved pending-request hazard blocking. A regression case verifies immediate emergency handoff and rejection of a late stale model response.

Automated accessibility checks cover the tested surfaces; they are not a complete accessibility certification. Live OpenAI behavior and a real network font-loading CLS measurement were not tested.

## Release boundaries

The assistant stays disabled by default and remains fully deterministic without credentials. No live provider call was used for verification. Its process-local request budget is not an account-wide or distributed limit; see `docs/assistant.md`. Production TypeScript checking now uses `tsconfig.next.json`, separating the retained legacy Cloudflare worker sources from the Next application.

Only the feature branch and automatic Vercel preview are authorized for this release. No production merge or deployment is part of this upgrade.
