---
id: 223
title: Move speed factor into species
priority: 1
created: 2026-09-15
tags:
  - character
points: 2
---
---
The speedFactor() in the essence system ignores the speed of a character with a body. We should just change how the speed factor is determined, rather than making it depend on a body component. The height difference between a tall kobold and a short kobold is probably negligible, but the speed difference between a kobold and an equian is too significant to ignore when calculating a monster's essence.

Looking at the speed math, I think it's just overly complex for not much benefit. I think it would be fine for each species to just have a simple speed factor value, getting rid of the adjustments for dexterity and breast size. 
