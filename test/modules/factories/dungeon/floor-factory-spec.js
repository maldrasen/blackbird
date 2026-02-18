describe("FloorFactory", function() {

  it("assigns a theme for the current level", function() {
    const floor = FloorFactory.build(1);
    expect(floor.getTheme()).to.exist;
  });

})