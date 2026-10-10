---
name: character-factory-state
description: "Task 143 factory state refactor — CharacterFactoryState design, lifecycle, and spec seeding pattern"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9ad2e09b-b583-47be-b839-55635a63eeac
  modified: 2026-07-31T20:53:27.438Z
---

Task 143 (shipped 2026-07-31, branch `143-refactor-character-factory`): the character factory pipeline runs through
`CharacterFactoryState` (application/characters/factories/character-factory-state.js) with a
`startBuild(options)/getState()/endBuild()` lifecycle on `CharacterFactory`. Key facts:

- All state getters return `structuredClone` copies (Registry idiom); factories assemble/mutate a local copy and
  persist via whole-block setters (`setBody(data)`), with keyed mutators (`setActorData(key,value)`,
  `setBodyData`, `removeSexualPreference`, …) also available. Never mutate a getter result without writing back.
- Subfactories are all zero-arg (`BodyFactory.build()`, `SexualPreferencesFactory.makeAdjustments()`), opening with
  `const state = CharacterFactory.getState()`. Pussy/cock/breasts self-gate on `shouldHaveX()` and stay `null`;
  their applyTriggers still remove triggers unconditionally when the block is null.
- Retry safety: buildLoop calls `startBuild` per attempt (constructor clones options.triggers); `build()` and
  `PlayerFactory.build()` call `endBuild()` in a finally so state never leaks.
- Direct-call specs (sexuality/sexual-preferences/sexual-history) seed via `startBuild({species, gender, triggers})`
  + `setPersonality/setSensitivities/setSexualPreferences({})`; explicit non-enby gender + species means the
  constructor consumes zero Random rolls, so `Random.stubRoll` sequences survive. Each spec file has an
  `afterEach` calling `CharacterFactory.endBuild()`.
- For [[requires-predicate-unification]] (task 150): state exposes `hasBreasts()`, `hasNormalCock()`,
  `hasNormalPussy()` (placement === 'normal'), `getSensitivity/hasSensitivity` mirroring Character(id); the
  `senses.breasts` no-op in removeIncorrectPreferences was deliberately left byte-for-byte for 150 to fix.
- PlayerFactory keeps its own call order (Aspects → Attributes → Health → Body → Anus → Mouth → Pussy → Breasts →
  Cock → Skills) and skips personality/sexuality/sensitivities.
- Cleanup pass: LevelSystem.buildAttributes/buildHealth became AttributesFactory/HealthFactory subfactories; the
  shared roll lives in `CharacterMath.attributeIncrease(attribute, actorData, aspectsData)` (used by both the
  factory and LevelSystem.levelUp). The state has no experience block — `ExperienceComponent.create(id)` defaults
  to level 1 / essence 0, so the factory's EssenceSystem coupling is gone.
