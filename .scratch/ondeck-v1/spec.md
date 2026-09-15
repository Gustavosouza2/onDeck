# OnDeck V1 — media team guide

Status: ready-for-agent

## Problem Statement

A church's media team runs six distinct technical roles during and around a service: projection, livestream, photos and stories, secondary camera, banner design, and videos. Each demands a specific sequence of actions, in a specific tool, in an order that matters.

Today that knowledge is oral. It lives in the heads of people who have done it before, and it is transmitted over WhatsApp and over someone's shoulder, minutes before the service starts. This breaks in two predictable moments:

1. **Someone new joins the team.** They need a human shadowing them every service until they memorise it, and the person shadowing is exactly who should be operating another role.
2. **Someone has to cover a Department that isn't theirs.** The projection operator is out on Sunday, and whoever takes over has never opened OpenLP. The knowledge exists, but it is not reachable at the moment it is needed.

That moment is hostile: the Volunteer is in the sanctuary, in low light, holding the phone in one hand, under time pressure, possibly nervous. Anything requiring a login, a search, or deep navigation fails in exactly that situation.

## Solution

An internal guide app, installable to the phone's home screen, with no login. The Volunteer opens it, sees the six Departments as cards, taps theirs, and reads the Runbook from start to finish.

Each Department offers two readings, because there are two distinct uses:

- **List mode** — the whole Runbook on one page, filtered by Phase. The reference reading: "which step was it where I set up the audio?"
- **Focus mode** — one Step per screen, with previous and next. The execution reading: a new Volunteer following the Runbook live, one action at a time.

Content lives in the repository, edited by the Maintainer. The app is entirely static: every page is prerendered at build time and served from the CDN.

## User Stories

### Discovery and entry

1. As a new Volunteer, I want to open the app for the first time and see a welcome screen explaining what OnDeck is, so that I understand where I am before being dropped into a list of options.
2. As a new Volunteer, I want the welcome screen to tell me no login is needed, so that I don't go looking for an account that doesn't exist.
3. As a new Volunteer, I want the welcome screen to tell me who to ask when I'm stuck, so that I have a human fallback when the app isn't enough.
4. As a returning Volunteer, I want the welcome screen to stop appearing after my first visit, so that I land straight on the list of Departments.
5. As a Volunteer, I want to install OnDeck to my phone's home screen, so that I open it like any other app without typing a URL.
6. As a Volunteer, I want the installed app to open full screen with no browser chrome, so that reading uses the whole phone screen.

### Home

7. As a Volunteer, I want to see the six Departments as cards in a single flat list, so that I find mine without filtering or searching.
8. As a Volunteer, I want each card to show the Department name, so that I spot mine at a glance.
9. As a Volunteer, I want each card to show a one-line summary of what that Department does, so that I confirm it's the right one before opening it.
10. As a Volunteer, I want each card to show the Department's primary Tool, so that I already know what I'll be operating.
11. As a Volunteer, I want each card to show how many Steps the Runbook has, so that I gauge its size before entering.
12. As a Volunteer, I want each Department to have its own Tint and Motif, so that I recognise mine visually instead of reading every week.
13. As a Volunteer, I want tapping anywhere on the card to open the Department, so that I don't have to aim at a small target one-handed.

### Department page — List mode

