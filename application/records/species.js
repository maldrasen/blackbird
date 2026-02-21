global.Species = (function() {

  const $speciesMap = {};

  function register(code,data) { $speciesMap[code] = data; }
  function getAllCodes() { return Object.keys($speciesMap); }

  // The lookup() function returns a wrapper for the species data object.
  function lookup(code) {
    if ($speciesMap[code] === null) { throw `Bad species code [${code}]`; }

    const species = { ...$speciesMap[code] };

    function getAverageHeight() {
      return species.body.averageHeight || _humanMaleHeight;
    }

    return Object.freeze({
      getCode: () => { return species.code; },
      getName: () => { return species.name; },
      getGenderRatio: () => { return species.genderRatio; },
      getSexualityRatio: () => { return species.sexualityRatio; },
      getAttributes: () => { return species.attributes; },
      getPersonalityRanges: () => { return species.personalityRanges; },
      getSensitivities: () => { return species.sensitivities; },
      getSexualPreferences: () => { return species.sexualPreferences; },
      getAspects: () => { return species.aspects; },

      getBody: () => { return species.body; },
      getAverageHeight: getAverageHeight,
      getHeightDeviationRatio: () => { return species.body.heightDeviationRatio || _humanDeviationRatio; },
      getFemaleHeightRatio: () => { return species.body.femaleHeightRatio || _humanFemaleRatio; },
      getLengthRatio: () => { return getAverageHeight() / _humanMaleHeight; },
      getAreaRatio: () => { return (getAverageHeight() / _humanMaleHeight) ** 2; },
      getVolumeRatio: () => { return (getAverageHeight() / _humanMaleHeight) ** 3; },

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
