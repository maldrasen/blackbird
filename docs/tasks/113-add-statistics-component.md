---
id: 113
title: Add statistics component
priority: 3
created: 2026-07-17
points: 5
tags:
  - battle
  - training
  - character
---
---
Characters should have a statistics component. Some of these stats will be shown on their own tab in the character panel, but there are probably some hidden ones as well. These statistics can be used to compare character performance. By keeping total and last delve versions of these status, you'll be able to see their current average damage. These stats can also be used as episode requirements. We'll keep both battle and training stats.

- `battlesFought` (total, and last delve)
- `monstersKilled` (total, and last delve)
- `koboldsKilled` (one stat for each species, could be used in species specific episodes)
- `damageDone` (total, and last delve)
- `damageHealed` (total, and last delve)
- `orgasms`
- `sexActionsPerformed` (one for each action code, or collapsed into action type)

---
**Notes (Claude):** A new statistics component holding total + last-delve counters (battles, kills, per-species kills, damage done/healed, orgasms, sex actions). The component itself is easy; the work is the many increment call sites scattered across the battle and training systems, plus a character-panel tab to display the visible ones. Also usable as episode requirements. Decide the per-species-kill and per-action-code granularity up front so the call sites are consistent.