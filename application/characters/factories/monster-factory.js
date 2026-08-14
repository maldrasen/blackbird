global.MonsterFactory = (function() {

  function build(code) {
    const monsterBase = BaseMonster.lookup(code);
    const monsterSpecies = monsterBase.getSpecies();
    const monsterData = { code, threatTable:{}, abilityCooldowns:{} };

    let monsterId;

    // We can use the character factory to build the base monster.
    if (monsterSpecies) {
      monsterId = CharacterFactory.build({
        species: monsterSpecies,
        gender: Random.fromFrequencyMap(monsterBase.getGenderRatio()),
        triggers: monsterBase.getTriggers(),
        archetypes: monsterBase.getArchetypes(),
      });
      addEquipment(monsterBase, monsterId);
    }

    // We need to build the battle applicable components that the character builder would have built from scratch.
    if (monsterSpecies == null) {
      monsterId = Registry.createEntity();
      buildBeast(monsterBase, monsterId);
    }

    addSkills(monsterBase, monsterId);
    addLevels(monsterBase, monsterId);

    MonsterComponent.create(monsterId, monsterData);

    return monsterId;
  }

  // Skills start with the type's base skill ranges, then any skills set directly on the base monster override the
  // rolled values.
  function addSkills(monsterBase, monsterId) {
    const baseSkills = MonsterType.lookup(monsterBase.getType()).getBaseSkills() || {};
    const skills = SkillsComponent.lookup(monsterId);

    Object.entries(baseSkills).forEach(([code,range]) => {
      skills[code] = Random.between(range[0],range[1]);
    });
    Object.entries(monsterBase.getSkills()).forEach(([code,value]) => {
      skills[code] = value;
    });

    SkillsComponent.update(monsterId, skills);
  }

  // Only monsters that have a defined attributeGrowth map can add levels. We level monsters this way for species that
  // can be recruited to the party, that way a kobold runt recruited at level 1 can have the same attributes as a
  // level 10 kobold recruited later. Non-recruitable monsters will have their attributes defined as a map of
  // attribute ranges.
  function addLevels(monsterBase, monsterId) {
    const attributeGrowth = MonsterType.lookup(monsterBase.getType()).getAttributeGrowth();
    if (attributeGrowth) {
      for (let i=1; i<monsterBase.getLevel(); i++) {
        LevelSystem.levelUp(monsterId, Random.fromFrequencyMap(attributeGrowth));
      }
    }
  }

  function addEquipment(monsterBase, monsterId) {
    const equipment = monsterBase.getEquipment();
    if (equipment) {
      CharacterEquipper(monsterId).equipLoadout(equipment);
    }
  }

  // =========================
  //    Beast Type Monsters
  // =========================

  function buildBeast(monsterBase, monsterId) {
    ActorComponent.create(monsterId, {
      name: monsterBase.getName(),
      gender: Random.fromFrequencyMap(monsterBase.getGenderRatio()),
    });

    const skills = {};
    SkillsComponent.getSkills().forEach(code => { skills[code] = 0; });
    SkillsComponent.create(monsterId, skills);

    addAttributes(monsterBase, monsterId);
  }

  function addAttributes(monsterBase, monsterId) {
    const baseAttributes = MonsterType.lookup(monsterBase.getType()).getBaseAttributes();
    const attributes = {};

    Object.entries(baseAttributes).forEach(([code,range]) => {
      attributes[code] = Random.between(range[0],range[1]);
    });

    AttributesComponent.create(monsterId, attributes);
  }

  return { build };

})();
