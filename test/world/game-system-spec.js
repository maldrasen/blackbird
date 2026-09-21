describe("GameSystem", function() {

  describe("saveGame()", function() {
    it('sweeps the orphaned entities out of the registry', async function() {
      const item = ItemFixtures.buildSteel('longsword');

      await GameSystem.saveGame();

      expect(Registry.entityExists(item)).to.be.false;
    });
  });

});
