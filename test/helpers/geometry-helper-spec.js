describe("GeometryHelper", function() {

  describe("traceOutline()", function() {
    it('traces a single box room clockwise from the top-left corner', function() {
      const room = Room();
      room.setBounds(2,3);
      room.addBox(0,0,2,3);

      expect(GeometryHelper.traceOutline(room.getFootprint())).to.deep.equal([
        { x:0, y:0 }, { x:2, y:0 }, { x:2, y:3 }, { x:0, y:3 },
      ]);
    });

    it('traces an L-shaped room as a single six vertex polygon', function() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);

      expect(GeometryHelper.traceOutline(room.getFootprint())).to.deep.equal([
        { x:0, y:0 }, { x:3, y:0 }, { x:3, y:3 }, { x:2, y:3 }, { x:2, y:1 }, { x:0, y:1 },
      ]);
    });

    it('traces a room with a notch sticking out of the top edge', function() {
      const room = Room();
      room.setBounds(4,6);
      room.addBox(0,2,4,4);
      room.addBox(1,0,2,2);

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
      room.setBounds(2,3);
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, 8)).to.deep.equal([
        { x:8, y:8 }, { x:120, y:8 }, { x:120, y:184 }, { x:8, y:184 },
      ]);
    });

    it('insets each edge by its own amount when given a per-direction map', function() {
      const room = Room();
      room.setBounds(2,3);
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, { E:28, S:8, W:8, N:18 })).to.deep.equal([
        { x:18, y:28 }, { x:120, y:28 }, { x:120, y:184 }, { x:18, y:184 },
      ]);
    });

    it('expands the outline when the inset is negative', function() {
      const room = Room();
      room.setBounds(2,3);
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, -1)).to.deep.equal([
        { x:-1, y:-1 }, { x:129, y:-1 }, { x:129, y:193 }, { x:-1, y:193 },
      ]);
    });

    it('pushes the concave corner of an L-shaped room further into the room', function() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.insetOutline(outline, 8)).to.deep.equal([
        { x:8, y:8 }, { x:184, y:8 }, { x:184, y:184 }, { x:136, y:184 }, { x:136, y:56 }, { x:8, y:56 },
      ]);
    });
  });

  describe("chamferOutline()", function() {
    const scale = vertices => vertices.map(vertex => ({ x: vertex.x * 60, y: vertex.y * 60 }));

    it('bevels every corner of a box room', function() {
      const room = Room();
      room.setBounds(2,3);
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.chamferOutline(outline, 15)).to.deep.equal([
        { x:0,   y:15  }, { x:15,  y:0   },
        { x:105, y:0   }, { x:120, y:15  },
        { x:120, y:165 }, { x:105, y:180 },
        { x:15,  y:180 }, { x:0,   y:165 },
      ]);
    });

    it('clamps the setback to a third of the shorter adjacent edge', function() {
      const room = Room();
      room.setBounds(1,1);
      room.addBox(0,0,1,1);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.chamferOutline(outline, 60)).to.deep.equal([
        { x:0,  y:20 }, { x:20, y:0  },
        { x:40, y:0  }, { x:60, y:20 },
        { x:60, y:40 }, { x:40, y:60 },
        { x:20, y:60 }, { x:0,  y:40 },
      ]);
    });

    it('bevels the concave corner of an L-shaped room', function() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));

      expect(GeometryHelper.chamferOutline(outline, 15)).to.deep.equal([
        { x:0,   y:15  }, { x:15,  y:0   },
        { x:165, y:0   }, { x:180, y:15  },
        { x:180, y:165 }, { x:165, y:180 },
        { x:135, y:180 }, { x:120, y:165 },
        { x:120, y:75  }, { x:105, y:60  },
        { x:15,  y:60  }, { x:0,   y:45  },
      ]);
    });

    it('keeps the wall as thick along the bevel as along the straight edges', function() {
      const room = Room();
      room.setBounds(2,3);
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));
      const wallLine = GeometryHelper.insetOutline(outline, 10);

      const outerBevel = GeometryHelper.chamferOutline(outline, 15)[0];
      const innerBevel = GeometryHelper.chamferOutline(wallLine, 15, 10)[0];

      const thickness = ((innerBevel.x + innerBevel.y) - (outerBevel.x + outerBevel.y)) / Math.SQRT2;
      expect(thickness).to.be.closeTo(10, 0.000001);
    });

    it('pushes concave bevels out by the inset correction', function() {
      const room = Room();
      room.setBounds(3,3);
      room.addBox(0,0,3,1);
      room.addBox(2,0,1,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));
      const wallLine = GeometryHelper.insetOutline(outline, 10);

      const chamfered = GeometryHelper.chamferOutline(wallLine, 15, 10);
      const setback = 15 + ((2 - Math.SQRT2) * 10);

      expect(chamfered[8].x).to.equal(130);
      expect(chamfered[8].y).to.be.closeTo(50 + setback, 0.000001);
      expect(chamfered[9].x).to.be.closeTo(130 - setback, 0.000001);
      expect(chamfered[9].y).to.equal(50);
    });

    it('leaves a corner square when the inset correction consumes the whole distance', function() {
      const room = Room();
      room.setBounds(2,3);
      room.addBox(0,0,2,3);
      const outline = scale(GeometryHelper.traceOutline(room.getFootprint()));
      const wallLine = GeometryHelper.insetOutline(outline, 10);

      expect(GeometryHelper.chamferOutline(wallLine, 5, 10)).to.deep.equal(wallLine);
    });
  });

  describe("findRegions()", function() {
    const waterIndex = DungeonConstants.floorTypes.indexOf('water');

    it('finds each strip of water in a room as its own region', function() {
      const room = Room();
      room.setBounds(4,5);
      room.addBox(0,0,4,5);
      room.setFloorBox({ x:0, y:0, width:4, height:1, type:'water' });
      room.setFloorBox({ x:0, y:4, width:4, height:1, type:'water' });

      const regions = GeometryHelper.findRegions(room.getFootprint(), cell => cell === waterIndex);

      expect(regions).to.deep.equal([
        [
          [true,true,true,true],
          [false,false,false,false],
          [false,false,false,false],
          [false,false,false,false],
          [false,false,false,false],
        ],[
          [false,false,false,false],
          [false,false,false,false],
          [false,false,false,false],
          [false,false,false,false],
          [true,true,true,true],
        ],
      ]);
    });

    it('connects tiles orthogonally but not diagonally', function() {
      const room = Room();
      room.setBounds(2,2);
      room.addBox(0,0,2,2);
      room.setFloor(0,0,'water');
      room.setFloor(1,1,'water');

      const regions = GeometryHelper.findRegions(room.getFootprint(), cell => cell === waterIndex);

      expect(regions.length).to.equal(2);
    });

    it('finds no regions when nothing matches', function() {
      const room = Room();
      room.setBounds(2,2);
      room.addBox(0,0,2,2);

      expect(GeometryHelper.findRegions(room.getFootprint(), cell => cell === waterIndex)).to.deep.equal([]);
    });

    it('returns regions that can be traced as outlines', function() {
      const room = Room();
      room.setBounds(4,5);
      room.addBox(0,0,4,5);
      room.setFloorBox({ x:0, y:4, width:4, height:1, type:'water' });

      const regions = GeometryHelper.findRegions(room.getFootprint(), cell => cell === waterIndex);

      expect(GeometryHelper.traceOutline(regions[0])).to.deep.equal([
        { x:0, y:4 }, { x:4, y:4 }, { x:4, y:5 }, { x:0, y:5 },
      ]);
    });
  });

});
