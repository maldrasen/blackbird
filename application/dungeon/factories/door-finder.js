global.DoorFinder = function(grid) {
  const floor = DungeonSystem.getDungeonFloor();
  const floorHeight = floor.getFloorHeight();
  const floorWidth = floor.getFloorWidth();
  const features = floor.getFeatures();
  const doors = {};
  const connections = {};

  function execute() {
    for (let y=0; y<floorHeight; y++) {
      for (let x=0; x<floorWidth; x++) {
        if (grid[y][x] != null) {
          findDoorsAt(x,y);
        }
      }
    }

    const trimmedDoors = [];

    Object.keys(doors).forEach(key => {
      trimmedDoors.push(Random.from(doors[key]));
    });

    return [connections,trimmedDoors];
  }

  function findDoorsAt(x,y) {
    const thisCell = grid[y][x];
    const southCell = cellSouthOf(x,y);
    const eastCell = cellEastOf(x,y);

    if (southCell && southCell !== thisCell) { addDoor(x,y,'S',thisCell,southCell); }
    if (eastCell && eastCell !== thisCell) { addDoor(x,y,'E',thisCell,eastCell); }
  }

  function cellSouthOf(x,y) {
    return (y+1 < floorHeight) ? grid[y+1][x] : null;
  }

  function cellEastOf(x,y) {
    return (x+1 < floorWidth) ? grid[y][x+1] : null;
  }

  function addDoor(x, y, direction, from, to) {
    const key = (from < to) ? `${from}-${to}` : `${to}-${from}`;
    if (doors[key] == null) { doors[key] = [] }
    doors[key].push(Door({x,y},direction,from,to))

    if (connections[from] == null) { connections[from] = []; }
    if (connections[to] == null) { connections[to] = []; }
    if (connections[from].includes(to) === false) { connections[from].push(to); }
    if (connections[to].includes(from) === false) { connections[to].push(from); }
  }

  return Object.freeze({
    execute,
  });

}
