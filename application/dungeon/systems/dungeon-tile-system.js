// What the party can see and do from the tile they're standing on. Most tiles have nothing of their own, so they
// show the room they belong to. A tile whose contents have a description is described in place of the room. Stairs
// are the only contents that add commands so far, which go ahead of the room's.
global.DungeonTileSystem = (function() {

  const useStairs = 'use-stairs';

  function getTileInfo() {
    const room = DungeonSystem.getDungeonFloor().getCurrentRoom();
    const stairs = stairsHere();

    return {
      description: tileDescriptionHere() || room.getDescription(),
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
    return floor.getTileDescription(position.x, position.y) || null;
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
