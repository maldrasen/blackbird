---
id: 139
title: Fix Stamina
priority: 3
created: 2026-07-25
tags:
  - character
  - battle
  - training
points: 3
---
---
There's a design problem in the game where stamina has two meanings. Stamina is used in battle as a cost for using physical abilities. This is your "how far can I sprint" stamina. We also use stamina in training to mean a general energy, to limit how many times you can train them in a day. Sex acts use stamina, but this stamina doesn't get restored after training. The game also has a game time in minutes, where events happen on a schedule. A character's control is adjusted every day and I was thinking that happens when they sleep. So we also need to track how tired a character is. 

I think an interesting way to handle all of this would be to have a character's max stamina drop as they grow tired. If a character's been awake for 16 hours we should start seeing their stamina drop. These 'lack of sleep' tiredness penalties start slowly at first, but build over time. Sex actions during training also reduce max stamina. Sleeping will restore max stamina, though I don't think it should restore all lost stamina. If a person has been driven down to 0 max stamina sleeping 8 hours might only restore half their stamina, leaving them tired the next day.

This mirrors how training works in ERA games as well, where a long training session can leave a character with lower energy the next day. 

As a separate task we can also add a couple of status effects to mirror this behavior for health and mana. A disease that reduces max health until it's cured and maybe a curse that reduces max mana. We'll need to adjust the bar display to show both the normal max and the reduced max. 