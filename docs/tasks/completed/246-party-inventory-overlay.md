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

The overlay is opened from the game state frame and lists everything in `Inventory().listItems()`, items and articles. One command to start with:
- **Use** for consumables usable out of combat. Since any party member can use anything in the inventory, using an item first asks which character it's for (a select over the party), then runs `UsageSystem.useArticle(target, code)`, removes one from the inventory, and shows the result as the consumable's `onUse` property directs (an alert for most consumables). Show the target's health and mana somewhere in the flow; the old character overlay version hid the very bars you'd want to watch after drinking a potion.
- ~~**Drop** with a confirmation, destroying the item.~~ Left out for now. Items have no weight and everything should have some use, even if it's only to be sold, so there's nothing to gain from dropping and no need to decide what's allowed to be dropped.

The old inventory panel's row markup and styles (deleted in 243, recoverable from git history) are a fine starting point. This overlay is also the natural home for the battle use-item command when that gets implemented.

> Actually, perhaps we only show the targeting panel when an item is selected that needs it.

> Actually actually, we can make the inventory a "very narrow" overlay, place the party selection into a right side "wing". Even in a very narrow overlay the frame is still wider than it is tall in the minimum size window, so left and right sides for the list and details still work.