---
id: 221
title: Refactor abilities
priority: 1
created: 2026-09-13
tags:
  - battle
points: 13
---
---
I think that abilities are badly in need of a refactor. They just feel super disorganized right now. I think we just need to redesign them from the ground up, keeping all the functionality that they currently have, but also adding what they will still need to have for when we start adding more character abilities. 

I think first we need to split a "battle command" from an ability. Abilities like "change equipment" really aren't abilities, they inform the UI what to do next. Same with a character ability like "cast spell". A cast spell command should open the spell interface so that a spell and power level can be selected. Then once they're selected the "cast spell" ability with the target, spell and power level is executed.

Because abilities need to have a lot of internal state (like the spell or item choice), representing them as a record, which is supposed to be an immutable data object, is the wrong direction. Instead, I think we need to make the abilities actual models. They can be immutable once they're created, but the shape of that is a factory that creates an object that's stored on the monster record, or creates an ability object given a battle command.