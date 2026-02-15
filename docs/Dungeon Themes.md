### Range and Rarity
Each Dungeon Theme should have a range and a rarity. Right now, I think I'm just going to arbitrarily set the floor level limit to 10. Each level will increase the difficulty of the encounters, and if there are only ten levels then monsters should ramp up in difficulty fairly quickly. The level effects all the loot generated and such as well.

Each theme has a level range that it can be encountered within. Range can be a two element array with a lower and an upper bound, a single level if the theme can only be found on a specific floor, or if the range is null then the theme can be encountered on any level.

We also give each theme a rarity on a scale of 0 (very common) to 4 (very rare)