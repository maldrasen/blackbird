describe("BattleState", function() {

  describe("Formation", function() {
    it('getEntityAtPosition()', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1' });

      const state = BattleSystem.getState();
      expect(state.getEntityAtPosition('M',0,3)).to.not.be.null;
      expect(state.getEntityAtPosition('M',1,3)).to.be.null;
    });
  })

  describe("Turn Order", function() {
    it('moves the character within the turn order after acting', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const next = state.getNext();
      next.time += 1000;
      state.setTurnOrder(next);

      const newOrder = state.getTurnOrder();
      const last = newOrder[newOrder.length-1];

      expect(next.id).to.equal(last.id);
    });

    it('moves an entity to the top of the turn order', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const order = state.getTurnOrder();
      const last = order[order.length-1];

      state.moveToTopOfTurnOrder(last, 50);

      const newOrder = state.getTurnOrder();
      expect(newOrder[0].id).to.equal(last.id);
      expect(newOrder[0].time).to.equal(Math.max(0, newOrder[1].time - 50));
    });

    it('entities can be removed from the turn order', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const order = state.getTurnOrder();
      const second = order[1];

      state.removeFromTurnOrder(second);

      const ids = state.getTurnOrder().map(data => { return data.id });

      expect(ids.includes(second.id)).to.be.false;
    });
  });

  describe("addStatus()", function() {
    it('adds a new status effect', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const entity = state.getCharacters()[0];

      state.addStatus(BattleStatusEffect(entity,'blind',{ duration:1000 }));

      expect(state.hasStatusEffect(entity,'blind')).to.be.true;
      expect(state.getStatusEffects(entity)['blind'].getDuration()).to.equal(1000);
    });

    it('renews the duration when the effect is reapplied with a longer duration', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const entity = state.getCharacters()[0];
      const original = BattleStatusEffect(entity,'blind',{ duration:1000 });

      state.addStatus(original);
      state.addStatus(BattleStatusEffect(entity,'blind',{ duration:2000 }));

      // The original effect is renewed, not replaced.
      expect(state.getStatusEffects(entity)['blind']).to.equal(original);
      expect(original.getDuration()).to.equal(2000);
    });

    it('keeps the longer duration when the effect is reapplied with a shorter duration', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const entity = state.getCharacters()[0];
      const original = BattleStatusEffect(entity,'blind',{ duration:2000 });

      state.addStatus(original);
      state.addStatus(BattleStatusEffect(entity,'blind',{ duration:500 }));

      expect(state.getStatusEffects(entity)['blind']).to.equal(original);
      expect(original.getDuration()).to.equal(2000);
    });

    it('removes an opposing status effect', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const entity = state.getCharacters()[0];

      state.addStatus(BattleStatusEffect(entity,'off-balance',{ duration:1 }));
      state.addStatus(BattleStatusEffect(entity,'poised',{ duration:1 }));

      expect(state.hasStatusEffect(entity,'off-balance')).to.be.false;
      expect(state.hasStatusEffect(entity,'poised')).to.be.true;

      state.addStatus(BattleStatusEffect(entity,'off-balance',{ duration:1 }));

      expect(state.hasStatusEffect(entity,'poised')).to.be.false;
      expect(state.hasStatusEffect(entity,'off-balance')).to.be.true;
    });
  });

});