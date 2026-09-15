# 07: Focus mode

**What to build:** The execution reading. A new Volunteer performing a role for the first time follows the Runbook one Step per screen, with large text they can read at arm's length in a dark sanctuary, and large controls they can hit one-handed without looking.

**Blocked by:** 05 (Department page in List mode), 06 (Phase filter).

**Status:** ready-for-agent

- [ ] A clear full-width control on the Department page enters Focus mode, and a control inside Focus mode returns to List mode.
- [ ] One Step fills the screen: its number in a filled circular badge, its Phase as an uppercase label, its title as the display heading, and its detail at a size noticeably larger than in List mode.
- [ ] A Step that names its own Tool shows that Tool as a tag.
- [ ] A counter reads "step N of M" and a progress bar reflects the same position.
- [ ] Previous and next controls sit docked at the bottom, sized for one-handed use. Next is the primary action and spans the remaining width.
- [ ] Previous is disabled on the first Step. On the last Step the next control reads as the end of the Runbook rather than offering a dead tap.
- [ ] Below the current Step, a line previews what the next Step is, so the Volunteer can prepare. On the last Step it says the Runbook is over.
- [ ] Focus mode steps only through the Steps of the currently selected Phase. Entering Focus mode with a Phase filter active respects that filter.
- [ ] Nothing is persisted. Focus mode does not remember where the Volunteer stopped, and Home shows no resume affordance. A Runbook is not a checklist and nothing is tickable.
- [ ] Focus mode is page state, not a route. It does not enter the URL.
