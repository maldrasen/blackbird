describe("MonsterSimulator", function() {

  describe('pickTarget()', function() {
    it('when the threat table is empty', function() {
      BattleFixtures.prepareForBattle();
      BattleInterface.startBattle({ encounter:'kobold-1' });

      const state = BattleInterface.getState();
      const monsterId = state.getMonsterAtPosition(0,3);
      const target = MonsterSimulator.pickTarget(Monster(monsterId));

      console.log("WIP MonsterSimulator")
      console.log(target);
    });
  });

});
