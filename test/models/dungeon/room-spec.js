describe("Room", function() {

  describe("setSubBox()", function() {
    it("adjusts the room's origin point.", function() {
      const room = Room.build();
      room.setMainBox(10,10)
      room.setSubBox(-3,-6,10,10);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(13);
      expect(bounds.yMax).to.equal(16);
    });
  });

  describe("getBounds()", function() {
    it('calculates the bounds for a single box room', function() {
      const room = Room.build();
      room.setMainBox(2,3);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.xMax).to.equal(2);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.yMax).to.equal(3);
    });

    it('calculates the bounds of a two box room. (N)', function() {
      const room = Room.build();
      room.setMainBox(4,4);
      room.setSubBox(1,4,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(4);
      expect(bounds.yMax).to.equal(6);
    });

    it('calculates the bounds of a two box room. (S)', function() {
      const room = Room.build();
      room.setMainBox(4,4);
      room.setSubBox(1,-2,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(4);
      expect(bounds.yMax).to.equal(6);
    });

    it('calculates the bounds of a two box room. (E)', function() {
      const room = Room.build();
      room.setMainBox(4,4);
      room.setSubBox(4,1,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(6);
      expect(bounds.yMax).to.equal(4);
    });

    it('calculates the bounds of a two box room. (W)', function() {
      const room = Room.build();
      room.setMainBox(4,4);
      room.setSubBox(-2,1,2,2);

      const bounds = room.getBounds();
      expect(bounds.xMin).to.equal(0);
      expect(bounds.yMin).to.equal(0);
      expect(bounds.xMax).to.equal(6);
      expect(bounds.yMax).to.equal(4);
    });
  });

  describe("containsTile()", function() {
    it('checks the main box', function() {
      const room = Room.build();
      room.setMainBox(1,4);
      expect(room.containsTile(0,0)).to.be.true;
      expect(room.containsTile(0,3)).to.be.true;
      expect(room.containsTile(0,4)).to.be.false;
      expect(room.containsTile(1,0)).to.be.false;
      expect(room.containsTile(-1,0)).to.be.false;
      expect(room.containsTile(0,-1)).to.be.false;
    });

    it('checks main and sub boxes', function() {
      const room = Room.build();
      room.setMainBox(3,1);
      room.setSubBox(3,0,1,3);

      expect(room.containsTile(0,0)).to.be.true;
      expect(room.containsTile(3,0)).to.be.true;
      expect(room.containsTile(4,0)).to.be.false;
      expect(room.containsTile(3,2)).to.be.true;
      expect(room.containsTile(3,3)).to.be.false;
    });
  });

});
