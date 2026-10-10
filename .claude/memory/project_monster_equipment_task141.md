---
name: monster-equipment-task141
description: "Task 141 monster equipment — registered material variants, equipper loadout mode, natural armor"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5b1916c1-df92-4cf6-b7f0-75ba1308137b
  modified: 2026-08-01T04:15:42.535Z
---

Task 141 (implemented 2026-07-31, branch 141-monster-equipment): monsters fight with real equipment.

- Material combos are **registered variant records**, not lookup parameters — the user rejected `lookup(code, { material })` because records must stay immutable canonical data objects. `BaseWeapon.registerVariant('bone-spear', 'spear', { material, name? })` (same for BaseArmor) derives a real record at registration via `ItemHelper.substitutePrimaryMaterial` (primary part swap; damage/reduction/value recompute — bone sharpness 0.65). Default name is `` `${material} ${base.name}` `` from the material **code**, not `Material.lookup` — manifest loads `data/armor/*` before `data/materials.js`. Register variants in the same data file as their base, after it. Variants: bone-spear, bone-club (hammer), bone-knife, leather-doublet. They appear in `getAllCodes()`, so the budget equipper can pick them (leather-doublet now beats doublet in the chest fallback).
- Base monsters define `equipment: { loadouts:[{ main, off }], armor:[entries] }`; `CharacterEquipper(id).equipLoadout(spec)` picks one loadout at random (skips off-hand for two-handed mains), groups armor entries by slot and picks one per slot. The **attackTable is GONE** (and 'fist' as a weapon): natural attacks are abilities — `NaturalAttack(profile)` (battle/models) stands in for a base weapon via `contest.setNaturalAttack(profile)`; punch + dick-punch carry `{ skill:'martial-arts', damageType, low, high, speed, reach, textKey }` profiles. Dick puncher: dick-punch:100 + punch:50, empty hands. Bite/claw attack-text templates already exist for future beasts (runt has a bite TODO). `MonsterSystem.pickForcedAbility` skips a forced ability whose canBeUsed() fails (negotiation forcing basic-attack on a weaponless monster).
- `BattleRound.compileWeaponData` reads only the equipment manager for everyone — empty hands ⇒ null weapons ⇒ basic-attack unusable (both monster and character paths guard on `round.getPrimaryWeapon()`); unarmed entities fight via natural attack abilities.
- Natural armor is NOT a separate concept — the user scrapped `naturalArmor` because **species resistances already carry physical damage types** (kobold slash:10, lupin slash:10, equian slash+crush:10). BattleDamageSystem adds `Monster/Character.getResistance(type)` (`getInnateResistance`) to equipped reduction at every hit location, stacking under the 80 cap. Works for recruits automatically (species follows the character). Spec gotcha: fixture characters roll random species, so damage specs pinning exact numbers must pin species to human (`makeHuman` in battle-damage-system-spec).
- `BattleState.cleanup()` deletes dead/fled monsters' carried item entities (items aren't Registry children) — this is the hook point when enlighten loot drops arrive (tasks 117/128).
- Recruitment carries equipment for free (recruit() only sheds MonsterComponent).
- Spec gotcha: `Tests.rootBefore()` (not `Tests.running(true)`) enables headless battle sims; `BattleSystem.specRound(id)` + `state.updateTime(id, time)` steps turns.
