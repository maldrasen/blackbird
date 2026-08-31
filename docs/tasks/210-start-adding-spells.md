---
id: 210
title: Start Adding Spells
priority: 1
created: 2026-08-31
tags:
  - battle
  - character
  - episode
points: 8
---
---
We have the player gaining mana, but there are no spells yet, and no way for the player to learn spells. First, I think I need to add a spell record for all of the individual spell data, damage, effects, messages, mana cost, etc. The monsters will need a "cast spell" ability with a cooldown and a spell code. We can add a player version later. The player version will need its own spell select element with a power level selector. 