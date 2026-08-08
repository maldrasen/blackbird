---
id: 123
title: Add Essence and Level Mechanics
priority: 1
created: 2026-07-19
tags:
  - battle
points: 3
---
---
Before we can work on the enlighten view, we need to determine how much essence the party earns when a monster is killed, and we need to figure how much essence it takes to earn another level. 

The essence should be data driven. Rather than going though each monster type and giving them a value, we should calculate the essence based on the monster's attributes and the abilities they have. Each ability will need a score that reflects it's power. This relationship may be multiplicative, given that attributes define how potent an ability is. Doesn't sound like a straight (attributes * ability score) either though.

We need this monster essence value formula though to determine the character level thresholds. Leveling should be slow, but we need to be able to tweak whatever formula we use to balance the experience. A character's species should also effect how much essence it takes to level. They get more attribute points when they level up, so it takes more essense. That shouldn't a one to one relationship either though. Given the same amount of essence a human will outpace a kobold, and an elf will slightly outpace a human.
