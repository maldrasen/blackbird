---
id: 215
title: Grid Based Dungeon Movement
priority: 1
created: 2026-09-10
tags:
  - dungeon
points: 8
---
---
I'm still on the fence about how the dungeon navigation works. The room based movement still feels awkward. Moving with the keyboard only works some of the time and it depends on how many doors a room may have on a given wall. By only allowing movement though one door, we sometimes force the player to move by clicking on a door. 

I think the problem was that I committed early to this Zork-like room based dungeon, but then built the dungeon on a tile grid (because I wanted the dungeon layout to make sense visually on the map, rather than something like Darkest Dungeon)

I'm not sure if this approach feels right though. I wouldn't be a huge change to just move to a grid based movement. The generation would remain mostly the same. We might need to change how the stairs work. Rather than allowing stairs to generate in the middle of a tile, we'd want to give the stairs an exact tile coordinate. Moving on top of the stairs should change the room description to a tile description, with a command to use the stairs. (Rather than clicking on the stairs as it works now)

---

As part of the changes to doors, we should also add an open or closed state to the door. All doors start closed. When a door is walked though its set to open. This won't have any effect until the doors start to block vision, but we could also add locked doors at some point.
