---
name: requires-predicate-unification
description: Task 150 SHIPPED 2026-07-31 — CharacterRequirements in application/requirements, dual-mode subject resolution, records carry predicates
metadata:
  node_type: memory
  type: project
  originSessionId: a3ff7d88-9164-4a40-91b8-05e6387fe398
  modified: 2026-07-31T21:34:34.538Z
---

Task 150 SHIPPED 2026-07-31. WeaverRequirements moved to `CharacterRequirements` in
`application/requirements/character-requirements.js` (NegotiationRequirements moved into that directory too); all
~32 data files renamed. `Archetype.requires` and `SexualPreference.requires` now carry predicate closures (e.g.
`CharacterRequirements.hasBreasts()`), not magic strings. The divergent interpreters (`meetsRequirement()` in
negotiation-reaction.js, string checks in `removeIncorrectPreferences()` and `assertValid()`) are gone; the broken
`senses.breasts` check is fixed.

Key contract: builders are `name(key, ...args) => (context) => bool`. Private `subject(context, key)` resolves the
target — key given → `Character(context[key])`; key null + live `CharacterFactory.getState()` → the factory state
(see [[character-factory-state]] mirror predicates, incl. new `isMale()`); otherwise the context argument IS a
character id. `CharacterRequirements.met(requires, context)` is the single evaluator (null/single/array);
weaver-package delegates to it. `Character(id).hasSensitivity(code)` added for erogenous zone predicates.

Only record-relevant predicates are dual-mode (hasBreasts/hasCock/hasPussy/erogenousCervix/erogenousUrethra/
isMale/isNotMale); clothing/size/species predicates stay Character-only and would throw if evaluated keyless
mid-build. Related: [[negotiation-rewrite-plan]].
