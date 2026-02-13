describe("Room", function() {

  describe("calculateBounds()", function() {
    it('calculates the bounds for a single box room', function() {
      const room = Room.build();
      room.setMainBox(2,3);

      const bounds = room.calculateBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.xMax).to.equal(2);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.yMax).to.equal(3);
    });
  });

});