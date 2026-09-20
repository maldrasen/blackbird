describe("DungeonTheme", function() {

  describe("getDescription()", function() {

    it("has nothing to say about a variety the theme doesn't describe", function() {
      expect(DungeonTheme.lookup('crypt').getDescription('plain')).to.equal(null);
      expect(DungeonTheme.lookup('dungeon').getDescription('flooded')).to.equal(null);
    });

  });

  describe("encounter rates", function() {

    it("reads the rates a theme sets", function() {
      const theme = DungeonTheme.lookup('dungeon');
      expect(theme.getNewRoomEncounterRate()).to.equal(20);
      expect(theme.getStepEncounterRate()).to.equal(0.5);
    });

    // The crypt is still a stub theme that sets no rates of its own.
    it("falls back to the default rates", function() {
      const theme = DungeonTheme.lookup('crypt');
      expect(theme.getNewRoomEncounterRate()).to.equal(20);
      expect(theme.getStepEncounterRate()).to.equal(0.5);
    });

  });

});
