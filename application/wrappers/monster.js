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

  // When building the list of abilities we build one map from the two arrays. Because object keys act like a set, an
  // ability defined in the base monster will override an ability from the more generalized monster type that shares
  // the same key. An entry is keyed by its ability code unless it sets an explicit key, which a monster that carries
  // the same ability multiple times (a caster with two spells) needs to keep its entries distinct.
  function getAbilityMap() {
    const abilityMap = {};

    [getType(), getBaseMonster()].forEach(source => {
      const keys = [];
      source.getPrioritizedAbilities().forEach(ability => {
        const key = ability.key || ability.code;
        if (keys.includes(key)) {
          throw new Error(`Monster[${getCode()}] has more than one ability with the key [${key}]`);
        }
        keys.push(key);
        abilityMap[key] = { ...ability, key };
      });
    });

    return abilityMap;
  }

  function getPrioritizedAbilities() {
    const abilities = Object.values(getAbilityMap());

    if (abilities.length === 0) {
      throw new Error(`Monster[${getCode()}] has no abilities.`);
    }

    return abilities;
  }

  // We need to call this function when there are other properties on the ability entry that we need to read.
  function getAbility(key) {
    return getAbilityMap()[key];
  }

  // The cooldown set on the monster's ability entry overrides the cooldown on the ability record itself.
  function getAbilityCooldown(key) {
    const monsterAbility = getAbility(key);
    if (monsterAbility == null) { return Ability.lookup(key).getCooldown(); }
    return monsterAbility.cooldown || Ability.lookup(monsterAbility.code).getCooldown();
  }

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
    getPrioritizedAbilities,
    getAbility,
    getAbilityCooldown,

    populateThreatTable,
    getThreatTable,
    updateThreat,

    getCardArt: () => { return `temp/entity.jpg` },
  };

}
