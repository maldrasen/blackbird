This was a smaller release than the last two, at about half the points. Nearly all of it went into items and equipment. The party inventory got its own overlay, the equipment tab was rebuilt around a slot, candidate, and detail layout, enchantments are now generated from effect patterns, characters shop for armor according to their taste, and bows finally need arrows.

Two refactors cleaned up boilerplate: records are built by a shared factory and hand written null checks were replaced with optional chaining. The specs were also cut loose from the fixtures, so the main menu's fixtures can change freely while the tests keep their own support modules. The month closed with a handful of small interface fixes.

## Changelog

### Items and Equipment
- Added the party inventory overlay, opened from the dungeon controls. It lists every item and article in the party inventory with a detail panel, and consumables can be used out of combat through a new usage system: a party select wing shows each member's health, mana, stamina, and status effects, and the result is shown as an alert. Dropping items was left out, since items have no weight and everything has some use. (#246)
- Rebuilt the equipment tab as three columns: the character's slots, the items in the party inventory that fit the selected slot, and a detail panel. The details show weapon damage, armor protection, and inline differences against what's equipped, with equip and unequip buttons and a double click shortcut. With no slot selected the panel shows a summary of everything the current equipment gives the character, including attack power and damage per second. Arrow keys move within and between the columns. (#142)
- Added an item name element that renders an item or article name in its rarity color, with an optional icon and size, for use anywhere the interface names an item. (#255)
- Added effect based enchantments. An enchantment pattern lists its effects, its trigger, its rarity, and the item types it applies to; the equipment factory rolls random enchantments when it builds an item, and the enchantment's rarity becomes the item's. The first patterns are resistances to status effects and magic damage, poisoned daggers and whips in five grades, dualist's swords that leave the wielder poised after an attack, assassin's daggers that hide the wielder after a sneak attack, and weapons of endangerment that leave one species vulnerable. Battles gained an end of round trigger for the enchantments that buff after a round. (#228)
- Characters now shop for armor according to taste. Items carry style tags from their base shape and primary material (hauberks are formidable, corsets are slutty and feminine, silk is lavish, leather is natural, bone is barbaric), archetypes weight those tags, and the equipper scores each affordable piece by its value plus how much the character likes it. Men avoid feminine pieces, prudes avoid slutty ones but still won't go bare chested, and sluts would rather go topless than wear something they hate. Weapons and shields are still picked by value. (#237)

### Battle System
- Added bows and arrows. Party members have a quiver that holds the ammunition they're using, bow attacks require ammo in the quiver, and each shot spends one arrow. Monsters don't track ammunition. (#014)
- Ammunition is equipped from the equipment tab as another slot. Selecting it lists the ammunition in the party inventory, and the detail panel shows the quantity on hand. (#266)
- Bow damage now includes the arrow's damage, and an arrow's enchantments and effects like poison apply on hit alongside the bow's. Equipment depots stock ammunition, monsters load their quivers when they're equipped, and their arrows drop with the rest of their loot when they die. Poison arrows are appraised. (#229)

### Dungeon
- Added a zoom control to the dungeon's left panel with zoom in and zoom out buttons and a bar marking the discrete zoom levels, since mouse wheel zooming on a Mac never worked reliably. The wheel still works and keeps the control in sync. (#269)
- Removed the empty room descriptions. Rooms only describe themselves when there's something interesting to say. (#272)

### Interface
- The load game overlay has a delete button on each save, behind a confirmation. (#270)
- Consumables that report their results in an alert now use a short standard message built from their effects, instead of the long stories written for the old overlays. (#271)

### Architecture and Testing
- Added a record factory. Defining a record supplies the shared register, code list, and lookup boilerplate, so a record file only provides its instance accessors plus optional validation, a custom register, and extra top level functions. Every record was converted. (#261)
- Swept the codebase for hand written null checks and replaced them with the optional chaining operator where it removed a guard outright. (#260)
- Separated the specs from the fixtures. Shared spec helpers moved into a top level test-support directory, the application's test directory became fixtures and is only used by the main menu's fixture commands, and the leftover test runner module left the application. (#267)
- Moved the Claude memory directory into the repository and updated Electron.
