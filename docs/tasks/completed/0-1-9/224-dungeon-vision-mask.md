---
id: 224
title: Dungeon Vision Mask
priority: 1
created: 2026-09-16
tags:
  - dungeon
points: 8
---
---
Now that we've transitioned to tile based movement, I'd like to work on some of the dungeon's graphics. I think some rudimentary lighting and vision could add a lot to what's there. We're still going to be doing all the graphics as simple SVGs. Eventually I may try to explore other rendering options, but I'd like to explore what's possible without going full WebGL. 

For this task I'd like to add a party vision system. The way I see this working is we divide the dungeon view into multiple layers. The bottom layer is the fully lit version of the dungeon. Above that we add vision mask layers. The first mask is the light radius, used to progressively obscure everything a certain distance from the party marker. Rather than drawing what's lit on the map, we're adding darkness on top. We can then add a shadow layer on top of the light radius. If you walk into a corridor for instance, the doorframe will clip your view into the room. We'll draw black polygons onto the areas that should be obscured. 

Party movement is smooth, so the geometry of what should be obscured from the marker's position will need to be calculated every frame. 

Finally, the very top layer will be the memory layer, which will have the outlines of all the viewed walls and architectural features. The outline serves as both a persistent dungeon map, but also as trim, helping with some of the line thickness issued we'd have drawing the obscuring shapes. A pillar, drawn with a glyph, for instance should cast a shadow. We don't know the exact shape of the glyph, but if we start a line cut halfway though it, ray cast a shadow, then draw the glyph again on top of it, it should look fine.

### Goals
- As the party moves through the dungeon, each frame, compute a 2D visibility polygon from the marker's drawn position against the wall segments. See Red Blob Games' "2D Visibility" article: sort segment endpoints by angle and sweep. Doors are segments, open doorways are gaps. Only consider segments within a bounding box around the light radius.
- Walking from a corridor through a doorway into a large room should visibly widen the cone as the marker crosses the threshold. That's the effect we're looking for.
- If a tile contains a glyph, the contents can be set to cast a shadow. The shadows should at least take the glyph size into consideration.
- The vision polygon is only cosmetic. Monsters aren't on the map, so there's no gameplay field of view to keep in sync.
- No blur. Build the mask as a single SVG `<mask>` (or `<clipPath>`) whose path `d` is rewritten every frame. The light radius falloff can be a radial gradient or a couple of concentric opacity steps.
- Areas seen before but not currently visible are drawn dimmed (with a darker line). Areas never seen are hidden.
