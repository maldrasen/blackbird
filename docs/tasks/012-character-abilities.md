---
id: 012
title: Character Abilities
priority: 3
created: 2026-07-03
points: 8
tags: [battle]
---
---
We've implemented a single ability for the monsters. (The dick-punch) When a monster uses an ability that ability goes on cooldown, but it doesn't cost stamina or mana. The cooldown is there to prevent the monster from using the same highest priority ability every turn. In fact, the monsters should have most of their abilities on a random cooldown at the beginning of the battle so that they all act differently. Character abilities can be used as often as the player wants, but each ability has a stamina cost or a mana cost. (The difference being that stamina should be restored at the end of a battle I think?) We need to figure out how abilities are learned and so forth as well.

> One contradiction to figure out here. If battle stamina is restored at the end of a battle, then stamina shouldn't be used to limit the number of times a character can be trained. We can still have stamina control the length of training, but will need some separate, "character can be trained 1 more time today" kind of system.

---
**Notes (Claude):** Infra exists — the `Ability` record, `CharacterAbilitySystem`, and one authored ability (dick-punch). Three separable pieces: (a) resource costs (stamina vs mana; stamina restored post-battle) wired into ability execution and the health/mana components; (b) monster random initial cooldowns so encounters vary turn to turn; (c) an ability-learning/progression model — the real design unknown. Plus authoring the actual abilities (`data/abilities/*`). Consider splitting (c) out. Overlaps quirk unlocks in [[045-implement-the-enlighten-view]].
