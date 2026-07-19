---
id: 125
title: Implement equipment interface
priority:
created: 2026-07-19
tags:
  - character
points: 5
---
---
OK, before we can do much towards the 'real game' we need to be able to change a character's equipment. This will be almost entirely UI work. We have equipment and inventory managers to do the work, they just need to be wired into a UI. The UI itself is going to be complicated, as these things often are, so we should just start with the easiest version possible. Eventually I think I'd like an entire PoE style equipment grid. 

For now though all we need is a list of all the items a character has in their inventory. The list is ordered such that currently equipped items are at the top of the list, ordered then by equipment slot. Clicking on a piece of equipment will equip or unequip it. It moves to the top of the list. We'll show an icon on the left of the item name showing what slot it's equipped in as well. Items should be colored according to their rarity. 

We'll also need a way to trade items between characters. To the right of the item list we can add a panel with all the inventories that can be reached. Each character has their own inventory. If the character is in the home district there could be an "armory" inventory, once the armory has been built. The party could also find a "bag of holding" of some sort, adding another inventory that can always be reached by any party member.