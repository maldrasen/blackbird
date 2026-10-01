This release was about making the dungeon feel like a dungeon crawler. The room based navigation was replaced with grid based movement, and the party marker, tile contents, traps, and a vision system were built on top of it. The dungeon now has treasure rooms and an entrance episode, and the early floors were rebalanced so the game is survivable.

The other big theme was equipment and items. Weapons and armor were unified into a single equipment model with an appraiser, monsters now shop for their gear from equipment depots, a loot generator drops items after battles and fills treasure chests, and the party shares a single inventory. Abilities were rebuilt as models, essence is now calculated from a monster's abilities, and a separate challenge rating drives the encounter builder. Negotiations gained their first requests.

## Changelog

### Dungeon
- Replaced room based navigation with eight direction, tile based movement. The party is a marker on the grid, stairs sit on an exact tile with a command to use them, and doors are models that open when walked through. (#215)
- Improved the feel of grid movement: a new direction key interrupts the current step animation rather than being ignored, and holding a direction key switches into a faster run mode until an obstacle is hit. (#233)
- Added tile contents to rooms. A tile can hold a glyph, block movement, and describe itself when entered; stairs became a kind of tile content, orchards were rescaled so the party can walk between the trees, mana font statues block their tile, and the party marker was halved in size. (#234)
- Added the dungeon vision system: a ray cast visibility polygon computed each frame from the marker's position, a light radius, and a memory layer that outlines everything the party has already seen. Unseen areas are hidden and previously seen areas are dimmed. (#224)
- Converted room traps into tile traps placed on random tiles. The party scouts the surrounding tiles as it moves, found traps show their glyph, walking onto a found trap attempts to disarm it, and walking onto a hidden one springs it. (#236)
- Removed the current room highlight, which was left over from room based positioning. (#235)
- Added treasure rooms whose chests are filled by the loot generator based on the floor's theme, and empty orchards now act like treasure rooms. (#214)
- Added the dungeon entrance episode, a description shown the first time the party enters the dungeon. (#212)
- Converted the step result returned by the navigation system from a plain object into a model, and fixed diagonal moves that only worked by accident. (#248)
- Fixed overlapping room footprints: a room placed over another now carves its tiles out of the rooms that contained them.

### Battle System
- Rebuilt abilities from the ground up. Abilities are models built by factories rather than records, monsters compile their ability lists at application init, cooldowns are keyed by ability id, and battle commands were split from abilities as the character side of the system. (#221)
- Spell essence is now calculated from a formula over the spell's effects, damage, status effects, cast time, and cooldown, instead of being hand authored. (#211)
- Extended the essence formula to natural attacks and other data driven abilities, with natural attacks priced from the strength of the monster using them. Abilities with unique effects keep hand authored values. (#219)
- Split challenge rating from essence. Essence is the magic a monster contains and what the party absorbs; the challenge rating adds the base monster's equipment budget on top of that and is what the encounter builder and loot generator use. (#220)
- Rebalanced the early game. Added crawling claws, gnawbones, and the vermen ragpicker as easy monsters for the first floors, gave the player higher starting attributes and a weapon skill, and reweighted health in the essence formula. (#216)
- The poised and off balance statuses now last through a character's turn and affect their next action: poised rolls with advantage and deals extra damage, off balance rolls with disadvantage and deals less, giving the defend command a reason to exist. (#218)
- Each species now has a simple speed factor, replacing the speed math that adjusted for dexterity and breast size. (#223)
- The damage roll now reads its range from the weapon entity rather than the base weapon record, so material factors apply to the damage range. (#227)
- Shields can no longer be equipped as a primary weapon or used to attack.

### Negotiation
- Added negotiation requests, yes or no interactions alongside questions. The first requests ask for mana, valuables, or to be allowed to hurt the player, with reactions and feelings that scale with the value offered. (#105)
- Added vermen negotiation greetings. (#241)
- Added a whitelist fixture for negotiation questions and responses so specs can isolate a single question. (#158)

### Items and Equipment
- Unified weapons and armor into a single equipment record, factory, component, and wrapper. Shields are equipment with both hands and reduction, and the record decides which slots an item can fill. (#226)
- Added the equipment appraiser, which values an item from its performance (damage per second for weapons, reduction for armor and shields), its material cost, and effort. (#213)
- Added the loot generator. Monsters have loot groups and drop tables sized by their challenge rating, articles are appraised for value, and drops are shown in the enlighten view. (#128)
- Added equipment depots. Each species has a depot that stocks real, persistent equipment built from its available bases and materials; the character equipper shops from the depot with a per monster budget and evicts the oldest stock as it restocks. (#225)
- Removed outfits and the under chest and under legs slots. Clothing is a type of armor that shares the armor slots; a lewd corset was added and the chaps were made lewd. (#232)
- Combined the party's inventories into a single shared inventory on the game state. Equipped items live only in equipment slots, characters and monsters no longer have inventory components, and character to character trading was removed. (#243)
- Added the equipment tab to the character overlay, one row per slot, with a select to equip or unequip items for that slot. (#245)
- Enchanted equipment dropped by defeated monsters is now banked into the party inventory alongside the articles at enlightenment. (#247)
- Added an orphan sweeper that removes items outside any inventory or slot and monsters outside any battle, run before saving and on game mode changes. A loot inventory now stages items between battle cleanup and enlightenment. (#231)

### Characters
- Removed the non binary gender option from character generation; they/them pronouns fought the weaver's subject verb agreement at every turn. (#217)

### Interface
- Entity cards in the dungeon controls now show health bars. (#168)
- Quitting a game now resets the interface, so overlays like the negotiation no longer stay open with stale content. (#244)
- Skill increases outside of battle and training, and disarmed traps, are now shown as alerts. (#249)

### Architecture and Testing
- The test suite runs in under half the time. The slowness was megamorphic bounds getters on features and rooms, fixed by caching frozen bounds. (#222)
- Simplified the game lifecycle: the two step game state creation was removed, and loading a game resets the game first.
- Dropped the drag and drop inventory trading task as obsolete now that there is a single party inventory. (#167)
