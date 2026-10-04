---
id: 255
title: Show item rarity
priority: 2
created: 2026-10-04
tags: []
points: 5
---
---
When working on the party inventory overlay I added rarity colors to the scss variables and the rarity helper. Thinking about this problem though, this is probably enough work to be its own task. The end goal for this task is when we display an item or an article anywhere in the UI it should have the rarity color. But that means we need shared helper, one of the view elements that creates an ItemName element (as a real element or as an html string), with or without an icon. We should be able to color the icons as well with a css color filter. Currently the item icons are all white shapes on a transparent background.