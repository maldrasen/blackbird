global.BaseMonster = (function() {
  const monsters = {};

  function register(code,data) {
    monsters[code] = data;
  }

  function getAllCodes() {
    return Object.keys(monsters);
  }

  function lookup(code) {
    if (monsters[code] == null) { throw new Error(`Bad monster code [${code}]`); }

    const monster = { ...monsters[code] };

    function getGenderRatio() {
      return monster.genderRatio ? monster.genderRatio : Species.lookup(monster.species).getGenderRatio();
    }

    function getHealthFactor() {
      if (monster.species) { return Species.lookup(monster.species).getHealthFactor(); }
      return monster.healthFactor || 1;
    }

    function getSpeedFactor() {
      if (monster.species) { throw new Error(`This monster should have a body. Get the precalculated speed factor from the entity's cache component.`); }
      return monster.speedFactor || 1;
    }

    function getThreatWeights() {
      return monster.threatWeights || MonsterType.lookup(monster.type).getThreatWeights();
    }

    function getNegotiationGreeting(context) {
      return monster.negotiationGreeting ?
          monster.negotiationGreeting.pick(context):
          Species.lookup(monster.species).getNegotiationGreeting(context);
    }

    return {
      getCode: () => { return code; },
      getName: () => { return monster.name; },
      getNameType: () => { return monster.nameType || 'common'; },
      getDescription: () => { return monster.description; },
      getSpecies: () => { return monster.species; },
      getBodyPlan: () => { return monster.bodyPlan ? BodyPlan[monster.bodyPlan] : BodyPlan.humanoid; },
      getGenderRatio,
      getType: () => { return monster.type; },
      getLevel: () => { return monster.level || 0; },
      getBonusEssence: () => { return monster.bonusEssence || 0; },

      getHealthFactor,
      getSpeedFactor,

      getSkills: () => { return monster.skills || {}; },
      getResistances: () => { return monster.resistances || {}; },
      getResistance: type => { return (monster.resistances||{})[type] || 0; },
      getTriggers: () => { return monster.triggers || []; },
      getArchetypes: () => { return monster.archetypes; },
      getThreatWeights,
      getEquipment: () => { return monster.equipment; },

      getPrioritizedAbilities: () => { return monster.prioritizedAbilities || {}; },
      getNegotiationGreeting,

      getLootQuality:() => { return monster.lootQuality || 1; },
      getLootGroups: () => { return monster.lootGroups || {}; },
      getLootAdjustments: () => { return monster.lootAdjustments || []; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
