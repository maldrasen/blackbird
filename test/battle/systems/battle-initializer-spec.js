describe("BattleInitializer", function() {

  describe("rollInitialCooldowns()", function() {

    // The runts have no abilities with cooldowns, so the battle starts with a clean cooldown state and the tosser's
    // monster-use-article ability is the only one that consumes an initial cooldown roll.
    function addTosserToBattle() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

      const tosser = MonsterFactory('kobold-tosser').build();
      BattleSystem.getState().addMonster(tosser,'M.1.2');
      return tosser;
    }

    it("puts monster abilities on a random cooldown when the battle starts", function() {
      const tosser = addTosserToBattle();

      Random.stubRoll(3000);
      BattleInitializer.rollInitialCooldowns();

      expect(BattleSystem.getState().isOnCooldown(tosser,'monster-use-article')).to.equal(true);
    });

    it("leaves an ability ready to use when the initial cooldown roll is zero", function() {
      const tosser = addTosserToBattle();

      Random.stubRoll(0);
      BattleInitializer.rollInitialCooldowns();

      expect(BattleSystem.getState().isOnCooldown(tosser,'monster-use-article')).to.equal(false);
    });

  });

});
