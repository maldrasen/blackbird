describe("NegotiationSystem", function() {

  // Each test boots a full battle around the negotiation-fixture-1 kobold-runt, moves the player to the front of the
  // turn order (finishRound() requires the acting entity to be next), and starts a negotiation. The state constructor
  // rolls starting fear then respect, so both are stubbed to make the transferred feelings exact. Resolutions are set
  // on the state directly — the reaction to resolution mapping is thin and the question path is Random-heavy.
  function startNegotiation() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'negotiation-fixture-1', ambushState:'normal' });

    const player = GameSystem.getState().getPlayer();
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'character', id:player });
    BattleSystem.specRound(player);

    Random.stubRoll(40, 20);
    NegotiationSystem.start();
    Random.stubReset();

    return NegotiationSystem.getState();
  }

  it("shows an attack resolution on the first advance and executes it on the second", function() {
    const state = startNegotiation();
    const battleState = BattleSystem.getState();
    const player = GameSystem.getState().getPlayer();
    const monster = state.getMonster();

    state.setResolution({ type:'attack' });

    NegotiationSystem.advance();
    expect(state.hasShownResolution()).to.equal(true);
    expect(battleState.getForcedAbility()).to.not.exist;
    expect(battleState.getNext().id).to.equal(player);

    NegotiationSystem.advance();
    expect(battleState.getForcedAbility()).to.not.exist;
    expect(BattleSystem.getRound().getActing()).to.equal(monster);
    expect(BattleSystem.getRound().getMessages().length).to.be.above(0);
  });

  it("recruits the monster into the roster when the resolution is join", function() {
    const state = startNegotiation();
    const player = GameSystem.getState().getPlayer();
    const monster = state.getMonster();

    state.setResolution({ type:'join' });
    NegotiationSystem.advance();
    NegotiationSystem.advance();

    expect(BattleSystem.getState()).to.equal(null);
    expect(GameSystem.getState().getGameMode()).to.equal(GameMode.enlighten);
    expect(EnlightenSystem.getState()).to.exist;

    expect(MonsterComponent.lookup(monster)).to.be.undefined;
    expect(GameSystem.getState().isInRoster(monster)).to.equal(true);
    expect(ControlledComponent.lookup(monster).control).to.equal(10);

    const feelings = FeelingsComponent.findByTarget(monster, player);
    expect(feelings.affection).to.equal(10);
    expect(feelings.fear).to.equal(40);
    expect(feelings.respect).to.equal(20);
  });

  it("removes the monster from the game when the resolution is run", function() {
    const state = startNegotiation();
    const monster = state.getMonster();

    state.setResolution({ type:'run' });
    NegotiationSystem.advance();
    NegotiationSystem.advance();

    expect(BattleSystem.getState()).to.equal(null);
    expect(GameSystem.getState().getGameMode()).to.equal(GameMode.enlighten);
    expect(MonsterComponent.lookup(monster)).to.be.undefined;
    expect(GameSystem.getState().isInRoster(monster)).to.equal(false);
  });

  it("continues the battle with the monster acting first after a stalemate timeout", function() {
    const state = startNegotiation();
    const battleState = BattleSystem.getState();
    const monster = state.getMonster();

    state.resolveFromTimeout();
    expect(state.getResolution()).to.deep.equal({ type:'stalemate' });

    NegotiationSystem.advance();
    expect(state.hasShownResolution()).to.equal(true);

    NegotiationSystem.advance();
    expect(BattleSystem.getState()).to.equal(battleState);
    expect(battleState.getInterrupt()).to.not.exist;
    expect(BattleSystem.getRound().getActing()).to.equal(monster);
  });

});
