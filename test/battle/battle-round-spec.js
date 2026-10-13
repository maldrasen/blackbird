describe("BattleRound", function() {

  describe("applyCooldown()", function() {
    it("puts a monster's ability on cooldown for its full time when it's used", function() {
      const state = BattleSupport.startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');
      const bite = Ability.Bite({ damage:[10,20], speed:1000, cooldown:2500 });

      BattleSystem.specRound(kobold, { target:BattleSupport.player() });
      bite.execute();

      expect(state.isOnCooldown(kobold, bite.getId())).to.equal(true);
    });

    it("leaves an ability without a cooldown ready to use again", function() {
      const state = BattleSupport.startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');
      const bite = Ability.Bite({ damage:[10,20], speed:1000 });

      BattleSystem.specRound(kobold, { target:BattleSupport.player() });
      bite.execute();

      expect(state.isOnCooldown(kobold, bite.getId())).to.equal(false);
    });

    it("never puts a character's ability on cooldown", function() {
      const state = BattleSupport.startBattle();
      const player = BattleSupport.player();
      const punch = Ability.Punch({ damage:[10,20], speed:1000, cooldown:2500 });

      state.moveToTopOfTurnOrder({ type:'character', id:player });
      BattleSystem.specRound(player, { target:state.getEntityAtPosition('M.0.2') });
      punch.execute();

      expect(state.isOnCooldown(player, punch.getId())).to.equal(false);
    });
  });

});
