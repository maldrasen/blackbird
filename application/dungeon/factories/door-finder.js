global.DoorFinder = function(grid) {
  const floor = DungeonSystem.getDungeonFloor();
  const floorHeight = floor.getFloorHeight();
  const floorWidth = floor.getFloorWidth();
  const connections = FeatureGraph();

  // Before we start, ensure that all the rooms have vertices in the connection graph, so that rooms without doors
  // will appear as disconnected islands. The edges for feature-internal doors are added by the FloorFactory after
  // the found doors.
  for (let i=0; i<floor.getRooms().length; i++) {
    connections.addVertex(i);
  }

  // The doors object is a list of doors that we have selected to connect all the adjacent rooms. There should only
  // ever be one door between two rooms. The door key is a string `{FROM}-{TO}`, where from is less than to.
  const doors = {};

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

    if (canConnect(thisCell,southCell)) { addDoor(x,y,'S',thisCell,southCell); }
    if (canConnect(thisCell,eastCell)) { addDoor(x,y,'E',thisCell,eastCell); }
  }

  // Rooms within the same feature are joined by the feature's own authored doors, never by found ones.
  function canConnect(from, to) {
    if (to == null || to === from) { return false; }
    return floor.getRooms()[from].getFeatureIndex() !== floor.getRooms()[to].getFeatureIndex();
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
    doors[key].push({ position:{x,y}, direction, from, to });
    connections.addEdge(from,to);
  }

  return Object.freeze({
    execute,
  });
}
