describe("MonsterSimulator", function() {

  // TODO: Work in progress...
  describe('pickTarget()', function() {
    it('when the threat table is empty', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1' });

      const state = BattleSystem.getState();
      const monsterId = state.getEntityAtPosition('M',0,3);
      const target = MonsterSimulator.pickTarget(Monster(monsterId));
    });
  });

});
