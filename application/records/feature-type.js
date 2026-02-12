global.FeatureType = (function() {
  const $featureTypes = {};

  function register(code,data) {
    $featureTypes[code] = data;
  }

  function getAllCodes() {
    return Object.keys($featureTypes);
  }

  function lookup(code) {
    if ($featureTypes[code] === null) { throw `Bad feature code [${code}]` }

    const featureType = { ...$featureTypes[code] };

    return Object.freeze({
      getCode: () => { return code; },
      buildFeature: options => { return featureType.build(options) },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
