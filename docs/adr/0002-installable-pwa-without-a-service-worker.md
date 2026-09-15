# Installable PWA without a service worker

OnDeck is installable to a phone's home screen and opens standalone, but it
ships no service worker and does not work offline. Opening it without a network
fails the way any website fails. A reader who sees "PWA" in the spec and no
service worker in the code will assume it was forgotten; it was not.

The church's Wi-Fi is unreliable, which is a real argument for offline support.
The argument against is the failure mode. Offline means caching the Runbooks,
and caching them means owning an invalidation strategy. When that strategy is
wrong, a Volunteer is served stale Steps and is given no signal that anything is
out of date — and this is an app whose entire value is that the instructions are
current. A Volunteer who cannot open the app knows they cannot open the app.
A Volunteer reading last month's Runbook believes they are reading this month's.

Weighed against that: the Volunteer holding the phone is usually on mobile data,
which works when the building's Wi-Fi does not, and the app is a handful of
prerendered static pages served from a CDN, so it loads fast on a weak
connection.

Next 16's `experimental.useOffline` does not close this gap. It keeps pending
navigations and Server Action calls alive and retries them when the network
returns; a cold load with no network still fails, because the browser needs the
network to fetch the HTML. It is complementary, not a substitute, and is not
enabled.

Everything is statically prerendered, which is precisely what makes offline
cheap to add later — the content is already the kind of thing a service worker
can precache wholesale.

**Revisit if** Volunteers report being unable to open the app at the moment they
need it, and mobile data turns out not to cover the sanctuary. The work is then
Serwist plus an explicit staleness indicator in the UI — never a silent cache.
