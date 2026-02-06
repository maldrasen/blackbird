global.Species = (function() {

  const $speciesMap = {};


  function register(code,data) { $speciesMap[code] = data; }
  function getAllCodes() { return Object.keys($speciesMap); }

  // The lookup() function returns a wrapper for the species data object.
  function lookup(code) {
    const species = $speciesMap[code];

    if (species === null) {
      throw `Bad species code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return species.code; },
      getName: () => { return species.name; },
      getGenderRatio: () => { return species.genderRatio; },
      getSexualityRatio: () => { return species.sexualityRatio; },
      getAttributes: () => { return species.attributes; },
      getPersonalityRanges: () => { return species.personalityRanges; },
      getBody: () => { return species.body },
      getAverageHeight: () => { return species.body.averageHeight || _humanMaleHeight; },
      getHeightDeviationRatio: () => { return species.body.heightDeviationRatio || _humanDeviationRatio; },
      getFemaleHeightRatio: () => { return species.body.femaleHeightRatio || _humanFemaleRatio; },
      getMutability: () => { return species.body.mutability || 0; },
      getSkinType: () => { return species.body.skinType || 'skin'; },
      getEyeShape: () => { return species.body.eyeShape || 'round'; },
      getEarShape: () => { return species.body.earShape; },
      getTailShape: () => { return species.body.tailShape; },
      getHornShape: () => { return species.body.hornShape; },
      getSmellFamily: () => { return species.body.smellFamily; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
