---
id: 120
title: Improve Door Rendering
priority: 3
created: 2026-07-17
tags:
  - dungeon
points: 8
---
---
Because I didn't write the door rendering, I don't really understand how it works. I think I'm going to need to completely rewrite this by considering the context that the door is being displayed in. A door in a north corner, obscured by the east wall will need special handling, as placing the door in the "known safe area" doesn't look great in all situations. The hangy offey doors don't look great either. We'll need to at least offset the top and bottom lines properly. I think we start this by making sure we can draw a tile sized box on a wall.