---
id: 239
title: Dungeon Light emitters
priority: 3
created: 2026-09-26
tags: []
points: 5
---
---
I think it would be cool to add things like torches or bonfires to the dungon view. A light emitter could be a type of tile content. It doesn't sound like this would be terribly complex, though we'd have to change how the light layer is written. Instead of cutting a circle out of a black rectangle using evenodd and obscuring everything outside of the light radius using a radial gradient, we instead create a `<mask>` element. In the mask, each light source, including the party would add a circle with a radial gradient from black (or mostly opaque black, probably should depend on light strength) to transparent, clipped to the light's visibility polygon. Black areas would stack, becoming darker as circles merge together. These lights could be given color as well using blend modes like screen or plus-lighter.

The difficult part here is we'd need to define a line of sight polygon, which would be much larger than the light radius. Fortunately, because this is a dungeon crawler and not an open world, the line of sight will usually be obscured by something. It will be rare to have long stretches of uninterrupted tiles. It's possible, even with the current dungeon builder to have such a stretch though, doors that happen to line up through several connected rooms. The radial gradient may make a return here as a "fog" layer. Obscuring lights that would otherwise be visible off in the distance.

I think we also need to look at the dungeon camera, and reduce how far it's able to zoom out. If we keep the camera in close, and keep the line of sight just under what could be on the screen at a time, that should help the performance. It's also easier to get lost when you can't see the whole map at once, even though you can still pan as much as you want.