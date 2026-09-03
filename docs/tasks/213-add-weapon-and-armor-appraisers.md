---
id: 213
title: Add Weapon and Armor Appraisers and Virtual Stores
priority: 2
created: 2026-09-03
tags:
points: 13
---
---
Now that we've created an article appraiser to set the value of the Article records, it doesn't really make sense for the base weapons and armor to be calculating their values the way they are. Weapon and armor value will only get more complex once we start adding enchantments and such. 

This is a bit tricky because a real weapon or armor's value needs to look at the actual component. So the appraiser should work on an actual item entity. However, the character equipper need the values of the base weapons to know what equipment is in budget for a character.

---
### Prerequisite Task
One solution to this problem may be to slim back the use of the base weapons and armor, removing the variants entirely. We could fully make each weapon or armor in the game a real component. I think the equipper is the only thing that really uses the base weapons and armor, and uses value. We could update it to simulate a shop. Have the equipper build a virtual store, randomly building a bunch of equipable items, then characters select from those items what to buy. This might be a better approach because we can build a virtual shop that matches a monster type. A 'kobold store' that takes a monster type, would be a more extendable solution than giving each monster a list of equipment loadouts.

This prerequisite work alone is probably several tasks. We'd need a store builder that builds this virtual store. We'd need to define different stocks for the different monster species. We'd need to update the equipper to select at random from the randomly selected stock. (same strategy, the budget defines the most they can spend on any single item, but can buy enough to fully equip themselves.) We'd need a cleanup step where the unselected items in the store are deleted. 

One other advantage to this strategy is that we could sometimes stock enchanted items, a monster that buys something enchanted would then drop it after the battle, which takes care of the enchanted weapons as loot task that I still needed to figure out.
