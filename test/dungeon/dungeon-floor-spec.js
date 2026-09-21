describe("DungeonFloor", function() {

  function addSquareRoom(floor, size, x, y) {
    const feature = Feature('spec-room');
    const room = Room(feature);
    room.setBounds(size,size);
    room.addBox(0,0,size,size);
    feature.addRoom(room);
    feature.setPosition(x,y);
    floor.addFeature(feature);
    return room;
  }

  describe("getRoomIndexAt()", function() {
    let floor;

    // A 3x3 room at (4,4) and a 2x2 room at (8,4), with a column of empty tiles between them.
    beforeEach(function() {
      floor = DungeonFloor(1,'dungeon');
      addSquareRoom(floor,3,4,4);
      addSquareRoom(floor,2,8,4);
    });

    it('finds the room that owns a tile', function() {
      expect(floor.getRoomIndexAt(4,4)).to.equal(0);
      expect(floor.getRoomIndexAt(6,6)).to.equal(0);
      expect(floor.getRoomIndexAt(8,4)).to.equal(1);
      expect(floor.getRoomIndexAt(9,5)).to.equal(1);
    });

    it('finds nothing on an empty tile', function() {
      expect(floor.getRoomIndexAt(7,4)).to.equal(null);
      expect(floor.getRoomIndexAt(4,7)).to.equal(null);
    });

    it('finds nothing off the floor', function() {
      expect(floor.getRoomIndexAt(-1,4)).to.equal(null);
      expect(floor.getRoomIndexAt(4,-1)).to.equal(null);
      expect(floor.getRoomIndexAt(60,4)).to.equal(null);
      expect(floor.getRoomIndexAt(4,40)).to.equal(null);
    });
  });

  describe("getFeatureForRoom()", function() {
    it('finds the feature a room belongs to', function() {
      const floor = DungeonFloor(1,'dungeon');
      addSquareRoom(floor,3,4,4);
      const room = addSquareRoom(floor,2,8,4);

      expect(floor.getFeatureForRoom(1)).to.equal(room.getFeature());
      expect(floor.getFeatureForRoom(1).getIndex()).to.equal(1);
    });
  });

  describe("stairs", function() {
    let floor;

    beforeEach(function() {
      floor = DungeonFloor(1,'dungeon');
      addSquareRoom(floor,3,4,4).setStairs('up',1,1);
      addSquareRoom(floor,2,8,4).setStairs('down',1,0);
      addSquareRoom(floor,2,12,4);
    });

    it('lists the stairs in a direction by their floor tile and room', function() {
      expect(floor.getStairs('up')).to.deep.equal([{ position:{ x:5, y:5 }, room:0 }]);
      expect(floor.getStairs('down')).to.deep.equal([{ position:{ x:9, y:4 }, room:1 }]);
    });

    it('finds the stairs standing on a tile', function() {
      expect(floor.getStairsAt(5,5)).to.equal('up');
      expect(floor.getStairsAt(9,4)).to.equal('down');
    });

    it('finds no stairs on the other tiles of a stair room', function() {
      expect(floor.getStairsAt(4,4)).to.equal(null);
      expect(floor.getStairsAt(8,4)).to.equal(null);
    });

    it('finds no stairs in a room without them, on an empty tile, or off the floor', function() {
      expect(floor.getStairsAt(12,4)).to.equal(null);
      expect(floor.getStairsAt(7,4)).to.equal(null);
      expect(floor.getStairsAt(-1,-1)).to.equal(null);
    });
  });

  describe("party position", function() {
    let floor;

    beforeEach(function() {
      floor = DungeonFloor(1,'dungeon');
      addSquareRoom(floor,3,4,4);
      addSquareRoom(floor,2,8,4);
    });

    it('starts with the party nowhere', function() {
      expect(floor.getPartyPosition()).to.equal(null);
      expect(floor.getLocation()).to.equal(null);
    });

    it('stands the party on a tile', function() {
      floor.setPartyPosition(9,5);

      expect(floor.getPartyPosition()).to.deep.equal({ x:9, y:5 });
      expect(floor.getLocation()).to.equal(1);
      expect(floor.getCurrentRoom()).to.equal(floor.getRooms()[1]);
    });

    it('reveals and visits the room the party is standing in', function() {
      floor.setPartyPosition(4,4);

      expect(floor.isRevealed(0)).to.equal(true);
      expect(floor.isVisited(0)).to.equal(true);
      expect(floor.isRevealed(1)).to.equal(false);
      expect(floor.isVisited(1)).to.equal(false);
    });

    it('hands out a copy of the position', function() {
      floor.setPartyPosition(4,4);
      floor.getPartyPosition().x = 99;

      expect(floor.getPartyPosition()).to.deep.equal({ x:4, y:4 });
    });

    it('throws when there is no floor to stand on', function() {
      expect(() => floor.setPartyPosition(7,4)).to.throw('The party cannot stand at (7,4), there is no floor there.');
      expect(() => floor.setPartyPosition(-1,4)).to.throw('The party cannot stand at (-1,4), there is no floor there.');
      expect(floor.getPartyPosition()).to.equal(null);
    });
  });

  describe("getDoorAt()", function() {
    let floor;

    beforeEach(function() {
      floor = DungeonFloor(1,'dungeon');
    });

    it('finds the doors that were set by the wall they are on', function() {
      const northDoor = Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 });
      const westDoor = Door({ position:{ x:5, y:3 }, direction:'W', from:0, to:2 });
      floor.setDoors([northDoor, westDoor]);

      expect(floor.getDoorAt(5,3,'N')).to.equal(northDoor);
      expect(floor.getDoorAt(5,3,'W')).to.equal(westDoor);
      expect(floor.getDoorAt(5,4,'N')).to.equal(null);
    });

    it('finds a door that was added', function() {
      const door = Door({ position:{ x:9, y:6 }, direction:'W', from:3, to:4 });
      floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 })]);
      floor.addDoor(door);

      expect(floor.getDoorAt(9,6,'W')).to.equal(door);
      expect(floor.getDoors()).to.have.lengthOf(2);
    });

    it('forgets the doors that were replaced', function() {
      const kept = Door({ position:{ x:9, y:6 }, direction:'W', from:3, to:4 });
      floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 }), kept]);
      floor.setDoors([kept]);

      expect(floor.getDoorAt(5,3,'N')).to.equal(null);
      expect(floor.getDoorAt(9,6,'W')).to.equal(kept);
    });

    it('throws when two doors share a wall', function() {
      floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 })]);

      expect(() => floor.addDoor(Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 }))).
        to.throw('There is already a door at (5,3,N)');
    });
  });

});
