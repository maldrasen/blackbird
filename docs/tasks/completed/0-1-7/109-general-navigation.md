---
id: 109
title: General Navigation
priority: 1
created: 2026-07-14
tags: []
---
---
We start the game in the player's home, but there's still no way to get from the home to the dungeon or anywhere else. Before anything else can be done in a proper game we need to be able to move from place to place. The way I see this working is, when we're in the player's home, they can click on a map to move around the home. The home map will change as more rooms are added. They can click a different map button to go out, bringing up the city map. This map remains the same, but more as city locations are unlocked they'll show up as clickable on the map. For now, I think each map is just a list of links until we've progressed further and have an idea of what locations there are.

So first, split location into two variables, a location and a district. Changing the location, moving around the house, doesn't change the district. Moving to a new district, sets the location to the entry point of the district. When going to the dungeon you navigate to the dungeon district. And from the district entry point location you can enter the dungeon or go to another location within that district.

Moving also takes time. Without a map though I don't really know how long it should take to get from place to place. For now we can just hard code the time values. It takes an hour to change districts. The district defines the time it takes to move from location to location, maybe a minute within the house, or 10 minutes in a shopping district or something.