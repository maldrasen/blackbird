# Complete the Negotiation Rewrite (branch `108-complete-questions`, incl. task 134)

## Context

The negotiation system is mid-rewrite. The new data model is in place and working: questions register free-form answer keys, and `NegotiationQuestion.registerReaction()` attaches per-monster reaction sets (most-specific-wins by style/archetype/species/gender/monster). But the `NegotiationReaction` builders (`neutral`/`respect`/`like`/…/`attack`/`run`/`contest`) are empty stubs called eagerly at data-load time, so every registered reaction is currently `undefined`; `answer()` just logs it; the advance loop, feelings application, and resolution dispatch are commented out. This plan restores the working loop on top of the new model, implements the new reaction kinds (attack / run / contest / useAbility), and folds in task 134 (conversation skill check when applying feelings). Afterward the user authors the remaining kobold reactions as pure data work.

Decisions already made: question-only loop (requests stay stubbed for task 105); bounds-based resolution with global thresholds; task 134 as an opposed roll (conversation vs monster beauty); no tests this pass; resolution text keeps its placeholders (task 107).

## Design

### 1. Reaction descriptors — `application/negotiations/negotiation-reaction.js`

Builders return plain frozen descriptors (they run at data-load, so no closures over battle state):

```js
reactWith(emotions, message, options={}) → { type:'feelings', feelings:emotions, message, useAbility:options.useAbility }
attack(message)  → { type:'attack', message }
run(message)     → { type:'run', message }
contest(options) → { type:'contest', ...options }
```

New exported `resolve(descriptor, context)` runs at answer time and returns a uniform resolved shape:

```js
{ message, feelings /* {} when none */, endsWith /* null|'attack'|'run'|'failure' */, useAbility /* null|code */ }
```

- `feelings` descriptors with `useAbility` resolve to `endsWith:'attack'` + the ability code (feelings still apply first).
- `contest` resolution (`resolveContest` + `rollContest`, switch/early-return style):
  - `random:true` → `Random.flipCoin()`; `random:{win,loss}` → `Random.fromFrequencyMap`
  - `attribute:Attrib.x` → `AttributesComponent.check(context.A, x) >= check(context.T, x)` (ties favor the player, matching `data/abilities/hide.js`)
  - also support `skill:{code, versus:Attrib.x}` → `SkillCheck(A, code).value >= AttributesComponent.check(T, versus)` — falls out free from the same pattern, and SkillCheck feeds skill improvements automatically; document in the comment block (no data uses it yet)
  - win/loss paths: `{reaction:'respect', text}` re-materializes through `reactWith(reactionMap[name], …)` (so paths can carry `options.useAbility` too); `{complete:'failure', text}` → `endsWith:'failure'`. Accept both `text` and `message` keys.
- Refresh the stale TODOs on `attack`/`run`.

### 2. Stage machine — `NegotiationSystem` + `NegotiationState` + overlay

Stage lives in `NegotiationState` (existing `setStage`/`getStage`, initial `'question'`). Overlay stays dumb; system owns sequencing.

```
open → greeting (can-advance)
  click → advance(): stage switch
    'question'   → cap (≥5) or no questions left → forceResolution('leave')
                   else renderQuestion(pickQuestion())
    'resolution' → renderResolution, stage:='dispatch'
    'dispatch'   → monsterAttacks() | monsterLeaves() | monsterJoins()
  answer(key):
    resolved = NegotiationReaction.resolve(question.reactionData.reactions[key], context)
    state.applyFeelings(resolved.feelings)          // task-134 roll inside
    setResolution(resolved)                          // immediate endsWith trumps bounds check
    stage := isResolved() ? 'resolution' : 'question'
    renderQuestion → renderReaction(resolved.message) (can-advance)
```

- `immediateResolution(endsWith)`: `{attack:'angry', run:'leave', failure:'angry'}` — `failure` maps to angry because `leave` would call `battleWon()` as the *penalty* for losing a contest.
- If `resolved.useAbility`, stash it in NegotiationState (`setForcedAbility`).
- Delete the commented 50/50 request block and the random `isSatisfied`/`isAngry` stubs; keep the Monster-delegation threshold TODO comment (future per-monster difficulty) and the `forceResolution` doc comment.
- `NegotiationState.pickQuestion()` keeps its throw as an invariant guard; add `hasQuestions()` so the system checks before picking (fierce kobold-runt currently has zero authored questions — must gracefully resolve 'leave', not throw).

### 3. Bounds resolution — `NegotiationState.getBoundsResolution()`

```js
if (control < 0 || affection < 0 || respect < 0) return 'angry';
if (fear > 100) return 'leave';                       // scared off
if (control > 100 || affection > 100 || respect > 100) return 'satisfied';
return null;
```

Starting values (control 10, affection 10, fear 0–80, respect 0–40) with ±5..20 deltas make angry reachable in ~2 hostile answers and satisfied a near-perfect run within the 5-interaction cap.

### 4. Task 134 — `applyFeelings` opposed roll (in `NegotiationState`)

```js
function applyFeelings(feelings={}) {
  const factors = rollCommunication(feelings);   // null when map has no deltas (don't farm skill XP)
  control += scaled(feelings.control, factors); …etc
}
rollCommunication: SkillCheck(context.A, 'conversation') vs AttributesComponent.check(context.T, Attrib.beauty)
  crit → {positive:2, negative:0}; fumble → {positive:0, negative:2}
  win  → {positive:1.5, negative:0.5}; loss → {positive:0.5, negative:1.5}
scaled(delta, factors): sign-based factor, Math.round
```

