---
id: 233
title: Improve grid movement
priority: 1
created: 2026-09-21
tags: []
points: 3
---
---
We've finished up the grid movement conversion, but there are a couple improvements we should make to it before moving on.

### Input Blocking
First, with a traditional roguelike movement system it feels bad when a direction input is ignored. If a direction key is pressed while a movement animation is playing that movement is blocked. The movement animation is important though because it will allow for the vision cones to be animated as the party is moving. I think we could slow down the step animation to about 200ms. Five tiles a second seems like a reasonable speed. However if a player presses the movement keys faster than that, we should just skip the remainder of the current animation, and always play the most recent move.

If these skips happen often, the movement will look jerky, so it's still something to tweak over time. Another thing we could do is make the movement speed a game option. Some players might prefer a faster or slower movement speed. 

### "Running"
We handle repeating keys when a movement direction is held down. We could use that to signify that the characters are running. Instead of each step taking 200ms we could reduce that to a step every 100ms while the key is down. We don't want to wait though for the OS key repeat though as the long pause between a key press and the repeat is a bit too long. Rather, I think we need to track key up and key down, if the movement key is still down after 200ms, we enter into a run mode until an obstacle is hit. Going into a run mode could also have game play repercussions. A running party may have penalized scouting rolls, which will matter once we start doing tile based scouting checks. 

