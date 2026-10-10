---
name: party-inventory-task243
description: Task 243 shared party inventory — decided model (equipped items live only in slots, characters/monsters lose InventoryComponent), task split 245/243/246/247, and the step-ordering hazards found in the design spike
metadata:
  type: project
---

SHIPPED 2026-09-27 (245 slot panel + 243 model, 11 steps). Open follow-ons: 246 party inventory overlay (no inventory view exists until then; ConsumeOverlay kept for it), 247 bank enchanted item drops into the party inventory (loot inventory items are still deleted at enlighten finish). Task 167 (trading) is obsolete. saveVersion bumped to 2; no migration.

Model: one party inventory entity on GameState (`createPartyInventory` in GameSystem.createGameState on new game AND reset, `getPartyInventory` getter throws if missing; user made the loot inventory match); `InventoryManager()` default = party inventory. Equipped items live ONLY in equipment slots (FF style); equip removes from party inventory, unequip/displacement returns to it; `EquipmentManager.equipItem` returns displaced ids. Characters and monsters get no InventoryComponent; depot `pickItem(itemId)` only removes from stock. Ownership for sweeper/addItem guard = any inventory OR any equipment slot. No inventory view until 246 (user accepted).

**Why:** negotiation item requests (242) need one place to look; SMT/Persona precedent. User rejected "use consumable from the character overlay" because it hid the health bars.

**How to apply:** when touching inventories, keep the single-owner rule (InventoryManager.addItem guards both inventories and slots). Ordering hazards that shaped the work: the orphan sweeper runs on every setGameMode (incl. entering battle), so slots must count as owners before anything stops staging items in inventories; and the inventory panel must be deleted before InventorySystem loses transferItem/getReachableInventories. `FunctionLoom.unequip` must route through InventorySystem.unequip or the stripped item gets swept. Related: [[orphan-sweeper-task231]], [[equipment-depots-task225]].
