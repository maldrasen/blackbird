---
name: difficulty-sliders-task136
description: "Task 136 difficulty options wired into battle — player-buff semantics, mitigation-as-damage-divisor, resistance as an auto-pass chance roll, WorldState hardening"
metadata: 
  node_type: memory
  type: project
  originSessionId: cd21612d-08bd-4b5a-9f59-148d4d62a869
  modified: 2026-10-08T20:07:50.742Z
---

Task 136 (difficulty sliders) completed 2026-08-04. All three options are **player buffs** stored in WorldState
`options.difficulty` (global, not per-save): `damage` (30–1000%) multiplies party-dealt damage, `mitigation`
(30–1000%, renamed from `health`) divides party-taken damage, `resistance` (0–100) is the percent chance a
character auto-passes a resist roll.

Key decisions:
- Health factor implemented as a damage divisor at the `BattleDamageSystem.applyDamage` choke point, NOT the
  task doc's getMaxHealth() read-time accessors — equivalent since there's no healing system, and it avoids the
  level-up feedback hazard. Single `Math.round` after the vulnerable doubling; side chosen by `state.isMonster(target)`.
- `Difficulty` global (application/world/difficulty.js) is the one home for percent→factor conversions
  (`getDamageFactor`, `getMitigationFactor` = 100/mitigation, `getResistChance`).
- Resistance option reworked 2026-10-08 (task 228): it used to be ADDED to the character's resistance value, which
  tied its weight to the resist roll floor (`BattleConstants.resistRollFloor`, lowered 100→20). Now `ResistRoll`
  rolls `Random.roll(100) < chance` FIRST, before the 5% crit/fumble bands, so 100 resists everything; skipped at 0
  so no stub value is spent. Characters only, never monsters. It also reaches until-resisted tick resists.
- WorldState hardened: lazy `structuredClone(defaultState)` init (headless-safe without loadState), `saveState`
  no-ops when HEADLESS, `mergeDefaults` (via ObjectHelper.merge — user moved it there) fills missing options from
  old save files, `WorldState.reset()` called from Tests reset() to stop spec leakage.
- Spec gotcha: `Random.stubRoll` bound validation proves an option *raised* a roll bound (used for enchanted
  resistance specs now) but cannot detect a bound that wrongly *grew* (monster leak case is documentation-only).

Status-effect damage (poison/burn) ticks exist now and route through the shared resist roll. Training difficulty
deferred.
