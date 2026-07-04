---
id: 005
title: Random Seeds
priority: 2
created: 2026-07-03
tags: []
---
In order to make bugs more reproducible, we should give the random class a seed. We should turn Random into an object and call `Random(seed).roll()` rather than just `Random.roll()`
