global.Species = (function() {

  const $speciesMap = {};

  // If a species doesn't have height data specified, then we fallback to these constants which are used to calculate a
  // random heights for the species. The standard deviation is normally around 70mm, but I represent it as a ratio
  // below so that a species with a different average height can still have a comparable height deviation. The same is
  // true for the female height ratio. Different species can set these to different values to allow more or less
  // deviation between random heights or the sexes. We also assume that the deviation for futanari would be half of
  // what females would be.
  const _humanMaleHeight = 1750;
  const _humanDeviationRatio = 100 / 1750; // (Actual standard deviation is around 70, but I want to make it a bit more extreme)
  const _humanFemaleRatio = 1500 / 1750;   // (Actual female average height is 1620, but again I want the male/female ratio to be more noticeable.)

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
