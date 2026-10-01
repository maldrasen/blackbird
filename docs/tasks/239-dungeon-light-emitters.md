---
id: 239
title: Dungeon Light emitters
priority: 3
created: 2026-09-26
tags:
  - dungeon
points: 5
---
---
I think it would be cool to add things like torches or bonfires to the dungeon view. A light emitter could be a type of tile content. It doesn't sound like this would be terribly complex, though we'd have to change how the light layer is written. Instead of cutting the visibility polygon out of a black rectangle using evenodd and fading out the edge of the light with a single radial gradient over the whole floor, we instead create a `<mask>` element. In the mask, each light source, including the party would add a circle with a radial gradient from black (or mostly opaque black, probably should depend on light strength) to transparent, clipped to the light's visibility polygon. The mask starts as a white rectangle (darkness everywhere) and each light paints black into it. Where lights overlap the black stacks, hiding more of the darkness, so the floor gets brighter where lights merge.

These lights could be given color as well, but not inside the mask. A mask only uses luminance, so any color drawn into it is lost. Color needs its own layer: colored radial gradients drawn over the floor with a blend mode like `screen` or `plus-lighter`, clipped the same way as the mask circles.

The difficult part here is we'd need to define a line of sight polygon, which would be much larger than the light radius. Fortunately, because this is a dungeon crawler and not an open world, the line of sight will usually be obscured by something. It will be rare to have long stretches of uninterrupted tiles. It's possible, even with the current dungeon builder to have such a stretch though, doors that happen to line up through several connected rooms. The radial gradient may make a return here as a "fog" layer. Obscuring lights that would otherwise be visible off in the distance.

I think we also need to look at the dungeon camera, and reduce how far it's able to zoom out. If we keep the camera in close, and keep the line of sight just under what could be on the screen at a time, that should help the performance. It's also easier to get lost when you can't see the whole map at once, even though you can still pan as much as you want.

We would also need to add torches, bonfires, braziers and such as tile contents too as part of this.

### Technical Notes
- **One gradient for every light.** A radial gradient with the default `gradientUnits` (objectBoundingBox) centers on whatever shape uses it, so a single `<radialGradient>` def can be shared by every light circle. Light strength can come from the circle's `opacity` instead of separate gradient stops. Each light still needs its own `<clipPath>` for its visibility polygon.
- **Static lights are cast once.** A torch doesn't move, so its visibility polygon can be computed when the floor is built and only recomputed in `openDoor()`, when the occluders change. Each frame still only recasts the party's light and the line of sight polygon.
- **Line of sight clips the lights.** The light circles in the mask go in a group clipped to the party's line of sight polygon. Anything outside the line of sight keeps the white background, so it stays dark even if a light reaches it. The trim clip becomes the union of the light polygons (a `<clipPath>` with several paths is already a union), clipped to the line of sight as well.
- **Glyphs and seen tiles.** `isLit()`, `updateGlyphs()`, and `markSeenTiles()` all test distance from the party's light today. They'll need to test "inside some light's polygon and inside the line of sight" instead. It also needs deciding whether a tile lit by a distant torch counts as seen.
- **Lights added after build.** `replaceTileGlyph()` already refuses shadow casting glyphs added after the floor is drawn. A light emitter that can be lit or put out later (a torch the party lights) would need to add or remove its mask circle and clip path in the same way.
- **Performance.** The per frame cost is mostly the polygon math, which scales with how many wall segments fall inside the box passed to `DungeonVisionOccluders.nearby()`. The line of sight radius sets the size of that box, so keeping the camera in close (and the line of sight just under what fits on screen) is what keeps it cheap. Repainting the mask scales with the pixels on screen, which zoom doesn't change much. It's worth measuring before tuning either.
