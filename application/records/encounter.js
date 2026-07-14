global.Encounter = (function() {
  const encounters = {};

  function register(code,data) {
    encounters[code] = data;
  }

  function getAllCodes() {
    return Object.keys(encounters);
  }

  function lookup(code) {
    if (encounters[code] == null) { throw new Error(`Bad encounter code [${code}]`); }

    const encounter = { ...encounters[code] };

    // The formation in the encounter defines what monsters are possibly present in each position. Building the
    // formation loops through the formation array and picks which monster codes should be built in each position.
    function buildFormation() {
      const formation = [];

      for (let r=0; r<encounter.formation.length; r++) {
        const positions = [];

        for (let p=0; p<encounter.formation[r].length; p++) {
          let index = encounter.formation[r][p];
          positions.push(chooseMonster(encounter.monsters[index]));
        }

        formation.push(positions);
      }

      return formation;
    }

    function chooseMonster(definition) {
      if (definition == null) { return null; }
      if (definition.chance && Random.roll(100) >= definition.chance) { return null; }
      if (definition.code) { return definition.code; }
      if (definition.codeMap) { return Random.fromFrequencyMap(definition.codeMap); }

      throw `No code or codeMap in monster definition`;
    }

    return Object.freeze({
      getCode: () => { return code; },
      getDescription: () => { return encounter.description; },
      buildFormation,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
