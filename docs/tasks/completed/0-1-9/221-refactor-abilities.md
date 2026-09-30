---
id: 221
title: Refactor abilities
priority: 1
created: 2026-09-13
tags:
  - battle
points: 13
---
---
I think that abilities are badly in need of a refactor. They just feel super disorganized right now. I think we just need to redesign them from the ground up, keeping all the functionality that they currently have, but also adding what they will still need to have for when we start adding more character abilities. 

I think first we need to split a "battle command" from an ability. Abilities like "change equipment" really aren't abilities, they inform the UI what to do next. Same with a character ability like "cast spell". A cast spell command should open the spell interface so that a spell and power level can be selected. Then once they're selected the "cast spell" ability with the target, spell and power level is executed.

Because abilities need to have a lot of internal state (like the spell or item choice), representing them as a record, which is supposed to be an immutable data object, is the wrong direction. Instead, I think we need to make the abilities actual models. They can be immutable once they're created, but the shape of that is a factory that creates an object that's stored on the monster record, or creates an ability object given a battle command.

### Outcome
The refactor landed as described above, and `docs/reference/battle-abilities.md` documents the result. The shape that came out of it:
- `Ability(name)` is the model, filled in by the factories under `application/battle-abilities/factories`. Every old record became a factory, the natural attacks became presets over `Ability.NaturalAttack()`, and the sneak attack and dick punch chain into the special and natural attack factories.
- Monsters and monster types build their abilities in `buildAbilities` closures that run from `Application.init()`, after all the data has loaded, so a record can reference spells and articles without any load order games. A monster's list is its type's followed by its own; nothing overrides by key any more, since nothing ever did.
- Cooldowns are keyed by ability id rather than an entry key, and the round reads the cooldown off the model.
- Forced abilities from negotiations are names now, and the reaction option is `ability` rather than `code`.
- `BattleCommand` records are the character side: they build an ability from what their overlay chose, and ending the character's round is the command's job rather than the ability's.

### Notes
- **Appraisal is lazy.** Building abilities at registration meant the venomous bite would have priced its poison before the poison status type existed. Appraisal briefly ran from `Application.init()` after the compile pass, but now `getEssence(attributes)` prices on read, which happens after init anyway and lets a natural attack scale with the strength of the monster using it. The essence report script still reads the old map.
- **Ability ids are per session.** They're assigned in compile order, which is deterministic while the data doesn't change, but a saved battle would not survive an ability being added to a record earlier in the load order. Battles don't save today.
- **Characters can't use natural attacks yet.** The natural attack's possibility check reads the round's target, which a character hasn't picked when the command panel asks. It needs the monster-versus-character split the weapon attack has before a recruited kobold gets its bite back (task 012).
- **Dual wielding buys nothing yet.** Two weapons fit an extra strike into the second, but the round is charged each weapon's full speed, so the rate is unchanged. Pre-existing, left alone.