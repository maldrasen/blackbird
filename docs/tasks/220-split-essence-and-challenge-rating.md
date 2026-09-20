---
id: 219
title: Split essence and challenge rating
priority: 1
created: 2026-09-12
tags:
  - dungeon
  - battle
points: 8
---
---
Essence is pulling double duty. It has an in world meaning: the concentrated magic a monster contains, which the party absorbs when the monster dies. It's also the number the encounter builder uses to decide which monsters to include in an encounter, and the number the loot generator uses to size a monster's drops. Those are different questions. A kobold with a spear is more dangerous than a naked one, but it doesn't contain any more magic.

---
Now that we've reworked the character equipper to use the depots, I think the best way to go about this is to simply use the monster's equipment budget here. The monster's abilities plus what they could potentially be equipped with represents how dangerous a base monster is. Because this number is used by the encounter builder, it needs to work off of the base monster, not whatever an actual monster happens to be equipped with.

The loot generator should also use the challenge rating rather than the essence value. Theoretically a monster could be weak but rich, and should drop better loot accordingly. One way to make that happen would be to give them a large budget, and an equipment depot full of expensive enchanted items. If monsters have enchanted items in their inventory when they die, they'll be dropped as loot. 
