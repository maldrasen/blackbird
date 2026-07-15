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

  describe("buildNestedRooms", function() {
    // outer:7x7, inner:3x2 -> inner sits at (2,2), door center column is x:3, center row is y:2.
    it("builds single box rooms with the inner room centered", function() {
      Random.stubFrom('N');
      Random.stubBetween(7,7,3,2);
      const { outer, inner } = RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[2,4] });

      expect(outer.getBoxes()).to.deep.equal([{ x:0, y:0, width:7, height:7 }]);
      expect(inner.getBoxes()).to.deep.equal([{ x:0, y:0, width:3, height:2 }]);
      expect(inner.getPosition()).to.deep.equal({ x:2, y:2 });
    });

    it("puts a north wall door on the outer tile above the inner room", function() {
      Random.stubFrom('N');
      Random.stubBetween(7,7,3,2);
      const { door } = RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[2,4] });
      expect(door).to.deep.equal({ position:{ x:3, y:1 }, direction:'S', from:0, to:1 });
    });

    it("puts a south wall door on the inner room's bottom tile", function() {
      Random.stubFrom('S');
      Random.stubBetween(7,7,3,2);
      const { door } = RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[2,4] });
      expect(door).to.deep.equal({ position:{ x:3, y:3 }, direction:'S', from:1, to:0 });
    });

    it("puts an east wall door on the inner room's right tile", function() {
      Random.stubFrom('E');
      Random.stubBetween(7,7,3,2);
      const { door } = RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[2,4] });
      expect(door).to.deep.equal({ position:{ x:4, y:2 }, direction:'E', from:1, to:0 });
    });

    it("puts a west wall door on the outer tile left of the inner room", function() {
      Random.stubFrom('W');
      Random.stubBetween(7,7,3,2);
      const { door } = RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[2,4] });
      expect(door).to.deep.equal({ position:{ x:1, y:2 }, direction:'E', from:0, to:1 });
    });

    it("clamps the inner room to fit inside the outer roll", function() {
      Random.stubFrom('N');
      Random.stubBetween(5,5,4,4);
      const { inner } = RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[2,4] });
      expect(inner.getBoxes()).to.deep.equal([{ x:0, y:0, width:3, height:3 }]);
    });

    it("rejects outer rooms smaller than 3", function() {
      expect(() => RoomFactory.buildNestedRooms({ outerSize:[2,4], innerSize:[1,1] }))
        .to.throw('Minimum outer size needs to be at least 3');
    });

    it("rejects inner rooms that cannot fit in the smallest outer room", function() {
      expect(() => RoomFactory.buildNestedRooms({ outerSize:[5,9], innerSize:[4,4] }))
        .to.throw('Minimum inner size needs to be at least 2 smaller than the minimum outer size');
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
