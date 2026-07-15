describe("FeatureType", function() {

  function buildFeature(type, options) {
    return FeatureType.lookup(type).buildFeature(options);
  }

  describe("rect-room", function() {
    it("Sets the room's box given a height/width range", function() {
      Random.stubBetween(3,2);
      const room = buildFeature('rect-room',{ size:[1,4] }).getRooms()[0];
      const box = room.getBoxes()[0];

      expect(box.width).to.equal(3);
      expect(box.height).to.equal(2);
    });
  });

  describe("leg-room", function() {
    // totalWidth:6, totalHeight:6 -> notchRange is [2,4] on both axes.
    it("builds an NE leg", function() {
      Random.stubFrom('NE');
      Random.stubBetween(6,6,3,2);
      const room = buildFeature('leg-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:3, height:6 },
        { x:0, y:0, width:6, height:4 },
      ]);
    });

    it("builds an NW leg", function() {
      Random.stubFrom('NW');
      Random.stubBetween(6,6,3,2);
      const room = buildFeature('leg-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:3, y:0, width:3, height:6 },
        { x:0, y:0, width:6, height:4 },
      ]);
    });

    it("builds an SE leg", function() {
      Random.stubFrom('SE');
      Random.stubBetween(6,6,3,2);
      const room = buildFeature('leg-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:3, height:6 },
        { x:0, y:2, width:6, height:4 },
      ]);
    });

    it("builds an SW leg", function() {
      Random.stubFrom('SW');
      Random.stubBetween(6,6,3,2);
      const room = buildFeature('leg-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:3, y:0, width:3, height:6 },
        { x:0, y:2, width:6, height:4 },
      ]);
    });
  });

  describe("tea-room", function() {
    // totalWidth:6, totalHeight:6 -> trim max is 2 on both axes.
    it("builds a N rotation", function() {
      Random.stubFrom('N');
      Random.stubBetween(6,6,1,2);
      const room = buildFeature('tea-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:6, height:4 },
        { x:1, y:0, width:4, height:6 },
      ]);
    });

    it("builds a S rotation", function() {
      Random.stubFrom('S');
      Random.stubBetween(6,6,1,2);
      const room = buildFeature('tea-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:2, width:6, height:4 },
        { x:1, y:0, width:4, height:6 },
      ]);
    });

    it("builds an E rotation", function() {
      Random.stubFrom('E');
      Random.stubBetween(6,6,1,2);
      const room = buildFeature('tea-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:0, width:5, height:6 },
        { x:0, y:2, width:6, height:2 },
      ]);
    });

    it("builds a W rotation", function() {
      Random.stubFrom('W');
      Random.stubBetween(6,6,1,2);
      const room = buildFeature('tea-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:1, y:0, width:5, height:6 },
        { x:0, y:2, width:6, height:2 },
      ]);
    });
  });

  describe("nested-room", function() {
    // size:7, padding:2 -> inner is 3x3 at (2,2), door center column and row are x:3, y:3.
    it("builds single box rooms with the inner room centered", function() {
      Random.stubFrom('N');
      Random.stubBetween(7,2);
      const [outer, inner] = buildFeature('nested-room',{ size:[5,9], padding:[1,3] }).getRooms();

      expect(outer.getBoxes()).to.deep.equal([{ x:0, y:0, width:7, height:7 }]);
      expect(inner.getBoxes()).to.deep.equal([{ x:0, y:0, width:3, height:3 }]);
      expect(inner.getPosition()).to.deep.equal({ x:2, y:2 });
    });

    it("puts a north wall door on the outer tile above the inner room", function() {
      Random.stubFrom('N');
      Random.stubBetween(7,2);
      const door = buildFeature('nested-room',{ size:[5,9], padding:[1,3] }).getDoors()[0];
      expect(door).to.deep.equal({ position:{ x:3, y:1 }, direction:'S', from:0, to:1 });
    });

    it("puts a south wall door on the inner room's bottom tile", function() {
      Random.stubFrom('S');
      Random.stubBetween(7,2);
      const door = buildFeature('nested-room',{ size:[5,9], padding:[1,3] }).getDoors()[0];
      expect(door).to.deep.equal({ position:{ x:3, y:4 }, direction:'S', from:1, to:0 });
    });

    it("puts an east wall door on the inner room's right tile", function() {
      Random.stubFrom('E');
      Random.stubBetween(7,2);
      const door = buildFeature('nested-room',{ size:[5,9], padding:[1,3] }).getDoors()[0];
      expect(door).to.deep.equal({ position:{ x:4, y:3 }, direction:'E', from:1, to:0 });
    });

    it("puts a west wall door on the outer tile left of the inner room", function() {
      Random.stubFrom('W');
      Random.stubBetween(7,2);
      const door = buildFeature('nested-room',{ size:[5,9], padding:[1,3] }).getDoors()[0];
      expect(door).to.deep.equal({ position:{ x:1, y:3 }, direction:'E', from:0, to:1 });
    });

    // A 4 tile outer caps the padding at 1 even though the options allow up to 3, keeping a 2x2 inner room. The
    // padding roll collapses to between(1,1), so only the size needs a stub.
    it("clamps the padding so the inner room keeps at least one tile", function() {
      Random.stubFrom('N');
      Random.stubBetween(4);
      const inner = buildFeature('nested-room',{ size:[3,7], padding:[1,3] }).getRooms()[1];

      expect(inner.getBoxes()).to.deep.equal([{ x:0, y:0, width:2, height:2 }]);
      expect(inner.getPosition()).to.deep.equal({ x:1, y:1 });
    });

    it("rejects outer rooms smaller than 3", function() {
      expect(() => buildFeature('nested-room',{ size:[2,4], padding:[1,3] }))
        .to.throw('Minimum outer size needs to be at least 3');
    });
  });

  describe("cross-room", function() {
    it("builds the cross shape from a horizontal and vertical box", function() {
      Random.stubBetween(6,6,1,2);
      const room = buildFeature('cross-room',{ size:[3,8] }).getRooms()[0];

      expect(room.getBoxes()).to.deep.equal([
        { x:0, y:2, width:6, height:2 },
        { x:1, y:0, width:4, height:6 },
      ]);
    });
  });

});
