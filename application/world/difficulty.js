global.Difficulty = (function() {

  function getDifficulty() { return WorldState.getOptions().difficulty; }

  return {
    getDamageFactor: () => { return getDifficulty().damage / 100; },
    getMitigationFactor: () => { return 100 / getDifficulty().mitigation; },
    getResistance: () => { return getDifficulty().resistance; },
    getEncounterFactor: () => { return getDifficulty().encounterRate / 100; },
  };

})();
