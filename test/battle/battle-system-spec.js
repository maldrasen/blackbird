describe("BattleSystem", function() {

  describe("reset()", function() {
    it("clears battle only status effects from the survivors", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const character = state.getActiveCharacters()[0];

      state.addStatus(character, 'poised', { count:1 });
      StatusEffects(character).apply('paralysis');

      BattleSystem.reset();

      expect(StatusEffects(character).has('poised')).to.be.false;
      expect(StatusEffects(character).has('paralysis')).to.be.true;
    });
  });

});