`SkillCheck` already calls `improveSkill()` → `battleState.skillImproved()` → `battleWon()` → enlightenment display, so the "improvements shown during enlightenment" half of task 134 needs **zero extra plumbing**. Scaling applies uniformly to all four feelings including fear (tunable — see flags).

### 5. attack / useAbility execution — one-shot forced-ability override

Do **not** execute immediately via `specRound`: the live round is the player's negotiate round (`setAbility` would throw), `finishCharacterRound()` still needs to run for the player, and the normal loop provides display/cooldown/status plumbing free. Instead:

- `battle-state.js`: `forcedAbilities` map + exported `setForcedAbility(id, code)` / `takeForcedAbility(id)` (consumed on read so it can't leak into later rounds).
- `monster-system.js` `pickAbility()`: take `forced = state.takeForcedAbility(round.getActing())` before the while loop; after `round.setTarget(target)` + null check, `if (forced && Ability.lookup(forced).canBeUsed()) return forced;`. Deliberately skips the cooldown check (scripted narrative action — one-line comment). If illegal, falls through to normal priorities.
- `NegotiationSystem.monsterAttacks()`: before `finishCharacterRound()`, hand off `state.getForcedAbility()` to battle state. Existing move-to-top-of-turn-order flow does the rest.
- Plain `attack()` forces nothing — normal priority pick (dick-puncher has dick-punch at priority 100 anyway).

### 6. Supporting fixes

- **`BattleSystem.battleWon` is not exported** — `monsterLeaves()`/`monsterJoins()` currently throw. Add `battleWon` to the frozen exports in `application/battle/battle-system.js`.
- **Per-answer `requires` filtering** — `NegotiationQuestion.lookup().getAnswers(context)` filters via `answerIsValid` (same function-or-array handling as the existing question-level `isValid`). Mirrors the `getReactionData(context)` precedent. (e.g. how-do-you-murder's cock/ass answers.)
- **Overlay** (`application/views/negotiation/negotiation-overlay.js`): new exported `renderReaction(text)` (clear, `<p class='reaction'>` woven, set can-advance); `renderResolution()` must set can-advance (final click is currently dead) and use class `resolution`; `renderQuestion` passes `NegotiationSystem.getState().getContext()` to `getAnswers`. May need a `.reaction` style in `styles/views/negotiation-overlay.scss` if it doesn't inherit sensibly.

## Files

| File | Change |
|---|---|
| `application/negotiations/negotiation-reaction.js` | descriptor builders, `resolve`/`resolveContest`/`rollContest`, skill-contest doc |
| `application/negotiations/negotiation-system.js` | stage-switch `advance()`, `answer()`, `forceResolution`, `setResolution`/`immediateResolution`, forced-ability handoff in `monsterAttacks()`, delete dead code |
| `application/negotiations/negotiation-state.js` | task-134 `applyFeelings` + helpers, `getBoundsResolution`, `hasQuestions`, forcedAbility accessors |
| `application/records/negotiation-question.js` | `getAnswers(context)` + `answerIsValid` |
| `application/views/negotiation/negotiation-overlay.js` | `renderReaction`, can-advance in `renderResolution`, context in `renderQuestion` |
| `application/battle/battle-system.js` | export `battleWon` |
| `application/battle/battle-state.js` | `forcedAbilities` + `setForcedAbility`/`takeForcedAbility` |
| `application/battle/systems/monster-system.js` | forced-ability consumption in `pickAbility()` |
| `data/negotiation/questions/get-our-cocks-out.js` | optional: fix code typo `'get-out-cocks-out'` (register + registerReaction together) |

Order: battleWon export → reaction descriptors → state → system stage machine → record filtering → overlay → forced-ability trio. Implement stepwise with check-ins.

## Verification

- `bin/test.sh` — existing suite stays green (notably `test/battle/character-ability-system-spec.js`).
- Manual Electron testing via `Fixtures.setupBattle()` (`application/test/fixtures.js:16` — temporarily pin `negotiation-fixture-N`):
  - **fixture-1 (kobold-runt)**: male → fierce → zero questions → graceful leave resolution, no throw; battle won + enlighten screen.
  - **fixture-2 (kobold-sneak-slut)**: timid, 3 authored questions → full loop: greeting → question → reaction → next; `run` answer (bone-jewelry-rumor 'yes') → leave; 5-question cap → leave; hostile spam → angry → monster attacks next.
  - **fixture-3 (kobold-dick-puncher)**: 'yes' → disrespect + forced dick-punch on the monster's next turn (no `setAbility` throw); 'dick-slap' → dex contest win/loss paths; needs a male player (question requires cocks both sides).
  - **Task 134**: after a win, conversation improvements appear on the enlighten screen (~9% chance per roll at low skill — may take a few runs).
  - **Answer filtering**: how-do-you-murder's anatomy-gated answers.
  - **Satisfied path**: temporarily bump starting `control` to ~90 to smoke-test `monsterJoins()`.

## Flagged tunables (shipping with the stated defaults)

- Bounds thresholds 0/100; per-monster thresholds stay future work.
- `complete:'failure'` → angry (not leave).
- Contest ties favor the player.
- Fear included in task-134 scaling (alternative: exclude it since `scare` deliberately builds fear).
- Scaling table crit ×2/×0, win ×1.5/×0.5, loss ×0.5/×1.5, fumble ×0/×2.
- Plain `attack()` uses the normal priority pick rather than literally forcing `basic-attack`.
- Forced ability bypasses the cooldown check.
