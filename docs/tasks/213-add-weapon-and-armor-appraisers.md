---
id: 213
title: Add Weapon and Armor Appraisers and Virtual Stores
priority: 1
created: 2026-09-03
tags:
points: 0
---
---
Now that we've created an article appraiser to set the value of the Article records, it doesn't really make sense for the base weapons and armor to be calculating their values the way they are. Weapon and armor value will only get more complex once we start adding enchantments and such. 

This is a bit tricky because a real weapon or armor's value needs to look at the actual component. So the appraiser should work on an actual item entity. 
