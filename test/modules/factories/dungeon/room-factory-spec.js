describe("RoomFactory", function() {
  describe("buildSingleRoom", function() {
    it("Sets the room's main box given a height/width range", function() {
      const room = RoomFactory.buildSingleRoom({ size:[1,4] });
      const box = room.getMainBox();

      expect(box.width).to.be.within(1,4);
      expect(box.height).to.be.within(1,4);
    });
  });
});
