---
name: beast-monsters-task185
description: "Beast (speciesless) monster architecture — gender none, buildBeast components, grade-unified attributes/essence"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1c02cc4a-3a35-4793-a03d-688516fb747a
  modified: 2026-08-16T23:52:48.964Z
---

Task 185 (branch `185-add-more-monsters`), in progress 2026-08-15. Beast monsters have no species and skip the character factory; `MonsterFactory.buildBeast()` builds their components directly (actor, zeroed skills, attributes, health; experience component still TODO).

Key decisions:
- `Gender.none` added for beasts (it/its in PronounHelper; man/men → beast/beasts). ActorComponent validation only checks gender/species for actors WITH a species. `genderBonus` in AttributeMath (was CharacterMath pre-task-188) returns 0 for `Gender.none`.
- Monster types (`data/monster-types/beasts/`) define `attributes` as letter grades (mirroring species records), NOT [min,max] ranges — beasts roll `AttributeMath.attributeBaseline + attributeIncrease()` exactly like characters. Types also carry `baseSkills` ([min,max] per skill, applied in shared `addSkills` for ALL monsters) and `skillGrowth`/`attributeGrowth` frequency maps.
- `AttributeMath.attributeIncrease(attribute, grades, actorData, aspectsData)` takes an explicit grade map; `AttributeMath.attributeGrades(id)` resolves species-or-monster-type grades for any entity (deliberately NOT on the Character wrapper — user objected to wrapping non-characters).
- EssenceSystem cost functions are grade-map-keyed (`costFactor(grades)`, `essenceToLevel(level, grades)`), so beast leveling costs price from type grades. `test/characters/essence-system-spec.js` body is commented out by the user ("Changing All This") and still references old species-code signatures.
- `BaseMonster.getHealthFactor()`/`getGenderRatio()` route species-first, then own field ("keep it honest" pattern). `LevelSystem.getHealthFactor(id)` and beast leveling read the base monster via MonsterComponent, so `MonsterFactory.build()` creates the MonsterComponent BEFORE addSkills/addLevels.
- `levelUp` passes `AspectsComponent.lookup(id) || {}` — beasts have no aspects.
- Beasts get NO ExperienceComponent (decided 2026-08-15): they never level post-creation and can't be recruited, and kill essence comes from `monsterEssenceValue` (attributes+abilities). `incrementLevel` early-returns when the component is missing; beast level derivable from the BaseMonster record.

Remaining: skillGrowth on level up (open design: per-level skill roll shape, beast-only vs LevelSystem-wide), weaponless beast attack abilities (critter type has no prioritizedAbilities; basic-attack needs weapons). MonsterFactory specs use rabid-skitterfang (critter, level 1, healthFactor 0.5) and slithering-yeek (level 3 leveling path); user runs a Stop hook requiring a green suite every turn, so seed-sweep `--seeds` random-range specs before stopping.
