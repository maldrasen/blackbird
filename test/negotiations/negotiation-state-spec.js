describe("NegotiationState", function() {

  // The negotiation-fixture-2 encounter holds a single kobold-sneak-slut and the player fixture is a male human. The
  // sneak slut favors the slut archetype, but a randomly drawn name can carry a trigger that overrides it, so the
  // archetype is pinned to slut (style lewd) before the question pool is built. The state is started through
  // NegotiationSystem because the dynamic question requirements read the flags through the system's state. The
  // constructor rolls the starting fear and respect randomly, so the values the specs care about are set directly
  // once the state is built.
  function buildState(fear, respect) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ monster:'kobold-sneak-slut', ambushState:'normal' });
    BattleSystem.specRound(GameSystem.getState().getPlayer());
    setArchetype(ArchetypeCode.slut);
    NegotiationSystem.start();

    const state = NegotiationSystem.getState();
    state.setFeelings({ fear, respect });
    return state;
  }

  function setArchetype(archetype) {
    const monster = BattleSystem.getState().getActiveMonsters()[0];
    const personality = PersonalityComponent.lookup(monster);
    personality.archetype = archetype;
    PersonalityComponent.update(monster, personality);
  }

  // The party references are picked randomly, so the spec checks that each pick came from the right candidate pool
  // rather than pinning exact members. A pick from an empty pool must be null.
  describe("party member context", function() {
    function expectPickedFrom(pick, candidates) {
      if (candidates.length === 0) { return expect(pick).to.equal(null); }
      expect(candidates).to.include(pick);
    }

    it('references other active party members, or null when no one fits the role', function() {
      const state = buildState(40, 20);
      const context = state.getContext();
      const player = GameSystem.getState().getPlayer();
      const monster = Character(state.getMonster());
      const others = BattleSystem.getState().getActiveCharacters().filter(id => id !== player);

      expect(others.length).to.equal(3);
      expectPickedFrom(context.M, others.filter(id => Character(id).isMale()));
      expectPickedFrom(context.F, others.filter(id => Character(id).isMale() === false));
      expectPickedFrom(context.A, others.filter(id => monster.isAttractedTo(id)));
    });

    it('setContext() overwrites the picked references', function() {
      const state = buildState(40, 20);
      const player = GameSystem.getState().getPlayer();

      state.setContext({ F:player });
      expect(state.getContext().F).to.equal(player);
      expect(state.getContext().T).to.equal(state.getMonster());
    });
  });

  // The player fixture is a human with no natural mana, so no request is possible until some is granted. With red mana
  // the give-me-mana request is the only one in the pool. When both a question and a request are available the pick
  // flips a coin, tails for a request. Picking a request rolls its parameters: the color is drawn from a single element
  // list and the amount is the first stubbed between value.
  describe("pickInteraction()", function() {
    const questionLimit = NegotiationQuestion.getAllCodes().length;

    it('picks a request on tails, rolling its parameters and text', function() {
      const state = buildState(40, 20);
      BattleFixtures.grantMana('red', 100);
      Random.stubFlipCoin(false);
      Random.stubBetween(20);

      const entry = state.pickInteraction();
      expect(entry.type).to.equal('request');
      expect(entry.code).to.equal('give-me-mana');
      expect(entry.requestParameters).to.deep.equal({ color:'red', amount:20 });
      expect(entry.requestText).to.include('red mana');
      expect(state.getCurrentInteraction()).to.equal(entry);
      expect(state.getInteractionCount()).to.equal(1);
    });

    it('keeps a repeatable request in the pool and re-rolls its parameters on each pick', function() {
      const state = buildState(40, 20);
      BattleFixtures.grantMana('red', 100);
      Random.stubFlipCoin(false, false);
      Random.stubBetween(20, 25);

      const first = state.pickInteraction();
      const second = state.pickInteraction();
      expect(first.code).to.equal('give-me-mana');
      expect(second.code).to.equal('give-me-mana');
      expect(first).to.not.equal(second);
      expect(first.requestParameters.amount).to.equal(20);
      expect(second.requestParameters.amount).to.equal(25);
      expect(state.getInteractionCount()).to.equal(2);
    });

    // Every pick with both kinds available consumes a coin flip, so enough heads are queued to drain the whole question
    // pool. The leftover stubs are harmless.
    it('falls back to a request once the questions are used up', function() {
      const state = buildState(40, 20);
      BattleFixtures.grantMana('red', 100);
      Random.stubFlipCoin(...Array(questionLimit).fill(true));

      let entry;
      for (let i=0; i<=questionLimit; i++) {
        entry = state.pickInteraction();
        if (entry.type === 'request') { break; }
      }

      expect(entry.code).to.equal('give-me-mana');
      expect(state.getInteractionCount()).to.be.above(1);
    });

    // The empty flipCoin stub makes any coin flip throw, proving no coin is flipped while only questions are possible.
    it('picks only questions without a coin flip when no request is possible, then throws when they run out', function() {
      const state = buildState(40, 20);
      Random.stubFlipCoin();

      const entries = [];
      const drain = () => { for (let i=0; i<=questionLimit; i++) { entries.push(state.pickInteraction()); } };

      expect(drain).to.throw('There are no possible negotiation interactions');
      expect(entries.length).to.be.above(0);
      expect(entries.every(entry => entry.type === 'question')).to.equal(true);
    });
  });

  // setFollowUp() reads the reaction data live, so the archetype can be repinned after the state is built to give the
  // monster whatever style the test needs.
  describe("followUp questions", function() {
    it('forces the follow up question to be asked next', function() {
      const state = buildState(40, 20);
      setArchetype(ArchetypeCode.savage);
      expect(state.hasFollowUp()).to.equal(false);

      state.setFollowUp('tired-of-fighting-other-way');
      expect(state.hasFollowUp()).to.equal(true);

      const entry = state.takeFollowUpQuestion();
      expect(entry.type).to.equal('question');
      expect(entry.code).to.equal('tired-of-fighting-other-way');
      expect(entry.reactionData.style).to.equal(NegotiationStyle.fierce);
      expect(state.getCurrentInteraction()).to.equal(entry);
      expect(state.getInteractionCount()).to.equal(1);
      expect(state.hasFollowUp()).to.equal(false);
    });

    it('throws for an unknown question code', function() {
      const state = buildState(40, 20);
      expect(() => state.setFollowUp('tired-of-jogging')).to.throw('Bad negotiation question code');
    });

    it('throws when the monster has no reaction to the question', function() {
      const state = buildState(40, 20);
      setArchetype(ArchetypeCode.reserved);
      expect(() => state.setFollowUp('tired-of-fighting-other-way')).to.throw('has no reaction');
    });
  });

  describe("applyFeelings()", function() {
    it('applies exact values, clamping negatives to 0 in getFeelings()', function() {
      const state = buildState(40, 20);
      expect(state.getFeelings()).to.deep.equal({ control:10, affection:10, fear:40, respect:20 });
      expect(state.getResolution()).to.deep.equal({ type:'unresolved' });

      state.applyFeelings({ control:5, affection:-30, fear:-50, respect:5 });
      expect(state.getFeelings()).to.deep.equal({ control:15, affection:0, fear:0, respect:25 });
      expect(state.getResolution()).to.deep.equal({ type:'unresolved' });
      expect(state.hasResolution()).to.equal(false);
    });

    it('resolves to join when affection passes its threshold', function() {
      const state = buildState(40, 20);
      state.applyFeelings({ affection:95 });
      expect(state.getResolution()).to.deep.equal({ type:'join' });
      expect(state.hasResolution()).to.equal(true);
    });

    it('resolves to join when respect passes its threshold', function() {
      const state = buildState(40, 20);
      state.applyFeelings({ respect:85 });
      expect(state.getResolution()).to.deep.equal({ type:'join' });
    });

    it('resolves to attack when affection and respect both go negative', function() {
      const state = buildState(40, 20);
      state.applyFeelings({ affection:-20, respect:-25 });
      expect(state.getResolution()).to.deep.equal({ type:'attack' });
    });

    it('resolves to attack when fear and respect both go negative', function() {
      const state = buildState(40, 20);
      state.applyFeelings({ fear:-45, respect:-25 });
      expect(state.getResolution()).to.deep.equal({ type:'attack' });
    });
  });

  describe("setResolution()", function() {
    it('first resolution wins, even over a later threshold pass', function() {
      const state = buildState(40, 20);
      state.setResolution({ type:'ability', ability:'Dick Punch' });
      state.setResolution({ type:'run' });
      state.applyFeelings({ affection:95 });
      expect(state.getResolution()).to.deep.equal({ type:'ability', ability:'Dick Punch' });
    });
  });

  describe("resolveFromTimeout()", function() {
    it('resolves to run when fear is high', function() {
      const state = buildState(70, 20);
      state.applyFeelings({ fear:10 });
      state.resolveFromTimeout();
      expect(state.getResolution()).to.deep.equal({ type:'run' });
    });

    it('resolves to join when respect is high', function() {
      const state = buildState(25, 25);
      state.applyFeelings({ respect:50 });
      state.resolveFromTimeout();
      expect(state.getResolution()).to.deep.equal({ type:'join' });
    });

    it('resolves to attack otherwise', function() {
      const state = buildState(40, 20);
      state.resolveFromTimeout();
      expect(state.getResolution()).to.deep.equal({ type:'attack' });
    });
  });

  describe("getResolutionText()", function() {
    ['join','attack','ability','run'].forEach(type => {
      it(`returns text for the ${type} resolution`, function() {
        const state = buildState(40, 20);
        state.setResolution({ type });
        expect(state.getResolutionText()).to.be.a('string');
      });
    });

    it('throws before a resolution is set', function() {
      const state = buildState(40, 20);
      expect(() => state.getResolutionText()).to.throw('negotiation remains unresolved');
    });
  });

});
