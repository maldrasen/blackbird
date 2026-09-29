// Puts the theme's random tile contents onto the floor. Each theme entry places one type of contents: a count range
// for how many tiles get something and a frequency map of the codes to pick from. The candidates are every bare tile
// of every room that can take the type, so the contents spread out in proportion to room area rather than by room.
global.TileContentPlacer = function(entries=null) {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());

  function placeContents() {
    (entries || theme.getTileContents()).forEach(placeEntry);
  }

  function placeEntry(entry) {
    const codes = codesInRange(entry.codes);
    if (Object.keys(codes).length === 0) { return; }

    const tiles = Random.shuffle(getAvailableTiles(entry.type));
    const count = Math.min(Random.between(entry.count[0], entry.count[1]), tiles.length);

    for (let i=0; i<count; i++) {
      const tile = tiles[i];
      tile.room.setTileContents(tile.x, tile.y, { type:entry.type, code:Random.fromFrequencyMap(codes) });
    }
  }

  function codesInRange(codes) {
    const level = floor.getLevel();
    const inRange = {};

    Object.keys(codes).forEach(code => {
      if (TileContents.lookup(code).isInRange(level)) { inRange[code] = codes[code]; }
    });

    return inRange;
  }

  // Every tile that could take the type, as the room that owns it sees it. A tile already holding something (stairs,
  // a tree) is never a candidate, as setting its contents would replace what's there.
  function getAvailableTiles(type) {
    const tiles = [];

    floor.getRooms().filter(room => room.canHaveTileContents(type)).forEach(room => {
      room.getFootprint().forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell != null && room.getTileContents(x, y) == null) { tiles.push({ room, x, y }); }
        });
      });
    });

    return tiles;
  }

  return { placeContents };
};