14. As a Volunteer, I want the Department name prominent on open, so that I confirm I'm in the right place.
15. As a Volunteer, I want a short paragraph explaining the purpose of the role, so that I understand the goal before executing Steps.
16. As a Volunteer, I want to see which Tool the Department uses, prominently, so that I know what to open.
17. As a Volunteer, I want a note about where the Tool lives and how to reach it, so that I don't waste time working out which machine or which profile.
18. As a Volunteer, I want every Step numbered and in order on a single page, so that I can scroll and locate a specific Step quickly.
19. As a Volunteer, I want each Step to have a short imperative title and an explanatory detail, so that I grasp the action without reading a paragraph.
20. As a Volunteer, I want a Step involving a specific Tool to show that Tool's name highlighted, so that I know where to perform the action.
21. As a Volunteer, I want to filter Steps by Phase, so that I see only the portion of the Runbook that matters right now.
22. As a Volunteer, I want the filter to include an "all" option showing the entire Runbook, so that I return to the full view in one tap.
23. As a Volunteer in a Department with only one Phase, I want the filter not to appear at all, so that the screen doesn't show a useless control.
24. As a Volunteer, I want to read at the end of the page what to do if I get stuck, so that I have an out instead of improvising.
25. As a Volunteer, I want to see when the Runbook was last updated, so that I know whether I'm following current information.
26. As a Volunteer, I want to return to Home in one tap, so that I switch Departments without the browser's back button.
27. As a Volunteer on desktop or a large tablet, I want a sticky outline of the Steps in a side column, so that I jump to a Step without scrolling the whole page.
28. As a Volunteer on desktop, I want clicking an outline entry to take me to that Step, so that navigation is direct.

### Department page — Focus mode

29. As a new Volunteer executing for the first time, I want a mode showing one Step at a time, so that I don't lose my place in a long list while holding the phone.
30. As a Volunteer, I want to enter Focus mode from a clear button on the Department page, so that I choose this reading when it's useful.
31. As a Volunteer in Focus mode, I want the current Step number prominent, so that I know where I am.
32. As a Volunteer in Focus mode, I want to see the current Step's Phase, so that I have the context of the moment in the service.
33. As a Volunteer in Focus mode, I want the Step text larger than in List mode, so that I read it at arm's length, in low light, without bringing the phone closer.
34. As a Volunteer in Focus mode, I want a progress bar and a "step N of M" counter, so that I know how much is left.
35. As a Volunteer in Focus mode, I want to advance with a large button, so that I hit it without looking.
36. As a Volunteer in Focus mode, I want to go back to the previous Step, so that I re-read something I skimmed.
37. As a Volunteer on the first Step, I want the "previous" control disabled, so that I'm not confused by a button that does nothing.
38. As a Volunteer on the last Step, I want a clear indication that the Runbook is over, so that I know I'm done.
39. As a Volunteer in Focus mode, I want to see what the next Step is before advancing, so that I can prepare for the next action.
40. As a Volunteer in Focus mode, I want to return to List mode at any point, so that I recover the overview when I need it.
41. As a Volunteer who filtered by Phase and then entered Focus mode, I want to step only through that Phase's Steps, so that Focus mode respects the filter I chose.

### Reading and accessibility

42. As a Volunteer using my phone in a dark sanctuary, I want the app to use a dark theme when my phone is dark, so that I'm not blinded.
43. As a Volunteer whose phone is in a light theme, I want the app to be light, so that it respects my system preference.
44. As a Volunteer, I want every tap target large enough to hit one-handed, so that I use the app while holding something else.
45. As a Volunteer on a tablet, I want the content to use the screen width better, so that it isn't a narrow column in an empty field.
46. As a Volunteer on desktop, I want the content centred and readable, so that reading works even though it isn't the main case.
47. As a Volunteer who disabled animations system-wide, I want the app to respect that, so that motion doesn't get in my way.
48. As a Volunteer using a screen reader, I want the Steps to be a genuine ordered list, so that structural navigation works.

### Motion

49. As a Volunteer, I want the Department card to grow into the top of the Department page when tapped, so that I perceive continuity and understand I'm looking at the same object.
50. As a Volunteer, I want going back to reverse that transition, so that navigation makes spatial sense.
51. As a Volunteer, I want pages to enter with a short, restrained movement, so that the app feels solid without making me wait.
52. As a Volunteer, I want changing Step in Focus mode to have direction (out one side, in the other), so that I perceive whether I advanced or went back.
53. As a Volunteer, I want immediate visual feedback when pressing buttons and cards, so that I know the tap registered.

