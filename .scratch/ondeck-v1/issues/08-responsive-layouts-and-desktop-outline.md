# 08: Responsive layouts and desktop outline

**What to build:** The app stops being a narrow phone column stranded in the middle of a large screen. On a tablet or a laptop the Departments lay out in a grid, the Department page uses the extra width, and a sticky outline lets the reader jump straight to a Step instead of scrolling.

**Blocked by:** 05 (Department page in List mode).

**Status:** ready-for-agent

- [ ] Home lays out one card per row on phones, two columns on tablets, three on desktop, with the gutter and gap widening at each step.
- [ ] Content is capped at a readable maximum width and centred, with the cap growing from phone to tablet to desktop rather than stretching edge to edge.
- [ ] The Department page's opening block and Step list use the larger display sizes on desktop.
- [ ] On desktop the Department page becomes two columns: the Runbook in the main column, and a sticky outline in a narrower side column that stays in view while scrolling.
- [ ] The outline lists every Step by number and title. Activating an entry takes the reader to that Step.
- [ ] The outline does not render on phone or tablet, where there is no room for it.
- [ ] No layout scrolls the page body horizontally at any width. Anything that must overflow scrolls inside its own container.
- [ ] Tap and click targets stay at or above the design system's minimum at every breakpoint.
