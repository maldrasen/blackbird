---
id: 150
title: Unify record requires into requirement predicates
priority: 1
created: 2026-07-30
tags:
  - character
points: 3
---
---
Do this after task 143 (Refactor Character Factory) — the factory state refactor changes how the interim build state
is accessed, which is exactly what these predicates need to evaluate against.

The `requires` property on data records is currently a magic string interpreted by whoever reads it, and the
interpreters have already diverged:

- `SexualPreference.requires` (`breasts`/`cock`/`pussy`/`erogenousCervix`/`erogenousUrethra`) is resolved in two
  places with two different implementations: `removeIncorrectPreferences()` in
  `application/characters/factories/sexual-preferences-factory.js` checks the build context's sensitivities map
  (where the `senses.breasts` check is latently broken — `breasts` isn't a sensitivities property), while
  `meetsRequirement()` in `application/negotiations/negotiation-reaction.js` checks `Character(id)` predicates and
  the sensitivities component.
- `Archetype.requires` (`gender.male`/`gender.not-male`) is resolved in `assertValid()` in
  `application/characters/factories/personality-factory.js`.

Rework these to follow the `NegotiationRequirements` model: the record carries a requirement predicate and callers
just evaluate it, so there's exactly one definition of what each requirement means. Something like a
`CharacterRequirements` module providing `hasBreasts`, `hasNormalCock`, `hasNormalPussy`, `erogenousCervix`,
`erogenousUrethra`, `gender(...)`, etc.

The design question to settle: the factories evaluate requirements mid-build against factory state, while the
negotiation path (and future runtime callers) evaluate against a built character id. The predicates need a single
interface both can satisfy — post-143, likely the character factory state on one side and a thin adapter over the
component lookups on the other.

Folding `meetsRequirement()` out of the negotiation reaction and fixing the broken breasts check both fall out of
this for free. The existing `givePreferences` specs in `test/negotiations/negotiation-reaction-spec.js` cover the
runtime-side behavior and should keep passing unchanged.
