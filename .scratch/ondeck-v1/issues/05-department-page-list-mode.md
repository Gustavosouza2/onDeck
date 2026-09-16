# 05: Department page in List mode

> **Revised 2026-09-15** by product decision during implementation. Criteria that no longer describe the shipped page are struck through and unchecked, with what replaced them.

**What to build:** The Department page becomes the reference reading a Volunteer actually uses: what this role is for, which Tool to open and where it lives, the full Runbook in order, what to do when stuck, and when it was last updated. This replaces the plain page from ticket 04.

**Blocked by:** 04 (tracer bullet).

**Status:** resolved

- [x] A bar at the top carries the Department name, its Tool as a subtitle, and the control back to Home. It stays available while scrolling.
- ~~An opening block filled with the Department's Tint carries an uppercase eyebrow with the Tool's icon and name, the Department name as the display title, and the intro paragraph. Text on the Tint is the dark ink color.~~ **Removed (2026-09-15):** the Tint block carries the Department name and a "Ferramenta principal" field (Tool icon, name and note), with the intro collapsed behind "Sobre o departamento". No eyebrow.
- ~~A callout gives the Tool's name prominently plus the note about where it lives and how to reach it, so the Volunteer doesn't have to work out which machine or which profile.~~ **Removed (2026-09-15):** merged into the Tint block above; the separate callout component was deleted.
- ~~Steps render as a numbered list under a section heading. Each Step shows its number, its short imperative title, and its detail.~~ **Removed (2026-09-15):** List mode shows each Step's number and title only, grouped under Phase headings. The detail is shown in Focus mode.
- [x] Steps render as numbered lists grouped by Phase, one ordered list per Phase starting at the Step's real number, each labelled by its Phase heading. Each Step shows its number and title.
- [x] A Step that names its own Tool shows that Tool's name as a tag.
- [x] A closing block tells the Volunteer what to do if they get stuck — reach the media lead rather than improvise.
- ~~The Department's update date appears once, at the foot of the page, in the faint text color. It is the date declared by hand in the content, never derived from version control: fixing a comma must not signal a change that didn't happen.~~ **Removed (2026-09-15):** the date sits beside the Runbook's own section heading, "Atualizado em …". Still hand-declared, still faint text.
- [x] Depth comes from surface steps and hairline borders, never shadow. Cards use the design system's card radius; anything actionable is a pill.
- ~~All copy is Brazilian Portuguese, in the design system's register: second person, friendly imperative, sentence case, uppercase only in section eyebrows, no emoji.~~ **Removed (2026-09-15):** section and Phase labels are sentence case, not uppercase; uppercase survives only in the Home, card and onboarding eyebrows.
- [x] All copy is Brazilian Portuguese, in the design system's register: second person, friendly imperative, sentence case, no emoji.
