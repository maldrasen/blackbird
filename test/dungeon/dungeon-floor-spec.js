describe("DungeonFloor", function() {

  describe("getDoorAt()", function() {
    let floor;

    beforeEach(function() {
      floor = DungeonFloor(1,'dungeon');
    });

    it('finds the doors that were set by the wall they are on', function() {
      const northDoor = Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 });
      const westDoor = Door({ position:{ x:5, y:3 }, direction:'W', from:0, to:2 });
      floor.setDoors([northDoor, westDoor]);

      expect(floor.getDoorAt(5,3,'N')).to.equal(northDoor);
      expect(floor.getDoorAt(5,3,'W')).to.equal(westDoor);
      expect(floor.getDoorAt(5,4,'N')).to.equal(null);
    });

    it('finds a door that was added', function() {
      const door = Door({ position:{ x:9, y:6 }, direction:'W', from:3, to:4 });
      floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 })]);
      floor.addDoor(door);

      expect(floor.getDoorAt(9,6,'W')).to.equal(door);
      expect(floor.getDoors()).to.have.lengthOf(2);
    });

    it('forgets the doors that were replaced', function() {
      const kept = Door({ position:{ x:9, y:6 }, direction:'W', from:3, to:4 });
      floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 }), kept]);
      floor.setDoors([kept]);

      expect(floor.getDoorAt(5,3,'N')).to.equal(null);
      expect(floor.getDoorAt(9,6,'W')).to.equal(kept);
    });

    it('throws when two doors share a wall', function() {
      floor.setDoors([Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 })]);

      expect(() => floor.addDoor(Door({ position:{ x:5, y:3 }, direction:'N', from:0, to:1 }))).
        to.throw('There is already a door at (5,3,N)');
    });
  });

});
