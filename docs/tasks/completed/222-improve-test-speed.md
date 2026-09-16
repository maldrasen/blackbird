---
id: 222
title: Improve test speed
priority: 2
created: 2026-09-15
tags: []
points: 3
---
---
The specs are taking 5 seconds to run, which isn't too slow (unless you're running the soak script), but I think I should look into improving the speed of the few very slow specs. I think a big improvement could be made by routing around the dungeon's floor factory. Unless a spec needs to look at a dungeon floor and the features as they are laid out on the a dungeon grid, it shouldn't need to build an entire dungeon floor. 