# One theme, dark

OnDeck has a single appearance. There is no light theme, no automatic mode and
no control to switch between them. A reader who finds `color-scheme: dark`
nailed to `:root` and no toggle anywhere will assume the theming was never
built; it was built, shipped, and then removed on purpose.

This supersedes the first section of [ADR 0001](0001-deliberate-divergences-from-the-design-system.md),
which recorded the opposite decision twice over — first following
`prefers-color-scheme`, then adding a three-state toggle on top of it.

## Why it goes

The theme was the most machinery in the app and the least load-bearing part of
it. Three states had to be resolved somewhere no stylesheet could reach, so it
cost a blocking inline script in the document head, a `data-theme` attribute
the server could not render, a second full set of semantic colour tokens, a
transition class deliberately left out of the cascade layers, a module to own
the storage key, another to own the transition, a segmented control on two
screens, a fake `matchMedia` in the test setup, and nineteen tests. None of
that is a feature a volunteer asked for.

What it bought was choice in a room that does not offer one. OnDeck is read
standing in a dim sanctuary, minutes before a service, by someone who needs to
find step 4 and not read an interface. The dark theme is the design system's
first theme and the one every screen was composed in: the six Tints are flat
and saturated precisely because they sit on near-black. The light theme was a
faithful port, but it was never the reason anyone opened the app.

Removing it also removes a whole class of defect that only ever appears for
some readers — a colour that passes contrast on one ground and fails on the
other, a token defined in one block and forgotten in the other. With one
ground there is one thing to look at, and looking at it is enough.

## What it costs

A volunteer who prefers a light interface does not get one, and on a bright
Sunday morning outside the building the screen is harder to read than a light
app would be. That is the trade: the dim room is the usual case and the one the
app is for.

## What this changes in the code

`--accent` and the semantic aliases are declared once, on `:root`, with
`color-scheme: dark` beside them. Nothing in the stylesheet is keyed to a
theme; the only attribute selector left is `[data-tint]`, which is per
Department and has nothing to do with light and dark. The browser's chrome
colour and the manifest both read `GROUND` from `lib/brand.ts`, and
`lib/brand.test.ts` still parses `colors.css` and fails if the two drift.

`viewport.colorScheme` in the root layout tells the browser the page is dark,
so its form controls and chrome match from the first paint — statically
rendered, no script, nothing to flash.

## Revisit if

Volunteers ask for a light mode, or a department starts working outdoors in
daylight. The way back is the same shape as the way out: a second block of
semantic aliases and a resolver before first paint. The Tint palette would
need checking against a paper ground before any of that, which is the part
that was never free.
