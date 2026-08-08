---
id: 114
title: Rework death mechanics
priority: 2
created: 2026-07-17
points: 8
tags: []
---
---
Characters are killed when they drop to 0 HP. I want to rework this so that there's a chance that they'll only be mostly dead. When an attack brings a character to 0 HP they're knocked out. Only a character that drops below a negative threshold will be killed. Threshold should be based on vitality, maybe at -vitality they're dead. That or something like -10% of max health. We'll look at the numbers. 

First we need to update the health component to allow negative health. 

The battle mechanics stay the same, a knocked out character is removed from the formation. After the battle we revive a knocked out character immediately. There are no mechanics for reviving a knocked out character. We just add a message in the enlighten screen saying that we were able to save them, returning them with 1 health. 

They'll also need to be returned to their original position in the formation. When a character is actually killed, then they're removed from the party configuration. 

We should also change the game over mechanic. Currently if the player dies, we show the game over episode. If the player is killed (below the negative health threshold) the game is still over. If they're simply knocked out though, the player will be revived after the battle and we can continue. The game is also over when all the characters are either killed or knocked out. (The formation is empty.)
