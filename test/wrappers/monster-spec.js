describe.only("Monster", function() {

  // These specs register their own monster records so they test the merge logic without coupling to shipped content.
  // The abilities are built here because the compile pass ran before the specs. The wrapper only reads the registries
  // through the monster component, so a bare entity is enough - no need to build a full monster through the factory.
  before(function() {
    MonsterType.register('spec-caster-type', {
      abilities: [
        Ability.WeaponAttack({ priority:20 }),
      ],
    });

    BaseMonster.register('spec-caster', {
      name: 'Spec Caster',
      type: 'spec-caster-type',
      level: 1,
      abilities: [
        Ability.CastSpell({ spell:'ember', powerLevel:1, priority:80, cooldown:2000 }),
        Ability.CastSpell({ spell:'ember', powerLevel:3, priority:70 }),
      ],
    });
  });

  function buildMonster(code) {
    const id = Registry.createEntity();
    MonsterComponent.create(id, code);
    return Monster(id);
  }

  describe("getAbilities()", function() {
    it("appends the monster's own abilities to its type's", function() {
      const abilities = buildMonster('spec-caster').getAbilities();

      expect(abilities.map(ability => ability.getName())).to.deep.equal(['Attack','Cast Ember','Cast Ember']);
      expect(abilities.map(ability => ability.getPriority())).to.deep.equal([20, 80, 70]);
    });
  });

  describe("findAbility()", function() {
    it("returns the highest priority ability with the name", function() {
      const monster = buildMonster('spec-caster');

      expect(monster.findAbility('Cast Ember').getDetails().powerLevel).to.equal(1);
      expect(monster.findAbility('Attack').getPriority()).to.equal(20);
      expect(monster.findAbility('No Such Ability')).to.equal(undefined);
    });
  });

});
