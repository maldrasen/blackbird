describe.only("DungeonSystem", function() {

  describe("setLevel()", function() {

    it("ensures that rooms don't overlap")
    it("connects every room in the dungeon")

    it("places the stairs in two different rooms", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);

      const floor = DungeonSystem.getDungeonFloor();
      const up = floor.getStairs('up');
      const down = floor.getStairs('down');

      expect(up.roomIndex).to.not.equal(down.roomIndex);

      [up,down].forEach(stairs => {
        const room = floor.getRooms()[stairs.roomIndex];
        expect(floor.getFeatureForRoom(stairs.roomIndex).getType()).to.not.equal('corridor');

        const local = {
          x: stairs.position.x - room.getFloorPosition().x,
          y: stairs.position.y - room.getFloorPosition().y,
        };
        expect(room.getFootprint()[local.y][local.x]).to.equal(true);
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
      expect(floor.getLocation()).to.equal(floor.getStairs('up').roomIndex);
    });

  });

  describe("stairs", function() {

    it("descends to a new floor, arriving at the up stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(1);
      DungeonSystem.goDownStairs();

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getLevel()).to.equal(2);
      expect(floor.getLocation()).to.equal(floor.getStairs('up').roomIndex);
      expect(floor.isRevealed(floor.getLocation())).to.be.true;
    });

    it("climbs to a new floor, arriving at the down stairs", function() {
      DungeonSystem.createDungeon();
      DungeonSystem.setLevel(2);
      DungeonSystem.goUpStairs();

      const floor = DungeonSystem.getDungeonFloor();
      expect(floor.getLevel()).to.equal(1);
      expect(floor.getLocation()).to.equal(floor.getStairs('down').roomIndex);
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

