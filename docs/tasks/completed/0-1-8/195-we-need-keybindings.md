---
id: 195
title: We need keybindings
priority: 1
created: 2026-08-21
tags:
  - battle
  - dungeon
points: 5
---
---
Clicking a button, then clicking a target, is starting to feel like it takes a long time. We need to add keybindings to the battle and dungeon systems that make some actions quicker. Common actions can be given default keys, 'a' for attack, 'h' for hide, etc. A keyboard listener can listen for those keys when the command panel is shown. When targeting the targeting mode can listen for keys 1-0, [1-5 front row, 6-0 back row] to use a key event to select the target position. We can also add keyboard shortcuts for dungeon navigation. We can bind wasd to door movement, to go through a door on the wall in that direction. (Just pick the first door if a room has multiple doors on one wall)

We can also add keybinding options to the options menu, allowing the player to set it to whatever they want. We should do the configuration at the same time, so we know that we need to get the key from the option. Options can be changed at any time, so the registered keyboard will need to listen for any key, and see if it matches one of the configured commands. Perhaps we don't allow the options to be saved when actions on the same view are mapped to the same key.
