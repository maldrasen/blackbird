global.TileContentPlacer = function() {
  const floor = DungeonSystem.getDungeonFloor();
  const theme = DungeonTheme.lookup(floor.getTheme());

  function placeContents() {
    console.log("=== Place Contents ===");
    console.log(`There are ${getEligibleRooms().length} eligible rooms out of ${floor.getRooms().length} rooms.`);

    // OK, we've filtered out the few ineligible rooms. We now need to pick random tiles to add tile content to. The
    // theme should tell us what tile types can be placed. We need to filter this list again because the filtered list
    // has rooms that can have any tile content, because the actual eligibility depends on the content being added.
    // (All traps for now though)

    // I can see a few ways to go about this. We could have a trap chance, loop though each tile in a room that can
    // have a trap and place a trap if the roll succeeds. That seems inefficient. We could also define trap density as
    // a range on the theme. i.e. this floor should have 5-10 traps. We roll the number of traps to place. Select a
    // random tile for each trap and set the content. Do this with each content type. I think that sounds more sane.

    // Actually, picking a random tile doesn't need to be smart. We can just randomly pick any grid coordinate, then
    // check the room that owns that tile. If tile contents can't be added to that tile, could be empty or in a room
    // that doesn't allow tile contents, we throw it away and randomly pick again. Otherwise, we'd need to weigh all
    // the available rooms by their footprint size in order to get an even distribution. (We don't want smaller rooms
    // to have more trap density)
    //
    // The problem here though is, I think grid tiles only contain the feature ID... but in moving to tile contents the
    // dungeon grid should be filled with objects instead. Objects that have the feature ID the room ID, tile content
    // code, and the tile scouting roll for a tile that contains hidden contents.
  }

  function getEligibleRooms() {
    return floor.getRooms().filter(room => room.canHaveTileContents());
  }

  return { placeContents };
}
