describe("TargetingController", function() {

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startRound() {
    const state = BattleSupport.startBattle();
    const player = BattleSupport.player();

    state.moveToTopOfTurnOrder({ type:'character', id:player });
    BattleSystem.specRound(player);

    return state;
  }

  it("commits the chosen target to the round and runs the pending command", function() {
    const state = startRound();
    const target = state.getEntityAtPosition('M.0.3');

    TargetingController.startTargeting(BattleCommand.lookup(StandardAbility.attack));
    TargetingController.targetSelected('M.0.3');

    const round = BattleSystem.getRound();
    expect(round.getTarget()).to.equal(target);
    expect(round.getAbility().getName()).to.equal('Attack');
    expect(round.getTime()).to.be.above(0);
  });

  it("offers every standing party member as an ally target, hidden or not", function() {
    const state = startRound();
    const party = ['P.0.2','P.0.3','P.1.2','P.1.3'].map(position => state.getEntityAtPosition(position));

    BattleSystem.addStatus(party[3], 'hidden');
    state.setCondition(party[1], BattleCondition.knockedOut);

    expect(TargetingController.getTargetableAllies()).to.have.members([party[0], party[2], party[3]]);
  });

  it("leaves the round alone when targeting is cancelled", function() {
    startRound();

    TargetingController.startTargeting(BattleCommand.lookup(StandardAbility.attack));
    TargetingController.cancelTargeting();

    const round = BattleSystem.getRound();
    expect(round.getTarget()).to.equal(undefined);
    expect(round.getAbility()).to.equal(undefined);
    expect(round.getTime()).to.equal(0);
  });

});
