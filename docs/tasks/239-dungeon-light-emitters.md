---
id: 239
title: Dungeon Light emitters
priority: 2
created: 2026-09-26
tags: []
points: 5
---
---
I think it would be cool to add things like torches or bonfires to the dungon view. A light emitter could be a type of tile content. I'm not sure yet how complex this will really be. The party's "Light" is currently implemented by obscuring everything outside of the light radius. We draw dark on top of the map, rather than drawing in the light areas. To add multiple lights we might be able to just punch holes into the obscuring mask. I have no idea how well SVG would handle that. If that won't work we may need to change the lighting system entirely, moving to something like a grid of obscuring tiles that have their opacity reduced by the light value of each tile. The light grid could be a different resolution than the dungeon grid, making the lighting look smoother (though not as smooth as the current implementation). It's something that we need to investigate though.

We should also look into giving lights a color value as well. Again, I'm not sure if the current light mask approach could handle blending colors together. A tile based lighting approach though take the color (rgb) and intensity (0-255) from a light source, split the light levels into three channels, blend them, and give each tile an rgba value.

I think this new light grid, if we end up doing it, should be at least nine times the resolution? (This is nine light grid tiles for each dungeon grid tile, or 3x in the horizontal and vertical directions) 
