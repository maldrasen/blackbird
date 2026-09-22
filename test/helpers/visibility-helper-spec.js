describe("VisibilityHelper", function() {

  const segment = (ax, ay, bx, by) => ({ a:{ x:ax, y:ay }, b:{ x:bx, y:by } });
  const round = value => Math.round(value * 10) / 10 || 0;
  const roundedPoint = point => ({ x:round(point.x), y:round(point.y) });
  const rounded = polygon => polygon.map(roundedPoint);
  const roundedSegments = segments => segments.map(({ a, b }) => ({ a:roundedPoint(a), b:roundedPoint(b) }));

  describe("computePolygon()", function() {
    const origin = { x:50, y:50 };
    const box = { xMin:0, xMax:100, yMin:0, yMax:100 };

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

  describe("isVisible()", function() {
    const origin = { x:50, y:50 };
    const walls = [segment(70,20, 70,80)];

    it('sees a point with nothing in the way', function() {
      expect(VisibilityHelper.isVisible(origin, { x:60, y:50 }, walls)).to.equal(true);
    });

    it('does not see a point behind a wall', function() {
      expect(VisibilityHelper.isVisible(origin, { x:90, y:50 }, walls)).to.equal(false);
    });

    it('sees past the end of a wall', function() {
      expect(VisibilityHelper.isVisible(origin, { x:90, y:-20 }, walls)).to.equal(true);
    });

    it('sees a point standing on a wall', function() {
      expect(VisibilityHelper.isVisible(origin, { x:70, y:50 }, walls)).to.equal(true);
    });
  });

  describe("subtractRect()", function() {
    const rect = { xMin:40, xMax:60, yMin:0, yMax:20 };

    it('cuts the part of a segment that crosses the rectangle out of it', function() {
      expect(roundedSegments(VisibilityHelper.subtractRect([segment(0,10, 100,10)], rect))).to.deep.equal([
        segment(0,10, 40,10), segment(60,10, 100,10),
      ]);
    });

    it('trims a segment that ends inside the rectangle', function() {
      expect(roundedSegments(VisibilityHelper.subtractRect([segment(0,10, 50,10)], rect))).to.deep.equal([
        segment(0,10, 40,10),
      ]);
    });

    it('drops a segment that lies entirely inside the rectangle', function() {
      expect(VisibilityHelper.subtractRect([segment(45,5, 55,15)], rect)).to.deep.equal([]);
    });

    it('leaves a segment that misses the rectangle alone', function() {
      expect(VisibilityHelper.subtractRect([segment(0,30, 100,30)], rect)).to.deep.equal([
        segment(0,30, 100,30),
      ]);
    });

    it('cuts a diagonal segment where it enters and leaves', function() {
      expect(roundedSegments(VisibilityHelper.subtractRect([segment(30,0, 70,40)], rect))).to.deep.equal([
        segment(30,0, 40,10), segment(50,20, 70,40),
      ]);
    });
  });

  describe("regularPolygon()", function() {
    it('closes a loop of segments around the center with flat sides facing the axes', function() {
      const square = VisibilityHelper.regularPolygon({ x:10, y:10 }, 5 * Math.SQRT2, 4);

      expect(roundedSegments(square)).to.deep.equal([
        segment(15,15, 5,15), segment(5,15, 5,5), segment(5,5, 15,5), segment(15,5, 15,15),
      ]);
    });
  });

});
