---
id: 245
title: Equipment slot panel
priority: 1
created: 2026-09-27
tags:
  - character
points: 3
---
---
Precursor to task 243. Equipment should be managed from the character's equipment slots rather than by clicking an item in the inventory list. The character overlay gets an Equipment tab showing one row per `EquipmentSlot` with the equipped item (or "Empty"). Clicking a row opens a select listing the equipment that can go in that slot, plus an unequip option when the slot is filled. Choosing one equips it.

The panel is built against the current per-character inventory model so it can ship on its own. It calls three new functions on `InventorySystem` (`getEquipmentForSlot`, `equip`, `unequip`) that are thin wrappers over `EquipmentManager` for now. Task 243 changes only their bodies to read from the party inventory, so the panel needs no rework when the model changes.

The old inventory panel is left alone here. It's deleted in the first step of task 243.
