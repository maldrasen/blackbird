describe("RoomFactory", function() {
  describe("buildSingleRoom", function() {
    it("Sets the room's main box given a height/width range", function() {
      const room = RoomFactory.buildSingleRoom({ height:[1,2], width:[3,4] });
      const box = room.getMainBox();

      expect(box.width).to.be.within(3,4);
      expect(box.height).to.be.within(1,2);
    });
  });
});
