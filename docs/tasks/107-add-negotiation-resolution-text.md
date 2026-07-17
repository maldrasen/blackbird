---
id: 107
title: Add Negotiation Resolution Text
priority: 2
created: 2026-07-12
points: 5
tags:
  - battle
---
---
Each monster will need resolution text as well, one for each way that a negotiation can be resolved. Unlike the greetings some of this text can be delegated down to the personality architype or supertype. The text should be implemented with WeaverPackages to give multiple options for each resolution type though. The supertypes should have a lot of options while the base monsters may only need one if they have any at all.

---
**Notes (Claude):** Replace the stubbed `getResolutionText()` in `negotiation-state.js` with per-monster resolution text (one per resolution: angry / leave / satisfied), resolved base-monster → archetype → supertype (the property-weight delegation used elsewhere), authored as `WeaverPackage`s so each resolution has multiple options. Moderate wiring + content; supertypes carry most of the options, base monsters little or none.
