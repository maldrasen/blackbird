// Traps are tile contents placed by the tile content placer, and everything that happens to one is kept on its tile:
// the scouting roll that found it or missed it, and later its sprung or disarmed state. The scout rolls, whatever
// the trap.
global.TrapSystem = (function() {

  // Scout a single tile. A check is only rolled when the tile holds a trap that hasn't been scouted yet, never for
  // a bare tile, because every check is a chance for the skill to improve. The roll stays on the tile, so a trap the
  // scout missed stays hidden however many times the party walks past it. Says whether the trap was just found.
  function scoutTile(x, y) {
    const floor = DungeonSystem.getDungeonFloor();
    const tile = floor.getTileContents(x, y);
    if (tile == null || tile.type !== TileContentType.trap || tile.scoutingRoll != null) { return false; }

    const record = TileContents.lookup(tile.code);
    const scoutingRoll = SkillCheck(PartyConfiguration.getScout(), 'scouting').value;
    const found = scoutingRoll >= record.getSecrecy();

    floor.updateTileContents(x, y, found ? { scoutingRoll, glyph:record.getGlyph() } : { scoutingRoll });
    return found;
  }

  // Scout every tile the party could step onto from where they stand, returning the positions of the traps found.
  // A floor built with nobody in the party has no scout, and nothing is scouted.
  function scoutAround(position) {
    if (PartyConfiguration.getScout() == null) { return []; }
    return DungeonNavigationSystem.getReachableTiles(position).filter(tile => scoutTile(tile.x, tile.y));
  }

  return {
    scoutTile,
    scoutAround,
  };

})();
