---
id: 234
title: Tile contents
priority: 1
created: 2026-09-21
tags: []
points: 3
---
---
We need a function in the room to set the tile contents. The orchard feature for instance, contains rows of trees. If a tile contains a tree, the party should not be able to enter that tile. I think the trees are simply cosmetic at this point. The addGlyph() function just draws a glyph in the room. We'll need something like a setTileContents() here. The tiles contents could contain a glyph (as it's defined now with a glyph, color, and size), a canEnter property (boolean or closure), and a text description for a tile that can be entered.
