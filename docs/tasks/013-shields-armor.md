---
id: 013
title: Shields & Armor
priority: 3
created: 2026-07-03
points: 8
tags: [battle]
---
---
Actually implement the shields so that the block skill can be used. Armor would also be a good idea to have going into a dungeon.

---
**Notes (Claude):** Records and data already exist (`data/armor/*`, `data/weapons/shields.js`, `base-armor`, `armor-component`, `armor-factory`) — the battle mechanics are the gap. `battle-damage-system.js` has a TODO for armor mitigation + damage-type resistance, and `defend-roll.js` hardcodes `dodge` (TODO to switch to block with a shield / parry with a sword + parry skill). Work: a mitigation model by hit location + resistance, and defend-skill selection based on equipment. Design call up front on how resistance scales (flat reduction vs percent).
