---
name: ability-refactor-task221
description: "Task 221 (2026-09-13/14): abilities are Ability models built by factories, monsters compile buildAbilities closures at init, cooldowns keyed by ability id, BattleCommand records own the character side; appraiser still a stub"
metadata: 
  node_type: memory
  type: project
  originSessionId: 23b38005-4223-4e8d-b474-6402ce988bb0
  modified: 2026-09-14T23:45:26.078Z
---

Task 221 replaced the `Ability` record with an `Ability(name)` model built by factories under `application/battle-abilities/factories` (Pass, Defend, Hide, WeaponAttack, NaturalAttack + Bite/Punch/LeapClaw/VenomousBite presets, DickPunch, SpecialAttack, SneakAttack, CastSpell, UseArticle). Reference doc: `docs/reference/battle-abilities.md`. Shipped 2026-09-14 with the full suite green (1114 passing).

**Decisions the user made:**
- Monster/type ability lists are `buildAbilities: () => [...]` closures compiled by `MonsterType.compile()`/`BaseMonster.compile()` in `Application.init()`, because monsters load before spells/status effects and the user refused load-order tricks. A monster's list is its type's followed by its own (append, no override by key).
- Every ability has a `priority` (default 50); cooldowns are keyed by ability id in `BattleState`; forced abilities from negotiations are ability *names*, reaction option is `ability` not `code`.
- `BattleCommand.execute(data)` ends the character's round, not the model. Chained content factories live in application, not data.
- `AbilityAppraiser.run()` (init pass, after compile) is the user's to write; `getDetails()` on the model publishes `{ spell, powerLevel }` / `{ article }` for it. Two pending specs in `essence-system-spec.js` hold the expected numbers (8.0059 venom bite, 10.125 bite, 75 dick punch). `EssenceSystem.abilityEntryBreakdown` and `bin/reports/ability-essence-report.js` still read the removed map.

**Spec gotchas learned:**
- Woven text is prefixed with an invisible marker, so match message text with `includes`, never `startsWith`.
- `Random.between` is built on `Random.roll`, so stubbing all rolls to zero breaks skill checks; stub both queues in call order instead (see dick-punch-spec), or push attributes to extremes.
- A spec that registers its own monster must set `abilities:[...]` inline; `buildAbilities` won't run because the compile pass already did.
- `finishCharacterRound()` needs the actor at the top of the turn order; a status applied during the actor's own round isn't counted down at its end.

**How to apply:** New abilities are factories; new monster abilities go in `buildAbilities`; new character actions are `BattleCommand` records with `buildAbility(data)`. Characters can't use natural attacks yet (possibility check needs a target). Related: [[canonical-test-command]], [[status-effect-component-task177]].
