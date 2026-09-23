---
id: 226
title: Unify weapons and armor as equipment
priority: 1
created: 2026-09-17
tags:
  - character
points: 8
---
---
Weapons and armor are built, stored, and wrapped by parallel code that has converged to the point of being copies. The two factories differ only in which record registry they read and which component they create. The weapon and armor components hold nothing but `base` and `enchantment` (plus `textKey` for weapons); everything else already lives in the item component. The only real job the separate components still do is act as a type tag, and that tag is what makes shields awkward. A shield needs hands and a skill from the weapon side and reduction from the armor side, so it can't be filed under either without the other side special-casing it (`getEquippedShield`, the defend roll, the battle round's weapon lookup). The current branch moved shields into `data/armor` but the consumers still look for them through `BaseWeapon`, which is the fork biting again.

Collapse the split into one record registry, one factory, one component, and one wrapper. Task 213 then adds the appraiser on top of the settled shape, so this task is a prerequisite for it.

## Target shape

**`BaseEquipment`** replaces `BaseWeapon` and `BaseArmor`. A record carries whatever fields apply to it. Common: `name` or `nameFunction`, `icon`, `materials` in the `{ type:amount }` shape already used by `axes.js` and `chests.js`, and `effort`. Weapon: `type`, `damageType` or `damageTypes`, `damageRange`, `hands`, `reach`, `speed`, `textKey`. Armor: `slot`, `reduction`. A shield is `type:'shield'`, `hands:off`, and `reduction`, with no `slot`. The record derives `getSlots()` from `hands` (main and two give primary, off gives secondary, one gives either) or from `slot`, so equipping never has to ask what kind of thing it is holding. The record also answers `isWeapon()` (has a damage range), `isShield()`, and `hasReduction()`. `getSkill()` keeps the current rule: shields block, everything else uses its type. The `HasMaterials` and `HasReduction` record mixins go away with the old registries. Reduction scaled by the primary material belongs on the wrapper now, since the factory picks the materials per item and the record no longer knows them.

**`ItemComponent`** absorbs `base`, `enchantment`, and `textKey`. The `type` field goes away because the record answers it. `WeaponComponent`, `ArmorComponent`, and their `ComponentType` entries are deleted. This removes two component types from saved games, which is acceptable while save migrations are deferred.

**`EquipmentFactory`** replaces both factories, keeping the `setAvailableMaterials()` and `build(code, options)` interface the current ones have.

**`Item(id)`** absorbs `Weapon(id)` and `Armor(id)` rather than a new `Equipment(id)` wrapper being added. Its existing callers (the inventory manager, the character wrapper's lewdness checks, the item loom, the inventory panel) don't care what kind of item they hold, and every item entity is a piece of equipment for the foreseeable future, clothing included. It exposes the union of the two wrappers: `getBase`, `getName`, `getNameType`, `getIcon`, `getSkill`, `getTextKey`, `getReduction(type)`, `getPrimaryMaterial`, `isMetal`, `hasEnchantment`, `getEnchantment`, `isLewd`. Weapon and armor enchantments stay separate for now; the wrapper picks between them with `isWeapon()`, and shields take armor enchantments. The `isLewd` accessor currently reads a property the component validator rejects, so it can never be true; fix that while the wrapper is being rewritten.

With the record deciding slots, the `type === 'weapon'` and `'armor'` forks in the equipment manager (`canEquipItem`, `isTwoHandedWeapon`, `getArmorAt`, `getEquippedShield`) and in `EquipmentComponent.validate` collapse to record lookups, and the callers that use "does a WeaponComponent exist" as an is-weapon test (the battle round, the loot generator) ask the record instead.

## Plan

1. Finish converting the data files to the new materials shape. `axes.js` and `chests.js` are done; bows, daggers, maces, polearms, swords, whips, feet, hands, head, legs, and shields still use the old per-part `{ material, amount }` shape with `MaterialType` values that no longer exist. Data only, no code changes.
2. Add `BaseEquipment` with the record shape above, switch every data file to `BaseEquipment.register`, and point the existing lookups at it: the factories, the wrappers, the equipment manager, the equipment component, the battle round, the defend roll, the loot generator, the function loom, and the two reports in `bin/reports`. Delete `BaseWeapon`, `BaseArmor`, `HasMaterials`, and `HasReduction`. The weapon and armor forks in the consumers stay as they are for this step; only the registry changes.
3. Fold `WeaponComponent` and `ArmorComponent` into `ItemComponent`. Both factories write the merged component, the wrappers read it, and the two places that use component existence as a type tag switch to the record. Delete the two component files and their `ComponentType` entries. The `type` field stays for now because the equipment manager forks still read it.
4. Merge the factories into `EquipmentFactory`. Once the record and component are unified the two factories are identical, so this is a rename plus updating the call sites: `character-equipper.js`, the test fixtures, and the specs. The two factory specs merge into `equipment-factory-spec.js`.
5. Fold `Weapon(id)` and `Armor(id)` into `Item(id)` and update their callers: the equipment manager, the battle round, the physical attack roll, the character equipper, the function loom, the two enchantment modules, and dick punch. Move the primary-material reduction scaling here.
6. Rewrite the equipment manager and equipment component validation on the record's `getSlots()`, `getHands()`, and `isShield()`, removing the weapon and armor forks, and drop `type` from the item component now that nothing reads it. Update the records line in `docs/reference/architecture.md`.
