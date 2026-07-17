---
id: 045
title: Implement the Enlighten View
priority: 2
created: 2026-07-04
points: 13
tags:
  - battle
  - training
---
---
Both the battles and the training systems start an enlighten view when they finish. The player's skills can be increased in both systems, but beyond that I think they're fairly different. 
##### Battle
After a battle the monsters may drop loot and characters gain experience. If the characters gain levels we increase their attributes. There may be an opportunity to unlock quirks. 
##### Training
The enlighten view for the training will work more like the Era games, where the anima and animus are spent to increase the sensitivities or increase sexual preferences. There are probably some training specific quirks that can be unlocked as well as sexual preferences grow in strength.

---
**Notes (Claude):** `EnlightenSystem`/`EnlightenState` are stubs that just log skill improvements. The two branches are quite different — recommend splitting by branch. Battle enlighten: loot, XP, level-ups, attribute gains, quirk unlocks (overlaps [[017-game-over-episode]] victory). Training enlighten: spend anima/animus to raise sensitivities/preferences and unlock training quirks, Era-style. Each needs its own view under `views/enlighten/`. Design the progression/XP model once and share it with 017; blocked on that design.
