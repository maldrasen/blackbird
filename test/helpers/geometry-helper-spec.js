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

  describe("insetOutline()", function() {
    const scale = vertices => vertices.map(vertex => ({ x: vertex.x * 64, y: vertex.y * 64 }));

    it('shrinks a single box room evenly on every side', function() {
      const room = Room();
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, 8)).to.deep.equal([
        { x:8, y:8 }, { x:120, y:8 }, { x:120, y:184 }, { x:8, y:184 },
      ]);
    });

    it('insets each edge by its own amount when given a per-direction map', function() {
      const room = Room();
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, { E:28, S:8, W:8, N:18 })).to.deep.equal([
        { x:18, y:28 }, { x:120, y:28 }, { x:120, y:184 }, { x:18, y:184 },
      ]);
    });

    it('expands the outline when the inset is negative', function() {
      const room = Room();
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, -1)).to.deep.equal([
        { x:-1, y:-1 }, { x:129, y:-1 }, { x:129, y:193 }, { x:-1, y:193 },
      ]);
    });

    it('pushes the concave corner of an L-shaped room further into the room', function() {
      const room = Room();
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, 8)).to.deep.equal([
        { x:8, y:8 }, { x:184, y:8 }, { x:184, y:184 }, { x:136, y:184 }, { x:136, y:56 }, { x:8, y:56 },
      ]);
    });
  });

  describe("outlineRuns()", function() {
    const scale = vertices => vertices.map(vertex => ({ x: vertex.x * 64, y: vertex.y * 64 }));

    it('returns the west and north edges of a single box room as one connected run', function() {
      const room = Room();
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.outlineRuns(outline, ['E','N'])).to.deep.equal([
        [ { x:0, y:192 }, { x:0, y:0 }, { x:128, y:0 } ],
      ]);
    });

    it('splits the runs of an L-shaped room where a faceless edge interrupts them', function() {
      const room = Room();
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.outlineRuns(outline, ['E','N'])).to.deep.equal([
        [ { x:128, y:192 }, { x:128, y:64 } ],
        [ { x:0, y:64 }, { x:0, y:0 }, { x:192, y:0 } ],
      ]);
    });
  });

  describe("shiftOutline()", function() {
    const scale = vertices => vertices.map(vertex => ({ x: vertex.x * 64, y: vertex.y * 64 }));
    const shift = { x:10, y:20 };
    const still = { x:0, y:0 };

    it('shifts the north and west walls, splitting the corners where they meet unshifted walls', function() {
      const room = Room();
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.shiftOutline(outline, { E:shift, N:shift, S:still, W:still })).to.deep.equal([
        { x:10, y:20 }, { x:138, y:20 }, { x:128, y:0 },
        { x:128, y:192 }, { x:0, y:192 }, { x:10, y:212 },
      ]);
    });

    it('shifts the south and east walls for the exterior of a nested room', function() {
      const room = Room();
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.shiftOutline(outline, { E:still, N:still, S:shift, W:shift })).to.deep.equal([
        { x:0, y:0 }, { x:128, y:0 }, { x:138, y:20 },
        { x:138, y:212 }, { x:10, y:212 }, { x:0, y:192 },
      ]);
    });
  });

});
