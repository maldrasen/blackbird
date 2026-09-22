describe("VisibilityHelper", function() {

  describe("computePolygon()", function() {
    const origin = { x:50, y:50 };
    const box = { xMin:0, xMax:100, yMin:0, yMax:100 };
    const segment = (ax, ay, bx, by) => ({ a:{ x:ax, y:ay }, b:{ x:bx, y:by } });
    const round = value => Math.round(value * 10) / 10 || 0;
    const rounded = polygon => polygon.map(point => ({ x:round(point.x), y:round(point.y) }));

    it('is the box itself when nothing stands in the way', function() {
      expect(rounded(VisibilityHelper.computePolygon(origin, [], box))).to.deep.equal([
        { x:0, y:0 }, { x:100, y:0 }, { x:100, y:100 }, { x:0, y:100 },
      ]);
    });

    // The wall stands 20 to the right of the origin. The rays past its ends carry on to the top and bottom edges
    // of the box, and the hits between its ends all lie along the wall itself.
    it('casts a shadow behind a wall', function() {
      const wall = segment(70,20, 70,80);

      expect(rounded(VisibilityHelper.computePolygon(origin, [wall], box))).to.deep.equal([
        { x:0, y:0 }, { x:83.3, y:0 }, { x:70, y:20 }, { x:70, y:80 }, { x:83.3, y:100 }, { x:0, y:100 },
      ]);
    });

    it('sees through a gap in a wall', function() {
      const walls = [segment(70,20, 70,45), segment(70,55, 70,80)];

      expect(rounded(VisibilityHelper.computePolygon(origin, walls, box))).to.deep.equal([
        { x:0, y:0 }, { x:83.3, y:0 }, { x:70, y:20 }, { x:70, y:45 }, { x:100, y:37.5 },
        { x:100, y:62.5 }, { x:70, y:55 }, { x:70, y:80 }, { x:83.3, y:100 }, { x:0, y:100 },
      ]);
    });

    it('ignores walls that never reach the box', function() {
      const wall = segment(150,20, 150,80);

      expect(rounded(VisibilityHelper.computePolygon(origin, [wall], box))).to.deep.equal([
        { x:0, y:0 }, { x:100, y:0 }, { x:100, y:100 }, { x:0, y:100 },
      ]);
    });

    it('pushes every vertex along its ray by the overshoot', function() {
      expect(rounded(VisibilityHelper.computePolygon(origin, [], box, 10))).to.deep.equal([
        { x:-7.1, y:-7.1 }, { x:107.1, y:-7.1 }, { x:107.1, y:107.1 }, { x:-7.1, y:107.1 },
      ]);
    });
  });

});
