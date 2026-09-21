describe("GameSystem", function() {

  describe("saveGame()", function() {
    it('sweeps the orphaned entities out of the registry', async function() {
      const item = ItemFixtures.buildSteel('longsword');

      await GameSystem.saveGame();

      expect(Registry.entityExists(item)).to.be.false;
    });
  });

  describe("setGameMode()", function() {
    it('sweeps the orphaned entities out of the registry', function() {
      const item = ItemFixtures.buildSteel('longsword');

      GameSystem.setGameMode(GameMode.dungeon);

      expect(Registry.entityExists(item)).to.be.false;
    });

    it('leaves the monsters in the current battle alone', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      GameSystem.setGameMode(GameMode.battle);

      const monsters = BattleSystem.getState().getActiveMonsters();
      expect(monsters.length).to.equal(3);
      monsters.forEach(id => { expect(Registry.entityExists(id)).to.be.true; });
    });
  });

});
