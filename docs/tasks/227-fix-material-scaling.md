---
id: 227
title: Fix Material Scaling
priority: 1
created: 2026-09-18
tags: []
points: 2
---
---
The damage roll gets the low and high damage range from the base weapon, but the base weapon doesn't have the item material. The root problem here is that we used to pass the base weapon around, because monsters and characters all had base weapons for their attacks. We've moved to every weapon attack having a real weapon component now though. So as part of fixing this, we should find every place in the battle system where we're passing the base weapon code and pass the weapon entity instead. (It may just be this one place)

We also will need to update the item to apply the material factors to the damage range, based on the damage type being done.