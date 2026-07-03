# Code Analysis — Bug Hunt (2026-07-01)

A full pass over `application/` and `data/`, cross-referenced against the design docs. The test suite passes (235 passing, 14 pending) and no file has syntax errors, so everything below was found by reading, not by the runner. Findings are grouped by severity. File references include line numbers as of this analysis.

---
# 2. Wrong Behavior (no crash, wrong results)

### 2.8 Reverted actions skip the slot-conflict check
`willContinue()` (`training-system.js:184`) pushes the revert action into persisted actions *while*
`checkPersistedActions()` iterates a snapshot — so the freshly added revert action is never checked against
the incoming action's slots and can end up sharing a slot with it.

### 2.9 Futa cases lose information in `attitudeTowardsTraining()`
`personality.js:29-32`. `results.touching` is assigned twice when the partner has both a cock and breasts
(the breasts result overwrites the cock result), and `results.service` likewise for a futa player. Should
take the max of the two consents, not the last one evaluated.

### 2.10 Shame branch reads the wrong orientation value
`sensation-orientation.js:50-52` passes `orientation.masochism` into the degradation handlers instead of
`orientation.shame`. Harmless today because all the handlers are empty stubs — it will be very confusing the
day they're implemented.

### 2.11 `Character.getSpeedFactor()` returns nothing
`character.js:38` — missing `return`. Latent (battle reads the CacheComponent directly via
`BattleRound.getSpeedFactor()`), but it's a wrapper API that silently returns `undefined`.

### 2.12 Pussy "Depth" row displays the width
`character-body-panel.js:181` — `pussyDepth` is computed from `pussy.maxPussyWidth`; copy-paste from the
line above.

### 2.13 Stray `{/T}` tokens in battle status messages
`physical-attack-system.js:76-78` — the poised messages contain `{T:TargetName}{/T}`. There is no `{/T}`
token; the weaver renders it as a warning span in the battle log. `compileName()` already wraps names in
`{S/tar}...{/S}`, so the `{/T}`s should just be deleted.

### 2.14 Player baseline label is a literal `${name}`
`sensation-baseline.js:51` uses single quotes: `'${name} Baseline'`. Partner line (46) uses backticks
correctly. UI shows the literal string for all player baseline sensations.

### 2.15 `Weaver.formatWarning` called statically in five looms
`breasts-loom.js:97`, `body-loom.js:10`, `utility-loom.js:4`, `cock-loom.js:9`, `pussy-loom.js:4`.
`formatWarning` is an instance method (`Weaver(context).formatWarning`), not a static. An unknown token in
those looms throws a TypeError, which the weaver's try/catch converts into an *error* span plus a confusing
console error, instead of the intended warning span. Either make `formatWarning`/`formatError` static
properties on `Weaver`, or call `Weaver({}).formatWarning(...)` like `actor-loom.js:52` does.

### 2.16 Data uses weaver tokens that don't exist yet
These render as warning/error spans in real text today:
- `{T:meanName}` — used throughout `data/dialog/bastard/propose-training.js` (and `{T:niceName}` in others);
  `ActorLoom` implements neither.
- `{A:cock.thick}`, `{A:cock.sixInch}`, `{A:cock.thickCock}`, `{A:cock.bigCock}` — used in
  `data/sex-positions/centipede.js`, `straddle.js`, and several dialogs; `CockLoom` is an empty stub.
- `{A:breasts.thickNipples}` returns the literal `[THICK NIPPLES]` (`breasts-loom.js:165`).

### 2.17 `EpisodeState.getChoices()` references an undefined variable
`episode-state.js:36` returns `choices`, which is never declared — ReferenceError if anything ever calls it.
Currently nothing does.

---
# 3. Architecture & Robustness Concerns

### 3.1 Feelings entities leak and `hasParent()` is wrong
`feelings-component.js:56` returns `hasParent: false` even though every feelings component has a
`_parentId`. `Registry.findChildEntities()` builds its child-type list from `hasParent()`, so feelings
entities are **not** deleted when their character is deleted. Separately, feelings whose `target` is a
deleted character dangle forever (nothing scans targets). If the `false` is deliberate (to survive some
operation), it deserves a comment; otherwise flip it to `true` and handle target cleanup wherever characters
are removed.

### 3.2 Dead monsters escape battle cleanup
`battle-state.js:34-38`: `cleanup()` iterates `monsterFormation`, but dead monsters get
`removeFromFormation()`'d and are then never deleted from the Registry. The TODO at line 31 already gestures
at this — until the dead-pile exists, entity leaks accumulate per battle.

### 3.3 `lookupNormalOf()` works by accident
`cock-component.js:68-70`: `of()` returns an *array* of entity ids, and `lookup(of(parent))` only works
because a one-element array string-coerces to its element when used as an object key. Zero matches → key `""`
→ undefined (fine); **two matches → key `"A,B"` → undefined** — so a two-cock character (the component
validates `count`, and the todo list plans multi-cock bodies) silently has "no cock." Same pattern exists in
the other `lookupNormalOf` components (mouth, anus, pussy). Should be `lookup(of(parent)[0])` with an
explicit multi-result policy.

