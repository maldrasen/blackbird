---
id: 136
title: Difficulty Sliders
priority: 2
created: 2026-07-24
tags:
  - battle
points: 5
---
---
We need to add a few difficulty sliders to the options overlay. As of writing, the options are completely empty, so we'll also need to work out how changing the options updates the world state. I think we need:
- Damage (50% - 500%)
- Health (50% - 500%) 
- Resistance (0% - 100%) 

Not sure yet how these factors could be applied universally. They can be changed at any time so we wouldn't change a character's max health. Instead we need to have a getMaxHealth() and getCurrentHealth() function where this factor can be applied. That means we need to be careful not to use the raw values in the component though. Need to be careful leveling up as we don't want to getMaxHealth() and then update the component, as that would feed the factor back into the component.

Right now I think difficulty only applies to the battle system. We may allow training difficulty to be changed at some point too. But given that this is primarily a sex game, I anticipate that the audience is going to be split between people who want an actual game and people who don't really care about the rpg combat and dungeon crawling part as much, or at least would prefer a completely challenge free version. Having these sliders will also make testing easier.