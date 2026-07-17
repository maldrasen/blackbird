---
id: 117
title: After battle control flow
priority: 1
created: 2026-07-17
tags:
  - battle
points: 5
---
---
Looking though all these tasks, we have several collisions regarding what happens when a battle is finished. (017, 045, 114, 116) With the option to kill or capture knocked out monsters, there are some decisions that players need to make before we can show the enlightenment view. These decisions could spawn other episodes, making the control flow here a bit of a tangle we need to figure out. We should go ahead and build minimum functional stubs to see how we flow from one state to another. A chart may help. 