---
id: 119
title: Dungeon color themes
priority: 4
created: 2026-07-17
tags:
  - dungeon
points: 3
---
---
Each dungeon theme will have it's own color scheme. We can define a few base colors and calculate a range of darker or brighter colors from the base. These colors should probably still live in the SCSS file so we don't have to embed them in style tags. They'll just be selected given a top level dungeon theme class.