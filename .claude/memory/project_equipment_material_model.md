---
name: project_equipment_material_model
description: Task 102 equipment model - materials carry cost + named factors; weapon damage & value derive from them
metadata: 
  node_type: memory
  type: project
  originSessionId: baa923c6-3a76-4e67-9071-bbda3da80b70
---

Task 102 (complete-equipment) established a material/factor model for base equipment. Both weapons (55) and armor (24) are done and all 263 tests pass.

**Materials** (`data/materials.js`, registry `application/records/material.js`, enums `MaterialType` + `MaterialFactor` in enums.js): each material has a `cost` (per unit) and a `factors` object. A material only defines the factors that make sense for it (no cloth sword → cloth has no sharpness); `Material.getFactor(code,name)` throws on an invalid combo. Factors, each baseline = 1.0:
- `sharpness` (slash/pierce edge, baseline steel), `heft` (crush, all 1.0 for now — exotic dense materials boost crush later), `lash` (whip slash, baseline leather), `tension` (bow, baseline wood), `absorption` (armor DR, baseline steel), `potential` (enchantment strength, baseline steel). `potential` is wired: `WeaponEnchantment(enchantment, weapon)` / `ArmorEnchantment(enchantment, armor)` expose `getPower()` = round(enchantment.power × primaryMaterial potential). Weapon/Armor wrappers pass `self` into the enchantment; ArmorComponent now allows an `enchantment` property; `Armor.getBaseWeapon` was renamed to `getBaseArmor`.
- Materials: wool, silk, wood, bone, leather, iron, steel, silver. Cloth was split into wool (absorption 0.2) and silk (thin, absorption 0.12, but potential 1.8). Silver absorption 0.6 is BELOW iron's 0.75 (bare silver armor is worse) but potential 2.0 — enchanted silver/silk are the "weak bare, strong enchanted" niche.

**Base weapons**: `low`/`high` define the damage for the weapon *shape*; `materials` is an object keyed by part `{ blade:{material,amount}, grip:{...} }` with the **first entry = primary** (drives the damage factor and description); `effort` is build labor. Record (`base-weapon.js`) derives everything — `getLow/High` apply the primary material's factor per damage type (crush→heft, else the weapon's edge stat via `getDamageStat`), blended by damage-type percentages; `getValue()` = Σ(cost×amount) + effort×`_effortCost` (=10, in constants.js), rounded to 5; plus `getDamagePerSecond`, `getPrimaryMaterial`, `getMaterialParts`. All base weapons are steel/leather/wood at baseline factors, so authored numbers stand; factors exist for future material permutations. Bows are defined WITHOUT arrows (ammo = separate item, future).

**Value** = round5( (materialCost + effort×`_effortCost`) × performanceFactor ). Construction cost (materials + effort) is the primary driver — swords carry a premium, daggers/spears cheap. On top, a bounded `ValueFactor` (application/helpers/value-factor.js: `1 + amplitude×tanh((metric−midpoint)/spread)`, amplitude ±0.15) nudges value by the weapon's DPS or the armor's total reduction. Constants in constants.js (`_valuePerformanceAmplitude`, `_weaponValueDps{Midpoint,Spread}`, `_armorValueReduction{Midpoint,Spread}`). Bounded so the nudge never dominates (~±13% in practice). Balancing tables live in the dev report fixture (application/test/report-fixture.js → reports.html BaseWeapon/BaseArmor buttons).

**Armor (built)**: mirrors weapons — each shape has a `reduction` profile {crush,slash,pierce} authored at steel/absorption-1.0 baseline, a `materials` object (first part = primary) + effort. `base-armor.js` record: `getReduction(type)` = round(profile × primary material `absorption`) so cloth/leather pieces scale down while steel pieces = authored; `getReductionMap()`, `getValue()` (same formula as weapons), `getMaterialParts`, `getPrimaryMaterial`, and fixed `getCode()` (was reading nonexistent `armor.code`). Real DR ranges ~3-50% (leather boots low, chest plate ~40-50%), slash>pierce>crush texture. Next follow-on per the task: starting equipment / character starting gear — see [[project_game_start_event_task100]].

Fixed two latent bugs while here: `WeaponHandedness.primary` (undefined) in maces → `main`; dirk's malformed `damageTypes: DamageType.pierce` → `damageType`.
