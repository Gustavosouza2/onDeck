# 10: PWA install and noindex

**What to build:** A Volunteer can add OnDeck to their phone's home screen and open it like any other app, full screen, with no browser chrome. At the same time, the app stops being something a search engine will index.

**Blocked by:** 04 (tracer bullet).

**Status:** resolved

- [x] A web app manifest declares the app name, short name, description, start URL, standalone display, and background and theme colors from the one ground-colour constant that mirrors the design system's --bg-app, held in step with the token by a test.
- [x] Icons exist at the sizes installation requires, in the app's visual language.
- [x] Installing to a phone's home screen and launching produces a full-screen app with no browser chrome.
- [x] The browser's theme color matches the app's ground in the theme actually shown, including a manual choice that differs from the system.
- [x] Search engines are told not to index any route, and the same instruction is given both in page metadata and at the crawler-directive level.
- [x] There is no service worker and no offline caching. Opening the app without a network fails plainly. This is deliberate; see the ADR from ticket 03.
- [x] The framework's experimental connectivity-detection feature is not enabled. It retries pending requests but does not make a cold load work offline, so it solves nothing here.
