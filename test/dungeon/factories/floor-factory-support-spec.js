describe("FloorFactorySupport", function() {

  describe("buildDoorToFeature()", function() {

    // These specs need a hand-built floor rather than a randomly packed one, so the floor is built here and
    // DungeonSystem is patched to serve it.
    const realGetDungeonFloor = DungeonSystem.getDungeonFloor;
    let floor;

    afterEach(function() {
      DungeonSystem.getDungeonFloor = realGetDungeonFloor;
    });

    // An L-shaped target room with tiles at (1,1),(2,1),(2,2) and a single tile corridor at (1,2), tucked into the
    // L's notch so the corridor touches the target feature on both its north and east sides.
    function buildFloor() {
      floor = DungeonFloor(1,'dungeon');
      DungeonSystem.getDungeonFloor = () => floor;

      const targetFeature = Feature('spec-room');
      const targetRoom = Room(targetFeature);
      targetRoom.setBounds(2,2);
      targetRoom.addBox(0,0,2,1);
      targetRoom.addBox(1,1,1,1);
      targetFeature.addRoom(targetRoom);
      targetFeature.setPosition(1,1);
      floor.addFeature(targetFeature);

      const corridor = Feature('corridor');
      const corridorRoom = Room(corridor);
      corridorRoom.setBounds(1,1);
      corridorRoom.addBox(0,0,1,1);
      corridor.addRoom(corridorRoom);
      corridor.setPosition(1,2);
      floor.addFeature(corridor);

      const grid = floor.getFloorGrid();
      floor.getRooms().forEach(room => {
        const position = room.getFloorPosition();
        room.getFootprint().forEach((row,y) => {
          row.forEach((cell,x) => {
            if (cell != null) { grid[position.y + y][position.x + x] = room.getIndex(); }
          });
        });
      });

      return targetFeature;
    }

    it('builds the door through the first touching wall when all walls are allowed', function() {
      const targetFeature = buildFloor();
      const door = FloorFactorySupport.buildDoorToFeature({ x:1, y:2 }, 1, targetFeature);

      expect(door).to.deep.equal({ position:{ x:1, y:2 }, direction:'N', from:1, to:0 });
    });

    it('skips touching walls that forbid doors', function() {
      const targetFeature = buildFloor();
      const room = floor.getRooms()[0];
      room.forbidAllDoors();
      room.allowDoor(1,1,'W');

      const door = FloorFactorySupport.buildDoorToFeature({ x:1, y:2 }, 1, targetFeature);

      expect(door).to.deep.equal({ position:{ x:2, y:2 }, direction:'W', from:0, to:1 });
    });

    it('throws when no touching wall allows a door', function() {
      const targetFeature = buildFloor();
      floor.getRooms()[0].forbidAllDoors();

      expect(() => FloorFactorySupport.buildDoorToFeature({ x:1, y:2 }, 1, targetFeature)).
        to.throw(/allows no door adjacent to \(1,2\)/);
    });

  });

});
