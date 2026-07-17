---
id: 115
title: Add deathblow messages
priority: 4
created: 2026-07-17
points: 5
tags: []
---
---
With the death rework in 114 we should add something like a deathblow message to the battle text. Right now killing a monster just says "Monster is Killed!" but we can make these messages more interesting. If we know we've actually killed a monster (or a character) with an attack we can add a more descriptive killed message, based on the hit location. 

For one thing, it really doesn't make sense that an attack that hits a character's hand would kill them. But if that attack severs their hand, and they're looking down at their bleeding stump, and the monster stabs them in the chest in a coup de grace, then paints a clearer picture of what could have happened.

---
**Notes (Claude):** Replace the flat "X was killed!" (currently in `physical-attack-system.js`) with descriptive, hit-location-aware deathblow text (sever a hand, then a coup-de-grace to the chest). Depends on [[114-rework-death-mechanics]] so we actually know an attack killed (vs merely KO'd). Logic to pick text by hit location + damage type, plus the content itself.