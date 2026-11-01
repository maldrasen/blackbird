---
id: 014
title: Bows & Arrows
priority: 3
created: 2026-07-03
points: 5
tags: [battle]
---
---
Another weapon category to implement, though this one should be fairly easy. We don't currently have any concept of ammo though, so we need to make sure a character has arrows before they can use their bow.

> The ammo requirement should only apply to party members. We don't track monster resources in the same way. Mostly, because I don't want to deal with another "this monster has no ammo" branch. The weapon attack has a `canCharacterAttack()` function already. We just need to check they have ammo in their quiver here.