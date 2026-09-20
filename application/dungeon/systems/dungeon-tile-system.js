// What the party can see and do from the tile they're standing on. Most tiles have nothing of their own, so they
// show the room they belong to. A tile with a feature on it is described in place of the room and puts its commands
// ahead of the room's. Stairs are the only tile feature so far; when there are more stairsHere() becomes a lookup of
// whatever feature is on the tile, with a case for each.
global.DungeonTileSystem = (function() {

  const useStairs = 'use-stairs';

  function getTileInfo() {
    const room = DungeonSystem.getDungeonFloor().getCurrentRoom();
    const stairs = stairsHere();

    return {
      description: stairs ? room.getStairsDescription() : room.getDescription(),
      commands: [...stairsCommands(stairs), ...room.getAvailableCommands()],
    };
  }

  function hasTileFeature() {
    return stairsHere() != null;
  }

  function useCommand(code) {
    if (code === useStairs) { return takeStairs(); }
    return DungeonSystem.getDungeonFloor().getCurrentRoom().useCommand(code);
  }

  function stairsHere() {
    const floor = DungeonSystem.getDungeonFloor();
    const position = floor.getPartyPosition();
    return floor.getStairsAt(position.x, position.y);
  }

  function stairsCommands(stairs) {
    if (stairs == null) { return []; }
    return [{ code:useStairs, label:(stairs === 'up') ? 'Climb Stairs' : 'Descend Stairs' }];
  }

  // Taking the stairs replaces the floor, or leaves the dungeon altogether from the first level.
  function takeStairs() {
    const stairs = stairsHere();
    if (stairs == null) { throw new Error('There are no stairs here.'); }

    (stairs === 'up') ? DungeonSystem.goUpStairs() : DungeonSystem.goDownStairs();

    return { floorChanged:true };
  }

  return {
    getTileInfo,
    hasTileFeature,
    useCommand,
  };

})();
