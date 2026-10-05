---
id: 256
title: Unhack WeaverElements lootBlock
priority: 2
created: 2026-10-05
tags:
  - episode
  - weaver
points: 3
---
---
Because the WeaverElements is part of the application layer it can't use the ItemName when it builds the loot blocks. The root of the problem here is that an episode like `orchard-empty` is using a contentFunction to add items into the inventory and display the results in a weaver generated loot block. I think the proper fix for this is to give episode pages a loot property. If a pages adds loot we can it to the inventory when the system displays the page. The view should get a loot block with item ids and article codes and build the loot block as an element in the view, rather than doing that in the weaver. Loot blocks will then be able to show icons and rarity colors as they should.