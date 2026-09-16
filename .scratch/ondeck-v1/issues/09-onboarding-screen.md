# 09: Onboarding screen

**What to build:** A first-time Volunteer, who has just installed the app and has no idea what it is, gets one screen that explains OnDeck, tells them no login is needed, tells them who to ask when stuck, and sends them to the Departments. Anyone who has been here before never sees it again.

**Blocked by:** 04 (tracer bullet).

**Status:** resolved

- [x] The screen shows the `welcome` Motif over a filled accent block. The design reserved a flat rectangle there for a mascot that does not exist yet; the existing Motif takes that slot, and a mascot would later replace it in the same place.
- [x] Copy states what OnDeck is in one sentence, names the six Departments in a supporting line, says no login is needed, and says to reach the media lead with questions.
- [x] A single large primary action moves the Volunteer to Home.
- [x] The screen appears only on a Volunteer's first visit. A flag in browser storage records that it has been seen.
- [x] Home itself stays static and prerendered. Onboarding is overlaid on the client after the flag is read; Home is never made dynamic to accommodate it.
- [x] Reading or writing the flag never throws, and the app renders correctly when storage is unavailable or empty — a private window, cleared site data, a different browser. In that case the Volunteer simply sees onboarding again.
- [x] Copy is Brazilian Portuguese and never addresses the Volunteer by name: there are no accounts and no identity in the app.
