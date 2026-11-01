---
id: 250
title: Casting Spells
priority: 2
created: 2026-10-01
tags:
  - battle
points: 8
---
---
First, characters need a way to know what spells they have access to. We need to add a simple spellbook component for this. The spellbook will need to have a map of spell codes and the maximum power level that a spell can be cast at. We don't need to worry about getting spells into the book in this task. We can just add them directly for now.

### Cast Spell Action
When a spell is cast, first the mana color is selected, we list the spells under that color. A spell is selected. The power level is chosen. (Up to the max power level that the character has enough mana for) We need a button to then confirm the selection that starts targeting. Then when the target is selected we start casting the spell, subtract the mana cost, and end the round. (Failing to cast a spell, or having that spell interrupted while casting, still costs mana)

From this point the spell effects should be the same as a monster spell. The difference between the two are really just the spellbook and the mana costs.

### Power Level Increases
Like the skill progression, the spell's maximum power level has a chance of increasing each time the spell is cast. Critting when casting a spell increases the spell's power level, so it would make sense that that also triggers a permanent increase to the casting level. The power level is capped at 8, so a crit wouldn't increase it past that.

> "We Love Casting Spells" - Shadow Money Wizard Gang

---

### Implementation notes
The spell selection is a mode of the command panel rather than a separate overlay. The power level raise rolls only after a successful release, at whatever level the spell was cast: a crit always raises it, otherwise a d100 has to come in at or under (8 − level) × 2. Raises are shown on the enlighten screen beside the skill improvements. Healing and mana restoring effects weren't being applied in battle at all, so Mending now works, with an `ally` effect target and an `anyAlly` targeting mode that offers the party.

Deferred:
- Key bindings inside the spell selection. The C key opens it, after that it's mouse driven.
- Cancelling targeting after Cast returns to the command list rather than the spell list.
- Casting outside of battle, which belongs with the spellbook tab in [251-learning-spells.md](251-learning-spells.md).
- The yellow, blue, and black stub spells have no mana cost or effects. They'd read as castable at any level if they ever reached a spellbook.
