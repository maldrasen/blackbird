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
The `requires` property on the sexual preference and archetype data records is currently a magic string interpreted by whoever reads it, and the interpreters have already diverged:

- `SexualPreference.requires` (`breasts`/`cock`/`pussy`/`erogenousCervix`/`erogenousUrethra`) is resolved in two
  places with two different implementations: `removeIncorrectPreferences()` in
  `application/characters/factories/sexual-preferences-factory.js` checks the build context's sensitivities map
  (where the `senses.breasts` check is latently broken — `breasts` isn't a sensitivities property), while
  `meetsRequirement()` in `application/negotiations/negotiation-reaction.js` checks `Character(id)` predicates and
  the sensitivities component.
- `Archetype.requires` (`gender.male`/`gender.not-male`) is resolved in `assertValid()` in
  `application/characters/factories/personality-factory.js`.

Rework these to follow the `NegotiationRequirements` model: the record carries a requirement predicate and callers just evaluate it, so there's exactly one definition of what each requirement means.

We already have similar predicates defined in the WeaverRequirements. When this module was created, these requirements were only used by the weaver package, so it made sense for it to be part of the weaver. Now though, I'm thinking that because they're being used as raw predicates in the Negotiation system, we need to have a more global understanding of how these are intended to work. 

Most all of the predicates in the current WeaverRequirements apply to the characters. The one that doesn't (withHitLocation) gets its argument passed to it. I think we first move everything from WeaverRequirements into CharacterRequirements, in a top level requirements directory. 

We then need to add the requirements that the Archetypes and Sexual Preferences reference. The character factory needs to be able to evaluate requirements mid-build against the factory state, while the negotiation and weaver paths evaluate against a built character id. The predicates need a single interface both can satisfy. It seems to me that something can be done with the key that's passed in most of these functions. The key currently tells these functions which value in the weaver context to use when creating a Character wrapper. Perhaps when the key is null, and a character is being build (the character factory state exists) then these predicates know to read this state rather than a character component.

Folding `meetsRequirement()` out of the negotiation reaction and fixing the broken breasts check both fall out of this for free. The existing `givePreferences` specs in `test/negotiations/negotiation-reaction-spec.js` cover the runtime-side behavior and should keep passing unchanged.
