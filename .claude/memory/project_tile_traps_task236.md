---
name: project_tile_traps_task236
description: "Task 236 tile-based traps SHIPPED 2026-09-30; TileContents records + placer, ScoutingSystem (roll once per hidden tile, only tiles with secrecy), TrapSystem enterTile spring/disarm, view refreshTileGlyph; stub-order and design gotchas"
metadata:
  node_type: memory
  type: project
  originSessionId: d33b266a-77ed-4f14-8306-4885fb87f097
  modified: 2026-09-29T23:29:31.721Z
---

Task 236 (tile traps) shipped 2026-09-30 on branch `236-convert-traps`. Room traps are gone; traps are `TileContents` records placed by `TileContentPlacer` after room contents in `FloorFactory.build()`.

**Design decisions the user made:**
- Scouting is its own system (`ScoutingSystem`), not part of `TrapSystem`, keyed on whether a tile's record has `secrecy`, so hidden treasure can reuse it.
- A scouting check is only rolled for a tile with hidden, unscouted contents (never bare tiles) because every `SkillCheck` call can improve the skill. One roll per tile, stored as `scoutingRoll`; never re-rolled. Tiles with a `state` (sprung/disarmed) are skipped.
- The scout (`PartyConfiguration.getScout()`) rolls both scouting and mechanics. Stepping onto a found trap attempts the disarm; no disarm command. `trap.disarm` omitted = automatic (pit trap).
- Trap deaths still throw (user chose to keep the loud error). Step result stays a plain object; task 248 converts it to a model.
- Room-level scouting roll kept though nothing reads it.
- Trap clustering (3 traps in a 4-tile corridor) was verified as uniform randomness; user declined a per-room cap.

**Gotchas:**
- `step()` random order: enterRoom scouting → `TrapSystem.enterTile` (mechanics between, rollDice, `Random.from` target uses a roll) → `ScoutingSystem.scoutAround` (one between pair per unscouted trap, in heading order: N,S,W,E then diagonals) → encounter roll (skipped when trap fired). Specs with mechanics at 0 also need a stubRoll(249) improve-roll miss.
- `Room.getGlyphs()` includes `tile`; view glyph `<text>` carries `data-x/data-y`. `DungeonFloorView.refreshTileGlyph(position)` + `DungeonVisionView.replaceTileGlyph` redraw one tile's glyph mid-floor (insertAdjacentHTML, not X.createElement which makes HTML not SVG). Shadow glyphs can't be added after build (occluders baked).
- `Room/DungeonFloor.updateTileContents(x,y,changes)` merges into an existing tile entry; `getTileContents` returns a clone.
- `traps` console command = `ScoutingSystem.findEverything()` + full redraw.
- Floor dump seed (`debug/floor-state.json`) replays placement exactly: seed, `DungeonFloor(1,'dungeon')`, `FloorFactory().buildFloor()` after `GameSystem.createNewGame()`.

Open: placeholder trap prose (TODOs in data/tile-contents/traps), secrecy 15 vs level-0 scouting range 4.5–15, glyph size tuning.
