describe("BattleConsumableSystem", function() {

  // The runt pack puts kobold runts at M.0.1, M.0.2, and M.0.3, and the party fixtures fill P.0.2, P.0.3, P.1.2, and
  // P.1.3. A blasto thrown at P.0.2 therefore catches P.0.2, P.0.3, and P.1.2, plus the runt at M.0.2 standing across
  // the battle line. The system doesn't care that the acting monster has no use-article ability - any entity can act.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function setHealth(id, current) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100;
    health.currentHealth = current;
    HealthComponent.update(id, health);
  }

  function getHealth(id) {
    return HealthComponent.lookup(id).currentHealth;
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

  // Downing everyone but P.0.2 leaves a single victim in the blast, keeping the stubbed roll budget readable. The
  // fixture characters have random species, so the victim is pinned to human (no innate resistances).
  function isolateVictim(state) {
    const victim = state.getEntityAtPosition('P',0,2);
    makeHuman(victim);
    setHealth(victim, 100);
    state.setCondition(state.getEntityAtPosition('P',0,3), BattleCondition.knockedOut);
    state.setCondition(state.getEntityAtPosition('P',1,2), BattleCondition.knockedOut);
    state.setCondition(state.getEntityAtPosition('M',0,2), BattleCondition.dead);
    return victim;
  }

  function throwBlasto(state, acting) {
    BattleSystem.specRound(acting, { target:state.getEntityAtPosition('P',0,2) });
    BattleConsumableSystem.useConsumable('blasto');
    return BattleSystem.getRound().getMessages();
  }

  // The stubbed rolls, in the order they are consumed:
  //   - Story pick: the frequency roll between wholes and formats, then the weighted option pick.
  //   - Per status effect resist: the d20 critical band roll, the resist contest floor, the power contest floor, and
  //     the power roll. A victim with an innate resistance to the effect's damage type consumes one more roll for it;
  //     a zero resistance roll is skipped. The effect lands when the power total beats the resist total.
  // The damage dice come from the separate rollDice queue.
  function stubStory() { return [0, 0]; }
  function stubFailedResist() { return [10, 10, 10, 5]; }
  function stubPassedResist() { return [10, 90, 10, 5]; }

  describe("useConsumable()", function() {
    it("hits every entity caught in the blast", function() {
      const state = startBattle();
      const acting = state.getEntityAtPosition('M',0,1);
      ['P.0.2','P.0.3','P.1.2','P.1.3','M.0.2'].forEach(position => setHealth(state.getEntityAtPosition(position), 100));
      setHealth(acting, 100);

      throwBlasto(state, acting);

      ['P.0.2','P.0.3','P.1.2','M.0.2'].forEach(position => {
        expect(getHealth(state.getEntityAtPosition(position)), position).to.be.lessThan(100);
      });
      expect(getHealth(state.getEntityAtPosition('P',1,3))).to.equal(100);
      expect(getHealth(acting)).to.equal(100);
    });

    it("catches the acting entity in its own blast", function() {
      const state = startBattle();
      const acting = state.getEntityAtPosition('M',0,2);
      setHealth(acting, 100);
      setHealth(state.getEntityAtPosition('P',0,2), 100);

      throwBlasto(state, acting);

      expect(getHealth(acting)).to.be.lessThan(100);
      expect(getHealth(state.getEntityAtPosition('P',0,2))).to.be.lessThan(100);
    });

    it("applies the statuses that fail their resist rolls", function() {
      const state = startBattle();
      const victim = isolateVictim(state);
      const now = state.getNext().time;

      Random.stubRoll(...stubStory(), ...stubFailedResist(), ...stubFailedResist());
      Random.stubRollDice(4);
      const messages = throwBlasto(state, state.getEntityAtPosition('M',0,1));

      expect(StatusEffects(victim).has('blind')).to.equal(true);
      expect(StatusEffects(victim).has('stun')).to.equal(true);

      const removal = state.getTurnOrder().find(entry => entry.key === `status.${victim}.blind`);
      expect(removal.time).to.equal(now + 3000);

      expect(messages.length).to.equal(2);
      expect(messages[0].text).to.include('flash of light');
      expect(messages[1].text).to.include('takes 4 damage, and is both blinded and stunned!');
    });

    it("leaves the victim clean when the resists pass", function() {
      const state = startBattle();
      const victim = isolateVictim(state);

      Random.stubRoll(...stubStory(), ...stubPassedResist(), ...stubPassedResist());
      Random.stubRollDice(4);
      const messages = throwBlasto(state, state.getEntityAtPosition('M',0,1));

      expect(StatusEffects(victim).has('blind')).to.equal(false);
      expect(StatusEffects(victim).has('stun')).to.equal(false);
      expect(getHealth(victim)).to.equal(96);
      expect(messages[1].text).to.include('takes 4 damage!');
    });

    // No resist rolls are stubbed here: the damage downs the victim, so trying to apply the statuses anyway would
    // throw for running out of stubbed values.
    it("stops applying effects to a victim the damage downs", function() {
      const state = startBattle();
      const victim = isolateVictim(state);
      setHealth(victim, 3);
      setVitality(victim, 10);

      Random.stubRoll(...stubStory());
      Random.stubRollDice(6);
      const messages = throwBlasto(state, state.getEntityAtPosition('M',0,1));

      expect(state.isKnockedOut(victim)).to.equal(true);
      expect(StatusEffects(victim).has('blind')).to.equal(false);
      expect(messages.length).to.equal(3);
      expect(messages[1].text).to.include('takes 6 damage!');
      expect(messages[2].text).to.include('was knocked out!');
      expect(messages[2].color).to.equal('important');
    });
  });

});
