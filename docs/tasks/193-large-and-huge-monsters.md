---
id: 193
title: Large and Huge monsters
priority: 4
created: 2026-08-17
tags:
  - battle
points: 3
---
---
When we start adding large or boss type monsters to the game it's not going to feel right for them to fit into the same formation grid most monsters do. When we're fighting something large, we can adjust the monster formation to only show one row and three columns at a time, but each large monster is twice as large (or 4 if we're talking area) We're not actually changing the formation at all, we're just changing how its displayed, so this is really just mostly UI work. We'll need to update the encounter logic so that a battle against large creatures only includes at most 3 large creatures. We can add a huge monster version as well, where there's one monster that takes the entire other side. A boss monster panel is as big as the normal 5x2 formation.

##### Not included, but would be cool.
Boss monsters could include a custom background, and have different art for different phases of a fight. A multi-part boss, where each body part could be targeted, is also possible. Each part would technically be a different monster, and it could have a custom formation panel so that the part frames are arranged where the parts would be.
