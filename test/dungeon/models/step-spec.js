describe("Step", function() {

  // A hand-built floor. Rooms A, B and C are 3x3, with a door (|) in the wall between A and B and a door (-) in the
  // wall between A and C. L is an L-shaped room, E is a 2x2 room against the west edge of the floor, and N is a 4x4
  // room with the 2x2 room i nested inside it, entered through a door in the north wall of i.
  //
  //        x: 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17
  //   y:2           A  A  A  B  B  B     L  L  L        N  N  N  N
  //                                                        -
  //   y:3           A  A  A | B  B  B           L        N  i  i  N
  //   y:4           A  A  A  B  B  B           L        N  i  i  N
  //                    -
  //   y:5           C  C  C                             N  N  N  N
  //   y:6           C  C  C
  //   y:7           C  C  C
  //   y:8     E  E
  //   y:9     E  E
  //
  // The rooms are indexed in the order they're added: A:0, B:1, C:2, L:3, E:4, N:5, i:6.
  let floor;
  let doorAB;
  let doorAC;
  let doorNested;

  function addRoom(x, y, width, height, boxes) {
    const feature = Feature('spec-room');
    const room = Room(feature);
    room.setBounds(width,height);
    boxes.forEach(box => room.addBox(...box));
    feature.addRoom(room);
    feature.setPosition(x,y);
    floor.addFeature(feature);
  }

  function addNestedRoom(x, y) {
    const feature = Feature('spec-room');
    const outer = Room(feature);
    const inner = Room(feature,'nested');
    outer.setBounds(4,4);
    outer.addBox(0,0,4,4);
    inner.setBounds(2,2);
    inner.addBox(0,0,2,2);
    inner.setPosition(1,1);
    feature.addRoom(outer);
    feature.addRoom(inner);
    feature.setPosition(x,y);
    floor.addFeature(feature);
  }

  function expectOpen(x, y, direction, position, door=null) {
    const step = Step({ x, y }, direction);
    expect(step.canMove(), `${direction} from (${x},${y})`).to.equal(true);
    expect(step.getPosition()).to.deep.equal(position);
    expect(step.getDoor()).to.equal(door);
  }

  function expectBlocked(x, y, direction) {
    expect(Step({ x, y }, direction).canMove(), `${direction} from (${x},${y})`).to.equal(false);
  }

  beforeEach(function() {
    floor = DungeonFloor(1,'dungeon');
    DungeonSystem.setDungeonFloor(floor);

    addRoom(2,2,3,3,[[0,0,3,3]]);
    addRoom(5,2,3,3,[[0,0,3,3]]);
    addRoom(2,5,3,3,[[0,0,3,3]]);
    addRoom(9,2,3,3,[[0,0,3,1],[2,0,1,3]]);
    addRoom(0,8,2,2,[[0,0,2,2]]);
    addNestedRoom(14,2);

    doorAB = Door({ position:{ x:5, y:3 }, direction:'W', from:1, to:0 });
    doorAC = Door({ position:{ x:3, y:5 }, direction:'N', from:2, to:0 });
    doorNested = Door({ position:{ x:15, y:3 }, direction:'N', from:6, to:5 });
    floor.setDoors([doorAB, doorAC, doorNested]);
  });

  it('knows the direction it was taken in', function() {
    const step = Step({ x:3, y:3 },'south');

    expect(step.getDirection()).to.equal('south');
    expect(step.getHeading()).to.deep.equal({ x:0, y:1, wall:'N', doorOnTarget:true });
  });

  it('still knows where a blocked step would have led', function() {
    const step = Step({ x:4, y:2 },'east');

    expect(step.canMove()).to.equal(false);
    expect(step.getPosition()).to.deep.equal({ x:5, y:2 });
  });

  it("rejects a direction it doesn't know", function() {
    expect(() => Step({ x:3, y:3 },'up')).to.throw('Bad direction [up]');
  });

  describe("in a cardinal direction", function() {

    it('steps freely between the tiles of a room', function() {
      expectOpen(3,3,'north',{ x:3, y:2 });
      expectOpen(3,3,'south',{ x:3, y:4 });
      expectOpen(3,3,'west',{ x:2, y:3 });
      expectOpen(3,3,'east',{ x:4, y:3 });
    });

    it('is blocked by the wall between two rooms', function() {
      expectBlocked(4,2,'east');
      expectBlocked(5,2,'west');
      expectBlocked(2,4,'south');
      expectBlocked(2,5,'north');
    });

    it('passes through a door in a west wall from either side', function() {
      expectOpen(4,3,'east',{ x:5, y:3 }, doorAB);
      expectOpen(5,3,'west',{ x:4, y:3 }, doorAB);
    });

    it('passes through a door in a north wall from either side', function() {
      expectOpen(3,4,'south',{ x:3, y:5 }, doorAC);
      expectOpen(3,5,'north',{ x:3, y:4 }, doorAC);
    });

    it('is blocked by empty tiles', function() {
      expectBlocked(2,2,'north');
      expectBlocked(2,2,'west');
      expectBlocked(7,4,'east');
      expectBlocked(4,7,'south');
    });

    it('is blocked by the edge of the floor', function() {
      expectBlocked(0,8,'west');
      expectBlocked(0,9,'west');
    });

    it('only enters a nested room through its door', function() {
      expectOpen(15,2,'south',{ x:15, y:3 }, doorNested);
      expectOpen(15,3,'north',{ x:15, y:2 }, doorNested);
      expectBlocked(16,2,'south');
      expectBlocked(14,3,'east');
      expectBlocked(16,4,'east');
    });

    it('steps freely around a nested room and inside it', function() {
      expectOpen(14,2,'south',{ x:14, y:3 });
      expectOpen(15,3,'east',{ x:16, y:3 });
    });

    // The middle tile of C is (3,6).
    it("is blocked by a tile that can't be entered", function() {
      floor.getRooms()[2].setTileContents(1, 1, { canEnter:false });

      expectBlocked(3,5,'south');
      expectBlocked(3,7,'north');
      expectBlocked(2,6,'east');
      expectBlocked(4,6,'west');
      expectOpen(2,5,'south',{ x:2, y:6 });
    });

  });

  describe("in a diagonal direction", function() {

    it('steps freely between the tiles of a room', function() {
      expectOpen(3,3,'northeast',{ x:4, y:2 });
      expectOpen(3,3,'northwest',{ x:2, y:2 });
      expectOpen(3,3,'southeast',{ x:4, y:4 });
      expectOpen(3,3,'southwest',{ x:2, y:4 });
    });

    // The bend in the L is at (11,2). Both tiles are part of the room but the tile inside the bend, (10,3), isn't.
    it('will not cut the inside corner of a room', function() {
      expectBlocked(10,2,'southeast');
      expectBlocked(11,3,'northwest');

      expectOpen(10,2,'east',{ x:11, y:2 });
      expectOpen(11,2,'south',{ x:11, y:3 });
    });

    it('will not step off the outside corner of a room', function() {
      expectBlocked(2,2,'northwest');
      expectBlocked(7,4,'southeast');
    });

    // Both ring tiles belong to N, but the corner of i sits between them.
    it('will not cut across the corner of another room', function() {
      expectBlocked(15,2,'southwest');
      expectBlocked(14,3,'northeast');
    });

    // The middle tile of C is (3,6).
    it("will not step onto a tile that can't be entered", function() {
      floor.getRooms()[2].setTileContents(1, 1, { canEnter:false });

      expectBlocked(2,5,'southeast');
      expectBlocked(4,7,'northwest');
    });

    // Stepping from (2,6) to (3,5) passes the corner of the blocked tile at (3,6).
    it("will not cut across the corner of a tile that can't be entered", function() {
      floor.getRooms()[2].setTileContents(1, 1, { canEnter:false });

      expectBlocked(2,6,'northeast');
      expectBlocked(3,5,'southwest');
      expectBlocked(3,7,'northeast');
    });

    it('will not step into another room, even beside a door', function() {
      expectBlocked(4,2,'southeast');
      expectBlocked(4,3,'northeast');
      expectBlocked(4,4,'southwest');
      expectBlocked(15,2,'southeast');
    });

  });

});
