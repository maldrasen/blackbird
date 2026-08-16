describe("StatusEffectSystem", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });
    return BattleSystem.getState();
  }

  function setHealth(id, current) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100;
    health.currentHealth = current;
    HealthComponent.update(id, health);
  }

  function setVitality(id, value) {
    const attributes = AttributesComponent.lookup(id);
    attributes.vitality = value;
    AttributesComponent.update(id, attributes);
  }

  function makeHuman(id) {
    const actor = ActorComponent.lookup(id);
    actor.species = SpeciesCode.human;
    ActorComponent.update(id, actor);
  }

  // The specs push the poison's entry to the top of the turn order so that advanceBattle() dispatches it.
  function poisonVictim(state, victim) {
    BattleSystem.addStatus(victim, 'poison', { strength:10, interval:500, damage:{ x:1, d:6, p:2 }});
    state.moveToTopOfTurnOrder({ type:'status', id:victim, code:'poison' });
  }

  function findEntry(state, victim, code) {
    return state.getTurnOrder().find(entry => entry.key === `status.${victim}.${code}`);
  }

  // Every tick of an until-resisted effect starts with a resist roll, so the specs about the tick itself force a
  // failed one. Humans and kobolds both have no nature resistance, so that roll is skipped.
  function failResist() {
    Random.stubRoll(5, 10, 80, 5);
  }

  describe("scheduleTick()", function() {
    it("schedules a tick one record interval after the current time", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      const now = state.getNext().time;

      BattleSystem.addStatus(victim, 'poison', { strength:10, damage:{ x:1, d:6, p:2 }});

      expect(findEntry(state, victim, 'poison').time).to.equal(now + 2000);
    });

    it("overrides the record interval with the component's interval", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      const now = state.getNext().time;

      BattleSystem.addStatus(victim, 'poison', { strength:10, interval:500, damage:{ x:1, d:6, p:2 }});

      expect(findEntry(state, victim, 'poison').time).to.equal(now + 500);
    });

    it("keeps the pending tick's schedule when the effect is renewed", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      const now = state.getNext().time;

      BattleSystem.addStatus(victim, 'poison', { strength:10, interval:500, damage:{ x:1, d:6, p:2 }});
      BattleSystem.addStatus(victim, 'poison', { strength:20, interval:2000, damage:{ x:1, d:6, p:2 }});

      expect(StatusEffects(victim).get('poison').interval).to.equal(2000);
      expect(findEntry(state, victim, 'poison').time).to.equal(now + 500);
    });

    it("schedules nothing for an effect without an interval", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);

      BattleSystem.addStatus(victim, 'poised');

      expect(state.getTurnOrder().filter(entry => entry.type === 'status')).to.be.empty;
    });
  });

  describe("removeStatus()", function() {
    it("clears the effect's turn order entry", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);

      BattleSystem.addStatus(victim, 'poison', { strength:10, damage:{ x:1, d:6, p:2 }});
      BattleSystem.removeStatus(victim, 'poison');

      expect(StatusEffects(victim).has('poison')).to.be.false;
      expect(findEntry(state, victim, 'poison')).to.be.undefined;
    });

    it("tolerates effects that never scheduled an entry", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);

      BattleSystem.addStatus(victim, 'poised');

      expect(() => BattleSystem.removeStatus(victim, 'poised')).not.to.throw();
    });
  });

  describe("processTick()", function() {
    it("damages the victim and reschedules the tick one interval later", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      setHealth(victim, 100);
      setVitality(victim, 15);
      makeHuman(victim);
      poisonVictim(state, victim);

      const start = state.getNext().time;
      failResist();
      Random.stubRollDice(6);
      BattleSystem.advanceBattle();

      expect(HealthComponent.lookup(victim).currentHealth).to.equal(94);

      const entry = state.getTurnOrder().find(entry => entry.key === `status.${victim}.poison`);
      expect(entry.time).to.equal(start + 500);

      const messages = BattleSystem.getRound().getMessages();
      expect(messages.length).to.equal(1);
      expect(messages[0].text).to.include('takes 6 damage from');
    });

    it("does not reschedule the tick when it downs the victim", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      setHealth(victim, 1);
      setVitality(victim, 15);
      makeHuman(victim);
      poisonVictim(state, victim);

      failResist();
      Random.stubRollDice(6);
      BattleSystem.advanceBattle();

      expect(HealthComponent.lookup(victim).currentHealth).to.equal(-5);
      expect(state.isKnockedOut(victim)).to.be.true;
      expect(state.getTurnOrder().filter(entry => entry.type === 'status')).to.be.empty;
    });

    // The stub order for the resist roll is the 5% critical roll, then the contest floor and resistance rolls, then
    // the contest floor and power rolls. The pinned human victim has no nature resistance, so that roll is skipped.
    it("ends the effect without damage when the victim resists it", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      setHealth(victim, 100);
      setVitality(victim, 15);
      makeHuman(victim);
      poisonVictim(state, victim);

      Random.stubRoll(5, 80, 20, 5);
      BattleSystem.advanceBattle();

      expect(HealthComponent.lookup(victim).currentHealth).to.equal(100);
      expect(StatusEffects(victim).has('poison')).to.be.false;
      expect(state.getTurnOrder().filter(entry => entry.type === 'status')).to.be.empty;

      const messages = BattleSystem.getRound().getMessages();
      expect(messages.length).to.equal(1);
      expect(messages[0].text).to.include('shakes off');
    });

    it("ticks and reschedules when the victim fails to resist", function() {
      const state = startBattle();
      const victim = state.getEntityAtPosition('P',1,2);
      setHealth(victim, 100);
      setVitality(victim, 15);
      makeHuman(victim);
      poisonVictim(state, victim);

      const start = state.getNext().time;
      failResist();
      Random.stubRollDice(6);
      BattleSystem.advanceBattle();

      expect(HealthComponent.lookup(victim).currentHealth).to.equal(94);
      expect(StatusEffects(victim).has('poison')).to.be.true;
      expect(findEntry(state, victim, 'poison').time).to.equal(start + 500);
    });

    it("interrupts the battle when the tick kills the last monster", function() {
      const state = startBattle();
      const monsters = state.getActiveMonsters();
      monsters.slice(1).forEach(id => BattleDeathSystem.killEntity(id));

      const victim = monsters[0];
      setHealth(victim, 1);
      poisonVictim(state, victim);

      failResist();
      Random.stubRollDice(6);
      BattleSystem.advanceBattle();

      expect(state.isAlive(victim)).to.be.false;
      expect(state.getInterrupt()).to.equal('victory');
      expect(state.getTurnOrder().filter(entry => entry.type === 'status')).to.be.empty;
    });
  });

});
