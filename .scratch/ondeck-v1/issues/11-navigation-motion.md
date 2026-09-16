# 11: Navigation motion

**What to build:** Navigation reads as one object moving rather than two screens swapping. Tapping a Department card, the card grows into the Department page's opening block; going back, it shrinks home. The Volunteer perceives continuity and knows they opened the thing they tapped.

**Blocked by:** 05 (Department page in List mode).

**Status:** resolved

- [x] The Department card on Home and the opening block on the Department page are paired as the same element, so navigating between them animates position and size rather than cross-fading two separate things. Both are flat blocks in the same Tint, which is what makes the pairing read.
- [x] The reverse plays on navigating back.
- [x] Pages enter with a short fade plus a small upward movement, matching the motion already described by the design.
- [x] This uses React's view transitions, which work in the App Router with no configuration. The animation library is not used for cross-route motion: a cross-route morph needs both elements alive in the same tree at once, which never happens during an App Router navigation, and forcing it would cost the static architecture.
- [x] Durations and easing come from the design system's motion tokens. No bounce, no parallax, no overshoot.
- [x] Motion tokens already zero their durations under `prefers-reduced-motion`, so this ticket's CSS-driven motion is covered without extra work. Verify it.
- [x] Verify against a production build, not the dev server.
- [x] Where a browser lacks support, navigation still works and simply does not animate.
