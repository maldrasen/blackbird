describe("AutoBattleSystem", function() {

  // Each test boots a full battle, turns on auto battle, and moves the acting character to the front of the turn
  // order (finishRound() requires the acting entity to be next) so that advanceBattle() runs their turn through
  // AutoBattleSystem.takeTurn(). The acting character is picked by their formation position.
  function startAutoBattle(pack, position) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...pack, ambushState:'normal' });

    const state = BattleSystem.getState();
    const acting = state.getEntityAtPosition(position);

    state.setAutoBattle(true);
    state.moveToTopOfTurnOrder({ type:'character', id:acting });

    return { state, acting };
  }

  it("starts every battle with auto battle off", function() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    expect(BattleSystem.getState().isAutoBattle()).to.equal(false);
  });

  describe("takeTurn()", function() {
    it("attacks the closest monster in range", function() {
      const { state } = startAutoBattle(BattleFixtures.trapperPack(), 'P.0.2');

      // The expected target is captured before the round runs; a killed monster's position can be back-filled.
      const closest = state.getEntityAtPosition('M.0.2');

      BattleSystem.advanceBattle();

      const round = BattleSystem.getRound();
      expect(round.getAbility()).to.equal('basic-attack');
      expect(round.getTarget()).to.equal(closest);
    });

    it("defends when no attack is possible", function() {
      // The rogue in the back rank holds a dagger, which can never reach a monster from the back row.
      const { acting } = startAutoBattle(BattleFixtures.runtPack(), 'P.1.2');

      BattleSystem.advanceBattle();

      expect(BattleSystem.getRound().getAbility()).to.equal('basic-defend');
      expect(StatusEffects(acting).has('poised')).to.equal(true);
    });

    it("passes when the character must pass", function() {
      const { acting } = startAutoBattle(BattleFixtures.runtPack(), 'P.0.2');

      BattleSystem.addStatus(acting, 'stun', { count:1 });
      BattleSystem.advanceBattle();

      expect(BattleSystem.getRound().getAbility()).to.equal('pass');
    });
  });

});
