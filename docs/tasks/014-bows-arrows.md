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

As part of this we need a way for the character to select what ammunition they're using. The hard part here is that ammunition is not an item like everything else that can be equipped. So I think a character's ammunition quiver is going to have to be it's own special thing. We'll need to manage it on the equipment tab though. Maybe not in the equipment list, but in its own section at the bottom? Selecting the quiver open a list of arrows in the inventory. Selecting an arrow moves at most 20 arrows from the party inventory into the quiver, which I think needs to be its own component. After every battle the arrows should be restocked. If the character uses more than 20 arrows in a battle, they'll need to spend a round restocking. I think that sounds reasonable.

> The ammo requirement should only apply to party members. We don't track monster resources in the same way. Mostly, because I don't want to deal with another "this monster has no ammo" branch. The weapon attack has a `canCharacterAttack()` function already. We just need to check they have ammo in their quiver here.