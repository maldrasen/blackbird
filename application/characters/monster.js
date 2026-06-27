global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getBaseMonster() { return BaseMonster.lookup(monsterComponent().code); }
  function getType() { return MonsterType.lookup(getBaseMonster().getType()); }
  function getBasicAttack() { return monsterComponent().basicAttack; }
  function getBaseName() { return getBaseMonster().getName(); }
  function getSpecies() { return getBaseMonster().getSpecies(); }
  function getSkill(code) { return SkillsComponent.lookup(id)[code]; }

  // When building the list of abilities and their priorities we first build the ability map from the two arrays.
  // Because object keys act like a set, and this will allow ability priorities defined in the base monster to
  // override the abilities set in the more generalized monster type.
  function getPrioritizedAbilities() {
    const abilityMap = {}

    getType().getPrioritizedAbilities().forEach(ability => {
      abilityMap[ability.code] = ability.priority;
    });
    getBaseMonster().getPrioritizedAbilities().forEach(ability => {
      abilityMap[ability.code] = ability.priority;
    });

    return Object.keys(abilityMap).map(code => {
      return { code:code, priority:abilityMap[code] }
    });
  }

  function getResistance(type) {
    const baseResist = getBaseMonster().getResistances()[type] || 0;
    return baseResist + getSpeciesResist(type);
  }

  function getSpeciesResist(type) {
    if (getSpecies() == null) { return 0; }
    return Species.lookup(getSpecies()).getResistances()[type] || 0;
  }

  // ==========
  //   Threat
  // ==========

  // Populating the threat table is done when the battle first starts. It will replace whatever is currently in the
  // table (which should be nothing) though it could also be used to completely reset the threat if there's some kind
  // of effect that would do that.
  function populateThreatTable() {
    const state = BattleSystem.getState();
    const threatTable = {};

    // We start with some random "I just don't like your face" threat.
    state.getCharacters().forEach(id => {
      threatTable[id] = Random.roll(500);
    });

    // There's probably a more elegant way to do this, but this works fine I guess.
    Object.entries(getBaseMonster().getThreatWeights()).forEach(([generator, weight]) => {
      switch (generator) {
        case ThreatWeight.closest: ThreatGenerators.closest(threatTable, weight, id); break;
        case ThreatWeight.leastArmor: ThreatGenerators.leastArmor(threatTable, weight); break;
        case ThreatWeight.leastHealth: ThreatGenerators.leastHealth(threatTable, weight); break;
        case ThreatWeight.killMen: ThreatGenerators.killMen(threatTable, weight); break;
        case ThreatWeight.killWomen: ThreatGenerators.killWomen(threatTable, weight); break;
        default: throw new Error(`Unknown Threat Generator [${generator}]`);
      }
    });

    const component = monsterComponent();
    component.threatTable = threatTable;
    MonsterComponent.update(id, component);
  }

  function getThreatTable() {
    return monsterComponent().threatTable;
  }

  function updateThreat(character, threat) {
    const component = monsterComponent();
    component.threatTable[character] = threat;
    MonsterComponent.update(id, component);
  }

  return Object.freeze({
    getEntity: () => { return id },
    getBaseMonster,
    getBaseName,
    getType,
    getBasicAttack,
    getResistance,
    getSpecies,
    getSkill,
    getPrioritizedAbilities,

    populateThreatTable,
    getThreatTable,
    updateThreat,
  });

}
