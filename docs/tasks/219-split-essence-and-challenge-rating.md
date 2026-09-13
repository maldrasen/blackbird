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

Split the value in two. Essence stays intrinsic: attributes, health and speed factors, natural abilities, and spells (tasks 211 and 218). A new challenge rating starts from essence and adds everything extrinsic: the equipped weapon's damage and speed through the attack essence math, armor, and the consumables the monster can use through the effect essence math, with the article use time as the period. The word threat is already taken by battle targeting, so this borrows the D&D term.

Consumers to move: the encounter builder and `bin/compile-essence-data.js` switch to the challenge rating (the compiled data should carry both values), the enlighten award stays on essence, and the loot generator needs its own decision about which value, if either, sizes the drops. The ability essence report should show both numbers side by side so task 216 can balance against them.
