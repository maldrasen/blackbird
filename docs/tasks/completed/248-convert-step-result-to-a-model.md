---
id: 248
title: Convert step result to a model
priority:
created: 2026-09-29
tags:
  - dungeon
points: 3
---
---
The object returned by `step()` in the DungeonNavigationSystem is way too complex to be a plain object. We should really convert it into a model so that it's clear what that object can contain. 