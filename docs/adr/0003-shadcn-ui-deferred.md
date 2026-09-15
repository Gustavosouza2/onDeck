# shadcn/ui deferred

V1 hand-writes its ten components against the design system's tokens rather
than generating them with shadcn/ui, despite shadcn being the default reach in
a Next plus Tailwind project and despite it being explicitly considered.

shadcn arrives with its own token vocabulary — `--background`, `--foreground`,
`--primary`, `--muted`, `--radius`. OnDeck already has one: `--bg-app`,
`--surface-card`, `--accent`, `--ink`, `--radius-card` at 24px and
`--radius-control` at 999px. Adopting shadcn means either maintaining a
translation between the two forever, or letting the generated components drift
from the design.

The mismatch is not only naming. The design system's most specific rule is that
accent is never thin text on near-black — accent is a fill, and text on it is
`--ink`. shadcn's Button is `bg-primary text-primary-foreground`, and OnDeck's
six variants (lilac fill, citron fill, outline, accent outline, underlined
text, neutral ghost) plus a pressed state that darkens the fill without a
transform would overwrite `buttonVariants` in full. At that point the generated
file is a worse starting point than an empty one.

What shadcn genuinely buys is Radix: focus management, keyboard interaction,
and ARIA wiring for components where those are hard. V1 has no dialog, no
dropdown, no select, no popover, no combobox and no tooltip. It has buttons,
chips, tags and lists — markup where the accessible version is the obvious one.
We would pay the integration cost and collect none of the benefit.

This is not a rejection. shadcn is copy-paste per component, not a framework you
adopt wholesale, so nothing here forecloses it.

**Revisit when** the first component that genuinely needs Radix appears — a
bottom sheet, a confirmation dialog, a menu. Run `npx shadcn add` for that one
component, map its tokens to ours at that boundary, and leave the rest alone.
