describe("RoomFactory", function() {

  describe("buildSingleRoom", function() {
    it("Sets the room's box given a height/width range", function() {
      Random.stubBetween(3,2);
      const room = RoomFactory.buildSingleRoom({ size:[1,4] });
      const box = room.getBoxes()[0];

      expect(box.width).to.equal(3);
      expect(box.height).to.equal(2);
    });
  });

  describe("buildLegRoom", function() {
    // totalWidth:6, totalHeight:6 -> notchRange is [2,4] on both axes.
    it("builds an NE leg", function() {
      Random.stubFrom('NE');
      Random.stubBetween(6,6,3,2);
      const room = RoomFactory.buildLegRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:3, height:6 },
        { x:0, y:0, width:6, height:4 },
      ]);
    });

    it("builds an NW leg", function() {
      Random.stubFrom('NW');
      Random.stubBetween(6,6,3,2);
      const room = RoomFactory.buildLegRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:3, y:0, width:3, height:6 },
        { x:0, y:0, width:6, height:4 },
      ]);
    });

    it("builds an SE leg", function() {
      Random.stubFrom('SE');
      Random.stubBetween(6,6,3,2);
      const room = RoomFactory.buildLegRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:3, height:6 },
        { x:0, y:2, width:6, height:4 },
      ]);
    });

    it("builds an SW leg", function() {
      Random.stubFrom('SW');
      Random.stubBetween(6,6,3,2);
      const room = RoomFactory.buildLegRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:3, y:0, width:3, height:6 },
        { x:0, y:2, width:6, height:4 },
      ]);
    });
  });

  describe("buildTeaRoom", function() {
    // totalWidth:6, totalHeight:6 -> trim max is 2 on both axes.
    it("builds a N rotation", function() {
      Random.stubFrom('N');
      Random.stubBetween(6,6,1,2);
      const room = RoomFactory.buildTeaRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:6, height:4 },
        { x:1, y:0, width:4, height:6 },
      ]);
    });

    it("builds a S rotation", function() {
      Random.stubFrom('S');
      Random.stubBetween(6,6,1,2);
      const room = RoomFactory.buildTeaRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:2, width:6, height:4 },
        { x:1, y:0, width:4, height:6 },
      ]);
    });

    it("builds an E rotation", function() {
      Random.stubFrom('E');
      Random.stubBetween(6,6,1,2);
      const room = RoomFactory.buildTeaRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:5, height:6 },
        { x:0, y:2, width:6, height:2 },
      ]);
    });

    it("builds a W rotation", function() {
      Random.stubFrom('W');
      Random.stubBetween(6,6,1,2);
      const room = RoomFactory.buildTeaRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:1, y:0, width:5, height:6 },
        { x:0, y:2, width:6, height:2 },
      ]);
    });
  });

  describe("buildCrossRoom", function() {
    it("builds the cross shape from a horizontal and vertical box", function() {
      Random.stubBetween(6,6,1,2);
      const room = RoomFactory.buildCrossRoom({ size:[3,8] });

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:2, width:6, height:2 },
        { x:1, y:0, width:4, height:6 },
      ]);
    });
  });

});
