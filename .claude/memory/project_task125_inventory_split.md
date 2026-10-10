---
name: task125-inventory-split
description: Task 125 (equipment/inventory UI) split into three sequential plan docs in docs root
metadata: 
  node_type: memory
  type: project
  originSessionId: 0ca29677-afbc-478d-86d8-8bf65b0debe2
  modified: 2026-07-20T15:51:35.262Z
---

Task 125 was split (2026-07-20) into three sequential plans, each a doc in the docs root (not docs/tasks):
1. `docs/plan-item-bug-fixes.md` — InventoryManager.addItem cross-inventory guard is a no-op (hasItem arity bug); Item.getName() always undefined (ItemComponent whitelists only `type`).
2. `docs/plan-equipment-single-slot.md` — user decided multi-slot armor spanning is unneeded complexity; BaseArmor `slots:[...]` → single `slot`, getSlots() → getSlot() (5 consumers + data/armor files).
3. `docs/plan-inventory-view.md` — the UI: reusable InventoryPanel factory view in the character overlay equipment tab (label renamed "Inventory"), verb row Equip/Use(stub)/Drop/Trade, slot-picker popup for ambiguous equips, trade panel from InventorySystem.getReachableInventories.

All three plans are implemented as of 2026-07-20 (plan 3 executed on branch `125-inventory-view`: InventoryPanel view, InventorySystem, EquipmentManager getEquippedSlot/getValidSlots/unequipItem, InventoryManager listItems/dropItem, roster gating in location-view, inventory-panel.scss). Remaining follow-ups: item icon art (assets/icons/weapon-*.png, armor-*.png) and the in-Electron manual UI checklist (tab-activation scrollbar resize used setTimeout 0 preemptively but is unverified).

Design decisions from the user: drop destroys the item (with confirm); every row shows an item icon (`Item.getIcon()` → base record `icon` property or derived default `weapon-<type>.png` / `armor-<code>.png` in assets/icons/, art supplied later) and equipped rows get bold names instead of slot icons; per-character verbs (listItems, dropItem) live on InventoryManager, only cross-inventory work (getReachableInventories, transferItem) goes in the new InventorySystem singleton. Overlay gets gated to player/roster only ([[dungeon-navigation]] NPC/monster inspect panels remain future tasks).
