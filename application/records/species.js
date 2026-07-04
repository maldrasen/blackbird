global.Species = (function() {

  const $speciesMap = {};

  function register(code,data) { $speciesMap[code] = data; }
  function getAllCodes() { return Object.keys($speciesMap); }

  // The lookup() function returns a wrapper for the species data object.
  function lookup(code) {
    if ($speciesMap[code] == null) { throw new Error(`Bad species code [${code}]`); }

    const species = { ...$speciesMap[code] };

    function getAverageHeight(gender=Gender.male) {
      const maleHeight = species.body.maleHeight;
      const femaleHeight = species.body.femaleHeight;
      const futaHeight = (maleHeight + femaleHeight) / 2;

      switch (gender) {
        case Gender.male: return maleHeight;
        case Gender.female: return femaleHeight;
        case Gender.futa: return futaHeight;
        case Gender.enby: return futaHeight;
      }
    }

    function genderRatio() {
      return getAverageHeight() / species.body.maleHeight
    }

    return Object.freeze({
      getCode: () => { return species.code; },
      getName: () => { return species.name; },
      getAdjective: () => { return species.adjective || species.name; },
      getGenderRatio: () => { return species.genderRatio; },
      getAttributes: () => { return species.attributes; },
      getHealthFactor: () => { return species.healthFactor; },
      getResistances: () => { return species.resistances; },
      getArchetypes: () => { return species.archetypes; },
      getSensitivities: () => { return species.sensitivities; },
      getSexualPreferences: () => { return species.sexualPreferences; },
      getAspects: () => { return species.aspects; },
      getBody: () => { return species.body; },
      getAverageHeight: getAverageHeight,
      getHeightDeviation: () => { return species.body.heightDeviation; },
      getLengthRatio: () => { return genderRatio(); },
      getAreaRatio: () => { return genderRatio() ** 2; },
      getVolumeRatio: () => { return genderRatio() ** 3; },
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
