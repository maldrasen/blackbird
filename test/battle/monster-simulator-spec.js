describe("MonsterSimulator", function() {

  describe.only('pickTarget()', function() {
    it('when the threat table is empty', function() {
      BattleFixtures.prepareForBattle();
      BattleController.startBattle({ encounter:'kobold-1' });

      const state = BattleController.getState();
      const monsterId = state.monsterAtPosition(0,3);
      const target = MonsterSimulator.pickTarget(Monster(monsterId));

      console.log("WIP MonsterSimulator")
      console.log(target);
    });
  });

  describe('executeBasicAttack()', function() {
    it('makes a basic weapon attack', function() {
      BattleFixtures.prepareForBattle();
      BattleController.startBattle({ encounter:'kobold-1' });

      const state = BattleController.getState();
      const monsterId = state.monsterAtPosition(0,3);
      const result = MonsterSimulator.executeBasicAttack(Monster(monsterId));

      console.log("WIP MonsterSimulator")
    });
  });

});
