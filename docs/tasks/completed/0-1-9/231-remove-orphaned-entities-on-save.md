---
id: 231
title: Remove orphaned entities on save
priority: 1
created: 2026-09-20
tags: []
points: 3
---
---
There are already a few instances where we can end up with orphaned entities in the registry. This is kind of a memory leak, and something we need to look into. Rather than ensuring that no orphaned entities are ever created, it's probably fine to just occasionally search for them and remove them from the registry. It should be sufficient to sweep before before save, and probably when the game changes mode as well. We're basically looking for items that aren't in an inventory, or monsters that persist outside of a battle. 