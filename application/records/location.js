global.Location = (function() {
  const locations = {};

  function register(code,data) {
    locations[code] = data;
  }

  function getAllCodes() {
    return Object.keys(locations);
  }

  function lookup(code) {
    if (locations[code] == null) { throw new Error(`Bad location code [${code}]`); }

    const location = { ...locations[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return location.name; },
      getDistrict: () => { return location.district; },
      getBackground: () => { return location.background; },
      getActions: () => { return location.actions || []; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
