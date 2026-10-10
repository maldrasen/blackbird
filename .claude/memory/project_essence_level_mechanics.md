---
name: essence-level-mechanics
description: "Task 123 essence/leveling formulas — EssenceSystem module, ExperienceComponent, ability essence scores"
metadata: 
  node_type: memory
  type: project
  originSessionId: 28da9cd8-4735-46a7-8fb3-a76494e384db
  modified: 2026-07-23T02:04:35.887Z
---

Task 123 (implemented 2026-07-19): `application/characters/essence-system.js` holds all tuning constants (knobs
rebalanced since — read the file, don't trust remembered numbers). Monster essence = `round(attrSum^exp × scale ×
(1 + Σ abilityEssence × abilityScale))`, computed from the killed **entity** (not the base record). Monster max
health/species healthFactor deliberately NOT in the formula yet (healthFactor spans 0.2–1.6, ±~20% essence at
extremes): deferred to a future balancing task once more monsters + species-less base monsters exist; agreed
approach then is a reduced-influence health factor multiplier, not substituting effective vitality. Ability data
records declare `essence` scores (Ability.getEssence defaults 0). Level cost (off-by-one fixed 2026-07-22): `essenceToLevel(L)` =
`round(base × (L-1)^exp × speciesFactor)` = cost to reach level L from L-1, so level 1 is free (essenceToLevel(1)=0)
and a fresh human hits level 2 at exactly 780 lifetime essence; `totalEssenceToLevel` sums i=2..L. Species factor =
`(gradeTotal/15)^speciesExp`, derived from attribute grades. Sublinear
exponent makes elf > human > kobold in power-per-essence, per design. `ExperienceComponent` `{ level, essence }`
stores **lifetime** essence; `canLevelUp` compares against cumulative `totalEssenceToLevel` — nothing subtracted on
level up. Characters **start at level 1 with 0 essence** (ExperienceComponent defaults level to 1); validate()
enforces level ≥ 1 and essence ≥ totalEssenceToLevel(level) (guard skips lookup at level 1). `LevelSystem.incrementLevel` floors essence at the
level's minimum so factory-leveled monsters carry recruitable essence. Unified leveling AND creation (2026-07-19,
AttributesFactory deleted): `LevelSystem.attributeIncrease` = `between(1,5) + gradeLevel + aspectModifier(±2) +
genderBonus` (male +1 strength, everyone else +1 beauty — moved out of creation dice). Creation:
`LevelSystem.buildAttributes` (baseline 5 + one increase per attribute; grants, not levels) and `buildHealth`
((vitality)d10 × healthFactor) — aspects built BEFORE attributes in both factories. Task 126 done: attribute
triggers (strong/weak/skillful/clumsy/healthy/sickly/smart/stupid/beautiful/ugly) become aspect records in
data/aspects, mapped by AspectsFactory, ±2 on each raise of that attribute. MonsterFactory.addLevels **tops up** to
the base monster's level (while level < getLevel()). human/nymph species gained explicit `healthFactor: 1.0`.
PlayerFactory creates a bare ExperienceComponent (defaults: level 1, essence 0). Post-change balance:
monster essence dropped ~4-5× (smaller attribute totals) while level costs are unchanged — leveling pace needs a
future balancing pass alongside the deferred health-in-essence factor. Awarding/splitting essence and the enlighten level-up UI are task
117's scope ([[post-battle-overlap]]). Balance reports: `node bin/essence-report.js [trials]` (min/max essence per
base monster over N builds) and `node bin/level-report.js [maxLevel]` (per-level cost by species + cost factors +
totals), both on the run-headless bootstrap. Note: dungeon-navigation-system-spec has a runtime `this.skip()` (distant
door), so mocha's pending count fluctuates between runs.
