# 12: In-page motion

**What to build:** Moving between Steps in Focus mode has direction — the Step leaves one side and the next arrives from the other — so the Volunteer perceives whether they advanced or went back. Switching between List mode and Focus mode is a transition rather than a jump cut, and every control acknowledges a press.

**Blocked by:** 07 (Focus mode).

**Status:** ready-for-agent

- [ ] Advancing in Focus mode moves the current Step out one side and brings the next in from the other. Going back reverses the direction.
- [ ] Switching between List mode and Focus mode transitions rather than cutting.
- [ ] Pressing a button or a card darkens its fill, per the design system. There is no scale transform on press for buttons; the token for press feedback is respected where it applies.
- [ ] All of this uses the animation library already installed. It is used only for in-page motion; cross-route motion belongs to ticket 11.
- [ ] Durations and easing come from the design system's motion tokens: the three durations, one curve, no bounce, no parallax.
- [ ] The reduced-motion preference is checked explicitly in JavaScript. The design system's tokens zero durations in CSS only, and the animation library does not read those variables, so honouring the preference here is not automatic.
- [ ] With reduced motion requested, Steps change instantly and nothing animates.
- [ ] Home cards do not stagger in on load. This was deliberately excluded: charming once, irritating the hundredth time, and Home is the screen opened every week.
