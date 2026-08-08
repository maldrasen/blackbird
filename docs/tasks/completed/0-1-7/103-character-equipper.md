---
id: 103
title: Character Equipper
priority: 2
created: 2026-07-09
tags:
  - battle
  - character
---
---
Part of task 100 is to add starting equipment to the player. I think the right way to do this is to build a general purpose CharacterEquipper module. The CharacterFactory builds all of the body components, but every newly built character starts naked. So really, if we've gone through the trouble of making a real character entity it's likely that they'll also need armor and weapons.

The CharacterEquipper will take an entity and a budget as arguments. Budget isn't a total, it's the most they're willing to spend on any single item. Depending on the item type, they'll use some percent of that budget value. A weapon or their chest armor can use 100% of their budget, while their gloves may only use 20%. This should give people generally comparable equipment in every slot.

For now we can assume that every character is a melee fighter of some type. Magic focused characters will need entirely different considerations, but we can skip them for now.

### Equipment type should match the character using it
The equipper needs to first determine what kind of equipment the character would use. We should look at their skills first. If, of their martial skills, their sword skill is the highest they would have a sword. If they don't have any weapon skills (everything is less than 10) then we pick their weapon based on their highest attribute. 
- If they have high strength, we pick a we weapon with a strength based skill. (axe, mace, polearm) 
- If they have high dexterity we pick from (bow, dagger, whips) 
- When strength and dex are about even (within 10% of each other) we give them a sword. 
- If they end up with a single hand weapon we should also give them a shield, or if they're a high dex character we give them an off hand dagger.

When picking armor we need to know if this character would be equipping heavy metal armor. We can gate this first as a budgetary concern. New or low level characters would probably have mostly leather armor as that's what they could afford. 

Higher level characters would have a higher budget, but should also have skills we can use to determine what kind of character they are. We can look at their abilities and see what armor types would interfere with them. We can save higher level characters for later.

Characters with high budgets and low skills are probably nobility or something and would go though a different selection pass for finery. 

### Equipment Variety
The chosen equipment will need a little variety between characters, so for each equipment slot, we should find all the base equipment that's within 80% - 100% of that slot's budget, and select randomly from that list. If there are no items for that slot within that budget, we can find the next cheapest thing, or nothing if there's nothing affordable in that slot within that budget.
