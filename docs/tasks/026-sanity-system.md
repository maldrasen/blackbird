---
id: 026
title: Sanity System
priority: 3
created: 2026-07-03
points: 8
tags: [training]
---
---
Some training actions will damage a character's sanity. We should have a system that slowly increases sanity. Maybe by default this could be a single point a day, but a comfortable environment will raise that. Conversely, a particularly bad environment (enforced bondage rules) would drop sanity every day. If sanity drops to 0 overnight, we could enqueue a mindbreak event where the player finds the character in a broken state.

---
**Notes (Claude):** A new sanity component plus a daily-tick system that raises sanity (env-dependent: a comfortable environment raises it, harsh bondage rules lower it) and enqueues a mindbreak episode when it hits 0 overnight. The real cost isn't the number — it's the daily-processing loop and the "environment" concept (home comfort, imposed rules) which doesn't exist yet; that's the design unknown. Enqueues through the episode system ([[110-navigation-events]] touches similar queue plumbing).
