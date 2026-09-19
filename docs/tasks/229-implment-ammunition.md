---
id: 229
title: Implment ammunition
priority: 2
created: 2026-09-19
tags:
  - battle
points: 3
---
---
The equipment depots are now giving characters bows. They're working as normal weapons in the weapon attacks, but they're not using ammunition at all yet. A character should only be able to use their bow when they have arrows, and each shot removes 1 arrow from their inventory. Also, characters should have a quiver, used to specify which arrows they're using if they have multiple types. If they run out of arrows they'll need to use a change equipment action to add more arrows to their quiver.

Monsters can also have bows, and we need to know what arrows they're using in order to add the arrow damage to their shots. Unlike the party characters though, monsters won't expend ammunition when shooting. We don't track monster resources anywhere, so this should remain the rule.



