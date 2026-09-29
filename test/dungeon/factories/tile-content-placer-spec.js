describe("TileContentPlacer", function() {

  let floor;

  beforeEach(function() {
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1, 'up', 'dungeon');
    floor = DungeonSystem.getDungeonFloor();
  });

  // Every tile of the floor holding a trap, keyed by room and room-local position, with its code.
  function trappedTiles() {
    const tiles = {};

    floor.getRooms().forEach(room => {
      room.getFootprint().forEach((row, y) => {
        row.forEach((cell, x) => {
          const contents = (cell == null) ? null : room.getTileContents(x, y);
          if (contents && contents.type === TileContentType.trap) { tiles[`${room.getIndex()}:${x},${y}`] = contents.code; }
        });
      });
    });

    return tiles;
  }

  function newTraps(before) {
    const after = trappedTiles();
    return Object.keys(after).filter(key => before[key] == null).map(key => after[key]);
  }

  function freeTiles(room) {
    let count = 0;
    room.getFootprint().forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell != null && room.getTileContents(x, y) == null) { count++; }
      });
    });
    return count;
  }

  it("places the rolled number of contents on bare tiles", function() {
    const before = trappedTiles();
    const entries = [{ type:TileContentType.trap, count:[1,50], codes:{ 'spike-trap':1 } }];

    Random.stubBetween(3);
    TileContentPlacer(entries).placeContents();

    expect(newTraps(before)).to.deep.equal(['spike-trap','spike-trap','spike-trap']);
  });

  // The floor is built by the real theme, so it already has traps on it. The dungeon entrance's room contents allow
  // nothing on its tiles, and the stairs and the entrance's pillars are never candidates.
  it("fills every free tile of the eligible rooms, and nothing else, when the count outruns the floor", function() {
    const entries = [{ type:TileContentType.trap, count:[1,10000], codes:{ 'pit-trap':1 } }];
    const stairs = floor.getStairs('down').length + floor.getStairs('up').length;
    const entrance = floor.getRooms().find(room => room.getContents() === 'dungeon-entrance');
    const entranceFree = freeTiles(entrance);

    Random.stubBetween(10000);
    TileContentPlacer(entries).placeContents();

    floor.getRooms().forEach(room => {
      if (room.canHaveTileContents(TileContentType.trap)) { expect(freeTiles(room)).to.equal(0); }
    });
    expect(freeTiles(entrance)).to.equal(entranceFree);
    expect(floor.getStairs('down').length + floor.getStairs('up').length).to.equal(stairs);
  });

  it("places nothing when no code is in range of the floor's level", function() {
    DungeonSystem.setLevel(5, 'down', 'dungeon');
    floor = DungeonSystem.getDungeonFloor();

    const before = trappedTiles();
    const entries = [{ type:TileContentType.trap, count:[1,10], codes:{ 'spike-trap':1, 'pit-trap':1 } }];

    TileContentPlacer(entries).placeContents();

    expect(Object.keys(before)).to.be.empty;
    expect(newTraps(before)).to.be.empty;
  });

});
