describe("DungeonNavigationSystem", function() {

  let floor;
  let start;

  beforeEach(function() {
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1);
    floor = DungeonSystem.getDungeonFloor();
    start = floor.getLocation();
  });

  it("starts the party in a revealed room", function() {
    expect(floor.isRevealed(start)).to.equal(true);
  });

  it("finds the rooms adjacent to a room", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentRoomIndices(start);
    const doors = floor.getDoors();

    expect(adjacent.length).to.be.greaterThan(0);

    adjacent.forEach(index => {
      const connected = doors.some(door =>
        (door.from === start && door.to === index) ||
        (door.from === index && door.to === start));
      expect(connected).to.equal(true);
    });
  });

  it("moves to an adjacent room and reveals it", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    expect(floor.isRevealed(target)).to.equal(false);
    expect(DungeonNavigationSystem.canMoveTo(target)).to.equal(true);

    DungeonNavigationSystem.moveToRoom(target);

    expect(floor.getLocation()).to.equal(target);
    expect(floor.isRevealed(target)).to.equal(true);
    expect(floor.isRevealed(start)).to.equal(true);
  });

  it("can look up the feature containing a room", function() {
    const feature = floor.getFeatureForRoom(start);
    const room = floor.getRooms()[start];

    expect(feature.getIndex()).to.equal(room.getFeatureIndex());
    expect(feature.getRooms().map(r => r.getIndex())).to.include(start);
  });

  it("risks an encounter when entering an unexplored room", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubRoll(19);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(true);
  });

  it("is much safer to backtrack through an explored room", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubRoll(19, 19);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(true);
    expect(DungeonNavigationSystem.moveToRoom(start).encounter).to.equal(false);
  });

  it("can still hit an encounter while backtracking", function() {
    const target = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];

    Random.stubRoll(20, 1);
    expect(DungeonNavigationSystem.moveToRoom(target).encounter).to.equal(false);
    expect(DungeonNavigationSystem.moveToRoom(start).encounter).to.equal(true);
  });

  it("finds an empty path to the current room", function() {
    expect(DungeonNavigationSystem.getPathToRoom(start)).to.eql([]);
  });

  it("cannot find a path to an unrevealed room", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentRoomIndices(start);
    expect(DungeonNavigationSystem.getPathToRoom(adjacent[0])).to.be.undefined;
  });

  it("walks a path back through the revealed rooms", function() {
    const first = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
    DungeonNavigationSystem.moveToRoom(first);

    const second = DungeonNavigationSystem.getAdjacentRoomIndices(first).find(index => index !== start);
    if (second != null) { DungeonNavigationSystem.moveToRoom(second); }

    const path = DungeonNavigationSystem.getPathToRoom(start);
    expect(path[path.length-1]).to.equal(start);

    let position = floor.getLocation();
    path.forEach(index => {
      expect(floor.isRevealed(index)).to.equal(true);
      expect(DungeonNavigationSystem.getAdjacentRoomIndices(position)).to.include(index);
      position = index;
    });
  });

  it("paths through a door on the current room", function() {
    const door = floor.getDoors().find(d => d.from === start || d.to === start);
    const far = (door.from === start) ? door.to : door.from;

    expect(DungeonNavigationSystem.getPathThroughDoor(door.from, door.to)).to.eql([far]);
  });

  it("paths through a distant door via its revealed side", function() {
    const first = DungeonNavigationSystem.getAdjacentRoomIndices(start)[0];
    DungeonNavigationSystem.moveToRoom(first);
    DungeonNavigationSystem.moveToRoom(start);

    const door = floor.getDoors().find(d =>
      (d.from === first && floor.isRevealed(d.to) === false) ||
      (d.to === first && floor.isRevealed(d.from) === false));
    if (door == null) { return this.skip(); }

    const far = (door.from === first) ? door.to : door.from;
    expect(DungeonNavigationSystem.getPathThroughDoor(door.from, door.to)).to.eql([first, far]);
  });

  it("cannot move to a room without a connecting door", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentRoomIndices(start);
    const rooms = floor.getRooms();
    const distant = rooms.findIndex((_,index) => index !== start && adjacent.includes(index) === false);

    expect(DungeonNavigationSystem.canMoveTo(distant)).to.equal(false);
    expect(() => DungeonNavigationSystem.moveToRoom(distant)).to.throw(`Cannot move to room ${distant}`);
  });

});
