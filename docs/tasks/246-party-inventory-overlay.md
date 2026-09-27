---
id: 246
title: Party inventory overlay
priority: 2
created: 2026-09-27
tags:
  - character
points: 5
---
---
Follow on to task 243. Once the party has a single shared inventory, it needs its own view. The character overlay's inventory tab is gone, so until this task lands there's no way to see the inventory at all.

The overlay is opened from the game state frame and lists everything in `InventoryManager().listItems()`, items and articles. Two commands to start with:
- **Use** for consumables usable out of combat. Since any party member can use anything in the inventory, using an item first asks which character it's for (a select over the party), then runs `Consumable.consume(target)`, removes one from the inventory, and shows the result in the `ConsumeOverlay`. Show the target's health and mana somewhere in the flow; the old character overlay version hid the very bars you'd want to watch after drinking a potion.
- **Drop** with a confirmation, destroying the item.

The old inventory panel's row markup and styles (deleted in 243, recoverable from git history) are a fine starting point. This overlay is also the natural home for the battle use-item command when that gets implemented.
