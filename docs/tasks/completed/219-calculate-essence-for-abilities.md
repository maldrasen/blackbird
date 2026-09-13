---
id: 220
title: Calculate essence for abilities
priority: 1
created: 2026-09-12
tags:
  - dungeon
points: 5
---
---
Task 211 gave the monster-cast-spell ability a formula for its essence. The other abilities still carry hand authored essence values: the natural attack entries on the monsters, the venomous bites on the yeeks, and the values on the ability records themselves. Hand authoring was a quick way to get the monsters priced, but the values don't agree with each other or with the spell formula. Every natural ability whose effects are plain data should run through the same effect math: natural attacks from their damage range and speed, and the venomous bite from its poison. Abilities like dick punch keep a hand authored value, either because their effects are unique or because the conditions under which the effects land are complicated.

Essence is intrinsic to the monster, the concentrated magic it contains, so equipment and carried items don't contribute to it. The basic attack keeps its hand authored value and monster-use-article stays at zero. Pricing the danger of a monster's weapon and items is the job of the challenge rating in task 220.
