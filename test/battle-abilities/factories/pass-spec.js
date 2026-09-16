describe("Ability.Pass", function() {

  // The command that built an ability ends the round, so the execute specs end it themselves to see the stun counted
  // down, which requires the acting entity to be next in the turn order. A status applied during the acting entity's
  // own round isn't counted against at the end of it, so the specs stun the character before the round opens.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const state = BattleSystem.getState();
    const acting = state.getEntityAtPosition('P',0,2);

    state.moveToTopOfTurnOrder({ type:'character', id:acting });

    return acting;
  }

  describe("isPossible()", function() {
    it("is only possible while the acting entity is stunned or paralysed", function() {
      const acting = startBattle();
      const ability = Ability.Pass();

      BattleSystem.specRound(acting);
      expect(ability.isPossible()).to.equal(false);

      BattleSystem.addStatus(acting, 'stun', { count:1 });
      expect(ability.isPossible()).to.equal(true);

      BattleSystem.removeStatus(acting, 'stun');
      BattleSystem.addStatus(acting, 'paralysis');
      expect(ability.isPossible()).to.equal(true);
    });
  });

  describe("execute()", function() {
    it("loses the turn and recovers from a single stun", function() {
      const acting = startBattle();
      const ability = Ability.Pass();

      BattleSystem.addStatus(acting, 'stun', { count:1 });
      BattleSystem.specRound(acting);
      ability.execute();
      BattleSystem.finishCharacterRound();

      const round = BattleSystem.getRound();
      expect(round.getAbility()).to.equal(ability);
      expect(round.getTime()).to.equal(1000);
      expect(round.getMessages()[0].text).to.include('recovers from being');
      expect(StatusEffects(acting).hasStun()).to.equal(false);
    });

    it("stays stunned when more stun turns remain", function() {
      const acting = startBattle();

      BattleSystem.addStatus(acting, 'stun', { count:2 });
      BattleSystem.specRound(acting);
      Ability.Pass().execute();
      BattleSystem.finishCharacterRound();

      expect(BattleSystem.getRound().getMessages()[0].text).to.include(`can't act this turn`);
      expect(StatusEffects(acting).get('stun').count).to.equal(1);
    });
  });

});
