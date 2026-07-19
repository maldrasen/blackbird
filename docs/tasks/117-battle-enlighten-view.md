---
id: 117
title: After battle control flow
priority: 2
created: 2026-07-17
tags:
  - battle
points: 5
---
---
When a battle is finished we show the Enlighten view. First there's information to display:
- Loot and essence from killed monsters. (essence is divided among party members.)
- Skill improvements.

Then we show the level up view for every character that leveled up that battle:
- On level up we choose one attribute to raise. (Should be partially random. The Species records have an attributes object with letter grades for each attribute, these govern the starting attributes, but should also influence attribute growth, giving bonus points in that attribute when the species have a high letter grade.) (Also also, we need to look at the monster auto leveling mechanics to make sure that they also follow the same attribute allocation rules. They should both run though the same leveling module.)
- It may be possible to unlock new aspects or special abilities. We'll need to tag some aspects  as being battle related. They provide passive bonuses, but should have some requirements that have to be met before they can be unlocked, minimum attribute or skill levels. The same is true for abilities, though they're active rather than passive, and will show up in the character's command panel. Hide and sneak attack will need to be unlocked this way and require a minimum dexterity. We need a data record for abilities like this first though.

Before we can start this we actually need to figure out the essence and level up mechanics. 