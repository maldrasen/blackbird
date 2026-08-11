---
id: 177
title: Add a status effects component
priority: 2
created: 2026-08-11
tags:
  - battle
  - character
points: 5
---
---
Now that we're adding consumables and item effects, we need to be able to handle temporary effects. 

### We already have battle status effects
Some effects could only last for a battle. A "Potion or Rage" or some such could add a battle effect that lasts for a set number of rounds. That's already taken care of. We'd just need to make sure that the battle state exists when applying the effect. I don't think we'll guard against a person taking a combat potion outside of battle. A "Potion of Rage" could even have a dramatically different effect when taken during training. 

### The status effect component
What's really needed is an effect that might last a few hours or a day. We would need to tie this into the time system, set an expire time on the effect when its added. We'll need a new component to track this as these effects should be in the saved game state. We'll need a way to know which status effects only apply to a battle and which don't. Some effects may apply both in and out of battle. Drunk for instance could last for an hour, but would definitely effect battle stats.

The correct thing to do here would be to move all status effects to being component based. And we just delete the ones that don't persist after the battle. 
