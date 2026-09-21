describe("DungeonSystem", function() {

  function stairRooms(floor, direction) {
    return floor.getStairs(direction).map(stairs => stairs.room);
  }

  function stairsUnderParty(floor) {
    const position = floor.getPartyPosition();
    return floor.getStairsAt(position.x, position.y);
  }

  describe("setLevel()", function() {

    // A nested inner room shares all of its tiles with its feature's outer room. Any other shared tile is a
    // violation.
    it("ensures that rooms don't overlap", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const claimed = {};
      const violations = [];

      floor.getRooms().forEach(room => {
        const position = room.getFloorPosition();

        room.getFootprint().forEach((row, footprintY) => {
          row.forEach((cell, footprintX) => {
            if (cell == null) { return; }

            const x = position.x + footprintX;
            const y = position.y + footprintY;
            const other = (claimed[`${x},${y}`] == null) ? null : floor.getRooms()[claimed[`${x},${y}`]];

            if (other != null && other.getIndex() !== room.getIndex()) {
              const sameFeature = other.getFeatureIndex() === room.getFeatureIndex();
              const nested = other.isOverlapping() || room.isOverlapping();
              if (sameFeature === false || nested === false) {
                violations.push(`Rooms ${other.getIndex()} and ${room.getIndex()} overlap at (${x},${y})`);
              }
            }

            claimed[`${x},${y}`] = room.getIndex();
          });
        });
      });

      expect(violations).to.deep.equal([]);
    });

    // Walks the floor one step at a time from where the party starts, the way the party would, to prove that every
    // tile of every room can be reached on foot.
    it("connects every tile of the dungeon", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const start = floor.getPartyPosition();
      const queue = [start];
      const reached = new Set([`${start.x},${start.y}`]);

      for (let i=0; i<queue.length; i++) {
        ['north','south','west','east'].forEach(direction => {
          const step = DungeonNavigationSystem.findStep(queue[i], direction);
          if (step == null || reached.has(`${step.position.x},${step.position.y}`)) { return; }

          reached.add(`${step.position.x},${step.position.y}`);
          queue.push(step.position);
        });
      }

      const tiles = floor.getFloorGrid().reduce((total, row) => total + row.filter(cell => cell != null).length, 0);
      expect(reached.size).to.equal(tiles);
    });

    it("places each staircase in its own room", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const up = floor.getStairs('up');
      const down = floor.getStairs('down');

      expect(up.length).to.be.at.least(1);
      expect(down.length).to.be.at.least(1);

      const roomIndexes = [...up,...down].map(stairs => stairs.room);
      expect(new Set(roomIndexes).size).to.equal(roomIndexes.length);

      roomIndexes.forEach(index => {
        expect(floor.getRooms()[index].stairsAreAllowed()).to.equal(true);
      });
    });

    it("places each staircase on a tile of its room", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(2);

      const floor = DungeonSystem.getDungeonFloor();

      ['up','down'].forEach(direction => {
        floor.getStairs(direction).forEach(stairs => {
          expect(floor.getRoomIndexAt(stairs.position.x, stairs.position.y)).to.equal(stairs.room);
          expect(floor.getStairsAt(stairs.position.x, stairs.position.y)).to.equal(direction);
        });
      });
    });

    it("uses a forced theme when one is given", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1, 'up', 'dungeon');

      expect(DungeonSystem.getDungeonFloor().getTheme()).to.equal('dungeon');
    });

    it("starts the party standing on the up stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      expect(stairsUnderParty(floor)).to.equal('up');
      expect(stairRooms(floor,'up')).to.include(floor.getLocation());
    });

  });

  describe("stairs", function() {

    it("descends to a new floor, arriving at the up stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);
      DungeonSystem.goDownStairs();

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getLevel()).to.equal(2);
      expect(stairsUnderParty(floor)).to.equal('up');
      expect(stairRooms(floor,'up')).to.include(floor.getLocation());
      expect(floor.isRevealed(floor.getLocation())).to.be.true;
    });

    it("climbs to a new floor, arriving at the down stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(2);
      DungeonSystem.goUpStairs();

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getLevel()).to.equal(1);
      expect(stairsUnderParty(floor)).to.equal('down');
      expect(stairRooms(floor,'down')).to.include(floor.getLocation());
    });

    it("leaves the dungeon when climbing out of level 1", function() {
      DungeonSystem.enterDungeon();
      expect(GameSystem.getState().getGameMode()).to.equal(GameMode.dungeon);

      DungeonSystem.goUpStairs();

      expect(GameSystem.getState().getGameMode()).to.equal(GameMode.location);
      expect(DungeonSystem.getDungeonFloor()).to.be.null;
    });

  });

});

