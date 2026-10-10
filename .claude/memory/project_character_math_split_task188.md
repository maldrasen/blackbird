---
name: character-math-split-task188
description: "Task 188 — CharacterMath split into AttributeMath, SpeedMath, TrainingMath; Math suffix is the family name for stateless calc modules"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1e95a7e5-3b46-42c9-a01e-3f80882e51de
  modified: 2026-08-16T23:52:56.745Z
---

Task 188 (branch `188-separate-character-math`, 2026-08-16): `CharacterMath` no longer exists. Split by consumer:
- `AttributeMath` (`application/characters/attribute-math.js`) — attributeBaseline/attributeGrades/attributeIncrease + aspect/gender helpers. Consumers: level-system, essence-system, attributes-factory, monster-factory. No direct spec (covered via factory/level specs, user's call).
- `SpeedMath` (`application/characters/speed-math.js`) — calculateSpeedFactor + dex/body/breast bands. Consumers: Character wrapper `getSpeedFactor()`, battle-round (characters only; beasts use BaseMonster.getSpeedFactor()). Spec: `test/characters/speed-math-spec.js`.
- `TrainingMath` (`application/training/training-math.js`) — emotionBaseValue, personalityFactorValue, applyFactorScale, saturatingGrowthCurve. Consumers: consent-result, sensation-results, training-system. Spec: `test/training/training-math-spec.js`.

Naming decision: keep the **Math** suffix as the family convention for stateless calculation modules (domain prefix + Math). User rejected `Calculator` and `Helper` (helpers = generic cross-cutting utils in `application/helpers` only). See [[beast-monsters-task185]] for AttributeMath grade-map usage.
