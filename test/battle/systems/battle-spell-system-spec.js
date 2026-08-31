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

  describe("castSpell()", function() {
    it("releases the stored spell at its stored power level", function() {
      const state = startBattle();
      const acting = state.getEntityAtPosition('M',0,1);
      const party = ['P.0.2','P.0.3','P.1.2','P.1.3'].map(position => state.getEntityAtPosition(position));
      party.forEach(id => setHealth(id, 100));

      BattleSystem.specRound(acting);
      state.startCastingSpell({ code:'spec-spark', powerLevel:2 });
      BattleSpellSystem.castSpell();

      expect(receivedPowerLevel).to.equal(2);
      expect(state.isCastingSpell(acting)).to.equal(false);
      party.forEach(id => expect(HealthComponent.lookup(id).currentHealth, id).to.be.lessThan(100));

      const round = BattleSystem.getRound();
      expect(round.getTime()).to.be.greaterThan(0);
      expect(round.getMessages()[0].text).to.include('unleashes a crackling spark');
    });

    it("throws when the acting entity is not casting a spell", function() {
      const state = startBattle();
      BattleSystem.specRound(state.getEntityAtPosition('M',0,1));

      expect(() => BattleSpellSystem.castSpell()).to.throw('not casting a spell');
    });
  });

});
