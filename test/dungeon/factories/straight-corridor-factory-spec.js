describe("StraightCorridorFactory", function() {

  // These specs need a hand-built floor rather than a randomly packed one, so the floor is built here and
  // DungeonSystem is patched to serve it.
  const realGetDungeonFloor = DungeonSystem.getDungeonFloor;
  let floor;

  afterEach(function() {
    DungeonSystem.getDungeonFloor = realGetDungeonFloor;
  });

  // Two 3x3 single room features aligned vertically, with a two tile gap between them for the corridor.
  function buildFloor() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.getDungeonFloor = () => floor;

    [0,5].forEach(yPos => {
      const feature = Feature('spec-room');
      const room = Room(feature);
      room.setBounds(3,3);
      room.addBox(0,0,3,3);
      feature.addRoom(room);
      feature.setPosition(0,yPos);
      floor.addFeature(feature);
    });

    const grid = floor.getFloorGrid();
    floor.getRooms().forEach(room => {
      const position = room.getFloorPosition();
      room.getFootprint().forEach((row,y) => {
        row.forEach((cell,x) => {
          if (cell != null) { grid[position.y + y][position.x + x] = room.getIndex(); }
        });
      });
    });
  }

  function factory() {
    const features = floor.getFeatures();
    return StraightCorridorFactory(features[0], features[1], 'S');
  }

  it('digs a corridor between aligned features', function() {
    buildFloor();
    const result = factory().build();

    expect(result.feature.getType()).to.equal('corridor');
    expect(result.doorTiles).to.have.lengthOf(2);
  });

  it('only accepts rays that hit a whitelisted target wall', function() {
    buildFloor();
    const target = floor.getRooms()[1];
    target.forbidAllDoors();
    target.allowDoor(1,0,'N');

    const result = factory().build();

    expect(result.doorTiles[1].point.x).to.equal(1);
  });

  it('digs nothing when the target forbids all of its walls', function() {
    buildFloor();
    floor.getRooms()[1].forbidAllDoors();

    expect(factory().build()).to.equal(undefined);
  });

});
