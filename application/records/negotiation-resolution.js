global.NegotiationResolution = (function() {
  const resolutions = {};

  function register(code,data) {
    resolutions[code] = data;
  }

  function getAllCodes() {
    return Object.keys(resolutions);
  }

  function lookup(code) {
    if (resolutions[code] == null) { throw new Error(`Bad negotiation resolution code [${code}]`); }

    const resolution = { ...resolutions[code] };

    return Object.freeze({
      getCode: () => { return code; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
