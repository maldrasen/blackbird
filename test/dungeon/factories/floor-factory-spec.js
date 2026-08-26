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

  it("puts no entrance on deeper levels", function() {
    DungeonSystem.setLevel(2);
    const floor = DungeonSystem.getDungeonFloor();

    expect(floor.getFeatures().some(feature => feature.getType() === 'dungeon-entrance')).to.equal(false);
  });

});

