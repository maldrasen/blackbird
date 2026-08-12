describe("DungeonSystem", function() {

  describe("setLevel()", function() {

    // A room's own boxes may overlap each other (that's how L-shaped rooms are built), and a nested inner room
    // shares all of its tiles with its feature's outer room. Any other shared tile is a violation.
    it("ensures that rooms don't overlap", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const claimed = {};
      const violations = [];

      floor.getRooms().forEach(room => {
        const position = room.getFloorPosition();
        room.getBoxes().forEach(box => {
          for (let y = position.y + box.y; y < position.y + box.y + box.height; y++) {
            for (let x = position.x + box.x; x < position.x + box.x + box.width; x++) {
              const other = (claimed[`${x},${y}`] == null) ? null : floor.getRooms()[claimed[`${x},${y}`]];

              if (other != null && other.getIndex() !== room.getIndex()) {
                const sameFeature = other.getFeatureIndex() === room.getFeatureIndex();
                const nested = other.isOverlapping() || room.isOverlapping();
                if (sameFeature === false || nested === false) {
                  violations.push(`Rooms ${other.getIndex()} and ${room.getIndex()} overlap at (${x},${y})`);
                }
              }

              claimed[`${x},${y}`] = room.getIndex();
            }
          }
        });
      });

      expect(violations).to.deep.equal([]);
    });

    it("connects every room in the dungeon", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const queue = [0];
      const reached = new Set(queue);

      for (let i=0; i<queue.length; i++) {
        DungeonNavigationSystem.getAdjacentRoomIndices(queue[i]).forEach(neighbor => {
          if (reached.has(neighbor) === false) {
            reached.add(neighbor);
            queue.push(neighbor);
          }
        });
      }

      expect(reached.size).to.equal(floor.getRooms().length);
    });

    it("places each staircase in its own room", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const up = floor.getStairs('up');
      const down = floor.getStairs('down');

      expect(up.length).to.be.at.least(1);
      expect(down.length).to.be.at.least(1);

      const roomIndexes = [...up,...down];
      expect(new Set(roomIndexes).size).to.equal(roomIndexes.length);

      roomIndexes.forEach(index => {
        expect(floor.getRooms()[index].stairsAreAllowed()).to.equal(true);
      });
    });

    it("uses a forced theme when one is given", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1, 'up', 'dungeon');

      expect(DungeonSystem.getDungeonFloor().getTheme()).to.equal('dungeon');
    });

    it("starts the party at the up stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getStairs('up')).to.include(floor.getLocation());
    });

  });

  describe("stairs", function() {

    it("descends to a new floor, arriving at the up stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);
      DungeonSystem.goDownStairs();

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getLevel()).to.equal(2);
      expect(floor.getStairs('up')).to.include(floor.getLocation());
      expect(floor.isRevealed(floor.getLocation())).to.be.true;
    });

    it("climbs to a new floor, arriving at the down stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(2);
      DungeonSystem.goUpStairs();

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getLevel()).to.equal(1);
      expect(floor.getStairs('down')).to.include(floor.getLocation());
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