### Maintainer

54. As the Maintainer, I want to edit Department content in a file in the repository, so that I depend on no admin panel and no external service.
55. As the Maintainer, I want content to be typed, so that a malformed Step breaks the build rather than production.
56. As the Maintainer, I want the build to fail if a Department has a duplicate slug or no Steps, so that the error surfaces before deploy.
57. As the Maintainer, I want content history to live in git, so that I can see what changed without building versioning into the app.
58. As the Maintainer, I want to declare each Department's update date by hand, so that fixing a comma doesn't signal a change that didn't happen.
59. As the Maintainer, I want all content access to go through a single module, so that swapping the repository for a CMS later doesn't touch any page.
60. As the Maintainer, I want the app excluded from search engine indexing, so that internal content doesn't surface on Google.
61. As the Maintainer, I want deploys to happen on every push, so that shipping a correction is a commit.

## Implementation Decisions

### Origin and prior decisions

The design is settled and lives in a Claude Design project (`OnDeck - Telas e Fluxos.dc.html`, `OnDeckApp.dc.html`, `ondeck-data.js`, and a design system with CSS tokens). The design's screens are the visual and behavioural reference; deliberate divergences are recorded below and in the ADRs.

The `CONTEXT.md` vocabulary is mandatory in code and in documentation: **Department**, **Step**, **Phase**, **Tool**, **Runbook**, **Volunteer**, **Maintainer**, **List mode**, **Focus mode**, **Tint**, **Motif**. Do not drift to the synonyms marked `_Avoid_` — in particular, never "checklist" for **Runbook**, never "user" for **Volunteer**, never "wizard" for **Focus mode**.

**The app's user-facing copy stays in Brazilian Portuguese.** The design system's content rules mandate it, and the Volunteers are Brazilian. English is the language of the codebase, the glossary and this spec — not of the screens.

### Domain model

A **Department** has: slug, name, one-line summary, primary Tool, a note about that Tool, intro text, Tint, Motif, icon, update date, and an ordered list of **Steps**.

A **Step** has: a required title, a detail, a **Phase**, and optionally the name of a specific Tool.

**Phase** is a label on each Step, not a container grouping them. Identifiers are English (`before`, `service`, `closing`, `week`); the labels rendered to Volunteers stay Portuguese. This shape is what lets the "all" filter show the entire sequence without flattening a hierarchy.

Two fields present in the design's original data were **removed from the schema** because no screen consumed them: `time` (a Step's relative clock time) and `cadence` (service vs. week). The same criterion applied in both cases: data no screen consumes does not enter the model. The arrival-time information the `time` field carried is preserved, where it matters, inside the Department's intro text.

Slugs are written by hand in the content, never derived from the name. Renaming a Department must not break a saved URL.

### Content source

Content lives in the repository, in typed TypeScript, schema-validated. Access is isolated behind a content module exposing two async functions: one returning all Departments and one returning a Department by slug. Pages consume only those functions.

The functions are async on purpose, even reading from a local module: that is what allows swapping the implementation for a CMS or a database without altering any page.

There is exactly one Maintainer. There will be no admin panel and no authentication. If other leaders later need to edit, the correct answer is adopting a CMS that already solves auth and permissions, not building CRUD — the isolated layer exists precisely to make that swap cheap.

### Routes and rendering

Two routes: Home at the root, and the Department page under a `departamentos` namespace with a dynamic slug. The namespace avoids collisions with future routes.

The dynamic route enumerates slugs at build time and refuses slugs outside that list, so an unknown slug becomes a build-time 404 rather than a runtime error. Everything is statically prerendered; there is no revalidation, ISR, or per-request rendering, because nothing is dynamic.

The build doubles as the content integrity test: an invalid schema, a duplicate slug, or a Department with no Steps fails the build.

### UI state

**List mode** and **Focus mode** are client state within the Department page, not separate routes. So is the Phase filter. None of it enters the URL in V1.

