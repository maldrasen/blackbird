global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getBaseMonster() { return BaseMonster.lookup(monsterComponent().code); }
  function getBrain() { return MonsterBrain.lookup(getBaseMonster().getBrain()); }
  function getBasicAttack() { return monsterComponent().basicAttack; }
  function getBaseName() { return getBaseMonster().getName(); }
  function getSpecies() { return getBaseMonster().getSpecies(); }
  function getSkill(code) { return SkillsComponent.lookup(id)[code]; }

  // The prioritized abilities have the ability code and a priority level: { code, priority }
  function getPrioritizedAbilities() {
    const abilities = [];

    console.log("=== Getting Prioritised Abilities ===")

    // return [...getBrain().getPrioritizedAbilities(), ...getBaseMonster().getPrioritizedAbilities()];


    return abilities;
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
    getBrain,
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
