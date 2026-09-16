# 02: Content model, content module, and its tests

**What to build:** The six Departments exist as typed, validated content, reachable through a single module that the rest of the app will consume. A Maintainer editing a Runbook in the repository gets a build failure when the content is malformed, rather than a broken page in production. ~~This is the app's only test seam.~~ **Revised (2026-09-16):** component tests were added at the product owner's request; see spec.md § Testing Decisions. This module remains the only test seam at the `lib/**/*.test.ts` logic layer.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [x] A Department carries: slug, name, one-line summary, primary Tool, a note about that Tool, intro text, Tint, Motif, icon name, update date, and an ordered list of Steps.
- [x] A Step carries: a required title, a detail, a Phase, and optionally the name of a specific Tool.
- [x] Phase is a label on each Step, not a container. Identifiers are English (`before`, `service`, `closing`, `week`); the labels rendered to Volunteers are Portuguese.
- [x] The `time` and `cadence` fields present in the design's original data are absent from the schema. Arrival-time information is folded into the relevant Department's intro text instead.
- [x] Slugs are written by hand in the content, never derived from the name.
- [x] All six Departments are seeded from the design project's data, in the order Home will display them.
- [x] Content access is exposed as two async functions — all Departments, and one Department by slug — and nothing outside this module reads content directly. They are async on purpose, so a later CMS swap touches no page.
- [x] A test framework is installed and wired to a test script. Pick whatever integrates with the existing toolchain with the least configuration; this is the repository's first test.
- [x] Tests cover, at this seam only: an existing Department returns every required field; an unknown slug is handled the way a route will expect and does not throw unhandled; Department order matches the declared order; Step order within a Department is preserved; a Step with no title or an invalid Phase is rejected; a Department with no Steps is rejected; duplicate slugs across Departments are rejected; every declared Motif exists as an asset and every declared Tint exists in the palette.
- [x] Tests assert behaviour at the module boundary, never internal structure.
- [x] No credential, password, login, token, or personal phone number appears anywhere in the content. Where a Step needs a credential, it says where to obtain it.
