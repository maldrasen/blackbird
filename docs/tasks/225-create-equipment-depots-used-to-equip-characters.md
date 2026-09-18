---
id: 225
title: Create equipment depots used to equip characters.
priority: 1
created: 2026-09-16
tags: []
points: 8
---
---
Currently monsters get their equipment by defining a loadout. I think I'd rather move to a system that's more simulation based. A monster is created with skills and an equipment budget.

Because we need an actual component in order to determine the value of weapons and armor because of enchantments, we need real weapon components to be able to buy equipment. The current character equipper uses the base weapons and armor values, so we'll need to change it to first create a "store" filled with real weapons and armor that the character or monsters can then pick from to equip themselves.

A depot will need to define what kind of equipment can be bought there. This will need to define avail materials and bases that can be used. A kobold depot for instance should only include the weapons and armor the kobolds in the dungeon would have. A havlin depot would have havlin focused equipment. A general depot would have equipment that could be found in the city and used for the character equipper when building the player character.

Because weapons and armor are components these depots would randomly generate persistent equipment, and store their stock in an inventory. When weapons and armor are pulled out of the inventory we generate new equipment to restock the depot. 

We should also remove old stock that never gets bought. If we randomly build enchanted equipment that is never bought because it's unaffordable for the monsters being generated, it will slowly fill up the store, and may eventually prevent monsters from acquiring equipment. The item components aren't dated at all, so we don't currently have a way to know what the oldest items are. We could add an auto increment to the item, or perhaps the inventory in order to find the oldest items to be removed. We could also try more of a shotgun churn approach. Removing an item from the depot could randomly destroy 9 items from of the current stock, then generate 10 new items.
