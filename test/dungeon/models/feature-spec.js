describe("Feature", function() {

  function buildRoom(feature, xPos) {
    const room = Room(feature);
    room.setBounds(3,3);
    room.addBox(0,0,3,3);
    room.setPosition(xPos,0);
    feature.addRoom(room);
    return room;
  }

  describe("getEdgeTiles()", function() {
    it('returns every edge tile when doors are allowed everywhere', function() {
      const feature = Feature('spec-room');
      buildRoom(feature,0);

      expect(feature.getEdgeTiles('E')).to.deep.equal([{ x:3, y:0 },{ x:3, y:1 },{ x:3, y:2 }]);
      expect(feature.getEdgeTiles('N')).to.deep.equal([{ x:0, y:-1 },{ x:1, y:-1 },{ x:2, y:-1 }]);
    });

    it('drops edge tiles whose wall forbids doors', function() {
      const feature = Feature('spec-room');
      const room = buildRoom(feature,0);
      room.forbidDoor(2,1,'E');

      expect(feature.getEdgeTiles('E')).to.deep.equal([{ x:3, y:0 },{ x:3, y:2 }]);
      expect(feature.getEdgeTiles('W')).to.have.lengthOf(3);
    });

    it('keeps only the whitelisted walls after forbidAllDoors()', function() {
      const feature = Feature('spec-room');
      const room = buildRoom(feature,0);
      room.forbidAllDoors();
      room.allowDoor(2,1,'E');

      expect(feature.getEdgeTiles('E')).to.deep.equal([{ x:3, y:1 }]);
      expect(feature.getEdgeTiles('N')).to.be.empty;
      expect(feature.getEdgeTiles('S')).to.be.empty;
      expect(feature.getEdgeTiles('W')).to.be.empty;
    });

    it('asks the room that owns each wall in a multi-room feature', function() {
      const feature = Feature('spec-room');
      const westRoom = buildRoom(feature,0);
      buildRoom(feature,3);
      westRoom.forbidAllDoors();

      expect(feature.getEdgeTiles('N')).to.deep.equal([{ x:3, y:-1 },{ x:4, y:-1 },{ x:5, y:-1 }]);
      expect(feature.getEdgeTiles('W')).to.be.empty;
      expect(feature.getEdgeTiles('E')).to.have.lengthOf(3);
    });
  });

});
