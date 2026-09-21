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

      return targetFeature;
    }

    it('builds the door through the first touching wall when all walls are allowed', function() {
      const targetFeature = buildFloor();
      const door = FloorFactorySupport.buildDoorToFeature({ x:1, y:2 }, 1, targetFeature);

      expect(door).to.deep.equal({ position:{ x:1, y:2 }, direction:'N', from:1, to:0, open:false });
    });

    it('skips touching walls that forbid doors', function() {
      const targetFeature = buildFloor();
      const room = floor.getRooms()[0];
      room.forbidAllDoors();
      room.allowDoor(1,1,'W');

      const door = FloorFactorySupport.buildDoorToFeature({ x:1, y:2 }, 1, targetFeature);

      expect(door).to.deep.equal({ position:{ x:2, y:2 }, direction:'W', from:0, to:1, open:false });
    });

    it('throws when no touching wall allows a door', function() {
      const targetFeature = buildFloor();
      floor.getRooms()[0].forbidAllDoors();

      expect(() => FloorFactorySupport.buildDoorToFeature({ x:1, y:2 }, 1, targetFeature)).
        to.throw(/allows no door adjacent to \(1,2\)/);
    });

  });

  describe("pickStairsTile()", function() {
    let floor;

    beforeEach(function() {
      floor = DungeonFloor(1,'dungeon');
      DungeonSystem.setDungeonFloor(floor);
    });

    function addSquareRoom(size) {
      const feature = Feature('spec-room');
      const room = Room(feature);
      room.setBounds(size,size);
      room.addBox(0,0,size,size);
      feature.addRoom(room);
      feature.setPosition(4,4);
      floor.addFeature(feature);
      return room;
    }

    it('picks the tile closest to the center of the room', function() {
      expect(FloorFactorySupport.pickStairsTile(addSquareRoom(3))).to.deep.equal({ x:1, y:1 });
    });

    it('picks the first of the tiles that are equally close to the center', function() {
      expect(FloorFactorySupport.pickStairsTile(addSquareRoom(2))).to.deep.equal({ x:0, y:0 });
    });

    it('follows a center point that has been moved', function() {
      const room = addSquareRoom(5);
      room.setCenterPoint(3.5,0.5);

      expect(FloorFactorySupport.pickStairsTile(room)).to.deep.equal({ x:3, y:0 });
    });

    it('prefers a dry tile over a closer water tile', function() {
      const room = addSquareRoom(3);
      room.setFloor(1,1,'water');

      expect(FloorFactorySupport.pickStairsTile(room)).to.deep.equal({ x:1, y:0 });
    });

    it('settles for a water tile when the whole room is flooded', function() {
      const room = addSquareRoom(3);
      room.setFloorBox({ x:0, y:0, width:3, height:3, type:'water' });

      expect(FloorFactorySupport.pickStairsTile(room)).to.deep.equal({ x:1, y:1 });
    });

    // A 4x4 outer room with a 2x2 room nested in its center. The inner room carves the four center tiles out of the
    // outer room, which is left with the ring around them.
    it('never picks a tile that a nested room has taken', function() {
      const feature = Feature('spec-room');
      const outer = Room(feature);
      const inner = Room(feature,'nested');
      outer.setBounds(4,4);
      outer.addBox(0,0,4,4);
      inner.setBounds(2,2);
      inner.addBox(0,0,2,2);
      inner.setPosition(1,1);
      inner.markOverlapping();
      feature.addRoom(outer);
      feature.addRoom(inner);
      feature.setPosition(4,4);
      floor.addFeature(feature);

      expect(FloorFactorySupport.pickStairsTile(outer)).to.deep.equal({ x:1, y:0 });
      expect(FloorFactorySupport.pickStairsTile(inner)).to.deep.equal({ x:0, y:0 });
    });
  });

});
