# 07: Focus mode

> **Revised 2026-09-15**: the Phase filter this ticket depended on was removed.

**What to build:** The execution reading. A new Volunteer performing a role for the first time follows the Runbook one Step per screen, with large text they can read at arm's length in a dark sanctuary, and large controls they can hit one-handed without looking.

**Blocked by:** 05 (Department page in List mode). The dependency on 06 lapsed when the filter was removed.

**Status:** resolved

- [x] A clear full-width control on the Department page enters Focus mode, and a control inside Focus mode returns to List mode.
- ~~One Step fills the screen: its number in a filled circular badge, its Phase as an uppercase label, its title as the display heading, and its detail at a size noticeably larger than in List mode.~~ **Removed (2026-09-15):** same, except the Phase is a sentence-case label and List mode no longer shows detail at all, so Focus mode is where a Step's detail lives.
- [x] One Step fills the screen: its number in a filled circular badge, its Phase as a label, its title as the display heading, and its detail — the only place the detail is shown.
- [x] A Step that names its own Tool shows that Tool as a tag.
- [x] A counter reads "step N of M" and a progress bar reflects the same position.
- [x] Previous and next controls sit docked at the bottom, sized for one-handed use. Next is the primary action and spans the remaining width.
- [x] Previous is disabled on the first Step. On the last Step the next control reads as the end of the Runbook rather than offering a dead tap.
- [x] Below the current Step, a line previews what the next Step is, so the Volunteer can prepare. On the last Step it says the Runbook is over.
- ~~Focus mode steps only through the Steps of the currently selected Phase. Entering Focus mode with a Phase filter active respects that filter.~~ **Removed (2026-09-15):** the Phase filter was removed (ticket 06), so Focus mode steps through the whole Runbook.
- [x] Nothing is persisted. Focus mode does not remember where the Volunteer stopped, and Home shows no resume affordance. A Runbook is not a checklist and nothing is tickable.
- [x] Focus mode is page state, not a route. It does not enter the URL.
