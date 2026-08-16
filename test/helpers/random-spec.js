describe("Random", function() {

  describe("roll()", function() {
    it('rolls between zero and the limit exclusive', function() {
      const rolls = [];
      for (let i=0; i<200; i++) { rolls.push(Random.roll(5)); }

      expect(Math.min(...rolls)).to.equal(0);
      expect(Math.max(...rolls)).to.equal(4);
    });

    it('mirrors the range for a negative limit', function() {
      const rolls = [];
      for (let i=0; i<200; i++) { rolls.push(Random.roll(-5)); }

      expect(Math.min(...rolls)).to.equal(-4);
      expect(Math.max(...rolls)).to.equal(0);
    });

    it('adds the plus value to either side of the range', function() {
      const rolls = [];
      for (let i=0; i<200; i++) { rolls.push(Random.roll(-5,10)); }

      expect(Math.min(...rolls)).to.equal(6);
      expect(Math.max(...rolls)).to.equal(10);
    });

    it('returns the plus value without rolling a limit of zero', function() {
      expect(Random.roll(0)).to.equal(0);
      expect(Random.roll(0,7)).to.equal(7);
    });

    // A limit of zero never reaches the stub queue, so the queue below is only long enough for the two rolls that
    // actually have a range to roll within.
    it('never consumes a stubbed value for a limit of zero', function() {
      Random.stubRoll(3, 4);

      expect(Random.roll(0)).to.equal(0);
      expect(Random.roll(10)).to.equal(3);
      expect(Random.roll(0)).to.equal(0);
      expect(Random.roll(10)).to.equal(4);
    });

    // Stubs are given as the magnitude of the roll, the way they would be for a positive limit, and the mirroring
    // happens after the value leaves the queue.
    it('mirrors a stubbed value for a negative limit', function() {
      Random.stubRoll(3);

      expect(Random.roll(-10)).to.equal(-3);
    });
  });

  describe("averageDice()", function() {
    it('averages the dice and adds the plus value', function() {
      expect(Random.averageDice({ x:1, d:6 })).to.equal(3.5);
      expect(Random.averageDice({ x:2, d:8 })).to.equal(9);
      expect(Random.averageDice({ x:1, d:6, p:2 })).to.equal(5.5);
      expect(Random.averageDice({ x:3, d:4, p:-2 })).to.equal(5.5);
    });

    it('falls back on the same defaults the roll does', function() {
      expect(Random.averageDice({})).to.equal(3.5);
    });
  });

});
