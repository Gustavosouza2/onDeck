# 04: Tracer bullet — Home to Department page

**What to build:** The narrowest complete path through the app. A Volunteer opens the app, sees the six Departments as cards, taps theirs, lands on that Department's page, reads its Steps in order, and goes back. Everything is prerendered at build time. The Department page is intentionally plain here — this ticket proves the whole path works end to end; ticket 05 dresses it.

**Blocked by:** 01 (design system foundation), 02 (content module).

**Status:** resolved

- [x] Home lists all six Departments as cards in a single flat list. There is no grouping, no filter, and no section headers — this was evaluated and declined.
- [x] Each card is filled with its Department's Tint, with its Motif in the bottom-right of the card in normal flow — never over the name, summary or Step count — and dark text on the accent. Accent is a fill; it is never thin text on the near-black ground. *(Revised 2026-09-15: the Motif originally bled from the corner and overlapped the Step count.)*
- [x] Each card shows the Department name, its one-line summary, its primary Tool, and how many Steps the Runbook has.
- [x] The whole card is the tap target, not a small control inside it. Tap targets never fall below the design system's minimum.
- [x] Tapping a card navigates to that Department's page under a `departamentos` namespace with the Department's slug.
- [x] Department pages are statically prerendered by enumerating slugs at build time, and slugs outside that list are refused, so an unknown slug is a build-time 404 rather than a runtime error. There is no revalidation and no per-request rendering.
- [x] The Department page shows the Department name and its Steps numbered in order, as an ordered list in the markup so screen reader structural navigation works.
- [x] A control returns the Volunteer to Home without relying on the browser's back button.
- [x] The Motif assets already present in the repository are used; they are decorative and hidden from assistive technology.
- [x] Content reaches both pages only through the content module's async functions.
