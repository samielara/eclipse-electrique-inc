# Execution ledger — Residential subpages

Plan: 2026-10-24-residential-subpages.md. Spec: ../specs/2026-10-24-residential-subpages-design.md.

- Existing isolated eclipse-release worktree reused. User's local-only instruction overrides skill commit/merge/cleanup steps. No commits, push or deployment.
- Shared catalogue feeds routes, pages, overview and menu. Toronto season is selected server-side once and passed into the client header; stable IDs and localized slugs are independent of order.
- Task 1: catalogue/routing test first failed because the module did not exist, then passed with eleven services, four complete orders, Toronto boundary and all 22 routes.
- Task 2: shared page template and metadata/language alternates integrated; all localized pages checked by rendered-route suite. Existing nine images/content entries reused; troubleshooting/inspection use existing electrical-testing.webp.
- Task 3: desktop hover flyout, keyboard control and mobile disclosure integrated. Mobile browser navigation and route-close behavior passed. Initial desktop browser test exposed menu closure during Escape/hover transition; reopening now explicitly enters the parent menu before its child.
- Ruling: short desktop windows (height ≤650px) use the same Residential links expanded inline in a constrained scrollable Services panel. This preserves reachability instead of clipping a side flyout; cost is that small-window desktop users see an accordion-like list rather than a side panel.
- Independent review identified Escape interception while already closed and loss of scrolling on short desktop windows. Escape now intercepts only when open; short-window layout has constrained scrolling. Regression interaction tests added.
- Final verification: 41/41 full automated tests passed; 8/8 desktop/mobile browser tests passed, including all 22 pages, metadata alternates, Escape and short-window access. Production Next.js and alternate vinext builds passed. git diff --check passed.
- Tasks 1–4 complete. Independent review fixes verified by browser regressions; no remaining significant findings. Existing homepage removals and unrelated service categories preserved. Local preview remains on port 5175; no commit/push/deployment performed.
