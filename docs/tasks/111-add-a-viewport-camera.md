---
id: 111
title: Add a Viewport Camera
priority: 1
created: 2026-07-16
tags:
  - dungeon
---
---
The panning is a little too jerky, and not fun to watch. I think we'll eventually need to extend this by making the current room a camera target, and panning towards it, but the pan itself needs to have acceleration and velocity as it moves towards the target. Vector math stuff. Camera motion should be its own module.
