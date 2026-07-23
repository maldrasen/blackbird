---
id: 131
title: Oath and nightgaunt episodes
priority: 2
created: 2026-07-23
tags:
  - dungeon
  - episode
points: 13
---
---
This is a probably a multi part task, but the two episodes and changes to the dungeon generation are all pretty tightly coupled, so not something that should be left in a halfway done state.

### Oath Episode
When the player first navigates to the dungeon district we need to start an episode, describing the dungeon entrance. The should see someone entering or exiting the dungeon with an obvious harem of monster girls.

They're met by one of the armored templars guarding the dungeon entrance. They're supposedly there to keep dungeon monsters from escaping, but they closely watch who comes and goes from the dungeon. Before the player is allowed to enter the dungeon the templar makes the player swear an oath, not to accept any of the corrupting power that the dungeon offers. Only those who swear to destroy the dungeon will be allowed to enter. 

If the player refuses he's turned away. The location only has an option to speak to the templar again. If he talks to the templar again, and the player refuses again, the templar should just kill him. No need to drag this out. When the player accepts the talk option is gone and the enter the dungeon command is shown. This will require setting and checking an oath-taken flag that every character will need.

### Nightgaunt Generation
We need to update the dungeon and the floor factory to generate a feature for the nightgaunt episode. The nightgaunt should have a unique room, with a unique graphic, maybe a background texture. Maybe a shape drawn in the center of the room. Level one of the dungeon should only ever generate the "dungeon" theme. If the nightgaunt has never been encountered, the level should always add that feature. If they've been encountered, the feature should never generate. 

### Essence and Negotiate Changes
A player can't absorb essence or talk to monsters until they've encountered the night gaunt. The nightgaunt event will set a flag that unlocks other episodes that can happen on the first floor as we don't want to have multiple versions of these events where talking is or isn't possible. These events are driven by room contents, which will be part of the generation, though we haven't gotten to doing that yet.

### The Nightgaunt Episode
Exploring the dungeon for the first time is kind of futile. You can't absorb essence, meaning you can't level up at all. You first need to find the nightgaunt. It offers you power. This, like the templar is another false choice. If you refuse, it grows hostile, making it clear it will kill you if you refuse, which it does if you refuse again. If you accept it gives you the ability to absorb essence, and the ability to talk to monsters, unlocking both leveling up and negotiate. 
