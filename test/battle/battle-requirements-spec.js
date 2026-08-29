describe("BattleRequirements", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  describe("actingIsMonster()", function() {
    it("checks which side the round's acting entity is on", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getActiveMonsters()[0]);
      expect(BattleRequirements.actingIsMonster()({})).to.equal(true);
      expect(BattleRequirements.actingIsCharacter()({})).to.equal(false);

      BattleSystem.specRound(state.getEntityAtPosition('P',0,2));
      expect(BattleRequirements.actingIsMonster()({})).to.equal(false);
      expect(BattleRequirements.actingIsCharacter()({})).to.equal(true);
    });
  });

});
