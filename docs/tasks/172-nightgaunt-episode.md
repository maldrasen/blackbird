---
id: 172
title: Nightgaunt Episode
priority: 2
created: 2026-08-08
tags: []
points: 8
---
---
I pulled this task out of 131 which was too large to be done as one task.

### Nightgaunt Generation
We need to update the dungeon and the floor factory to generate a feature for the nightgaunt episode. The nightgaunt should have a unique room, with a unique graphic, maybe a background texture. Maybe a shape drawn in the center of the room. Level one of the dungeon should only ever generate the "dungeon" theme. If the nightgaunt has never been encountered, the level should always add that feature. If they've been encountered, the feature should never generate. 

### Essence and Negotiate Changes
A player can't absorb essence or talk to monsters until they've encountered the night gaunt. The nightgaunt event will set a flag that unlocks other episodes that can happen on the first floor as we don't want to have multiple versions of these events where talking is or isn't possible. These events are driven by room contents, which will be part of the generation, though we haven't gotten to doing that yet.

### The Nightgaunt Episode
Exploring the dungeon for the first time is kind of futile. You can't absorb essence, meaning you can't level up at all. You first need to find the nightgaunt. It offers you power. This, like the templar is another false choice. If you refuse, it grows hostile, making it clear it will kill you if you refuse, which it does if you refuse again. If you accept it gives you the ability to absorb essence, and the ability to talk to monsters, unlocking both leveling up and negotiate. 

> I'm reconsidering if I even want to do this. Seems like a bit of a bummer, not being able to earn experience. Thematically, I think it's a good idea, but instead of offering you essence and negotiation, this first encounter with a nightgaunt should be how your character finally gets a little mana. Mana isn't gained on level up. Instead we find mana fonts in the dungeon. But a nightgaunt could be guarding the first one you find. As we want to have mana for the negotiation requests, ot makes sense to do this first.
