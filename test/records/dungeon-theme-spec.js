describe("DungeonTheme", function() {

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
