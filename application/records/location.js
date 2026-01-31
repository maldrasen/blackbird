global.Location = (function() {
  const $locations = {};

  function register(code,data) {
    $locations[code] = data;
  }

  function lookup(code) {
    const location = $locations[code];

    if (location === null) {
      throw `Bad location code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return location.name; },
      getBackground: () => { return location.background; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
