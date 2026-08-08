---
id: 118
title: Room floor and wall textures
priority: 4
created: 2026-07-17
tags:
  - dungeon
points: 5
---
---
We'll be using procedural generation to draw patterns on the floors and walls of the dungeon. Each dungeon theme will have a floor and wall painting function that we pass the room into. It will find the room svg element, find each wall, and paint a texture inside the wall's bounds. We don't have a floor element, so we'll add that and paint the floor texture as well.

This first texture should be dead simple, just the floor and wall grid lines. The wall texture will need to calculate the paintable area on a wall, taking corner occlusion into consideration. Having a general function to get the paintable area on a wall tile will help with the door improvements, as well as any other "wall graphic" we might want to add.

The floor texture too needs to determine the shape of the floor not covered by a wall.