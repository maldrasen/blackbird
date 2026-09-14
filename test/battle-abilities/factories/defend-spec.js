describe("Ability.Defend", function() {

  // The command that built an ability ends the round, so the execute spec ends it itself to see the poised stack
  // survive, which requires the acting entity to be next in the turn order.
  function startRound() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const state = BattleSystem.getState();
    const acting = state.getEntityAtPosition('P.0.2');

    state.moveToTopOfTurnOrder({ type:'character', id:acting });
    BattleSystem.specRound(acting, { target:state.getActiveMonsters()[0] });

    return acting;
  }

  it("is always possible", function() {
    expect(Ability.Defend().isPossible()).to.equal(true);
  });

  it("drops the target, takes a second, and stays poised through the end of the round", function() {
    const acting = startRound();
    const ability = Ability.Defend();

    ability.execute();
    BattleSystem.finishCharacterRound();

    const round = BattleSystem.getRound();
    expect(round.getAbility()).to.equal(ability);
    expect(round.getTarget()).to.equal(null);
    expect(round.getTime()).to.equal(1000);
    expect(round.getMessages()[0].text).to.include('defensive stance');
    expect(StatusEffects(acting).get('poised').count).to.equal(1);
  });

});