### 3.4 `GameState.initialize()` relies on `reset()` having run
`game-state.js:36-42` clears the registry but leaves `$player`, `$partyConfiguration`, `$currentFloor`,
`$returnMode` stale from any previous game. Harmless while every path calls `reset()` first; cheap to zero
them in `initialize()` too.

### 3.5 Enlighten mode is half-wired
`GameState.setGameMode()` (`game-state.js:59-70`) has no `GameMode.enlighten` case — it works today only
because `EnlightenController.startEnlightenment()` calls `EnlightenView.show()` itself, inverting the pattern
every other mode uses. Also `EnlightenController` stores `$anima/$animus/$anger` but exposes no getters, so
the enlighten view can't actually read the data it's supposed to display. (Both presumably part of the
"Implement the enlighten view" todo — noting so it doesn't get lost.)

### 3.6 Consent factor order is data-defined and unguarded
`ConsentResult` applies factors in array order; gender and preference factors are multiplicative. A data file
that lists a multiplicative factor before the base factor multiplies zero and silently produces a garbage
consent value. Every current action lists `base` first, but nothing enforces it — a cheap `applyFactors()`
sort (additive first) or a validation would remove the trap.

### 3.7 Unvalidated component ranges
- `ArousalComponent.validate()` only checks `arousal >= 0`; `pleasure`, `edging`, `refectory` are
  unconstrained.
- `FeelingsComponent` has no range validation, but `CharacterMath.emotionBaseValue()` /`PiecewiseCurve`
  **throws** for |value| > 1000. Anything that nudges affection/fear/respect past ±1000 turns into a consent
  crash later. Validate at ±1000 or clamp in the curve.
- Spelling: `refectory` (a monastery dining hall) is used throughout for `refractory`. Cosmetic, but it's a
  persisted property name — cheaper to rename now than after save files exist.

### 3.8 Skill improvement fires from any `SkillCheck`
`skill-check.js:80` improves skills as a side effect of every check, including checks made while building
sensation results. The battle path reports improvements via `battleState.skillImproved()`, but the training
path silently mutates skills with no notification (the TODO at line 43 acknowledges this). Worth doing before
balancing training, since every sex action currently rolls 1-3 skill checks with improvement chances.

### 3.9 Registry trivia
`registry.js:58-61`: `findChildEntities()` always returns an array, so `compileEntityData()` appends
`children: []` to every dump. Harmless noise in `debug/floor-state.json`-style output.

---
# 4. Design Doc Drift

### 4.1 Consent levels doc describes the old model
`docs/3. Training - Consent.md` specifies fixed bands (Eager > 100, Willing 25-100, Reluctant 0-25,
Unwilling < 0). The implementation (`consent-result.js:153-160`) uses a per-action `consentTarget` with
1.25×/2× multipliers. The code model is better; the doc should be updated.

### 4.2 Anima & Animus doc describes an old sensation format
`docs/3. Training - Anima & Animus.md` shows sex actions carrying 0-1 emotion vectors
(`loving/lustful/dominating/degrading/painful`). Implemented actions instead declare named baseline
sensations (`partnerSensations: { anus: 100, shame: 150, ... }`). Doc needs a rewrite to match.

### 4.3 Persistent sensitivity levels never multiply sensations
The same doc says the (persistent) sensitivity scales are used as multipliers — level 0 means no pleasure
from that part, letters map to factors 0.25-16. In code, `SensitivitiesComponent` values are only used as
binary erogenous gates (`> 0`) in `SensationResult`, and `SensationScales` applies the letter factors to the
*transient session scales* instead (which start at F every session). If that's a deliberate redesign, update
the doc; if not, there's a missing `SensationSensitivities` step — and it's a big balance lever to be missing.

### 4.4 Weaver doc lists unimplemented tokens
`docs/1. Architecture - Looms and The Weaver.md` documents `{A:niceName}`, `{A:meanName}`,
`{A:equipped.<slot>}`, `unequip(A,<slot>)`, `setPosition(<position>)`, all the cock tokens, and the nipple
tokens — none implemented. Several are already used by data (see 2.16), so these are the priority ones.

### 4.5 ECVC doc vs `deleteComponent`
`docs/1. Architecture - ECVC.md` says "When a component is removed any child entities … are also removed."
`Registry.deleteComponent()` doesn't touch children; only `deleteEntity()` cascades. Either the doc overstates
or the registry under-delivers — with body-part components as child *entities*, deleting a component probably
should orphan-check.

### 4.6 Baseline repeat-penalty exempts anger
`sensation-baseline.js:45` exempts `anger` from the repeat/persisted strength reduction, while the comment
above (and the doc) say *all* baselines are penalized. Almost certainly intentional (spamming shouldn't
discount anger) — worth one comment line so it doesn't read as a bug.

