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

  describe("answer()", function() {
    function setBrains(id, value) {
      const attributes = AttributesComponent.lookup(id);
      attributes.intelligence = value;
      attributes.beauty = value;
      AttributesComponent.update(id, attributes);
    }

    // Boots the negotiation like the NegotiationState spec: the negotiation-fixture-2 kobold-sneak-slut with the
    // archetype pinned to slut so the question pool is deterministic. The player is made brilliant and the monster
    // dim, so the player wins the influence contest past the 100 point cap: helping feelings double and hurting ones
    // zero out. Each skill check consumes a crit and a value roll (between) then an improve roll (roll).
    function bootNegotiation() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'negotiation-fixture-2', ambushState:'normal' });

      const player = GameSystem.getState().getPlayer();
      BattleSystem.specRound(player);

      const monster = BattleSystem.getState().getActiveMonsters()[0];
      const personality = PersonalityComponent.lookup(monster);
      personality.archetype = ArchetypeCode.slut;
      PersonalityComponent.update(monster, personality);

      Random.stubRoll(40, 20);
      NegotiationSystem.start();
      Random.stubReset();

      setBrains(player, 100);
      setBrains(monster, 20);

      return { state:NegotiationSystem.getState(), player, monster };
    }

    function pickUntil(state, question, poolSize) {
      for (let i=0; i<poolSize; i++) { if (state.pickQuestion().question === question) { return; } }
      throw new Error(`Question ${question} was not in the pool`);
    }

    it("moderates a feelings reaction and records the conversation improvement", function() {
      const { state, player } = bootNegotiation();
      pickUntil(state, 'how-do-you-taste', 2);

      Random.stubBetween(50,75, 50,1);
      Random.stubRoll(5, 149);
      NegotiationSystem.answer('findOut');

      expect(state.getFeelings()).to.deep.equal({ control:70, affection:90, fear:40, respect:20 });
      expect(state.hasResolution()).to.equal(false);
      expect(SkillsComponent.lookup(player).conversation).to.equal(1);
      expect(BattleSystem.getState().getSkillImprovements()).to.deep.equal({ [player]:{ conversation:1 } });
    });

    // The frequency map contest consumes the first stubbed roll before the two improve rolls.
    it("applies moderated feelings from a join reaction before it resolves", function() {
      const { state, monster } = bootNegotiation();

      state.setFlag('playerCockOut', true);
      pickUntil(state, 'let-me-taste', 3);

      Random.stubBetween(50,75, 50,1);
      Random.stubRoll(3, 5, 149);
      NegotiationSystem.answer('piss');

      expect(state.getResolution()).to.deep.equal({ type:'join' });
      expect(state.getFeelings()).to.deep.equal({ control:110, affection:90, fear:40, respect:100 });
      expect(SexualPreferencesComponent.lookup(monster)['piss-slut']).to.equal(20);
    });
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
