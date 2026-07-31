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

### Ability Ideas
- Charge attack - A character in the back row, charges forward, makes a single weapon attack. The ability only takes maybe 100ms, meaning they'll likely get to go again soon after. The ability has a long cooldown, preventing two characters with the ability from swapping back and forth, taking double turns.


---
**Notes (Claude):** Infra exists — the `Ability` record, `CharacterAbilitySystem`, and one authored ability (dick-punch). Three separable pieces: (a) resource costs (stamina vs mana; stamina restored post-battle) wired into ability execution and the health/mana components; (b) monster random initial cooldowns so encounters vary turn to turn; (c) an ability-learning/progression model — the real design unknown. Plus authoring the actual abilities (`data/abilities/*`). Consider splitting (c) out. Overlaps quirk unlocks in [[045-implement-the-enlighten-view]].
