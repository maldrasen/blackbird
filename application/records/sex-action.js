global.SexAction = (function() {
  const $sexActions = {};

  function register(code,data) {
    $sexActions[code] = data;
  }

  function lookup(code) {
    const action = $sexActions[code];

    if (action === null) {
      throw `Bad sex action code [${code}]`
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return action.name; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
