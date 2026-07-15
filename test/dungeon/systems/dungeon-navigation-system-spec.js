describe("DungeonNavigationSystem", function() {

  let floor;
  let start;

  beforeEach(function() {
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1);
    floor = DungeonSystem.getDungeonFloor();
    start = floor.getLocation();
  });

  it("starts the party in a revealed feature", function() {
    expect(floor.isRevealed(start)).to.equal(true);
  });

  it("finds the features adjacent to a feature", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentFeatureIndices(start);
    const doors = floor.getDoors();

    expect(adjacent.length).to.be.greaterThan(0);

    adjacent.forEach(index => {
      const connected = doors.some(door =>
        (door.getFrom() === start && door.getTo() === index) ||
        (door.getFrom() === index && door.getTo() === start));
      expect(connected).to.equal(true);
    });
  });

  it("moves to an adjacent feature and reveals it", function() {
    const target = DungeonNavigationSystem.getAdjacentFeatureIndices(start)[0];

    expect(floor.isRevealed(target)).to.equal(false);
    expect(DungeonNavigationSystem.canMoveTo(target)).to.equal(true);

    DungeonNavigationSystem.moveToFeature(target);

    expect(floor.getLocation()).to.equal(target);
    expect(floor.isRevealed(target)).to.equal(true);
    expect(floor.isRevealed(start)).to.equal(true);
  });

  it("risks an encounter when entering an unexplored room", function() {
    const target = DungeonNavigationSystem.getAdjacentFeatureIndices(start)[0];

    Random.stubRoll(19);
    expect(DungeonNavigationSystem.moveToFeature(target).encounter).to.equal(true);
  });

  it("is much safer to backtrack through an explored room", function() {
    const target = DungeonNavigationSystem.getAdjacentFeatureIndices(start)[0];

    Random.stubRoll(19, 19);
    expect(DungeonNavigationSystem.moveToFeature(target).encounter).to.equal(true);
    expect(DungeonNavigationSystem.moveToFeature(start).encounter).to.equal(false);
  });

  it("can still hit an encounter while backtracking", function() {
    const target = DungeonNavigationSystem.getAdjacentFeatureIndices(start)[0];

    Random.stubRoll(20, 1);
    expect(DungeonNavigationSystem.moveToFeature(target).encounter).to.equal(false);
    expect(DungeonNavigationSystem.moveToFeature(start).encounter).to.equal(true);
  });

  it("finds an empty path to the current feature", function() {
    expect(DungeonNavigationSystem.getPathToFeature(start)).to.eql([]);
  });

  it("cannot find a path to an unrevealed feature", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentFeatureIndices(start);
    expect(DungeonNavigationSystem.getPathToFeature(adjacent[0])).to.be.null;
  });

  it("walks a path back through the revealed features", function() {
    const first = DungeonNavigationSystem.getAdjacentFeatureIndices(start)[0];
    DungeonNavigationSystem.moveToFeature(first);

    const second = DungeonNavigationSystem.getAdjacentFeatureIndices(first).find(index => index !== start);
    if (second != null) { DungeonNavigationSystem.moveToFeature(second); }

    const path = DungeonNavigationSystem.getPathToFeature(start);
    expect(path[path.length-1]).to.equal(start);

    let position = floor.getLocation();
    path.forEach(index => {
      expect(floor.isRevealed(index)).to.equal(true);
      expect(DungeonNavigationSystem.getAdjacentFeatureIndices(position)).to.include(index);
      position = index;
    });
  });

  it("paths through a door on the current feature", function() {
    const door = floor.getDoors().find(d => d.getFrom() === start || d.getTo() === start);
    const far = (door.getFrom() === start) ? door.getTo() : door.getFrom();

    expect(DungeonNavigationSystem.getPathThroughDoor(door.getFrom(), door.getTo())).to.eql([far]);
  });

  it("paths through a distant door via its revealed side", function() {
    const first = DungeonNavigationSystem.getAdjacentFeatureIndices(start)[0];
    DungeonNavigationSystem.moveToFeature(first);
    DungeonNavigationSystem.moveToFeature(start);

    const door = floor.getDoors().find(d =>
      (d.getFrom() === first && floor.isRevealed(d.getTo()) === false) ||
      (d.getTo() === first && floor.isRevealed(d.getFrom()) === false));
    if (door == null) { return this.skip(); }

    const far = (door.getFrom() === first) ? door.getTo() : door.getFrom();
    expect(DungeonNavigationSystem.getPathThroughDoor(door.getFrom(), door.getTo())).to.eql([first, far]);
  });

  it("cannot move to a feature without a connecting door", function() {
    const adjacent = DungeonNavigationSystem.getAdjacentFeatureIndices(start);
    const features = floor.getFeatures();
    const distant = features.findIndex((_,index) => index !== start && adjacent.includes(index) === false);

    expect(DungeonNavigationSystem.canMoveTo(distant)).to.equal(false);
    expect(() => DungeonNavigationSystem.moveToFeature(distant)).to.throw(`Cannot move to feature ${distant}`);
  });

});
