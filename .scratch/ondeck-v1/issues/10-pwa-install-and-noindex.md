# 10: PWA install and noindex

**What to build:** A Volunteer can add OnDeck to their phone's home screen and open it like any other app, full screen, with no browser chrome. At the same time, the app stops being something a search engine will index.

**Blocked by:** 04 (tracer bullet).

**Status:** ready-for-agent

- [ ] A web app manifest declares the app name, short name, description, start URL, standalone display, and the background and theme colors drawn from the design system's tokens.
- [ ] Icons exist at the sizes installation requires, in the app's visual language.
- [ ] Installing to a phone's home screen and launching produces a full-screen app with no browser chrome.
- [ ] The browser's theme color matches the app's ground so the system chrome does not clash.
- [ ] Search engines are told not to index any route, and the same instruction is given both in page metadata and at the crawler-directive level.
- [ ] There is no service worker and no offline caching. Opening the app without a network fails plainly. This is deliberate; see the ADR from ticket 03.
- [ ] The framework's experimental connectivity-detection feature is not enabled. It retries pending requests but does not make a cold load work offline, so it solves nothing here.
