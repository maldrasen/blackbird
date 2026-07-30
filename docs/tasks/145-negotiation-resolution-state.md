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

Every way a negotiation ends produces the same shape of resolution data, stored once in the state: `{ type }`, plus
`{ type:'ability', code }` for abilities. Feelings-derived endings collapse into the same types at the moment feelings
are applied, so forced reactions (join/attack/run) naturally take precedence over the thresholds — resolving the TODO
about forced resolutions in `negotiation-system.js`.

Resolution types: `join` (satisfied feelings or a join reaction), `attack`, `ability`, `run`, `stalemate` (timeout
with low fear — a losing state, the battle continues).

### Changes
- Replace the never-written `resolution` variable and `setResolutionData`/`getResolutionData`/`isResolved` with:
  - `setResolution(data)` — early-return if a resolution is already set (first resolution wins).
  - `getResolution()` — the data object or undefined.
  - `hasResolution()` — whether one is set.
- Rename the threshold function (currently `getResolution()`, lines 73-83) to a private `feelingsOutcome()` returning
  `'satisfied' | 'angry' | 'unresolved'`. Remove its `console.log`.
- `applyFeelings()` additionally calls a private `resolveFromFeelings()`: switch on `feelingsOutcome()` — satisfied →
  `setResolution({ type:'join' })`, angry → `setResolution({ type:'attack' })`.
- Add `resolveFromTimeout()`: fear ≥ `FEAR_RUN_THRESHOLD` → `setResolution({ type:'run' })`, otherwise
  `{ type:'stalemate' }`. `FEAR_RUN_THRESHOLD` is a module const, 80 to start (starting fear is `Random.roll(80)`, so
  running requires the player to have actively frightened the monster). Tunable.
- `pickQuestion()` keeps its empty-pool throw. Running out of questions is a data problem — the fix is authoring more
  questions, not code.
- `getResolutionText()`: switch on `getResolution().type` covering all 5 types with temporary strings (keep the
  task-107 TODO — real text comes from base monsters and personality archetypes later). Fix the garbled
  `{T:name} {T:TargetName}` string in the current satisfied text.
- Remove the vestigial `requests`/`currentRequest`/`getCurrentRequest`; leave `// TODO: Requests return in task 105.`
- Interim compatibility: `NegotiationSystem.advance()` still calls `isResolved()`; keep a thin `isResolved` alias
  delegating to `hasResolution()` until task 148 removes it, so the suite stays green.

### Tests
New `test/negotiations/negotiation-state-spec.js` (regenerate the manifest with `bash bin/compile-manifest.sh` after
creating the directory). Spec style: real registered records, hard-coded expected values, no throwaway registry
fixtures. Boot pattern from `test/battle/character-ability-system-spec.js`:
`BattleFixtures.prepareForBattle(); BattleSystem.startBattle({ encounter:'negotiation-fixture-2', ambushState:'normal' })`
— kobold-sneak-slut, archetype slut, style lewd; the player fixture is a male human.

Cover: pool includes `show-it-to-me`/`how-do-you-taste` and excludes reaction-less and timid-only questions;
`let-me-taste` is in the pool but unpickable until `setFlag('playerCockOut', true)`; stub the constructor rolls
(`Random.stubRoll`) to pin starting fear/respect and assert exact `applyFeelings`/`getFeelings` values including
0-clamping of negatives; thresholds produce `join`/`attack` resolutions; `setResolution` first-wins; draining the pool
with a bounded for loop ends in the throw; `resolveFromTimeout()` both branches; `getResolutionText()` returns a
string for all 5 types.
