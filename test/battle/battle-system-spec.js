describe("BattleSystem", function() {

  describe("reset()", function() {
    it("clears battle only status effects from the survivors", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const character = state.getActiveCharacters()[0];

      state.addStatus(character, 'poised', { count:1 });
      StatusEffectComponent.apply(character, 'paralysis');

      BattleSystem.reset();

      expect(StatusEffectComponent.has(character,'poised')).to.be.false;
      expect(StatusEffectComponent.has(character,'paralysis')).to.be.true;
    });
  });

});
