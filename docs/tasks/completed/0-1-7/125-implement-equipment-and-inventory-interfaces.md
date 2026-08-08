---
id: 125
title: Implement equipment interface
priority:
created: 2026-07-19
tags:
  - character
points: 8
---
---
OK, before we can do much towards the 'real game' we need to be able to change a character's equipment. This will be almost entirely UI work. We have equipment and inventory managers to do most of the work here, they just need to be wired into a UI. The UI itself is going to be complicated, as these things often are, so we should just start with the easiest version possible. Eventually I think I'd like an entire PoE style equipment grid, but that can come later. 

For now all we need is a list of all the items a character has in their inventory, inside of a scrolling panel. The list is ordered such that currently equipped items are at the top of the list, ordered then by equipment slot. Below the inventory list we want a horizontal button panel for all of the inventory verbs. Clicking on a piece of equipment will select it. Then, clicking an "equip" button, equips it and moves to the top of the list. We'll show an icon on the left of the item name showing what slot it's equipped in as well. We'll also want verbs to use, drop, or trade an item.

Clicking trade should open a panel to the right of the item list with all the inventories that can be reached. Each character has their own inventory, and if that character is in the party configuration their inventory can be reached at any time. If a character is in the roster we can access their inventory if they're in the same location. If the character is in the home district there could be an "armory" inventory, once the armory has been built. The party could also find a "bag of holding" of some sort, adding a shared inventory that can always be reached by any party member.

This interface should be it's own view, so it can possibly be reused. For now though the panel that the view builds will only be displayed in the inventory tab in the character overlay panel. Also, we should only be able to open the character overview panel for the player or characters that are in the roster, not NPCs or monsters. We still need a monster inspect panel and an NPC panel for that.