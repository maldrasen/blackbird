global.Step = function(start, direction) {
  const floor = DungeonSystem.getDungeonFloor();
  const heading = DungeonConstants.headings[direction];
  if (heading == null) { throw new Error(`Bad direction [${direction}]`); }

  let canMove = true;
  let position = null;
  let door = null;

  (heading.wall) ?
    takeCardinalStep(start, heading) :
    takeDiagonalStep(start, heading);

  // A step between two tiles of the same room is always open. A step between rooms needs a door in the wall.
  function takeCardinalStep(start, heading) {
    position = { x:start.x + heading.x, y:start.y + heading.y };

    const toRoom = floor.getRoomIndexAt(position.x, position.y);
    if (toRoom == null) { canMove = false; }
    if (floor.canEnterTile(position.x, position.y) === false) { canMove = false; }

    const doorTile = heading.doorOnTarget ? position : start;
    door = floor.getDoorAt(doorTile.x, doorTile.y, heading.wall);
    if (door == null && toRoom !== floor.getRoomIndexAt(start.x, start.y)) { canMove = false; }

    if (door) {
    console.log("Door is what?",door)

    }


  }

  // A diagonal step passes through the corner point shared by four tiles: the tile being left, the tile being
  // stepped onto, and the two tiles beside them. It's only open when one room owns all four, because then no wall
  // or door can touch that corner. This keeps diagonal steps from cutting corners or slipping past doors. All of
  // those tiles have to be enterable as well, so the party can't squeeze past the corner of something standing on
  // a tile either.
  function takeDiagonalStep(start, heading) {
    position = { x:start.x + heading.x, y:start.y + heading.y };

    const room = floor.getRoomIndexAt(start.x, start.y);
    const corner = [position, { x:position.x, y:start.y }, { x:start.x, y:position.y }];

    if (room == null) { canMove = false; }
    if (corner.some(tile => floor.getRoomIndexAt(tile.x, tile.y) !== room)) { canMove = false; }
    if (corner.some(tile => floor.canEnterTile(tile.x, tile.y) === false)) { canMove = false; }
  }

  return {
    getPosition: () => { return { ...position }; },
    getDirection: () => { return direction; },
    getHeading: () => { return { ...heading }; },
    canMove: () => { return canMove; },
    getDoor: () => { return door; }
  }
}
