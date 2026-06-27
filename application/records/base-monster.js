global.BaseMonster = (function() {
  const $monsters = {};

  function register(code,data) {
    $monsters[code] = data;
  }

  function getAllCodes() {
    return Object.keys($monsters);
  }

  function lookup(code) {
    if ($monsters[code] == null) { throw new Error(`Bad monster code [${code}]`); }

    const monster = { ...$monsters[code] };

    // Base monsters can have their own gender ratio, like the kobold sneak sluts who are mostly female. If a gender
    // ratio isn't defined we fallback to the species ratio. If the monster doesn't have a species we can assume it's
    // usually an animal of some sort and can have an equal chance of being male or female.
    function getGenderRatio() {
      if (monster.genderRatio) { return monster.genderRatio; }
      if (monster.species) { return Species.lookup(monster.species).getGenderRatio(); }
      return { male:10, female:10 };
    }

    function getThreatWeights() {
      return monster.threatWeights || MonsterType.lookup(monster.type).getThreatWeights();
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return monster.name; },
      getSpecies: () => { return monster.species; },
      getGenderRatio,
      getType: () => { return monster.type; },
      getLevel: () => { return monster.level || 0; },

      getSkills: () => { return monster.skills || {}; },
      getResistances: () => { return monster.resistances || {}; },
      getTriggers: () => { return monster.triggers || [] },
      getThreatWeights,
      getAttackTable: () => { return monster.attackTable; },
      getPrioritizedAbilities: () => { return monster.prioritizedAbilities||[] },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
