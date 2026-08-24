global.FeatureType = (function() {
  const featureTypes = {};

  function register(code,data) {
    featureTypes[code] = data;
  }

  function getAllCodes() {
    return Object.keys(featureTypes);
  }

  function lookup(code) {
    if (featureTypes[code] == null) { throw new Error(`Bad feature code [${code}]`); }

    const featureType = { ...featureTypes[code] };

    return {
      getCode: () => { return code; },
      getVariety: () => { return featureType.variety },
      buildFeature: options => { return featureType.build(options) },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
