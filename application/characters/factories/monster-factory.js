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

  // TODO: Eventually we'll want to unify the leveling into a class that works for both monsters and characters. We
  //       don't want to repeat the logic for attribute increase on level up and the associated changes to health or
  //       other attribute dependent properties. (Like mana pools maybe?)
  function addLevels(monsterBase, monsterId) {
    const attributes = AttributesComponent.lookup(monsterId);
    const type = MonsterType.lookup(monsterBase.getType());
    const attributeGrowth = type.getAttributeGrowth();
    const startingVitality = attributes[Attrib.vitality];

    if (attributeGrowth) {
      for (let i=0; i< monsterBase.getLevel(); i++) {
        const attr = Random.fromFrequencyMap(attributeGrowth);
        const roll = Random.between(1,5);

        attributes[attr] += roll;
      }
    }

    if (startingVitality !== attributes[Attrib.vitality]) {
      addHealth(monsterBase, monsterId, attributes[Attrib.vitality] - startingVitality);
    }

    AttributesComponent.update(monsterId, attributes);
  }

  // TODO: If leveling the monster increases its vitality we need to give it more health. Doing this here is a bad
  //       design. We also set the health in the AttributesFactory when the character is first created using the same
  //       method. We should centralize this someplace else, maybe on the health component itself so that health
  //       increases on level up or on create happen in the same place.
  function addHealth(monsterBase, monsterId, vitalityIncrease) {
    const species = monsterBase.getSpecies();
    const factor = species ? Species.lookup(species).getHealthFactor() : 1;
    const addedHealth = Math.ceil(Random.rollDice({ x:vitalityIncrease, d:10 }) * factor);
    const health = HealthComponent.lookup(monsterId);

    health.maxHealth += addedHealth;
    health.currentHealth += addedHealth;

    HealthComponent.update(monsterId, health);
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
