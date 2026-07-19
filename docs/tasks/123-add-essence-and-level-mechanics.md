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

## Outcome

Implemented in `application/characters/essence-system.js`, with all the tuning constants at the top of the module.

- **Monster essence** is computed from the killed entity, so leveled or well-rolled monsters are worth more:
  `essence = round(attributeSum^1.5 / 10 × (1 + Σ abilityScores / 100))`. Each combat ability record declares an
  `essence` score (basic-attack 10, basic-defend 5, hide 10, dick-punch 20, sneak-attack 25); utility abilities
  default to 0. A fresh kobold is worth roughly 75–90, the level 5 dick puncher around 115–130.
- **Level thresholds**: `essenceToLevel(level, species) = round(250 × level^1.3 × speciesFactor)`.
- **Species factor** is derived from the species attribute grade totals (F=1 … A=5, via
  `LetterGradeHelper.gradeLevel`): `(gradeTotal / 15)^0.6`. Because the cost is sublinear in grades while level-up
  point gains are roughly linear, power gained per essence works out to `(gradeTotal/15)^0.4` — elf (1.03) slightly
  outpaces human (1.00), human outpaces kobold (0.94).
- Characters get a new `ExperienceComponent` `{ level, essence }` where essence is lifetime earnings; level up
  eligibility compares it against the cumulative cost (`EssenceSystem.canLevelUp`), so nothing is subtracted on
  level up. Awarding essence, dividing it among the party, and the level up flow itself belong to task 117.
