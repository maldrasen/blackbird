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
        triggers: monsterBase.getTriggers()
      });
      addBasicAttack(monsterData, monsterBase);
    }

    // We need to build the battle applicable components that the character builder would have built from scratch.
    if (monsterSpecies == null) {
      monsterId = Registry.createEntity();
    }

    addSkills(monsterBase, monsterId);
    addLevels(monsterBase, monsterId);

    MonsterComponent.create(monsterId, monsterData);

    return monsterId;
  }

  function addSkills(monsterBase, monsterId) {
    const skills = SkillsComponent.lookup(monsterId);
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
      for (let i=0; i<monsterBase.getLevel(); i++) {
        LevelSystem.levelUp(monsterId, Random.fromFrequencyMap(attributeGrowth));
      }
    }
  }

  // Pick a weapon attack from the table if this monster has a weapon attack. Some monsters won't have any weapon
  // attacks and will only have other natural attacks (bite, claw) and some monsters might only have abilities, like
  // a poison spit or something.
  function addBasicAttack(monsterData, monsterBase) {
    const attackTable = monsterBase.getAttackTable();
    if (attackTable) {
      monsterData.basicAttack = Random.from(attackTable);
    }
  }

  return Object.freeze({
    build,
  })

})();
