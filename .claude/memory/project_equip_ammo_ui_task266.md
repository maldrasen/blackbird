---
name: project-equip-ammo-ui-task266
description: Task 266 equip-ammo-in-UI design — view-only ammunition pseudo-slot, candidate rows without quantities, counts in the detail panel, flex:none fix
metadata:
  type: project
---

Task 266 (implemented 2026-10-13, branch `266-equip-ammo-in-ui`) added an "Ammunition" row to the character overlay's equipment tab.

- The slot is a view-level constant in `EquipmentPanel` (`ammunitionSlot = 'ammunition'`, inserted after Secondary by `listSlots()`), NOT an `EquipmentSlot` value: EquipmentComponent.validate, EquipmentManager, Inventory.addItem, OrphanSweeper and LootGenerator all assume slot values are item ids.
- Candidate rows are generic `{ key, nameOptions, isEquipped }` (key = item id or article code). `AmmunitionSystem.getAmmunitionFor(id)` returns `{ code, name, isLoaded }` only.
- User decisions on quantities: the slot row shows the quiver count ("20 Elm Arrows"), the candidate rows show NO quantity (a "0 Elm Arrow" row read as awkward), and the detail panel shows `Quiver n / 20` (loaded type only) and `Inventory n` when it has a character. Arrow record names are singular; plurals come from `getNameWithQuantity`.
- `ItemDetailPanel.setActions` builder now receives the selected descriptor (`{id}` / `{code}`) and runs for articles too.
- Deferred: damage diffs against the loaded ammo (ammo damage isn't in bow attacks yet, task 229), a Top Up button, ammo in the equipment summary.

**Why:** task 268 (in-battle change equipment) will reuse this panel with only primary/secondary/ammunition slots; `listSlots()` is the intended override point.
**How to apply:** keep ammo out of the `EquipmentSlot` enum; don't reintroduce quantities on candidate rows; see [[project-monster-equipment-task141]] for the equipment side.
