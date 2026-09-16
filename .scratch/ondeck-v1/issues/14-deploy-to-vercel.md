# 14: Deploy to Vercel

> **Closed (2026-09-16):** the Maintainer deploys manually rather than through an agent-run ticket; the product owner will do this step directly. **Blocked by 13 still applies to the manual deploy**: the app must not reach production until the Maintainer has completed the ticket 13 content review, whether that deploy is done by an agent or by hand. Criteria below are converted to a plain list — not ticked, since none were executed by an agent — and remain the Maintainer's checklist for the manual deploy.

**What to build:** OnDeck is live at a stable URL, Volunteers can install it, and shipping a correction to a Runbook is a commit.

**Blocked by:** 13 (review seed content). This edge is deliberate: the app does not reach production carrying unreviewed operational instructions.

**Status:** wontfix

- A Vercel project is connected to the repository and deploys on every push to the default branch.
- The production build passes, including the content module's tests and the build-time slug enumeration that fails on malformed content.
- Every Department page is served as a prerendered static asset from the CDN. No route renders per request.
- Installing from the production URL onto a phone's home screen works, and the installed app opens full screen.
- The no-index instruction is live in production and verified at the served URL, not just in source.
- Theme switching (all three states, including a manual choice against the system), both reading modes, "Sobre o departamento" and the install invitation are verified against the production deployment on a real phone, not only in a desktop browser's device emulation.
- The Maintainer has the URL and knows that editing content and pushing is the whole publishing workflow.
