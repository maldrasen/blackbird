---
id: 145
title: Negotiation Resolution State
priority: 1
created: 2026-07-30
tags:
  - battle
  - negotiation
points: 3
---
---
Rework `application/negotiations/negotiation-state.js` around a unified resolution model. Split from task 144.

Every way a negotiation ends produces the same shape of resolution data, stored once in the state: `{ type }`, plus `{ code }` for abilities. Feelings-derived endings collapse into the same types at the moment feelings are applied, so forced reactions (join/attack/run) naturally take precedence over the thresholds — resolving the TODO about forced resolutions in `negotiation-system.js`.

Resolution types: `join` (satisfied feelings or a join reaction), `attack`, `ability`, `run`, `stalemate` (timeout with low fear — a losing state, the battle continues).

### Changes
- Replace the never-written `resolution` variable and `setResolutionData`/`getResolutionData`/`isResolved` with:
  - `setResolution(data)` — early-return if a resolution is already set (first resolution wins).
  - `getResolution()` — the data object, or `{ type:'unresolved' }` when nothing is set. Callers always get an object and switch on `.type` with no null checks.

- Delete the old threshold function (currently `getResolution()`, lines 73-83) and its `console.log`. `applyFeelings()` resolves directly: after applying the deltas, the out-of-bounds checks call `setResolution({ type:'attack' })` and the threshold check calls `setResolution({ type:'join' })`. First-wins makes this safe after a forced resolution — the threshold result is ignored, giving forced reactions precedence. The `'satisfied'`/`'angry'` vocabulary disappears entirely.
  - The affection and respect thresholds are private `getAffectionThreshold()`/`getRespectThreshold()` functions, hardcoded to 100 for now — they'll eventually come from the monster so some are harder to recruit than others (keep the existing TODO).

- Add `resolveFromTimeout()`: fear ≥ `FEAR_RUN_THRESHOLD` → `setResolution({ type:'run' })`, otherwise `{ type:'stalemate' }`. `FEAR_RUN_THRESHOLD` is a module const, 80 to start (starting fear is `Random.roll(80)`, so running requires the player to have actively frightened the monster). Tunable.

- `pickQuestion()` keeps its empty-pool throw. Running out of questions is a data problem — the fix is authoring more questions, not code.

- `getResolutionText()`: switch on `getResolution().type` covering all 5 types with temporary strings (keep the task-107 TODO — real text comes from base monsters and personality archetypes later). Fix the garbled `{T:name} {T:TargetName}` string in the current satisfied text. `'unresolved'` falls through to the default throw — calling this before a resolution is set is a bug, not a sixth text case.

- Remove the vestigial `requests`/`currentRequest`/`getCurrentRequest`; leave `// TODO: Requests return in task 105.`

- Interim compatibility: `NegotiationSystem.advance()` still calls `isResolved()`; keep a thin `isResolved` alias — `getResolution().type !== 'unresolved'` — until task 148 removes it, so the suite stays green.
  - `monsterContinues()` in `negotiation-system.js` switches on `state.getResolution()` against the old `'satisfied'`/`'angry'` strings; once `getResolution()` returns an object neither case matches and the react-then-join/react-then-attack sequencing silently stops firing. Interim tweak: switch on `getResolution().type` with `'join'`/`'attack'` cases. Remove the now-resolved forced-resolution TODO at the top of the file. The rest of the system flow stays for task 148.

### Tests
New `test/negotiations/negotiation-state-spec.js` (regenerate the manifest with `bash bin/compile-manifest.sh` after creating the directory). Spec style: real registered records, hard-coded expected values, no throwaway registry fixtures. Boot pattern from `test/battle/character-ability-system-spec.js`: `BattleFixtures.prepareForBattle(); BattleSystem.startBattle({ encounter:'negotiation-fixture-2', ambushState:'normal' }); BattleSystem.specRound(player)` — kobold-sneak-slut, archetype slut, style lewd; the player fixture is a male human. The state must be created through `NegotiationSystem.start()` rather than `NegotiationState()` directly, because `NegotiationRequirements` reads flags through the `NegotiationSystem.getState()` singleton — which also means `start()`'s `NegotiationOverlay.open()` call gets the standard `Tests.running()` guard. Call `Random.stubReset()` after `start()` so the armed roll queue doesn't starve `pickQuestion()`'s `Random.from`.

Cover: pool includes `show-it-to-me`/`how-do-you-taste` and excludes reaction-less and timid-only questions; `let-me-taste` is in the pool but unpickable until `setFlag('playerCockOut', true)`; stub the constructor rolls (`Random.stubRoll`) to pin starting fear/respect and assert exact `applyFeelings`/`getFeelings` values including 0-clamping of negatives; `getResolution()` returns `{ type:'unresolved' }` on a fresh state; `applyFeelings` sets `join`/`attack` resolutions when thresholds pass; `setResolution` first-wins (including over a later threshold pass); draining the pool with a bounded for loop ends in the throw; `resolveFromTimeout()` both branches; `getResolutionText()` returns a string for all 5 types.
