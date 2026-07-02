describe("FloorFactory", function() {

  // This is mostly an "it doesn't blow up" spec, which it can if two spanning trees of features cannot be connected,
  // which I think should be impossible. We'll know if this ever fails though.
  it("fills a dungeon with features", function() {
    DungeonSystem.setLevel(1);
    expect(DungeonSystem.getDungeonFloor().getFeatures().length).to.be.greaterThan(50);
  });

});

