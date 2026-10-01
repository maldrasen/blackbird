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
When a spell is cast, first the mana color is selected, we list the spells under that color. A spell is selected. The power level is chosen. (Up to the max power level that the character has enough mana for) We need a button to then confirm the selection that starts targeting. Then when the target is selected we start casting the spell, subtract the mana cost, and end the round. 

From this point the spell effects should be the same as a monster spell. The difference between the two are really just the spellbook and the mana costs.

### Power Level Increases
Like the skill progression, the spell's maximum power level has a chance of increasing each time the spell is cast. Casting a spell requires a skill roll so it could be tied to that. Whenever the spell cast is crit perhaps? Up to the power level limit. We don't want to tie it to the skill increase directly because a character with 100 skill in a given type of magic would never get another increase.

> "We Love Casting Spells" - Shadow Money Wizard Gang
