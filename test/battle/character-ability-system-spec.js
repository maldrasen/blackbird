describe("CharacterAbilitySystem", function() {

  describe("getAbilities()", function() {
    it('removes the negotiate command after a negotiation has been attempted', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'negotiation-fixture', ambushState:'normal' });
      BattleSystem.specRound(GameSystem.getState().getPlayer());

      expect(CharacterAbilitySystem.getAbilities()).to.include('negotiate');

      BattleSystem.getState().setNegotiationAttempted();

      expect(CharacterAbilitySystem.getAbilities()).to.not.include('negotiate');
    });
  });

});
