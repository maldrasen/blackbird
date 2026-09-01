The focus of this milestone was to complete more of the battle system, adding new beast type monsters, implementing new abilities, creating the first version of the battle test bed. There's still a lot more work to be done on the battles, but this pass should complete all the basics. 

We also focused on the game's critical path; the first few episodes that happen in the game, such as the encounter with a nightgaunt. A lot of prep work in the dungeon needed to be done before that episode could be started. 

## Changelog

### Battle System
- Added the encounter builder, which builds encounters intelligently from a target difficulty (using precalculated monster essence data written to a data file by a dist script) or from explicit monster codes and formations, replacing most of the hand-authored encounter records. (#155)
- Added battle encounter tables, wiring dungeon rooms and level encounter tables into battle starts, with support for scenario-driven and room-specific fixed encounters. (#015)
- Added new beast type monsters (skitterfangs, yeeks, and others) to give the first dungeon floor more content beyond kobolds. (#185)
- Status effects now act on their own schedule in the battle turn order: poison ticks on an interval, ticking effects roll to be resisted each trigger, and fixed-time effects schedule their own expiry. (#186)
- Added body plans so that beasts have their own maps of hit locations, instead of assuming every monster is a standard biped. (#187)
- Implemented consumable weapons: grenades like the blasto that target a position and apply area-of-effect damage and status effects. (#182)
- Gave the kobold trapper a blind ability using blasto grenades, the first use of fixed-time status effects and AoE items in the game. (#192)
- Abilities now have adjustable damage and essence properties, read from the base monster's ability map, so a kobold bite can be a different class than a dragon bite. (#190)
- Monster health calculations now use a health factor based on size, and the EssenceSystem factors health into the essence value calculation. (#127)
- Added an enlightenment variation for battles that end with no essence awarded. (#162)
- Added an auto battle mode that makes party members attack automatically each round and advances through the battle text. (#200)
- Started adding spells: a spell record holds the individual spell data, and monsters can cast spells through a "cast spell" ability with a cooldown. (#210)
- Refactored the battle text coloring so the weaver adds classes to replaced spans, with color rules scoped to the battle text element. (#157)

### Battle Testbed
- Created the battle testbed, a headless node application in its own child repository that builds a party, runs full automated battles, and produces full and condensed reports for game balance decisions. (#191)

### Dungeon
- Abandoned the orthographic dungeon view in favor of a straight top-down perspective, with diamond hit boxes for doors. (#205)
- Removed the room box representation; the floor builder and dungeon view now work only with the room's footprint grid. (#206)
- Started adding room contents: rooms show themed descriptions when empty, and can hold harvestable resource nodes (like dungeon tripe) with per-content room commands. (#198)
- Added room scouting: entering a room rolls an intelligence-based check by the front-center party member to spot traps and hidden treasure. (#201)
- Added the dungeon entrance feature, a unique first room on level one, which is now limited to a single up stair. (#199)
- Added the mana font feature with its own generation rules: guaranteed on level 1, a chance to spawn on lower levels, at most one per level, and never respawning once used. (#207)
- Added orchard features to the dungeon's upper floors, triggering apple picking episodes that can involve negotiating with monsters already there. (#179)
- Added an encounter rate slider (0%–200%) to the options to adjust the random battle rate. (#202)

### Episodes and Critical Path
- Added the oath episode: the templar at the dungeon entrance makes the player swear an oath before entering, with fatal consequences for refusing twice. (#131)
- Added the nightgaunt episode, the guaranteed first-floor encounter that grants the player their first mana. (#172)
- Added navigation events: a global episode queue plus per-district and per-location queues that can interrupt movement, with support for requirements, probabilities, and once-only versus recurring events. (#110)

### Characters and Items
- Added a status effects component for temporary effects that persist outside of battle, tied into the time system with expiry times; battle-only effects are deleted when the battle ends. (#177)
- Attributes are now consistently read through the `Attributes` wrapper so buffs and debuffs apply everywhere they should. (#189)
- Split CharacterMath into multiple modules, placing the functions into the systems where they belong. (#188)
- Added a health system so healing goes through a system rather than being calculated directly on the component. (#204)
- Recruited characters now have a situated component and a location, with party members located `(in-party)` and excluded from location character lists. (#170)
- Created the first loot items that monsters can drop or ask for in negotiations. (#175)
- Breast size comparisons now use absolute rather than relative sizes, with shape-incompatible comparisons guarded by a predicate. (#196)

### Interface
- Implemented saving and loading games, with save and load views and an updated main menu. (#174)
- Added keybindings for battle commands, targeting, and dungeon navigation, configurable from the options menu. (#195)
- The inventory panel now includes articles, ordered by inventory category, with a use button for items usable out of combat. (#203)

### Architecture
- Completed the separation of the application and view layers, with all view access passing through interfaces guarded by a single environment check. (#183)
- Moved views into the project root and updated the manifest generation to build separate file lists for application, data, and views. (#184)
