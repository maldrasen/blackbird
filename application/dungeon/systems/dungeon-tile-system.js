// What the party can see and do from the tile they're standing on. Most tiles have nothing of their own, so they
// show the room they belong to. A tile with something on it is described in place of the room: the stairs first, as
// they have their own description, then the description of the tile's contents. Stairs are the only thing that adds
// commands so far, which go ahead of the room's.
global.DungeonTileSystem = (function() {

  const useStairs = 'use-stairs';

  function getTileInfo() {
    const room = DungeonSystem.getDungeonFloor().getCurrentRoom();
    const stairs = stairsHere();

    return {
      description: stairs ? room.getStairsDescription() : (tileDescriptionHere() || room.getDescription()),
      commands: [...stairsCommands(stairs), ...room.getAvailableCommands()],
    };
  }

  function hasTileFeature() {
    return stairsHere() != null || tileDescriptionHere() != null;
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

  function tileDescriptionHere() {
    const floor = DungeonSystem.getDungeonFloor();
    const position = floor.getPartyPosition();
    const contents = floor.getTileContents(position.x, position.y);
    return (contents && contents.description) ? contents.description : null;
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
