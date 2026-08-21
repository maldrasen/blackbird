describe("EncounterBuilder", function() {

  describe("buildFromRecord()", function() {
    it("builds the record's monsters into the battle state", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-2', ambushState:'normal' });

      const state = BattleSystem.getState();
      expect(state.getActiveMonsters().length).to.equal(7);

      const center = state.getEntityAtPosition('M',0,2);
      expect(MonsterComponent.lookup(center).code).to.equal('kobold-dick-puncher');

      expect(MonsterComponent.lookup(state.getEntityAtPosition('M',1,1)).code).to.equal('kobold-tosser');
      expect(state.getEntityAtPosition('M',1,0)).to.be.null;
    });
  });

});
