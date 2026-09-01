---
id: 203
title: Inventory panel should include articles.
priority: 1
created: 2026-08-25
tags:
  - character
points: 3
---
---
We have an room where we pick up dungeon tripe, but it's not showing in the inventory. Turns out we only show items in the inventory panel, but not articles. We need to also include the articles in this list. We need to make sure that the unequipped items are in the order specified in the InventoryCategory. (It's an associative array right? Order should be preserved)

We should also add a use button to the inventory panel for usable items. Usable items need a way to mark themselves as being usable from the inventory. 

The effects array isn't enough to mark items as having an out of combat use as grenades are also "usable" and have effects. Maybe a 'usableWhen' enum, with any-time, in-combat, out-of-combat. Some healing items like foods, or mutagens can't be used in combat, but a potion or a drug could be.  
