describe("GeometryHelper", function() {

  describe("traceOutline()", function() {
    it('traces a single box room clockwise from the top-left corner', function() {
      const room = Room();
      room.addBox(0,0,2,3);

      expect(GeometryHelper.traceOutline(room.getFootprint())).to.deep.equal([
        { x:0, y:0 }, { x:2, y:0 }, { x:2, y:3 }, { x:0, y:3 },
      ]);
    });

    it('traces an L-shaped room as a single six vertex polygon', function() {
      const room = Room();
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);

      expect(GeometryHelper.traceOutline(room.getFootprint())).to.deep.equal([
        { x:0, y:0 }, { x:3, y:0 }, { x:3, y:3 }, { x:2, y:3 }, { x:2, y:1 }, { x:0, y:1 },
      ]);
    });

    it('traces a room with a notch sticking out of the top edge', function() {
      const room = Room();
      room.addBox(0,0,4,4);
      room.addBox(1,-2,2,2);

      expect(GeometryHelper.traceOutline(room.getFootprint())).to.deep.equal([
        { x:1, y:0 }, { x:3, y:0 }, { x:3, y:2 }, { x:4, y:2 },
        { x:4, y:6 }, { x:0, y:6 }, { x:0, y:2 }, { x:1, y:2 },
      ]);
    });
  });

});
