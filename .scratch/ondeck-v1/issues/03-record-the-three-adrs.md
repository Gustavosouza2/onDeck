# 03: Record the three ADRs

**What to build:** Three architecture decision records, so that a future reader comparing the design project against the code understands the divergences were deliberate rather than mistakes. Each states the context, the decision, the alternatives considered, and what would trigger revisiting it.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] ADR on deliberate divergences from the design system, covering three changes: theme by system preference instead of clock time (the design system asks for clock-based switching; under server rendering that guarantees a hydration mismatch and overrides the person's explicit preference); removal of progress persistence and the "resume where you left off" card (state never expired, crossed weeks, and occupied Home's most valuable space with stale information); removal of the `time` and `cadence` fields (no screen consumed them).
- [ ] ADR on shipping an installable PWA with no service worker and no offline support. Covers why the silent failure mode of a stale cache is worse than the loud failure of not opening without a network, why the framework's experimental connectivity-detection feature does not solve it, and what would trigger adding one.
- [ ] ADR on deferring `shadcn/ui`. Covers the two-token-vocabulary cost, the fact that none of V1's components need Radix's accessibility machinery, and the trigger for reaching for it: the first component that genuinely does.
- [ ] Each ADR uses the glossary's vocabulary and avoids the terms marked to avoid.
- [ ] ADRs are numbered and live at the repo root's decision record directory, per the single-context layout.
