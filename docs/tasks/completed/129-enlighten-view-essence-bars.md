---
id: 129
title: Enlighten View Essence Bars
priority: 3
created: 2026-07-22
tags:
  - battle
points: 5
---
---
Now that we have the first pass at the enlighten view done I want to start work on the styling.

The first think I'd like to update are the essence and level up views, as the way I want to handle level ups will change how the system works. Rather than looping though the level ups, I think I want to add a level up button for each character, that way we can do the levels in any order. The way I see this working is when the page opens we see a panel with an experience bar for each character. The bars start at the previous values and then animate the experience gains. When the bar fills it flashes white and the level up button is shown to the right of the bar. Hitting the button opens an overlay with the level up screen for that character. They choose the attribute to raise (and any other choices that need to be made) then hit a confirm button to close the overlay. That character's experience bar then animates again, filling up to either their current essence, or triggers another level up if they get multiple levels in one go.

