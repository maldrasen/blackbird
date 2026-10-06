---
id: 257
title: Turn DungeonControl into a GameControl
priority: 2
created: 2026-10-06
tags:
  - dungeon
points: 5
---
---
The controls I built for the dungeon share a lot in common with what the locations will need to have. The party and inventory buttons are already in both places. The location is missing a way to open a character overlay for someone in the party. 

The locations will still need to have a list of people in that area to start an interaction with them. Other location specific actions (i.e. "enter the dungeon") and the location description could be moved into the controls. 

The move command is also different in the locations, but could be moved into the controls and only shown when we're at a location. 

Because the character cards are in these controls though, the Game State frame won't need to show the character health, or have a button to open the character overlay for the player. The time and location could also be moved into the dungeon controls (showing the current dungeon level as the location), which would leave the game state frame completely redundant. 

Also, if we're going to be updating the control UI, we should do the character card rework (task 258) first. 