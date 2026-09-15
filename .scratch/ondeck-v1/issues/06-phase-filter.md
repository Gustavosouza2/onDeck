# 06: Phase filter

**What to build:** A Volunteer who only needs part of the Runbook — say, only what happens before the service starts — can narrow the list to that Phase and get back to the whole thing in one tap.

**Blocked by:** 05 (Department page in List mode).

**Status:** ready-for-agent

- [ ] A row of pill chips sits above the Steps, offering "all" plus each Phase actually present in that Department's Runbook. Phases with no Steps never appear.
- [ ] Selecting a Phase narrows the visible Steps to that Phase. Selecting "all" restores the entire Runbook.
- [ ] Step numbers continue to identify each Step consistently, so a Volunteer discussing "step 7" with someone means the same Step whether or not a filter is active.
- [ ] When a Department's Steps all share one Phase, the chip row does not render at all.
- [ ] Chips are hairline when inactive and a solid fill when active, per the design system's chip rules.
- [ ] On narrow screens the chip row scrolls horizontally without a visible scrollbar and without ever scrolling the page body sideways.
- [ ] Filter state lives in the page and does not enter the URL.
- [ ] Changing the filter does not animate the Step list. This was deliberately excluded: the Volunteer filtered in order to read, and animation delays reading.
