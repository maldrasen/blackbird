---
id: 207
title: Add Mana Font Feature
priority: 1
created: 2026-08-27
tags: []
points: 5
---
---
Next step to actually being able to add this nightgaunt episode is to create the mana font features. The fonts have their own generation rules. Players gain power directly by interacting with the fonts, so we have to limit how often they can appear. We'll limit the game to one mana font per level. Once the player has used the font on level 1 for instance, it will never spawn on level 1 again. A mana font should have a 20% chance of spawning or so, except for level 1, which should always spawn one.