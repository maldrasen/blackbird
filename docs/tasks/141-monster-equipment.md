---
id: 141
title: Monster equipment
priority: 2
created: 2026-07-25
tags:
  - battle
points: 5
---
---
Currently, the base monsters only have an attack table that determines what weapons they have. I think it would be better to just go ahead and generate real weapons and equipment for them. First, if we recruit them to the party they should have the equipment they fought with. We still need an attack table and some kind of natural armor object for monsters with no weapons or equipment. But currently, there's no way for a monster to equip a shield, so they could never block.

In this task, we should just expand the character equipper. Rather than having a budget though, which creates a very random spread of equipment given a budget, monsters will need to give the equipper a list of possible weapons and armor with the materials they're made from.