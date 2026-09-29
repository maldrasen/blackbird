---
id: 236
title: Convert traps into tile contents
priority: 1
created: 2026-09-23
tags:
  - dungeon
points: 5
---
---
Now that we're using a tile based movement, we should convert the room traps to tile traps. We'll need to change how scouting rolls work. We should probably keep the room scout roll, but additionally, every step the party takes we need to scout the surrounding tiles. (But only if the nearby tiles have contents, otherwise it's pointless)

When a trap is found we should show the trap glyph. Walking onto a located tile should try to disarm it. Walking onto a trap that wasn't found should trigger it. Trap will need disarm rates that make sense. If a trap is a pit trap, failing to disarming it shouldn't just drop you into the pit, so their disarm change should be 100%. Something like a bomb or a poison dart trap is still dangerous, even if you know about it.
### Shipped 2026-09-30
Traps are `TileContents` records placed on random tiles by `TileContentPlacer`, with the rules in `docs/reference/dungeon-floor.md` under Traps and Scouting. The room scouting roll was kept. `ScoutingSystem` rolls once per hidden tile as the party moves, `TrapSystem` springs or disarms on entry, the view redraws a tile's glyph in place, and the `traps` console command finds everything on the floor. Left open: trap deaths still throw, the placeholder trap text is marked with TODOs, and `secrecy` and `disarm` values haven't been tuned against a level-0 scout.