**There is no progress persistence.** The original design stored the Volunteer's position in `localStorage` and showed a "resume where you left off" card on Home; both were removed. The reason: the state never expired, it crossed weeks, and the card occupied Home's most valuable space to display stale information.

The only `localStorage` use in V1 is the "onboarding already seen" flag. The onboarding screen is overlaid on Home on the client after reading that flag; Home itself remains static and prerendered.

### Theme

The theme follows the system's `prefers-color-scheme`, via pure CSS. There is no manual toggle and no automatic switch by time of day.

The original design system specifies switching automatically by clock time. This was deliberately discarded: under server rendering it guarantees a hydration mismatch (the server does not know the client's clock), and it overrides the person's explicit preference. The real goal — not blinding the Volunteer during an evening service — is met by `prefers-color-scheme`, since someone using their phone at night usually already has the system in dark.

The design system's color tokens are written with dark as the default and light behind an attribute selector. The adaptation inverts that into a media query, keeping the values identical.

### Design system

Design system tokens come in as CSS files of custom properties, exposed to Tailwind 4 through its theme directive. The palette is not rewritten in configuration — the original values are the single source, so design and code cannot drift.

Typography: Space Grotesk (display) and DM Sans (body), with JetBrains Mono for numerals. The design system's readme contains a paragraph naming a different typeface family (Nunito); it is residual text from an earlier round and contradicts the system's own tokens. **The tokens are the truth.**

There is a known bug in the design system: the token `--text-body` is defined twice with different meanings — as a color in the color tokens and as a font size in the typography tokens. The base CSS applies `font-size: var(--text-body)` to `body`, which resolves to a color value and is invalid. The design canvas works around it with an override. **The port must resolve the collision by renaming, not replicate the workaround.**

Components to build, in React: Button, Chip, Tag, Icon, Illustration, DepartmentCard, StepItem, ToolCallout, SectionHeader, AppBar.

Design system components deliberately **not** ported, because no screen uses them: TabBar, ActionBar, IconButton, EmptyState, and the generic Card. The design system's readme describes a fixed bottom TabBar that none of the three screens actually uses.

Icons come from the `lucide-react` package, not from the CDN the design uses.

The onboarding screen uses the `welcome` Motif over the accent block, replacing the flat rectangle the design reserved for a mascot that does not yet exist. The Motifs were downloaded from the design project and stripped of C2PA metadata.

### Motion

Two technologies, each where it earns its place:

- **Navigation transitions** — the card morphing into the top of the Department page, its reverse on back, and page entry — use React's view transitions, which work in the App Router with no configuration. The morph is viable because the card and the page's top block are the same visual object at two sizes: a flat block in the Department's Tint.
- **In-page motion** — switching between List mode and Focus mode, and directional navigation between Steps in Focus mode — uses the `motion` library.

The split is not preference: a cross-route morph requires both elements to exist simultaneously in the same tree, which does not happen during an App Router navigation. Forcing it with the animation library would cost the static architecture.

Motion follows the design system's tokens: 120/180/280ms durations, a single curve, no bounce, no parallax, no stagger. The justification is contextual, not purist — the app is opened in a hurry, in the dark, minutes before a service, and slow or bouncy motion becomes an obstacle between the person and the information.

The motion tokens zero out durations under `prefers-reduced-motion`, which covers CSS automatically. The `motion` library does not read those variables: the preference must be checked explicitly in JavaScript.

Animations **deliberately excluded**: a crossfade when changing the Phase filter (the person filtered in order to read; animation delays reading) and staggering the Home cards (charming once, irritating the hundredth time — and Home is the screen opened every week).

### PWA

The app is installable: manifest, icons, standalone display. **There is no service worker and the app does not work offline.**

This was evaluated and declined for V1. Real offline support would require a cache invalidation strategy, and that strategy's silent failure mode — a Volunteer following stale Steps without knowing — is worse than the loud failure of not opening without a network. Content being 100% static keeps the path back cheap if the decision changes.

The framework's experimental connectivity-detection feature does not solve this case: it keeps requests pending and retries when the network returns, but a reload while offline still fails.

### Privacy and deploy

No authentication. The app is public on the internet but marked non-indexable.

As a direct and non-negotiable consequence: **no credential, password, login, token, or personal phone number may enter the content.** Where a Step needs a credential, it says where to obtain it, never the credential itself. This applies to screenshots too, should any be added — what is on the screen counts as published content.

Deploy on Vercel, on every push.

### ADRs to record

Three decisions need an ADR, being hard to reverse and contradicting the design in ways a future reader would question:

1. Deliberate divergences from the design system — theme by system preference rather than clock time; removal of progress persistence; removal of the `time` and `cadence` fields.
2. PWA without a service worker — why an installable app that doesn't open offline, and what would trigger a change.
3. `shadcn/ui` deferred — why V1 doesn't use it, and when to reach for it.

## Testing Decisions

There is no test infrastructure in the repository today: no framework, no test script.

**What makes a good test here:** test observable external behaviour, never implementation detail. A test that breaks when markup changes but behaviour doesn't is a bad test.

**One seam, and only one: the content module.** It is the only place in V1 with logic that can genuinely break, and it is the boundary the rest of the app consumes. Testing there covers the real risk without coupling tests to markup.

What to test at that seam:

- An existing Department comes back with every field the schema requires.
- An unknown slug is handled the way the route expects, and does not throw unhandled.
- The Department list comes back in the order declared in the content, which is Home's order.
- Step order within a Department is preserved.
- A malformed Step — no title, invalid Phase — is rejected by schema validation.
- A Department with no Steps is rejected.
- Duplicate slugs across Departments are rejected.
- Every declared slug has a corresponding Motif available, and every declared Tint exists in the palette.

**Deliberately not tested:**

- **UI components.** They are presentation over tokens. Render tests here become implementation tests and freeze the design.
- **Routes.** Build-time slug enumeration with unknown slugs refused means a broken slug fails the build. The build is the test, and it is stronger than any assertion I would write.
- **List mode and Focus mode.** Component state with no business rules; the cost of the test exceeds the risk.

**Prior art:** none. This is the repository's first test, so choosing the framework and wiring it up is part of the work. Pick whatever integrates with the existing toolchain with the least configuration.

## Out of Scope

- Authentication, accounts, Volunteer identity.
- An admin panel, or any content editing outside the repository.
- A CMS or external content source. (The isolated layer keeps the door open; walking through it is not V1.)
- Offline support and service workers.
- Volunteer progress persistence, and any marking of a Step as done. A **Runbook** is not a checklist.
- Push notifications.
- In-app search.
- Images and screenshots in Steps. The schema supports them; V1 content ships without.
- Distinguishing service-day Departments from week-day Departments on Home. Evaluated and declined: Home is a flat list.
- A manual theme toggle.
- Multiple languages. The app's copy is Brazilian Portuguese.
- Analytics.
- `shadcn/ui`. It arrives when the first component genuinely needing Radix appears.

## Further Notes

**Publication gate.** The Step copy comes from the design project, which explicitly marks it as example content pending review by the church's team. It is good and in the right register, and serves as seed content. But it contains highly specific operational claims — mixer channels, decibel levels, software profile names — that may not match the church's actual equipment.

**The app does not go to production before the Maintainer reviews the content step by step.** Building with this content is correct; publishing without reviewing means six Volunteers following instructions nobody at the church validated.

**On design access.** Reading the design project requires design-system authorization on the account (`/design-login`). The relevant files are the composed screen, the data file, and the design system tokens.

**One question open for review.** The test seam above — the content module as the single test point — was derived from risk, but was never explicitly confirmed. If the Maintainer expects component or route coverage, that section changes.
