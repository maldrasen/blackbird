describe("NegotiationState", function() {

  // The negotiation-fixture-2 encounter holds a single kobold-sneak-slut (archetype slut, style lewd) and the player
  // fixture is a male human. The state is started through NegotiationSystem because the dynamic question requirements
  // read the flags through the system's state. The constructor rolls starting fear then respect, so both are stubbed
  // to make the feelings math exact.
  function buildState(fear, respect) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'negotiation-fixture-2', ambushState:'normal' });
    BattleSystem.specRound(GameSystem.getState().getPlayer());
    Random.stubRoll(fear, respect);
    NegotiationSystem.start();
    Random.stubReset();
    return NegotiationSystem.getState();
  }

  describe("pickQuestion()", function() {
    it('picks every possible question with a matching reaction, then throws', function() {
      const state = buildState(40, 20);

      const picked = [];
      for (let i=0; i<2; i++) { picked.push(state.pickQuestion().question); }
      expect(picked.sort()).to.deep.equal(['how-do-you-taste','show-it-to-me']);

      // let-me-taste is still in the pool, but its dynamic requirement keeps it unpickable.
      expect(() => state.pickQuestion()).to.throw(`aren't enough valid questions`);

      state.setFlag('playerCockOut', true);
      expect(state.pickQuestion().question).to.equal('let-me-taste');
      expect(state.getInteractionCount()).to.equal(3);

      expect(() => state.pickQuestion()).to.throw(`aren't enough valid questions`);
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
      expect(state.isResolved()).to.equal(false);
    });

    it('resolves to join when affection passes its threshold', function() {
      const state = buildState(40, 20);
      state.applyFeelings({ affection:95 });
      expect(state.getResolution()).to.deep.equal({ type:'join' });
      expect(state.isResolved()).to.equal(true);
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
    // Starting fear caps at 79, one below the run threshold — the player has to actively frighten the monster.
    it('resolves to run when fear reaches the run threshold', function() {
      const state = buildState(70, 20);
      state.applyFeelings({ fear:30 });
      state.resolveFromTimeout();
      expect(state.getResolution()).to.deep.equal({ type:'run' });
    });

    it('resolves to stalemate when fear is low', function() {
      const state = buildState(40, 20);
      state.resolveFromTimeout();
      expect(state.getResolution()).to.deep.equal({ type:'stalemate' });
    });
  });

  describe("getResolutionText()", function() {
    it('returns text for every resolution type', function() {
      ['join','attack','ability','run','stalemate'].forEach(type => {
        const state = buildState(40, 20);
        state.setResolution({ type });
        expect(state.getResolutionText()).to.be.a('string');
      });
    });

    it('throws before a resolution is set', function() {
      const state = buildState(40, 20);
      expect(() => state.getResolutionText()).to.throw('Add resolution text for unresolved');
    });
  });

});
