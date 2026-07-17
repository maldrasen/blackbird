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

---
**Notes (Claude):** Bow records/data already exist (`data/weapons/bows.js` — ranged reach, 'shoot' text, damage on stave tension). The genuinely new thing is ammo: arrows as inventory items, a check that a bow-wielder has arrows before the attack is enabled, and consuming them on use. Touches inventory (`inventory-manager`, `inventory-component`) and attack availability. "Fairly easy" per your note, but ammo is a new sub-concept the rest of the game doesn't have yet.
