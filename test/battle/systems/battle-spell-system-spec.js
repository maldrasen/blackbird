describe("BattleSpellSystem", function() {

  // The spec registers its own spell so these specs exercise the casting logic without coupling to a shipped spell's
  // content. The damage dice are big enough that the maximum damage reduction still leaves a mark on every target.
  let receivedPowerLevel;

  before(function() {
    const stories = WeaverPackage('spec-spark');
    stories.add(`{A:ActingName} unleashes a crackling spark.`);

    Spell.register('spec-spark', {
      name: 'Spec Spark',
      color: 'red',
      manaCost: 1,
      target: EffectTarget.enemyFormation,
      getEffects: powerLevel => {
        receivedPowerLevel = powerLevel;
        return [Effect.damage(DamageType.fire, { x:5, d:4 })];
      },
      stories: stories,
      messageForEntity: () => { return null; },
    });
  });

  beforeEach(function() {
    receivedPowerLevel = null;
  });

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function getParty(state) {
    return ['P.0.2','P.0.3','P.1.2','P.1.3'].map(position => state.getEntityAtPosition(position));
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

  // The skill check consumes the between queue: first the d100 crit band roll, then (in the normal band) the value
  // roll. A stubbed value roll of 1 still beats the difficulty because the skill factor scales it back up. The story
  // pick and damage rolls are left to real randomness - the damage dice always leave a mark, so nothing downstream
  // needs to be pinned.
  function castSpecSpark(state, powerLevel=2) {
    const acting = state.getEntityAtPosition('M',0,1);
    BattleSystem.specRound(acting);
    state.startCastingSpell({ code:'spec-spark', powerLevel });
    BattleSpellSystem.castSpell();
    return acting;
  }

  describe("castSpell()", function() {
    it("releases the stored spell at its stored power level", function() {
      const state = startBattle();
      const party = getParty(state);
      party.forEach(id => setHealth(id, 100));

      Random.stubBetween(50, 1);
      const acting = castSpecSpark(state);

      expect(receivedPowerLevel).to.equal(2);
      expect(state.isCastingSpell(acting)).to.equal(false);
      party.forEach(id => expect(getHealth(id), id).to.be.lessThan(100));

      const round = BattleSystem.getRound();
      expect(round.getTime()).to.be.greaterThan(0);
      expect(round.getMessages()[0].text).to.include('unleashes a crackling spark');
    });

    it("boosts the power level when the skill check crits", function() {
      const state = startBattle();
      const party = getParty(state);
      party.forEach(id => setHealth(id, 100));

      Random.stubBetween(98);
      castSpecSpark(state);

      expect(receivedPowerLevel).to.equal(4);
      party.forEach(id => expect(getHealth(id), id).to.be.lessThan(100));
    });

    it("fizzles the spell when the skill check fumbles", function() {
      const state = startBattle();
      const party = getParty(state);
      party.forEach(id => setHealth(id, 100));

      Random.stubBetween(1);
      const acting = castSpecSpark(state);

      expect(receivedPowerLevel).to.equal(null);
      expect(state.isCastingSpell(acting)).to.equal(false);
      party.forEach(id => expect(getHealth(id), id).to.equal(100));

      const round = BattleSystem.getRound();
      expect(round.getTime()).to.be.greaterThan(0);
      expect(round.getMessages()[0].text).to.include('fucked up casting');
    });

    it("throws when the acting entity is not casting a spell", function() {
      const state = startBattle();
      BattleSystem.specRound(state.getEntityAtPosition('M',0,1));

      expect(() => BattleSpellSystem.castSpell()).to.throw('not casting a spell');
    });
  });

});
