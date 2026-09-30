---
id: 211
title: Calculate essence for spells
priority: 1
created: 2026-09-01
tags:
  - dungeon
points: 5
---
---
We've added spells, but the monster-cast-spell ability isn't generating essence. We should probably use a formula of some sort to calculate how dangerous a spell is, rather than guessing at the value. We can loop through a spell's effects, summing all essence from the average damage, and status effects. The cast time and cooldowns should also factor in as they determine how often a spell can be cast, which could give us a general dps value, though spikes in damage are more dangerous than steady damage.