describe("MonsterSimulator", function() {

  describe('pickAbility()', function() {
    it('when the threat table is empty', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1' });

      const state = BattleSystem.getState();
      const monsterId = state.getEntityAtPosition('M',0,3);
      const { target, ability } = MonsterSimulator.pickAbility(Monster(monsterId));

      expect(ability).to.equal('basic-attack');
      expect(target).to.not.be.null;
      expect(state.getPosition(target)).to.equal('P.0.3');
    });
  });

});
