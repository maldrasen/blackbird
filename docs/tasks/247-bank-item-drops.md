---
id: 247
title: Bank item drops into the party inventory
priority: 2
created: 2026-09-27
tags: []
points: 2
---
---
Follow on to task 243. Defeated monsters drop their enchanted equipment into the loot inventory at the end of a battle, but nothing ever reads it back out. `EnlightenSystem.discardLoot()` deletes the items when the enlighten view is closed, and `WeaverElements.lootEntry()` throws if it's handed an item rather than an article.

With a shared party inventory there's no longer a "who gets this" decision to make. `bankLoot()` should move the loot inventory's items into the party inventory alongside the articles, the enlighten state should carry item entries so the view can list them, and the loot block needs to render an item row. The loot inventory itself stays as the staging area between battle cleanup and enlightenment.
