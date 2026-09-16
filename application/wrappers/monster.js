global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getCode() { return monsterComponent().code; }
  function getBaseMonster() { return BaseMonster.lookup(getCode()); }
  function getSpecies() { return getBaseMonster().getSpecies(); }
  function getArchetype() { return PersonalityComponent.lookup(id).archetype; }

  function getResistance(type) {
    const speciesResistance = getSpecies() ? Species.lookup(getSpecies()).getResistance(type) : 0;
    const monsterResistance = getBaseMonster().getResistance(type);
    return speciesResistance + monsterResistance;
  }

  function populateThreatTable() {
    const state = BattleSystem.getState();
    const threatTable = {};

    state.getActiveCharacters().forEach(id => {
      threatTable[id] = 1 + Random.roll(500);
    });

    Object.entries(getBaseMonster().getThreatWeights()).forEach(([generator, weight]) => {
      switch (generator) {
        case ThreatWeight.closest: ThreatGenerators.closest(threatTable, weight, id); break;
        case ThreatWeight.leastArmor: ThreatGenerators.leastArmor(threatTable, weight); break;
        case ThreatWeight.leastHealth: ThreatGenerators.leastHealth(threatTable, weight); break;
        case ThreatWeight.killMen: ThreatGenerators.killMen(threatTable, weight); break;
        case ThreatWeight.killWomen: ThreatGenerators.killWomen(threatTable, weight); break;
        case ThreatWeight.furtherBack: ThreatGenerators.furtherBack(threatTable, weight); break;
        default: throw new Error(`Unknown Threat Generator [${generator}]`);
      }
    });

    const component = monsterComponent();
    component.threatTable = threatTable;
    MonsterComponent.update(id, component);
  }

  function updateThreat(character, threat) {
    const component = monsterComponent();
    component.threatTable[character] = threat;
    MonsterComponent.update(id, component);
  }

  return {
    getEntity: () => { return id },
    getCode,
    getBaseMonster,
    getResistance,
    getSpecies,
    getArchetype,
    getType: () => { return MonsterType.lookup(getBaseMonster().getType()); },
    getNameType: () => { return getBaseMonster().getNameType(); },
    getBodyPlan: () => { return getBaseMonster().getBodyPlan(); },
    getGender: () => { return ActorComponent.lookup(id).gender; },
    willNegotiate: () => { return getBaseMonster().getSpecies() != null; },
    getNegotiationStyle: () => { return Archetype.lookup(getArchetype()).getNegotiationStyle(); },
    getSkill: code => { return SkillsComponent.lookup(id)[code]; },
    populateThreatTable,
    updateThreat,
    getThreatTable: () => { return monsterComponent().threatTable; },
    getAbilities: () => { return getBaseMonster().getAbilities(); },
    findAbility: name => { return getBaseMonster().findAbility(name); },
    getCardArt: () => { return `temp/entity.jpg` },
  };
}
