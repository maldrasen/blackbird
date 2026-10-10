---
name: equipment-depots-task225
description: "Task 225 equipment depots — CharacterEquipper shops real items from species depots; budget semantics, fallback tiers, monster equipmentOptions, known tuning gaps"
metadata: 
  node_type: memory
  type: project
  originSessionId: 47fb4fbe-3cf2-48f5-ad90-cd3cbab50c6b
  modified: 2026-09-19T22:31:36.305Z
---

Task 225 (branch `225-equipment-depots`, in progress 2026-09-19): monsters and the player buy real item components from an `EquipmentDepot` instead of defined loadouts. Replaces the loadout model from [[monster-equipment-task141]] (equipLoadout is deleted).

- `EquipmentDepot(code)` = 50 weapons + 50 armor per `EquipmentParameters` record (standard/kobold/vermen), entities persisted on GameState. `getWeapons()`/`getArmor()` restock AND evict oldest, so the equipper fetches each stock list once per equip and skips ids it already picked.
- Budget = max price for a single item, scaled per slot by `SlotBudgetPercent`; 80% window, else best affordable. Primary weapon only has fallbacks: preferred type → any type in budget → cheapest in depot (never unarmed). Off-hand and armor just stay empty. Off-hand type follows the weapon actually picked.
- Base monsters carry `equipmentOptions: { budget, bareHanded, naked }` (user's design, passed straight to `equip(options)`); no options = never shops (beasts). `MonsterFactory.addEquipment()` runs after addSkills/addLevels because the equipper reads skills, then calls `assignSkills()`.
- Real prices: kobold/vermen gear 36–138, standard iron ~40–500, steel/silver far higher. Stocking a depot costs ~1–3ms, so specs using the equipper don't slow the suite.

**Why:** item value depends on materials/enchantments, so shopping needs real components, not base records.

- Specs stay off the equipper: `BattleFixtures.prepareForBattle()` dresses the party from a fixed `Outfits` table ([base, materials, options]) via `ItemFixtures.equip(character, code, materials, options)`, where `options.slot` overrides the first-fit slot. `BattleFixtures.equipWeapon` still builds in random materials (callers pass wood bases like shortbow, so it can't just default to steel).
- `assignSkills()` rolls `min(100, 10 + Random.roll(2 * level))` first, then raises the weapon/off-hand skill only if it's below the roll (level from `Character(id).getLevel()`).

**How to apply:** the user ruled the slot percents (head 0.3, hands 0.25) are fine as-is — starting without a helmet/gloves is intended and cheaper equipment types may be added later, so don't re-raise it. Still open: thin stock means a preferred-type pick can land far under budget. Specs asserting monster gear should hold for any stock (slot/type/at-most-budget); specs that stub `Random.roll` must build items and construct the equipper before stubbing, since item building rolls for materials. See [[spec-style]].
