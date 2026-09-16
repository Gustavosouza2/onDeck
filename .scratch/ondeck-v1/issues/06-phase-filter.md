# 06: Phase filter

> **Won't fix — removed 2026-09-15** by product decision. The Phase filter was built and then removed: the chip row cost a line and a decision on a screen whose job is to be scanned. Phase survives as headings that group the Runbook in List mode, with no control to operate. Criteria are unchecked because none describe the shipped app.

**What to build:** A Volunteer who only needs part of the Runbook — say, only what happens before the service starts — can narrow the list to that Phase and get back to the whole thing in one tap.

**Blocked by:** 05 (Department page in List mode).

**Status:** wontfix

- ~~A row of pill chips sits above the Steps, offering "all" plus each Phase actually present in that Department's Runbook. Phases with no Steps never appear.~~ **Removed (2026-09-15):** the Phase filter was built and then removed; see the note above.
- ~~Selecting a Phase narrows the visible Steps to that Phase. Selecting "all" restores the entire Runbook.~~ **Removed (2026-09-15):** no filter control exists; List mode always shows the whole Runbook, grouped by Phase heading.
- ~~Step numbers continue to identify each Step consistently, so a Volunteer discussing "step 7" with someone means the same Step whether or not a filter is active.~~ **Removed (2026-09-15):** moot with no filter; Step numbering is still consistent (see ticket 05).
- ~~When a Department's Steps all share one Phase, the chip row does not render at all.~~ **Removed (2026-09-15):** no chip row exists.
- ~~Chips are hairline when inactive and a solid fill when active, per the design system's chip rules.~~ **Removed (2026-09-15):** no chips exist.
- ~~On narrow screens the chip row scrolls horizontally without a visible scrollbar and without ever scrolling the page body sideways.~~ **Removed (2026-09-15):** no chip row exists.
- ~~Filter state lives in the page and does not enter the URL.~~ **Removed (2026-09-15):** no filter state exists.
- ~~Changing the filter does not animate the Step list. This was deliberately excluded: the Volunteer filtered in order to read, and animation delays reading.~~ **Removed (2026-09-15):** no filter exists to animate around.
