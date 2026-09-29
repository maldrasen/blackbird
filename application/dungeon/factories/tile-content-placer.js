global.TileContentPlacer = function() {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());

  function placeContents() {
    console.log("=== Place Contents ===");
    console.log(`There are ${getEligibleRooms(TileContentType.trap).length} eligible rooms out of ${floor.getRooms().length} rooms.`);

    // OK, we've filtered out the few ineligible rooms. We now need to pick random tiles to add tile content to. The
    // theme has a list of types. Each type has a range with the number of tiles to be placed and a frequency map used
    // to select the trap.

    // In order to place tile content we need a list of available tiles. To put this list together we can loop though
    // all the theme's tileContents, and for each tile content loop though all the eligible rooms, adding all of that
    // room's tiles to a list that we randomly pick from. Because canHaveTileContents() needs the type, we have to put
    // a new list together for every type.

    // Alternatively canHaveTileContents() can go back to not taking a type as an argument, and if the tile can have
    // any type of content it returns true. We build the list of available tiles once. Each entry has the tile and a
    // list of contents that tile can have. Fewer loops, more data. This might be a premature optimization worry here,
    // but building a dungeon floor already takes longer than anything else in the game.

    // Changing floors usually produces a warning. Something like:
    //   [Violation] Forced reflow while executing JavaScript took 83ms
    // I think this forced reflow comes from putting the SVG elements into the DOM, and doesn't have anything to do
    // with the floor factory itself. The spec times are still great, so we can afford a little inefficiency here.
  }

  function getEligibleRooms(type) {
    return floor.getRooms().filter(room => room.canHaveTileContents(type));
  }

  return { placeContents };
}
