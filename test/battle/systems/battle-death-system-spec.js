describe("BattleDeathSystem", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
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
      expect(state.getHomePositions()[front]).to.equal('P.0.3');
      expect(state.getHomePositions()[back]).to.equal('P.1.3');
    });

    it("does not end the battle when the player goes down with the party still standing", function() {
      const state = startBattle();
      BattleDeathSystem.knockOutEntity(GameSystem.getState().getPlayer());
      expect(state.getInterrupt()).to.be.undefined;
    });

    it("removes the character's status effect entries from the turn order", function() {
      const state = startBattle();
      const front = state.getEntityAtPosition('P',0,3);
      const other = state.getEntityAtPosition('P',1,3);

      state.setTurnOrder({ type:'status', id:front, code:'poison', time:5000 });
      state.setTurnOrder({ type:'status', id:front, code:'burn', time:6000 });
      state.setTurnOrder({ type:'status', id:other, code:'poison', time:7000 });

      BattleDeathSystem.knockOutEntity(front);

      const keys = state.getTurnOrder().map(entry => entry.key);
      expect(keys).not.to.include(`status.${front}.poison`);
      expect(keys).not.to.include(`status.${front}.burn`);
      expect(keys).to.include(`status.${other}.poison`);
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
    it("moves the character behind forward in the home positions when the front character dies", function() {
      const state = startBattle();
      const front = state.getEntityAtPosition('P',0,3);
      const back = state.getEntityAtPosition('P',1,3);

      BattleDeathSystem.killEntity(front);

      expect(state.getPartyFormation()[back]).to.equal('P.0.3');
      expect(state.getHomePositions()[front]).to.be.undefined;
      expect(state.getHomePositions()[back]).to.equal('P.0.3');
      expect(state.getInterrupt()).to.be.undefined;
    });

    it("does not touch the party configuration until the battle is won", function() {
      const state = startBattle();
      const front = state.getEntityAtPosition('P',0,3);
      const back = state.getEntityAtPosition('P',1,3);

      BattleDeathSystem.killEntity(front);

      expect(PartyConfiguration.getConfiguration()[front]).to.equal('P.0.3');
      expect(PartyConfiguration.getConfiguration()[back]).to.equal('P.1.3');
    });

    it("removes the entity's status effect entries from the turn order", function() {
      const state = startBattle();
      const front = state.getEntityAtPosition('P',0,3);
      const other = state.getEntityAtPosition('P',1,3);

      state.setTurnOrder({ type:'status', id:front, code:'poison', time:5000 });
      state.setTurnOrder({ type:'status', id:other, code:'poison', time:6000 });

      BattleDeathSystem.killEntity(front);

      const keys = state.getTurnOrder().map(entry => entry.key);
      expect(keys).not.to.include(`status.${front}.poison`);
      expect(keys).to.include(`status.${other}.poison`);
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
