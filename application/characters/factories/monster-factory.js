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

    // The monster component is created before levels are added because leveling a beast looks up its base monster
    // through the monster component.
    MonsterComponent.create(monsterId, monsterData);

    addSkills(monsterBase, monsterId);
    addLevels(monsterBase, monsterId);

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

  // Only monsters that have a defined attributeGrowth map can add levels. We level monsters this way so that a kobold
  // runt recruited at level 1 can have the same attributes as a level 10 kobold recruited later. Each level also
  // grows one skill from the type's skill growth map.
  function addLevels(monsterBase, monsterId) {
    const attributeGrowth = MonsterType.lookup(monsterBase.getType()).getAttributeGrowth();
    if (attributeGrowth) {
      for (let i=1; i<monsterBase.getLevel(); i++) {
        LevelSystem.levelUp(monsterId, Random.fromFrequencyMap(attributeGrowth));
        growSkill(monsterBase, monsterId);
      }
    }
  }

  // Skills that were set directly on the base monster are pinned to their authored value and don't grow.
  function growSkill(monsterBase, monsterId) {
    const skillGrowth = MonsterType.lookup(monsterBase.getType()).getSkillGrowth();
    if (skillGrowth == null) { return; }

    const code = Random.fromFrequencyMap(skillGrowth);
    if (monsterBase.getSkills()[code] != null) { return; }

    const skills = SkillsComponent.lookup(monsterId);
    skills[code] = Math.min(100, skills[code] + Random.between(1,10));
    SkillsComponent.update(monsterId, skills);
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
    addHealth(monsterBase, monsterId);
  }

  // Beast attributes are rolled the same way character attributes are, with the attribute grades coming from the
  // monster type rather than a species.
  function addAttributes(monsterBase, monsterId) {
    const grades = MonsterType.lookup(monsterBase.getType()).getAttributes();
    const actor = ActorComponent.lookup(monsterId);
    const attributes = {};

    Object.keys(Attrib).forEach(code => {
      attributes[code] = CharacterMath.attributeBaseline + CharacterMath.attributeIncrease(code, grades, actor, {});
    });

    AttributesComponent.create(monsterId, attributes);
  }

  function addHealth(monsterBase, monsterId) {
    const vitality = AttributesComponent.lookup(monsterId).vitality;
    const health = Math.round(Random.rollDice({ x:vitality, d:10 }) * monsterBase.getHealthFactor());
    const stamina = Attributes(monsterId).getMaxStamina();

    HealthComponent.create(monsterId, { currentStamina:stamina, currentHealth:health, maxHealth:health });
  }

  return { build };

})();
