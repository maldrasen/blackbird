Blackbird is going to stick to a system like Wizardry or SMT, with a few notable differences of course. There will be a heavy focus on status effects, with the capability of binding, disabling and capturing foes. Still thinking about all the systems and how the actual implementation of the battle system will work.

### Action Time
Each combat action takes some amount of time, measured in milliseconds. A basic attack action can take 1000ms, but the character making a basic attack can take multiple swings in that time. Better to have 1 command with 4 separate attacks than 4 commands I think as far as pacing goes. Effects that give the character haste can reduce this time. We should measure haste as a ratio, so if your haste is 0.8 actions will take 80% of the normal action time. Slow effects will use the same haste value, but set it higher than 1.

### Armor
Like Wizardry I want armor to be piecemeal per body part. Each attack with target a specific body part. Some abilities always target the same part (head shot, dick punch, etc.) Most attacks are chosen randomly. Armor only provides damage reduction. Damage will need damage types, including multiple physical damage types (slash, crush, pierce) and elemental damage types (fire, shock, etc)

Some spells (psychic damage, blinding effect) don't target any body part, but armor resistances can still stack onto the character's base resistances. 

### Dodging
The attacker makes an attack roll using the weapon skill of their equipped weapon, or the natural weapon skill for animal like monsters. The attack skill roll is opposed by the defending character's defense skill. (Dodge, parry, block)

The defense skill isn't chosen but is based on what the character has equipped. Dodge will be the default. If they have a shield equipped they'll use block. Parry is more complex (and more difficult) They'll need a sword equipped (I think only swords can be used to parry) and the parry skill need to be trained. At higher parry skill levels a successful parry will cause a counter attack. This only applies to some attacks though. Spells, arrows, or grapples can't be parried and will fall back to dodge.

Sneak attacks, or attacking a disabled character, bypasses the defense roll entirely. Missing in this circumstance should be difficult, so the attack rolls will need a fumble state. Both fumbles and crits should be rolled separately from the attack roll. A 3% crit chance means that 3% of otherwise successful attacks will become crits. If you only hit 50% of the time, 1.5% of attacks made will be crits. Exploding crits are fun as well. A normal crit may do 2x damage. 10% of crits will do 4x, and 10% of those will be 10x or instant kills. Feats, spells, abilities, enchantments should exist to lower fumble chance, raise crit chance and exploding crit chance. 

Size might need to be a factor as well. Something that's much smaller should be easier than something that is the size of a barn. (It might be impossible for a barn sized creature to ever dodge, but will make up for it with armor and damage reduction.) Size could provide an overall speed factor as well. Halflings could attack twice as often. Equin could hit half as often but twice as hard. If we do add a speed factor, it should be separate from the health factor, but related. Otherwise kobolds would attack 5 times as often as a human.

##### Weapon Specialities 
Given that swords are the only weapon that can parry the other weapons need something that would have people possibly choosing them as well. Spears and polearms can have reach, allowing the back row to be attacked (unless they're in the back rank, but it can then be used to attack from the back) Bows can attack any rank from anywhere. Whips have reach and can have special abilities that for binding enemies.

That leaves axes, daggers, and maces.

I think certain enchantments can only be placed on certain weapon types. Enchantments that enhance stealth, backstab, and crit damage can go on daggers. Maces could have enchantments that ignore damage resistance. 

### Items, Equipment, Loot
The item component is needed because some basic items (especially clothing) needs to be further customized with colors and materials and such. Item enchantments also need a place to go. Every item (weapons, armor pieces, etc.) will also need a base item record for the properties that don't change like the base weapon damage and available attack modes and such. Monsters will have armor and weapons, but they'll just have the base types. If we turn a monster into a fully formed character we'll generate real equipment from the monster's base equipment. When the monster leaves the dungeon though the equipment they have disappears.
  
Basic dungeon equipment is cursed. It disintegrates once it's outside of the dungeon proper. The first time you capture a monster with a sword we add an event where the monster's equipment turns into a pile of rust, leaving them naked.
  
The only loot that doesn't disintegrate are the 'higher order' materials. These are metals that can be enchanted or are already magical. This magic stabilizes them when outside the dungeon. This solves a few problems. Some monsters can randomly have cool magical equipment that they use, that they then drop on death or have in their inventory when captured. Monsters can still drop some stuff that's useful, gold, teeth, whatever, according to their loot table. Any loot found will be useful. Even if a "doom copper" sword is worse than everything you have, the blacksmith can still buy it.

### Weapon Damage
Weapon damage should relate to the way we calculate health, in terms of scale. The health formula is `vitality d10 * health factor` or around `5.5` health per vitality for humans. So kobolds should have around 10 hp with their 0.2 health factor and a 1st level equian might have around 250, while an equian with 100 vitality could have around 900. A human should have around 100, and a halfling around 40.

One of the principle that I'd like for weapon damage to follow is that a character's skills and attributes matter more than their equipment. A heroic warrior with a pointed stick is more dangerous than a nobleman with a magic sword.
