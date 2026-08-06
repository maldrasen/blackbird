describe("NegotiationState", function() {

  // The negotiation-fixture-2 encounter holds a single kobold-sneak-slut and the player fixture is a male human. The
  // sneak slut favors the slut archetype, but a randomly drawn name can carry a trigger that overrides it, so the
  // archetype is pinned to slut (style lewd) before the question pool is built. The state is started through
  // NegotiationSystem because the dynamic question requirements read the flags through the system's state. The
  // constructor rolls starting fear then respect, so both are stubbed to make the feelings math exact. The party
  // member picks for the M, F, and A context keys consume up to three more rolls, stubbed to 0 so each key holds
  // the first matching candidate.
  function buildState(fear, respect) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'negotiation-fixture-2', ambushState:'normal' });
    BattleSystem.specRound(GameSystem.getState().getPlayer());
    setArchetype(ArchetypeCode.slut);
    Random.stubRoll(fear, respect, 0, 0, 0);
    NegotiationSystem.start();
    Random.stubReset();
    return NegotiationSystem.getState();
  }

  function setArchetype(archetype) {
    const monster = BattleSystem.getState().getActiveMonsters()[0];
    const personality = PersonalityComponent.lookup(monster);
    personality.archetype = archetype;
    PersonalityComponent.update(monster, personality);
  }

  // With the pick rolls stubbed to 0, each party reference key holds the first matching candidate, so the expected
  // values can be derived from the fixture party directly.
  describe("party member context", function() {
    it('references other active party members, or null when no one fits the role', function() {
      const state = buildState(40, 20);
      const context = state.getContext();
      const player = GameSystem.getState().getPlayer();
      const monster = Character(state.getMonster());
      const others = BattleSystem.getState().getActiveCharacters().filter(id => id !== player);

      expect(others.length).to.equal(3);
      expect(context.M).to.equal(others.find(id => Character(id).isMale()) || null);
      expect(context.F).to.equal(others.find(id => Character(id).isMale() === false) || null);
      expect(context.A).to.equal(others.find(id => monster.isAttractedTo(id)) || null);
    });
  });

  // The pool's exact contents grow as questions are authored, so the spec drains the pool rather than enumerating it.
  describe("pickQuestion()", function() {
    it('picks every possible question with a matching reaction, then throws', function() {
      const state = buildState(40, 20);

      const picked = [];
      for (let i=0; i<NegotiationQuestion.getAllCodes().length; i++) {
        try { picked.push(state.pickQuestion().question); } catch { break; }
      }

      expect(picked).to.include('how-do-you-taste');
      expect(picked).to.include('show-it-to-me');
      expect(new Set(picked).size).to.equal(picked.length);

      // Follow up questions are never added to the pool.
      expect(picked).to.not.include('tired-of-fighting-other-way');

      // let-me-taste is still in the pool, but its dynamic requirement keeps it unpickable.
      expect(picked).to.not.include('let-me-taste');
      expect(() => state.pickQuestion()).to.throw(`aren't enough valid questions`);

      state.setFlag('playerCockOut', true);
      expect(state.pickQuestion().question).to.equal('let-me-taste');
      expect(state.getInteractionCount()).to.equal(picked.length + 1);

      expect(() => state.pickQuestion()).to.throw(`aren't enough valid questions`);
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
      expect(entry.question).to.equal('tired-of-fighting-other-way');
      expect(entry.reactionData.style).to.equal(NegotiationStyle.fierce);
      expect(state.getCurrentQuestion()).to.equal(entry);
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
      state.setResolution({ type:'ability', code:'dick-punch' });
      state.setResolution({ type:'run' });
      state.applyFeelings({ affection:95 });
      expect(state.getResolution()).to.deep.equal({ type:'ability', code:'dick-punch' });
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
    it('returns text for every resolution type', function() {
      ['join','attack','ability','run'].forEach(type => {
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
