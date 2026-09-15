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
**Notes (Claude):** Infra exists — abilities are models built by the factories in `application/battle-abilities/factories`, characters reach them through the `BattleCommand` records in `data/battle-commands`, and `CharacterAbilitySystem.getCommands()` lists what a character can use (task 221, see `docs/reference/battle-abilities.md`). Monster random initial cooldowns are done. Three separable pieces remain: (a) resource costs (stamina vs mana; stamina restored post-battle) wired into command execution and the health/mana components; (b) a command that builds a character's own natural attacks, which needs the natural attack's possibility check to work without a target the way the weapon attack's does (see the note in `data/battle-commands/special-ability.js`); (c) an ability-learning/progression model — the real design unknown. Consider splitting (c) out. Overlaps quirk unlocks in [[045-implement-the-enlighten-view]].
