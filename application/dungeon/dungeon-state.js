global.DungeonState = function() {

  // State for the entire dungeon. This state is created when we enter the dungeon and persists when we change floors.
  // I'm not actually sure if we need to keep track of anything in this, but I moved everything that was in here into
  // the dungeon floor state that gets reset on every floor.

  return Object.freeze({
  });

}
