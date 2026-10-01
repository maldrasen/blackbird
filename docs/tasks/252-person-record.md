---
id: 252
title: Person Record
priority: 2
created: 2026-10-01
tags:
  - character
points: 5
---
---
In order to add NPCs to the game we need Person records to be able to define them. The person data needs to include the character factory arguments if this character has a body. If not we need enough data for a small person factory that builds an entity with actor, feelings, and location components.

Once a person is added to the game we need a function to find the person entity by code. Like the player entity this will need to be part of the game state, so something like `GameState.findPerson(code)`

If a character should be built when the same starts we'll need to give them a flag that marks them as such. That way they'll appear in the locations they're supposed to or follow their eventual schedules. Other characters that are first encountered in episodes can be lazily initialized and are build when findPerson doesn't have an entity for them. (It's a find or create really)
