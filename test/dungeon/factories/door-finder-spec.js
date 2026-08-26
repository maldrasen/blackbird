describe("DoorFinder", function() {

  // These specs need a hand-built floor rather than a randomly packed one, so the floor is built here and
  // DungeonSystem is patched to serve it.
  const realGetDungeonFloor = DungeonSystem.getDungeonFloor;
  let floor;

  afterEach(function() {
    DungeonSystem.getDungeonFloor = realGetDungeonFloor;
  });

  // Two 3x3 single room features side by side, sharing the wall between x:2 and x:3.
  function buildFloor() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.getDungeonFloor = () => floor;

    [0,3].forEach(xPos => {
      const feature = Feature('spec-room');
      const room = Room(feature);
      room.setBounds(3,3);
      room.addBox(0,0,3,3);
      feature.addRoom(room);
      feature.setPosition(xPos,0);
      floor.addFeature(feature);
    });

    const grid = floor.getFloorGrid();
    floor.getRooms().forEach(room => {
      const position = room.getFloorPosition();
      room.getFootprint().forEach((row,y) => {
        row.forEach((cell,x) => {
          if (cell) { grid[position.y + y][position.x + x] = room.getIndex(); }
        });
      });
    });

    return grid;
  }

  it('finds one door between adjacent rooms', function() {
    const grid = buildFloor();
    const [connections,doors] = DoorFinder(grid).execute();

    expect(doors).to.have.lengthOf(1);
    expect(doors[0].direction).to.equal('W');
    expect(doors[0].position.x).to.equal(3);
    expect(connections.getSpanningForest()).to.have.lengthOf(1);
  });

  it('finds no door when one room forbids all of its walls', function() {
    const grid = buildFloor();
    floor.getRooms()[1].forbidAllDoors();

    const [connections,doors] = DoorFinder(grid).execute();

    expect(doors).to.be.empty;
    expect(connections.getSpanningForest()).to.have.lengthOf(2);
  });

  it('places the door at the only whitelisted wall tile', function() {
    const grid = buildFloor();
    const room = floor.getRooms()[1];
    room.forbidAllDoors();
    room.allowDoor(0,1,'W');

    const [,doors] = DoorFinder(grid).execute();

    expect(doors).to.deep.equal([{ position:{ x:3, y:1 }, direction:'W', from:1, to:0 }]);
  });

  it('drops only the forbidden wall tile from the candidates', function() {
    const grid = buildFloor();
    floor.getRooms()[0].forbidDoor(2,1,'E');

    const [,doors] = DoorFinder(grid).execute();

    expect(doors).to.have.lengthOf(1);
    expect(doors[0].position.y).to.not.equal(1);
  });

});
