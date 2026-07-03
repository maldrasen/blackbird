# 3. Architecture & Robustness Concerns

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

