# OnDeck

Internal guide for a church's media team. It describes how to operate each technical
role around a service, so that a new volunteer — or someone covering a role that
isn't theirs — can execute it alone.

The app's user-facing copy is Brazilian Portuguese; this glossary and the codebase
are English. Where a term has a fixed Portuguese surface string, it is noted.

## Language

### Content

**Department**:
One operational role on the media team (projection, livestream, photos/stories,
secondary camera, banner design, videos). It is the unit a Volunteer picks on the
Home screen. UI: "departamento".
_Avoid_: area, ministry, sector, role

**Step**:
A single executable action within a Department, with a required title and detail and
an optional Tool. It is the smallest unit of the guide. A Department's Steps
form one ordered sequence, in the order they happen. UI: "passo".
_Avoid_: instruction, item, task

**Phase**:
The moment a Step belongs to — before the service, during it, closing, or during the
week. It is a label on each Step, not a container holding them; List mode groups
the Runbook under one heading per Phase, in the order the moments happen. Identifiers are English
(`before`, `service`, `closing`, `week`); the labels rendered to Volunteers are
Portuguese ("Antes do culto", "Durante", "Encerramento", "Durante a semana").
_Avoid_: section, stage, block

**Tool**:
The software or equipment a Department operates (OpenLP, OBS Studio, Canva, Premiere
Pro, a camera). Always the exact proper name. A Department has one primary Tool; a
Step may name its own. UI: "ferramenta".
_Avoid_: app, system, program, software

**Runbook**:
The ordered set of a Department's Steps, first to last. It is not a checklist: nothing
is tickable, the Volunteer follows it and that's it. UI: "passo a passo".
_Avoid_: checklist, flow, procedure, script

### People

**Volunteer**:
The person who reads the guide in order to perform a role. Has no account and no
identity in the app. UI: "voluntário".
_Avoid_: user, member, operator

**Maintainer**:
The person who edits Department content. Today, a single person, editing in the
repository.
_Avoid_: admin, editor

### Reading

**List mode**:
The reference reading: the whole Runbook on one page, as Step titles grouped by
Phase. Serves
someone looking for a specific Step.
_Avoid_: overview, reading mode

**Focus mode**:
The execution reading: one Step per screen, with previous and next. Serves someone
performing live. It does not remember where the Volunteer stopped.
_Avoid_: wizard, guided mode, walkthrough

### Visual identity

**Tint**:
The flat accent color identifying a Department (lilac, citron, coral, sky, mint,
rose, cream). No two Departments share one. It fills the Department's card on Home and the opening block of its page.
_Avoid_: department color, theme, accent

**Motif**:
The flat geometric shape paired with a Department's Tint. It is decorative and never
carries information.
_Avoid_: illustration, icon, artwork
