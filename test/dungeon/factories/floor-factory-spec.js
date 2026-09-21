describe("FloorFactory", function() {

  // This is mostly an "it doesn't blow up" spec, which it can if two spanning trees of features cannot be connected,
  // which I think should be impossible. We'll know if this ever fails though.
  it("fills a dungeon with features", function() {
    DungeonSystem.setLevel(1);
    expect(DungeonSystem.getDungeonFloor().getFeatures().length).to.be.greaterThan(5);
  });

  it("pins the dungeon entrance to the west boundary of the first level", function() {
    DungeonSystem.setLevel(1);
    const floor = DungeonSystem.getDungeonFloor();
    const entrances = floor.getFeatures().filter(feature => feature.getType() === 'dungeon-entrance');

    expect(entrances).to.have.lengthOf(1);
    expect(entrances[0].getPosition().x).to.equal(0);
    expect(floor.getStairs('up')).to.have.lengthOf(1);
  });

  // Grid movement depends on this. A door's from room owns the door's position tile, and the to room owns the tile
  // on the other side of the door's wall, whichever way the door was built.
  [1,2].forEach(level => {
    it(`builds every door on the wall between its two rooms on level ${level}`, function() {
      DungeonSystem.setLevel(level);
      const floor = DungeonSystem.getDungeonFloor();
      const grid = floor.getFloorGrid();

      floor.getDoors().forEach(door => {
        const { x, y } = door.position;
        const neighbor = (door.direction === 'N') ? grid[y-1][x] : grid[y][x-1];

        expect(grid[y][x]).to.equal(door.from);
        expect(neighbor).to.equal(door.to);
        expect(floor.getDoorAt(x, y, door.direction)).to.equal(door);
      });
    });
  });

  [1,2].forEach(level => {
    it(`puts every staircase on a dry tile that its room owns on level ${level}`, function() {
      DungeonSystem.setLevel(level);
      const floor = DungeonSystem.getDungeonFloor();
      const grid = floor.getFloorGrid();
      const stairRooms = floor.getRooms().filter(room => room.hasStairs());

      expect(stairRooms.length).to.be.greaterThan(0);

      stairRooms.forEach(room => {
        const tile = room.getStairsTile();
        const position = room.getStairsFloorPosition();

        expect(grid[position.y][position.x]).to.equal(room.getIndex());
        expect(room.getFloor(tile.x, tile.y)).to.equal('default');
      });
    });
  });

  it("puts the entrance stairs on the platform at the head of the causeway", function() {
    DungeonSystem.setLevel(1);
    const entrance = DungeonSystem.getDungeonFloor().getRooms().find(room => room.getContents() === 'dungeon-entrance');

    expect(entrance.getStairs()).to.equal('up');
    expect(entrance.getStairsTile()).to.deep.equal({ x:2, y:2 });
  });

  it("puts no entrance on deeper levels", function() {
    DungeonSystem.setLevel(2);
    const floor = DungeonSystem.getDungeonFloor();

    expect(floor.getFeatures().some(feature => feature.getType() === 'dungeon-entrance')).to.equal(false);
  });

});

