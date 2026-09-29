// Scouting finds the hidden things on the floor's tiles: any tile contents whose record has a secrecy value, which
// today means traps. Everything the scout learns is kept on the tile itself as its scoutingRoll. The scout rolls,
// whatever the contents.
global.ScoutingSystem = (function() {

  // Scout a single tile. A check is only rolled when the tile holds something hidden that hasn't been scouted yet,
  // never for a bare tile, because every check is a chance for the skill to improve. The roll stays on the tile, so
  // contents the scout missed stay hidden however many times the party walks past. Contents with a state have been
  // dealt with one way or another, and there's nothing left to find. Says whether the contents were just found.
  function scoutTile(x, y) {
    const floor = DungeonSystem.getDungeonFloor();
    const tile = floor.getTileContents(x, y);
    if (tile == null || tile.code == null || tile.scoutingRoll != null || tile.state != null) { return false; }

    const record = TileContents.lookup(tile.code);
    if (record.getSecrecy() == null) { return false; }

    const scoutingRoll = SkillCheck(PartyConfiguration.getScout(), 'scouting').value;
    const found = scoutingRoll >= record.getSecrecy();

    floor.updateTileContents(x, y, found ? { scoutingRoll, glyph:record.getGlyph() } : { scoutingRoll });
    return found;
  }

  // Scout every tile the party could step onto from where they stand, returning the positions of whatever was
  // found. A floor built with nobody in the party has no scout, and nothing is scouted.
  function scoutAround(position) {
    if (PartyConfiguration.getScout() == null) { return []; }
    return DungeonNavigationSystem.getReachableTiles(position).filter(tile => scoutTile(tile.x, tile.y));
  }

  return {
    scoutTile,
    scoutAround,
  };

})();
