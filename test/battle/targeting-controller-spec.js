describe.only("TargetingController", function() {

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startRound() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const state = BattleSystem.getState();
    const player = state.getEntityAtPosition('P.0.2');

    state.moveToTopOfTurnOrder({ type:'character', id:player });
    BattleSystem.specRound(player);

    return state;
  }

  it("commits the chosen target to the round and runs the pending command", function() {
    const state = startRound();
    const target = state.getEntityAtPosition('M.0.3');

    TargetingController.startTargeting(BattleCommand.lookup(BattleCommandCode.basicAttack));
    TargetingController.targetSelected('M.0.3');

    const round = BattleSystem.getRound();
    expect(round.getTarget()).to.equal(target);
    expect(round.getAbility().getName()).to.equal('Attack');
    expect(round.getTime()).to.be.above(0);
  });

  it("leaves the round alone when targeting is cancelled", function() {
    startRound();

    TargetingController.startTargeting(BattleCommand.lookup(BattleCommandCode.basicAttack));
    TargetingController.cancelTargeting();

    const round = BattleSystem.getRound();
    expect(round.getTarget()).to.equal(undefined);
    expect(round.getAbility()).to.equal(undefined);
    expect(round.getTime()).to.equal(0);
  });

});
