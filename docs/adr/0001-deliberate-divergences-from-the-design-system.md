# Deliberate divergences from the design system

The design project is the visual and behavioural reference for OnDeck, and the
code matches it closely enough that a reader comparing the two will assume any
difference is a mistake. Three differences are deliberate.

## Theme follows the system preference, not the clock

**Updated:** a manual toggle was added after this was first written. The
reasoning below stands and the default is unchanged — following the system is
still what a Volunteer gets until they say otherwise. What changed is that
"follow the system" became one of three states rather than the only one. See
the closing note.

The design system states that the app "alterna tema claro/escuro automaticamente
pelo horário". We follow `prefers-color-scheme` instead.

Clock-based switching cannot be server-rendered: the server does not know the
client's local time, so the first paint is a coin flip and every render is a
hydration mismatch. Working around that means shipping a blocking inline script
and accepting a flash. It also overrides the Volunteer's own choice — a person
who keeps their phone in light mode gets a dark app at 19:00 regardless.

The real goal behind the clock rule is not blinding someone during an evening
service. `prefers-color-scheme` delivers that for free, because a person using
their phone at night usually already has the system in dark. It costs no
JavaScript, cannot mismatch, and respects an explicit preference.

The token values are unchanged. Only how the light theme is reached changed —
see the note below for where that landed.

**This happened.** The toggle is a segmented control with three buttons —
automatic, light, dark — so every state is visible and one tap away. Automatic
is the default. A blocking script in the document head resolves the stored
preference, automatic included, to a concrete `data-theme="light"` or `"dark"`
on the root before first paint, keeps it in step if the system changes while
the page is open, and sets the browser's theme-color to match. An explicit
choice therefore wins over the system in both directions, and the stylesheet
writes each theme exactly once, under one selector — automatic never reaches
CSS at all. Without JavaScript the root carries no attribute and the dark
defaults apply.

It layered on without rework, exactly as predicted — the token values did not
change, only the selectors that reach them. It would not have layered on top of
clock-based switching, which had no notion of an explicit choice to respect.

## No progress persistence

The design stores the Volunteer's position in `localStorage` under
`ondeck:resume` and surfaces a "você parou no passo 4 · Continuar" card at the
top of Home. Both are removed.

The stored position never expired. It crossed weeks, so a Volunteer opening the
app in October would be told they stopped at step 4 of a Wednesday in September,
and the card occupied the most valuable space on the screen they open most often
in order to show that. Making it correct means answering when it expires, what
resets it, and what happens when the Runbook changes underneath it — a real
feature, and not one anybody asked for.

**Focus mode is kept**, which is what the resume state existed to serve. The
reading survives; only the memory of it is gone.

**Revisit if** Volunteers report losing their place mid-service. The fix then is
almost certainly same-day expiry, not indefinite memory.

## The `time` and `cadence` fields are not in the schema

The design's data carries `time` on every Step (`-40 min`, `Ter`, `Dom`) and
`cadence` on every Department (`culto` or `semana`). No screen in the design
renders either.

We dropped both, on one rule: data no screen consumes does not enter the model.
A field that exists but is never read is a promise the code does not keep, and
the next person to touch it cannot tell whether it is load-bearing.

`time` carried something genuinely useful — it was the only answer to "what time
do I need to be at church?" — so that information moved into each Department's
intro text, where it is actually read. `cadence` encoded a real distinction
(four Departments happen live on Sunday, two happen on a laptop during the
week), and grouping Home by it was considered and declined: Home is six items
and a flat list, and sectioning six items costs more than it returns.

**Revisit if** Home grows past roughly a dozen Departments, at which point
`cadence` earns its way back as grouping.
