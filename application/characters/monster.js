global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getCode() { return monsterComponent().code; }
  function getBaseMonster() { return BaseMonster.lookup(getCode()); }
  function getType() { return MonsterType.lookup(getBaseMonster().getType()); }
  function getSpecies() { return getBaseMonster().getSpecies(); }
  function getGender() { return ActorComponent.lookup(id).gender; }
  function getArchetype() { return PersonalityComponent.lookup(id).archetype; }
  function getNegotiationStyle() { return Archetype.lookup(getArchetype()).getNegotiationStyle(); }
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
    const speciesResistance = getSpecies() ? Species.lookup(getSpecies()).getResistance(type) : 0;
    const monsterResistance = getBaseMonster().getResistance(type);
    return speciesResistance + monsterResistance;
  }

  // TODO: We need to determine if this monster is using a common or a proper name. Unique monsters will have proper
  //       names so templates like "{T:fullName} {T:targetName}" resolve to "Stinkfist the Kobold Dick Puncher" with
  //       common names but resolve to "Glub Shitto Glub Shitto" with proper names. First though, we need some unique
  //       monsters with proper names.
  function getNameType() { return 'common' }

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
    state.getActiveCharacters().forEach(id => {
      threatTable[id] = 1 + Random.roll(500);
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
    getCode,
    getBaseMonster,
    getType,
    getResistance,
    getNameType,
    getSpecies,
    getGender,
    getArchetype,
    getNegotiationStyle,
    getSkill,
    getPrioritizedAbilities,

    populateThreatTable,
    getThreatTable,
    updateThreat,
  });

}
