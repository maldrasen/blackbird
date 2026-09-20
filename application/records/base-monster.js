global.BaseMonster = (function() {
  const monsters = {};
  const essenceScale = 10;
  const equipmentScale = 0.5;

  function register(code,data) {
    monsters[code] = data;
  }

  function getAllCodes() {
    return Object.keys(monsters);
  }

  function compile() {
    Object.values(monsters).forEach(monster => {
      if (monster.buildAbilities) { monster.abilities = monster.buildAbilities(); }
    });
  }

  function lookup(code) {
    if (monsters[code] == null) { throw new Error(`Bad monster code [${code}]`); }

    const monster = { ...monsters[code] };

    function getGenderRatio() {
      return monster.genderRatio ? monster.genderRatio : Species.lookup(monster.species).getGenderRatio();
    }

    function getThreatWeights() {
      return monster.threatWeights || MonsterType.lookup(monster.type).getThreatWeights();
    }

    function getNegotiationGreeting(context) {
      return monster.negotiationGreeting ?
          monster.negotiationGreeting.pick(context):
          Species.lookup(monster.species).getNegotiationGreeting(context);
    }

    function getAbilities() {
      return [...MonsterType.lookup(monster.type).getAbilities(), ...(monster.abilities || [])];
    }

    function findAbility(name) {
      const matches = getAbilities().filter(ability => ability.getName() === name);
      matches.sort((a, b) => b.getPriority() - a.getPriority());
      return matches[0];
    }

    // ==================================
    //    Essence and Challenge Rating
    // ==================================

    function getHealthFactor() {
      if (monster.species) { return Species.lookup(monster.species).getHealthFactor(); }
      return monster.healthFactor || 1;
    }

    function getSpeedFactor() {
      return monster.species ? Species.lookup(monster.species).getSpeedFactor() : (monster.speedFactor || 1);
    }

    function getAttributeGrades() {
      return monster.species ?
        Species.lookup(monster.species).getAttributes() :
        MonsterType.lookup(monster.type).getAttributes();
    }

    // The attributes of an average monster of this kind, following the MonsterFactory: the starting roll, plus each
    // attribute's share of the level ups from the type's attribute growth map.
    function getAverageAttributes() {
      const grades = getAttributeGrades();
      const growth = MonsterType.lookup(monster.type).getAttributeGrowth();
      const growthChances = growth ? Random.frequencyMapChances(growth) : {};
      const levelUps = Math.max(0, (monster.level || 0) - 1);
      const attributes = {};

      Object.keys(Attrib).forEach(code => {
        const increase = AttributeMath.averageIncrease(code, grades);
        attributes[code] = Math.round(AttributeMath.attributeBaseline + increase + (levelUps * (growthChances[code] || 0) * increase));
      });

      return Attributes(attributes);
    }

    function getBonusEssence() {
      return monster.bonusEssence || 0;
    }

    function getEssenceScale() {
      return getHealthFactor() / getSpeedFactor() * essenceScale
    }

    function getChallengeRating() {
      let essenceRating = getBonusEssence();
      let equipmentRating = monster.equipmentOptions ? Math.round(monster.equipmentOptions.budget * equipmentScale) : 0;

      getAbilities().forEach(ability => {
        essenceRating += ability.getEssence(getAverageAttributes());
      });

      return equipmentRating + Math.round(essenceRating * getEssenceScale());
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
      getEquipmentOptions: () => { return monster.equipmentOptions; },
      getEquipmentParameters: () => { return monster.equipmentParameters; },

      getSkills: () => { return monster.skills || {}; },
      getResistances: () => { return monster.resistances || {}; },
      getResistance: type => { return (monster.resistances||{})[type] || 0; },
      getTriggers: () => { return monster.triggers || []; },
      getArchetypes: () => { return monster.archetypes; },
      getThreatWeights,

      getAbilities,
      findAbility,
      getNegotiationGreeting,

      getLootQuality:() => { return monster.lootQuality || 1; },
      getLootGroups: () => { return monster.lootGroups || {}; },
      getLootAdjustments: () => { return monster.lootAdjustments || []; },

      getHealthFactor,
      getSpeedFactor,
      getAverageAttributes,
      getBonusEssence,
      getEssenceScale,
      getChallengeRating,
    };
  }

  return {
    register,
    getAllCodes,
    compile,
    lookup,
  };

})();
