describe("BattleSystem", function() {

  describe("addStatus()", function() {
    it('adds a new status effect', function() {
      BattleSupport.startBattle();

      const entity = BattleSystem.getState().getActiveCharacters()[0];

      BattleSystem.addStatus(entity,'blind',{ duration:1000 });

      expect(StatusEffects(entity).hasBlind()).to.be.true;
      expect(StatusEffects(entity).get('blind').duration).to.equal(1000);
    });

    it('renews the duration when the effect is reapplied with a longer duration', function() {
      BattleSupport.startBattle();

      const entity = BattleSystem.getState().getActiveCharacters()[0];

      BattleSystem.addStatus(entity,'blind',{ duration:1000 });
      BattleSystem.addStatus(entity,'blind',{ duration:2000 });

      // The original effect is renewed, not replaced.
      expect(StatusEffectComponent.of(entity).length).to.equal(1);
      expect(StatusEffects(entity).get('blind').duration).to.equal(2000);
    });

    it('keeps the longer duration when the effect is reapplied with a shorter duration', function() {
      BattleSupport.startBattle();

      const entity = BattleSystem.getState().getActiveCharacters()[0];

      BattleSystem.addStatus(entity,'blind',{ duration:2000 });
      BattleSystem.addStatus(entity,'blind',{ duration:500 });

      expect(StatusEffects(entity).get('blind').duration).to.equal(2000);
    });

    it('removes an opposing status effect', function() {
      BattleSupport.startBattle();

      const entity = BattleSystem.getState().getActiveCharacters()[0];

      BattleSystem.addStatus(entity,'off-balance',{ count:1 });
      BattleSystem.addStatus(entity,'poised',{ count:1 });

      expect(StatusEffects(entity).hasOffBalance()).to.be.false;
      expect(StatusEffects(entity).hasPoised()).to.be.true;

      BattleSystem.addStatus(entity,'off-balance',{ count:1 });

      expect(StatusEffects(entity).hasPoised()).to.be.false;
      expect(StatusEffects(entity).hasOffBalance()).to.be.true;
    });
  });

  // A blasto thrown at the position directly across the battle line catches the thrower in its own blast. When the
  // blast kills the thrower they're removed from the turn order mid round, so finishing the round must not try to
  // schedule their next action.
  describe("finishRound()", function() {
    it("finishes the round when the acting entity dies to its own blast", function() {
      const state = BattleSupport.startBattle();
      const acting = state.getEntityAtPosition('M',0,2);

      const health = HealthComponent.lookup(acting);
      health.currentHealth = 1;
      HealthComponent.update(acting, health);

      BattleSystem.specRound(acting, { target:BattleSupport.player() });
      BattleSystem.getRound().addTime(750);
      EffectSystem.applyDuringBattle(Consumable.lookup('blasto'));
      BattleSystem.finishRound();

      expect(state.isAlive(acting)).to.equal(false);

      const messages = BattleSystem.getRound().getMessages();
      expect(messages[messages.length - 1].text).to.include('was killed!');
    });
  });

  describe("reset()", function() {
    it("clears battle only status effects from the survivors", function() {
      const state = BattleSupport.startBattle();
      const character = state.getActiveCharacters()[0];

      BattleSystem.addStatus(character, 'poised', { count:1 });
      StatusEffects(character).apply('paralysis');

      BattleSystem.reset();

      expect(StatusEffects(character).hasPoised()).to.be.false;
      expect(StatusEffects(character).hasParalysis()).to.be.true;
    });
  });

});
