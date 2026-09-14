describe("BattleCommand", function() {

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startRound() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const state = BattleSystem.getState();
    const player = state.getEntityAtPosition('P.0.2');

    state.moveToTopOfTurnOrder({ type:'character', id:player });
    BattleSystem.specRound(player);

    return player;
  }

  it("throws for an unknown command", function() {
    expect(() => BattleCommand.lookup('no-such-command')).to.throw('Bad battle command code');
  });

  it("is possible whenever the ability it builds is", function() {
    startRound();

    expect(BattleCommand.lookup(BattleCommandCode.basicAttack).isPossible()).to.equal(true);
    expect(BattleCommand.lookup(BattleCommandCode.hide).isPossible()).to.equal(false);
  });

  it("needs a target when the ability it builds does", function() {
    expect(BattleCommand.lookup(BattleCommandCode.basicAttack).getTargetingMode()).to.equal(TargetingMode.enemyInWeaponRange);
    expect(BattleCommand.lookup(BattleCommandCode.basicDefend).getTargetingMode()).to.equal(null);
    expect(BattleCommand.lookup(BattleCommandCode.useItem).getTargetingMode()).to.equal(null);
  });

  it("builds its ability and runs it", function() {
    const player = startRound();

    BattleCommand.lookup(BattleCommandCode.basicDefend).execute();

    const round = BattleSystem.getRound();
    expect(round.getAbility().getName()).to.equal('Defend');
    expect(round.getTime()).to.equal(1000);
    expect(StatusEffects(player).hasPoised()).to.equal(true);
  });

  // A poised stack applied before the round is counted down when the round ends, which is how the spec can tell the
  // placeholder's round was finished.
  it("runs a placeholder command that has no ability yet, and ends the round for it", function() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const state = BattleSystem.getState();
    const player = state.getEntityAtPosition('P.0.2');

    BattleSystem.addStatus(player, 'poised', { count:2 });
    state.moveToTopOfTurnOrder({ type:'character', id:player });
    BattleSystem.specRound(player);
    BattleCommand.lookup(BattleCommandCode.useItem).execute();

    const round = BattleSystem.getRound();
    expect(round.getMessages()[0].text).to.include('uses item');
    expect(StatusEffects(player).get('poised').count).to.equal(1);
  });

});
