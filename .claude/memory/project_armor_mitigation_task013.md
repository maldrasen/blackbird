---
name: project-armor-mitigation-task013
description: "Task 013 shields & armor mechanics — percent mitigation, defend-skill selection, shield data decisions"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1abcfcff-56d5-458d-bac3-eddcba5cb13f
  modified: 2026-07-25T19:10:13.101Z
---

Task 013 (shields & armor) implemented 2026-07-24. Decisions that aren't obvious from the code:

- Armor `reduction` values are **percentages** of matching physical damage absorbed at the hit location (user chose percent over flat/hybrid). Worn piece + shield add per type, capped at 80. Mitigation rounds per damage type, then `vulnerable` doubles the total.
- Shield reduction is a whole-body bonus (applies to every hit location). Shared reduction code lives in `application/records/has-reduction.js` — the app's **first mixin**: `lookup()` calls `HasReduction(rawRecordData)` and spreads the result into its frozen return (`{ ...reduction, ... }`); internal callers capture the mixin in a const first. Formula: `ItemHelper.getScaledReduction` (profile × primary-material absorption, same as [[project-equipment-material-model]]).
- Shield value = construction × (1.5 × armor value factor from total reduction + 0.5 × weapon value factor from DPS) — user's call: whole-body reduction carries a premium, so shields cost ~2× construction (buckler 387 → tower 1004). Because of that, CharacterEquipper gives shields a full budget share (`SlotBudgetPercent.shield` = 1.0) instead of the 0.5 off-hand share daggers get. Non-shield weapon values unchanged.
- Record mixins now: `HasMaterials` (getMaterials/getMaterialParts/getPrimaryMaterial/getMaterialCost) and `HasReduction` (which consumes HasMaterials internally); both spread into BaseArmor/BaseWeapon lookup returns.
- Defend skill (revised by user during review): ranged attacks can be blocked but never parried; when both block and parry are possible the choice is rolled from strength (block) vs dexterity (parry) via Random.fromFrequencyMap. `attackRoll.isRangedAttack()` = ability targeting mode anyEnemy → ranged, else weapon reach `long` → ranged (bows, bullwhip, one polearm). Ability code travels in weaponData.code. No EquipmentComponent (monsters) → dodge.
- `applyDamage` **throws** on null `hitLocation` for physical types, and throws a TODO for any non-physical damage type (user's call: forcing functions for future spell/AoE damage and equipment elemental resistance — see the TODOs in battle-damage-system.js for the intended model: averaged armor for located AoE physical damage, additive equipment resistances for elemental).
- Equipment queries return **item ids** (`getArmorAt`, `getEquippedShield`); reduction reads go through the `Armor`/`Weapon` wrappers' `getReduction(type)` so individual pieces can override base values later (enchantments). leastArmor threat stub and enchantment dispatch remain follow-ups.
- Dick-punch `getArmorFactor` = 1 − leg crush reduction/100, stacking on normal legs mitigation.
- Attack bonuses live on ability records: optional `getAccuracyBonus(acting)` / `getDamageBonus(acting)` functions, defaulted to 1 by `Ability.lookup`. `PhysicalAttackContest.isHit()` applies accuracy; `DamageRoll(attacker, attackRoll, defendRoll)` looks up the damage bonus itself via `attackRoll.getAbility()` — no options object or factor argument anywhere. Attack rolls/contests use setter style: `setWeaponData/setAbility/setHitLocation` then `roll()`.
