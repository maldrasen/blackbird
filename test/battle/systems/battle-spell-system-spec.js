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

    const boltStories = WeaverPackage('spec-bolt');
    boltStories.add(`A spectral bolt strikes {T:TargetName}.`);

    Spell.register('spec-bolt', {
      name: 'Spec Bolt',
      color: 'red',
      manaCost: 1,
      target: EffectTarget.single,
      getEffects: () => { return [Effect.damage(DamageType.fire, { x:5, d:4 })]; },
      stories: boltStories,
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

    // The release turn's round has no target set - a single target spell has to hit the target stored in the spell
    // data when the cast began.
    it("hits the target stored when the cast began", function() {
      const state = startBattle();
      const party = getParty(state);
      party.forEach(id => setHealth(id, 100));
      const target = party[1];

      Random.stubBetween(50, 1);
      BattleSystem.specRound(state.getEntityAtPosition('M',0,1));
      state.startCastingSpell({ code:'spec-bolt', powerLevel:2, target:target, targetPosition:state.getPosition(target) });
      BattleSpellSystem.castSpell();

      expect(getHealth(target)).to.be.lessThan(100);
      party.filter(id => id !== target).forEach(id => expect(getHealth(id), id).to.equal(100));

      const messages = BattleSystem.getRound().getMessages();
      expect(messages[0].text).to.include(ActorComponent.lookup(target).name);
    });

    // The party fixtures fill P.0.2, P.0.3, P.1.2, and P.1.3. With the original target at P.0.2 down, their neighbor
    // at P.0.3 (rank distance 0) is closer than either back rank character (rank distance 1).
    it("redirects to the closest available target when the original target is down", function() {
      const state = startBattle();
      const party = getParty(state);
      party.forEach(id => setHealth(id, 100));
      const target = state.getEntityAtPosition('P',0,2);

      Random.stubBetween(50, 1);
      BattleSystem.specRound(state.getEntityAtPosition('M',0,1));
      state.startCastingSpell({ code:'spec-bolt', powerLevel:2, target:target, targetPosition:state.getPosition(target) });
      state.setCondition(target, BattleCondition.knockedOut);
      BattleSpellSystem.castSpell();

      const redirected = state.getEntityAtPosition('P',0,3);
      expect(getHealth(redirected)).to.be.lessThan(100);
      party.filter(id => id !== redirected).forEach(id => expect(getHealth(id), id).to.equal(100));
    });

    it("counts rank distance for more than position distance when redirecting", function() {
      const state = startBattle();
      const party = getParty(state);
      party.forEach(id => setHealth(id, 100));
      const target = state.getEntityAtPosition('P',0,2);

      Random.stubBetween(50, 1);
      BattleSystem.specRound(state.getEntityAtPosition('M',0,1));
      state.startCastingSpell({ code:'spec-bolt', powerLevel:2, target:target, targetPosition:state.getPosition(target) });
      state.setCondition(target, BattleCondition.knockedOut);
      state.setCondition(state.getEntityAtPosition('P',0,3), BattleCondition.knockedOut);
      BattleSpellSystem.castSpell();

      const redirected = state.getEntityAtPosition('P',1,2);
      expect(getHealth(redirected)).to.be.lessThan(100);
      expect(getHealth(state.getEntityAtPosition('P',1,3))).to.equal(100);
    });

    it("throws when the acting entity is not casting a spell", function() {
      const state = startBattle();
      BattleSystem.specRound(state.getEntityAtPosition('M',0,1));

      expect(() => BattleSpellSystem.castSpell()).to.throw('not casting a spell');
    });
  });

});
