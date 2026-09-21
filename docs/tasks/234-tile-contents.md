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

We're going to have to update the orchard so that the trees are more spread out so that the party can actually walk through the orchard. Currently, we're drawing about 2 trees a tile. Instead we need to update the orchard so that there's an empty row between each row of trees, and that the outer parameter remains empty so that the trees can't block the doors. We need to eliminate the smaller sized orchards. A 7x7 room, containing three rows of three trees would be the minimum.

We should also reduce the size of the party marker, down to about half of what it currently is.

The mana fonts should also block the center tile because of the statue in the center.