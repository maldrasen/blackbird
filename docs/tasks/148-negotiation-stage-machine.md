---
id: 148
title: Negotiation Stage Machine
priority: 1
created: 2026-07-30
tags:
  - battle
  - negotiation
points: 5
---
---
The task that makes negotiations actually end. Rework `application/negotiations/negotiation-system.js` around a stage
machine plus the battle wiring for each resolution. Split from task 144; depends on tasks 145 (resolution state) and
147 (interface shim).

Today `advance()` calls `showResolution()`/`forceResolution()` which don't exist, `join` reactions fall through to the
unknown-type throw, `reactThenJoin`/`reactThenAttack` are console.log stubs, `RecruitmentSystem.recruit` has no
caller, and terminal reactions close the overlay before the player can read the monster's reply. There's also a latent
crash: `finishNegotiation()` moves the monster to the top of the turn order before `finishCharacterRound()`, but
`BattleState.updateTime()` throws unless the acting player is still first in the turn order.

### Click-through flow
`answer()` renders the monster's reply and records the resolution — nothing executes yet. The next click shows the
resolution text; the click after that executes it. A module-level `stage` (`'chatting' | 'resolution-shown'`) drives
this. Consts: `MAX_INTERACTIONS = 5`, `NEGOTIATION_TIME = 1200`.

### Changes
- `advance()`: stage `'resolution-shown'` → `executeResolution()`; `state.hasResolution()` → `showResolution()`;
  `state.getInteractionCount() >= MAX_INTERACTIONS` → `forceResolution()`; otherwise
  `NegotiationInterface.renderQuestion(state.pickQuestion())`.
- `forceResolution()`: `state.resolveFromTimeout()` then `showResolution()`. `showResolution()`: set the stage,
  `NegotiationInterface.renderResolution()`.
- `applyReaction()`: `renderDialog(reaction.message)`, then switch — `feelings` → `state.applyFeelings(...)`;
  `join`/`attack`/`ability`/`run` → `state.setResolution({...})` (`ability` carries `code`); default throws. This adds
  the missing `join` case.
- `executeResolution()`: switch on `state.getResolution().type`:
  - `join` → `resolveJoin()`: condition `BattleCondition.recruited`, `battleState.removeFromBattle(monster)`,
    `finishNegotiation()`, then `RecruitmentSystem.recruit(monster, state.getFeelings())` — recruit after finish so
    the MonsterComponent survives the victory path.
  - `attack` → `resolveAbility('basic-attack')`; `ability` → `resolveAbility(code)`: `setForcedAbility`, finish.
    (`MonsterSystem.pickForcedAbility` already consumes the forced ability on the monster's turn.)
  - `run` → `resolveRun()`: condition `fled`, `removeFromBattle`, finish.
  - `stalemate` → `finishNegotiation()` only; the monster fights on.
- New `finishNegotiation()` — fixes the ordering crash and implements the old skip TODO:
  `NegotiationInterface.close()`; `BattleSystem.getRound().addTime(NEGOTIATION_TIME)`; `BattleSystem.finishRound()`
  (while the player is still first in turn order); `scheduleMonsterResponse()`; `BattleSystem.advanceBattle()`.
  - `scheduleMonsterResponse()`: no active monsters → `battleState.battleWon()` (the victory-interrupt setter on
    battle state); monster no longer `BattleCondition.active` → return; otherwise
    `moveToTopOfTurnOrder({ type:'monster', id }, 500)`.
  - `advanceBattle()` then either hits the victory interrupt → enlighten view, or runs the monster's round (forced
    ability or normal pick) → `showMonsterResult` displays the monster's action. No `(TODO: Skip)` placeholder
    message, no `finishCharacterRound()` call.
- Supporting one-liners: export `finishRound` from `application/battle/battle-system.js`; add `removeFromBattle(id)`
  to `application/battle/battle-state.js` (absorbs the old `removeMonsterFromBattle` TODO — removeFromTurnOrder +
  removeFromFormation).
- Cleanup sweep: debug console.logs, implemented TODOs, the `isResolved` alias from task 145. Keep the TODOs for
  monster-initiated negotiation, follow-on questions, requests (105), answer-level requirements, and run-as-ability.

### Tests
New `test/negotiations/negotiation-system-spec.js` (regenerate the manifest). Full battle boot per test
(`negotiation-fixture-N`); drive resolutions by setting them on the state directly — the reaction→resolution mapping
is thin and the question/answer path is Random-heavy. Cover:
- Attack flow: first `advance()` only shows the resolution (nothing executed); the second executes — the forced
  ability is consumed and the monster acts.
- Join flow: condition `recruited`, MonsterComponent destroyed, monster in roster, feelings/control transferred with
  exact stubbed values, game mode is enlighten.
- Run flow: condition `fled`, victory path taken.
- Timeout: `state.resolveFromTimeout()` then advance twice — battle continues with the monster at the top of the turn
  order.
- Answer smoke test: advance to a real question, answer with a key whose reaction is a plain feelings type; feelings
  change and no resolution is set.
