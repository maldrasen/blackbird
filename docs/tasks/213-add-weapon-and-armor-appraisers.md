---
id: 213
title: Add Weapon and Armor Appraisers
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
