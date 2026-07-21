describe("BattleDeathSystem", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });
    return BattleSystem.getState();
  }

  describe("knockOutEntity()", function() {
    it("moves the character behind forward in the battle formation only", function() {
      const state = startBattle();
      const front = state.getEntityAtPosition('P',0,3);
      const back = state.getEntityAtPosition('P',1,3);

      BattleDeathSystem.knockOutEntity(front);

      expect(state.getPartyFormation()[back]).to.equal('P.0.3');
      expect(state.getPartyFormation()[front]).to.be.undefined;
      expect(PartyConfiguration.getConfiguration()[front]).to.equal('P.0.3');
      expect(PartyConfiguration.getConfiguration()[back]).to.equal('P.1.3');
    });

    it("does not end the battle when the player goes down with the party still standing", function() {
      const state = startBattle();
      BattleDeathSystem.knockOutEntity(GameSystem.getState().getPlayer());
      expect(state.getInterrupt()).to.be.undefined;
    });

    it("loses the battle when the last standing character is knocked out", function() {
      const state = startBattle();

      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',1,2));
      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',1,3));
      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',0,2));
      expect(state.getInterrupt()).to.be.undefined;

      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',0,3));
      expect(state.getInterrupt()).to.equal('game-over');
    });
  });

  describe("killEntity()", function() {
    it("makes the forward move persistent when the front character dies", function() {
      const state = startBattle();
      const front = state.getEntityAtPosition('P',0,3);
      const back = state.getEntityAtPosition('P',1,3);

      BattleDeathSystem.killEntity(front);

      expect(state.getPartyFormation()[back]).to.equal('P.0.3');
      expect(PartyConfiguration.getConfiguration()[front]).to.be.undefined;
      expect(PartyConfiguration.getConfiguration()[back]).to.equal('P.0.3');
      expect(state.getInterrupt()).to.be.undefined;
    });

    it("loses the battle when the player is killed", function() {
      const state = startBattle();
      BattleDeathSystem.killEntity(GameSystem.getState().getPlayer());
      expect(state.getInterrupt()).to.equal('game-over');
    });

    it("loses the battle when the last standing character is killed", function() {
      const state = startBattle();

      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',1,2));
      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',1,3));
      BattleDeathSystem.knockOutEntity(state.getEntityAtPosition('P',0,2));
      BattleDeathSystem.killEntity(state.getEntityAtPosition('P',0,3));

      expect(state.getInterrupt()).to.equal('game-over');
    });
  });

  describe("reviveKnockedOut()", function() {
    it("revives knocked out characters with a single point of health", function() {
      const state = startBattle();
      const first = state.getEntityAtPosition('P',1,2);
      const second = state.getEntityAtPosition('P',1,3);

      HealthComponent.update(first, { currentHealth:-8 });
      HealthComponent.update(second, { currentHealth:0 });
      BattleDeathSystem.knockOutEntity(first);
      BattleDeathSystem.knockOutEntity(second);

      const revived = BattleDeathSystem.reviveKnockedOut();

      expect(revived.sort()).to.deep.equal([first,second].sort());
      expect(HealthComponent.lookup(first).currentHealth).to.equal(1);
      expect(HealthComponent.lookup(second).currentHealth).to.equal(1);
      expect(PartyConfiguration.getConfiguration()[first]).to.equal('P.1.2');
      expect(PartyConfiguration.getConfiguration()[second]).to.equal('P.1.3');
    });
  });

});
