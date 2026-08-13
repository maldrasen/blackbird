---
id: 182
title: Implement consumable weapons
priority: 3
created: 2026-08-12
tags:
  - battle
points: 5
---
---
We've added a grenade type consumable. Consumables have a list of effects, but they also need a target. A grenade weapon like the blasto should target a position and do an area of effect attack around that position. (center and 3 neighbors, center and 5 neighbors, entire formation, everyone) The blasto should do a little damage, and have a blind and stun effects. We'll also need to specify effect strength for resistance calculations.

Even though they're an attack item, grenades should still be consumables. They share enough in common with healing items, and some healing items should have a target or do AoE healing.

> We'll want to implement the use item command before this, just implementing some of the simpler items like using one of the mana restoration items. 