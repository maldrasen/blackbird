describe("Monster", function() {

  // These specs register their own monster records so they test the merge logic without coupling to shipped content.
  // The wrapper only reads the registries through the monster component, so a bare entity is enough - no need to
  // build a full monster through the factory.
  before(function() {
    MonsterType.register('spec-caster-type', {
      prioritizedAbilities: {
        'basic-defend': { code:'basic-defend', priority:10 },
        'basic-attack': { code:'basic-attack', priority:20 },
      },
    });

    BaseMonster.register('spec-caster', {
      name: 'Spec Caster',
      type: 'spec-caster-type',
      level: 1,
      prioritizedAbilities: {
        'basic-attack': { code:'basic-attack', priority:50 },
        'cast-spark': { code:'monster-cast-spell', priority:80, spell:'spec-spark', powerLevel:1, cooldown:2000 },
        'cast-bolt': { code:'monster-cast-spell', priority:70, spell:'spec-bolt', powerLevel:2 },
      },
    });
  });

  function buildMonster(code) {
    const id = Registry.createEntity();
    MonsterComponent.create(id, code);
    return Monster(id);
  }

  describe("getAbilityMap()", function() {
    it("keeps same code entries with distinct keys and overrides by key", function() {
      const abilityMap = buildMonster('spec-caster').getAbilityMap();

      expect(Object.keys(abilityMap).length).to.equal(4);
      expect(abilityMap['basic-defend'].priority).to.equal(10);
      expect(abilityMap['basic-attack'].priority).to.equal(50);
      expect(abilityMap['cast-spark'].priority).to.equal(80);
      expect(abilityMap['cast-bolt'].priority).to.equal(70);
    });
  });

  describe("getAbility()", function() {
    it("looks entries up by key", function() {
      const monster = buildMonster('spec-caster');

      expect(monster.getAbility('cast-spark').spell).to.equal('spec-spark');
      expect(monster.getAbility('cast-bolt').spell).to.equal('spec-bolt');
      expect(monster.getAbility('basic-attack').priority).to.equal(50);
      expect(monster.getAbility('monster-cast-spell')).to.equal(undefined);
    });

    it("falls back to the default abilities", function() {
      expect(buildMonster('spec-caster').getAbility('defend').code).to.equal('basic-defend');
    });
  });

  describe("findAbility()", function() {
    it("returns the key of the highest priority entry with the code", function() {
      const monster = buildMonster('spec-caster');

      expect(monster.findAbility('monster-cast-spell')).to.equal('cast-spark');
      expect(monster.findAbility('basic-attack')).to.equal('basic-attack');
      expect(monster.findAbility('no-such-ability')).to.equal(undefined);
    });
  });

  describe("getAbilityCooldown()", function() {
    it("reads the cooldown from the keyed entry", function() {
      expect(buildMonster('spec-caster').getAbilityCooldown('cast-spark')).to.equal(2000);
    });
  });

});
