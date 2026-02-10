global.Location = (function() {
  const $locations = {};

  function register(code,data) {
    $locations[code] = data;
  }

  function getAllCodes() {
    return Object.keys($locations);
  }

  function lookup(code) {
    if ($locations[code] === null) { throw `Bad location code [${code}]` }

    const location = { ...$locations[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return location.name; },
      getBackground: () => { return location.background; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
