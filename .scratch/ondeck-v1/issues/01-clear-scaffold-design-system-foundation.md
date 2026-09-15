# 01: Clear scaffold, install design system foundation

**What to build:** The app renders on the OnDeck visual foundation instead of framework defaults. A blank page shows the design system's near-black ground (or its paper ground when the system is in light), in the correct typefaces, with no trace of the create-next-app starter left behind. Nothing else on the page yet — this ticket exists so that every screen built afterwards inherits the right ground instead of fighting defaults.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] The create-next-app demo page, its starter styles, and the starter font wiring are gone. No starter asset remains referenced.
- [ ] The design system's token files (color, typography, spacing, radius, elevation, motion, base) are present as CSS custom properties, with the original values unchanged — not retyped into framework configuration.
- [ ] Tokens are exposed to Tailwind's theme layer so utilities resolve to design system values.
- [ ] Space Grotesk (display), DM Sans (body) and JetBrains Mono (numerals) load through the framework's font pipeline, not a raw stylesheet link. The design system readme's mention of a different typeface family is stale text and must be ignored; the tokens are the truth.
- [ ] The `--text-body` token collision is resolved by renaming one of the two meanings. The design canvas's override workaround must not be replicated. Body font size resolves to a real length.
- [ ] Theme follows `prefers-color-scheme`. The design system ships dark as the default with light behind an attribute selector; this is inverted into a media query with identical values. There is no manual toggle and no switch by clock time.
- [ ] Switching the OS between light and dark changes the rendered ground and text colors with no flash and no hydration warning.
- [ ] Root document language is Brazilian Portuguese.
