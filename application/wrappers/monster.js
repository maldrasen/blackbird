global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getCode() { return monsterComponent().code; }
  function getBaseMonster() { return BaseMonster.lookup(getCode()); }
  function getType() { return MonsterType.lookup(getBaseMonster().getType()); }
  function getSpecies() { return getBaseMonster().getSpecies(); }
  function getBodyPlan() { return getBaseMonster().getBodyPlan(); }
  function getGender() { return ActorComponent.lookup(id).gender; }
  function getArchetype() { return PersonalityComponent.lookup(id).archetype; }
  function willNegotiate() { return getBaseMonster().getSpecies() != null; }
  function getNegotiationStyle() { return Archetype.lookup(getArchetype()).getNegotiationStyle(); }
  function getSkill(code) { return SkillsComponent.lookup(id)[code]; }

  function getResistance(type) {
    const speciesResistance = getSpecies() ? Species.lookup(getSpecies()).getResistance(type) : 0;
    const monsterResistance = getBaseMonster().getResistance(type);
    return speciesResistance + monsterResistance;
  }

  function getNameType() {
    return getBaseMonster().getNameType();
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
        case ThreatWeight.furtherBack: ThreatGenerators.furtherBack(threatTable, weight); break;
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

  // ===============
  //    Abilities
  // ===============
  // A monster's abilities are the models its base monster compiled, shared by every monster of that kind.

  function getAbilities() { return getBaseMonster().getAbilities(); }

  // Several abilities can share a name, casting different spells for instance, so the highest priority one wins.
  function findAbility(name) {
    const matches = getAbilities().filter(ability => ability.getName() === name);
    matches.sort((a, b) => b.getPriority() - a.getPriority());
    return matches[0];
  }

  return {
    getEntity: () => { return id },
    getCode,
    getBaseMonster,
    getType,
    getResistance,
    getNameType,
    getSpecies,
    getBodyPlan,
    getGender,
    getArchetype,
    willNegotiate,
    getNegotiationStyle,
    getSkill,

    populateThreatTable,
    getThreatTable,
    updateThreat,

    getAbilities,
    findAbility,

    getCardArt: () => { return `temp/entity.jpg` },
  };

}
