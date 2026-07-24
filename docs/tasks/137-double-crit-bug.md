---
id: 137
title: Double Crit Bug
priority: 1
created: 2026-07-24
tags:
  - battle
points: 8
---
---
Sneak attacks aren't rerolling attack and defend double crits. 

```
damage-roll.js:34 Uncaught Error: The attack and defend cannot both be crits. This should have been rerolled.
    at global.DamageRoll (damage-roll.js:34:40)
    at Object.processHit (physical-attack-system.js:11:24)
    at Object.execute (sneak-attack.js:28:28)
    at Object.execute (ability.js:17:15)
    at Object.targetSelected (targeting-controller.js:23:29)
    at targetSelected (formation-panel.js:135:25)
    at exacto.js:58:9
```

This is a bigger problem than it looks at first. Every ability that makes a physical attack is going to have to handle this. I think we need to combine the physical attack roll and defend roll into a single unit so that they always come in a pair. 
