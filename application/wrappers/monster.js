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

  // const defaultAbilities = {
  //   defend: { code:'basic-defend', priority:0 },
  // };

  // function getAbilityMap() { return getBaseMonster().getAbilityMap(); }

  // Find the key of the highest priority ability with the given code. Several entries can share a code, casting
  // different spells for instance, so the priority breaks the tie.
  // function findAbility(code) {
  //   const matches = Object.entries(getAbilityMap()).filter(([key, entry]) => entry.code === code);
  //   matches.sort(([,a], [,b]) => b.priority - a.priority);
  //   return matches.length > 0 ? matches[0][0] : undefined;
  // }

  // We need to call this function when there are other properties on the ability entry that we need to read. The
  // default abilities are kept out of the ability map so that they're never picked, counted for essence, or given
  // initial cooldowns - they're only reachable through their explicit fallback keys.
  // function getAbility(key) {
  //   return getAbilityMap()[key] || defaultAbilities[key];
  // }

  // A default ability is only reachable through its fallback key, and none of them has a cooldown.
  // function getAbilityCooldown(key) {
  //   return defaultAbilities[key] ? undefined : getBaseMonster().getAbilityCooldown(key);
  // }

  // TODO: Reimplement with the new model. I think all of these functions will still need to work in basically the
  //       the same way. Each ability now has a unique identifier to use. Should we keep abilities in a map or does it
  //       make more sense for this to be an array now?

  // TODO: By moving away from the records, Ability no longer has a code. I think the only place this was really used
  //       was when forcing an ability from a negotiation. Every ability at least has a name though, so findAbility
  //       should find by name and all the forced abilities should reference ability by name now. As two abilities
  //       could share the same code before, referencing an ability by name shouldn't be significantly different.

  function getAbility() {}
  function getAbilityMap() { return {}; }
  function findAbility() {}
  function getAbilityCooldown() {}

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

    getAbility,
    getAbilityMap,
    findAbility,
    getAbilityCooldown,

    getCardArt: () => { return `temp/entity.jpg` },
  };

}
