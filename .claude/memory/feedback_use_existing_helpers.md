---
name: use-existing-helpers
description: Check application/helpers before hand-rolling conversions; extend existing functions with option flags rather than adding parallel ones
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 65e447f0-4df0-4e95-800c-d6c597433913
  modified: 2026-08-08T23:18:18.471Z
---

The user called out that CockLoom hand-rolled a mm→inch conversion (`Math.round(length / 25.4)`) when `MeasurementHelper` already existed. And when the helper lacked the adjectival form ("six inch long cock"), the user preferred folding a `singular` flag into the existing `inchesWithFractions(mm, eighths, singular)` over adding a separate `inchesAdjective()` function (2026-07-05).

Repeat instance (2026-08-08): I hand-rolled record validation in Episode.register when `application/helpers/validate.js` (the `Validate` module) already existed for exactly this — throwing checks like `isIn`/`exists`/`between`/`trueOrNull`/`singleKeyFrom` with dotted context names (`Episode[code].queue.chance`). The user's expectation: use Validate for record/component validation, and when it lacks a check (isFunction, isString, isArray...), add it to the module rather than checking inline. Flags in records follow the `trueOrNull` idiom: true or omitted, never false. When a record's validation grows past a few lines, it becomes its own module in `application/records/validators/` — a `global.<Record>Validator = function(code, data)` that throws (see episode-validator.js); the record's register() just calls it.

**Why:** `application/helpers/` (MeasurementHelper, EnglishHelper, StringHelper, PronounHelper...) is the sanctioned home for unit conversion and English formatting, and MeasurementHelper deliberately tries to capture every way a length becomes a phrase. Its API shape is option flags on a few functions (`eighths`, `singular` — see `feetAndInchesWithFractions`), not many near-duplicate functions.

**How to apply:** Before writing conversion/formatting logic, grep `application/helpers/`. If a helper covers the domain but not the exact output shape, extend the nearest existing function with a flag (plus spec coverage in `test/helpers/`) instead of computing at the call site or adding a sibling function.
